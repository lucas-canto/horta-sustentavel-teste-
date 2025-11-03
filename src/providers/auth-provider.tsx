import { AuthContext } from "@/context/auth-context";
import { PostAuth } from "@/service/PostAuth";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const formatDateToMySQL = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<number>();
  const [token, setToken] = useState<string>();

  const { mutateAsync: MutateLogin } = useMutation({
    mutationFn: PostAuth,
    onSuccess: (data) => {
      setUserId(data.id_produtor);
      console.log(data);
      if (data.status === "erro") {
        setUserId(null)
      }
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    async function loadLogin() {
      const cacheToken = await localStorage.getItem("jwtToken");

      if (cacheToken) {
        setToken(cacheToken)
        MutateLogin({
          token: cacheToken,
          data_atual: formatDateToMySQL(new Date()),
        });
      }
    }

    loadLogin();
  }, []);

  async function login(userId: number, token: string): Promise<void> {
    localStorage.setItem("userID", userId.toString());
    localStorage.setItem("jwtToken", token.toString());
    MutateLogin({
      token: token,
      data_atual: formatDateToMySQL(new Date()),
    });
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("userID");
    localStorage.removeItem("jwtToken");
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{ userId, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
}
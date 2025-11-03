import { api } from "@/lib/axios";

interface LoginRequest {
  email: string;
  senha: string;
}
interface LoginResponse {
  token: string;
  id:number
}

export async function PostLogin({ email, senha }: LoginRequest) {
  const res = await api.post<LoginResponse>(
    "/login_horta.php",
    {
      email,
      senha,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

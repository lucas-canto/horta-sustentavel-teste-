import { api } from "@/lib/axios";

interface AuthRequest {
  token: string;
  data_atual: string;
}

interface AuthResponse
{
    status: string,
    mensagem: string,
    id_produtor: number,
    expira_em: string
}

export async function PostAuth({ token, data_atual }: AuthRequest) {
  const res = await api.post<AuthResponse>(
    "/auth.php",
    { token, data_atual },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

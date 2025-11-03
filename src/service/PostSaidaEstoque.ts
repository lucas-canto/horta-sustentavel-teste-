// service/postSaidaEstoque.ts
import { api } from "@/lib/axios";

export interface PostSaidaEstoqueRequest {
  token: string;
  id_produto: number;
  quantidade: number;
  motivo?: string;
}

export interface PostSaidaEstoqueResponse {
  status: "sucesso" | "erro";
  mensagem: string;
  id_produto?: number;
  nova_quantidade?: number;
}

export async function PostSaidaEstoque({
  token,
  id_produto,
  quantidade,
  motivo,
}: PostSaidaEstoqueRequest): Promise<PostSaidaEstoqueResponse> {
  const res = await api.post<PostSaidaEstoqueResponse>(
    "/remove_mov.php",
    {
      token,
      id_produto,
      quantidade,
      motivo,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
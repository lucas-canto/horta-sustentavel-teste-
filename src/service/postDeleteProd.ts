// service/postDeleteProduto.ts
import { api } from "@/lib/axios";

export interface PostDeleteProdutoReq {
  token: string;
  id_produto: number;
}

export interface PostDeleteProdutoRes {
  status: "sucesso" | "erro";
  mensagem: string;
  id_produto?: number;
}

export async function PostDeleteProduto({ token, id_produto }: PostDeleteProdutoReq): Promise<PostDeleteProdutoRes> {
  const res = await api.post<PostDeleteProdutoRes>(
    "/delete_prod.php",
    { token, id_produto },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
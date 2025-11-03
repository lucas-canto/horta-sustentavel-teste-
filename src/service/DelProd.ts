import { api } from "@/lib/axios";

export interface EditEstoqueReq {
  token: string;
  id_produto: number;
  nome_produto?: string;
  descricao_produto?: string;
  unidade?: string;
  quantidade?: number;
  dt_plantio?: string;
  dt_colheita?: string;
}

export interface EditEstoqueRes {
  status: string;
  mensagem: string;
  id_produto?: number;
}

export async function PostEditEstoque(data: EditEstoqueReq): Promise<EditEstoqueRes> {
  const res = await api.post<EditEstoqueRes>("/edit_estoque.php", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}
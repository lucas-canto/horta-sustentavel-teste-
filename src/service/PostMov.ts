import { api } from "@/lib/axios";

export interface MovimentacaoRequest {
  token: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  motivo: string;
  id_produto?: number;
  nome_produto?: string;
  descricao_produto?: string;
  unidade?: string;
  dt_plantio?: string;
  dt_colheita?: string;
}

export async function PostMovimentacao({ ...rest }: MovimentacaoRequest) {
  // Pega o token do produtor do localStorage
  const token = localStorage.getItem("jwtToken");

  const res = await api.post(
    "/movimentacao/post_mov.php",
    {
      ...rest,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

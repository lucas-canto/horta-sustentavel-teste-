import { api } from "@/lib/axios";

// ======================
// Tipos baseados no JSON real retornado pelo PHP
// ======================

export type Produto = {
  id_estoques: number;
  id_produto: number;
  nm_produto: string;
  descricao: string | null;
  unidade_medida_padrao: string | null;
  ds_quantidade: number;
  dt_plantio: string | null;
  dt_colheita: string | null;
};

export type HortaData = {
  id_horta: number;
  produtos: Produto[];
};

// ======================
// Response da API
// ======================

export type GetHortaResponse =
  | {
      status: "sucesso";
      mensagem: string;
      horta: HortaData;
    }
  | {
      status: "erro";
      mensagem: string;
      horta?: null;
    };

// ======================
// Request
// ======================

export interface GetHortaReq {
  id_produtor: number;
}

// ======================
// Função da API
// ======================

export async function GetEstoque({ id_produtor }: GetHortaReq) {
  const res = await api.post<GetHortaResponse>(
    "/get_estoque.php",
    { id_produtor },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
import { api } from "@/lib/axios";

// ======================
// Tipos baseados no JSON real
// ======================

export type EnderecoHorta = {
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
};

export type Estoque = {
  id_estoques: number;
  produto_id_produto: number;
  ds_quantidade: string;
  dt_validade: string | null;
  dt_colheita: string | null;
  dt_plantio: string | null;
  nm_produto?: string; // opcional, caso o backend retorne o nome do produto
};

export type Horta = {
  id_hortas: number;
  nome: string;
  descricao: string;
  cnpj: string;
  visibilidade: number;
  receitas_geradas: number;
  endereco: EnderecoHorta;
  estoques: Estoque[];
};

// ======================
// Response da API
// ======================

export type GetHortaResponse =
  | {
      status: "sucesso";
      mensagem: string;
      horta: Horta;
    }
  | {
      status: "erro";
      mensagem: string;
      horta: null;
    };

// ======================
// Request
// ======================

export interface GetHortaReq {
  id_produtor: string;
}

// ======================
// Função da API
// ======================

export async function GetHorta({ id_produtor }: GetHortaReq) {
  const res = await api.post<GetHortaResponse>(
    "/get_horta.php",
    { id_produtor },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
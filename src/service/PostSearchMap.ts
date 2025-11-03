import { api } from "@/lib/axios";

interface Horta {
  nome: string;
  descricao: string;
  endereco: string;
  bairro: string;
    id_produtor:number
}

interface HortasResponse {
  status: "sucesso" | "erro";
  mensagem: string;
  bairro: string;
  quantidade: number;
  hortas: Horta[];

}

export async function PostSearchMap(bairro: string) {
  const res = await api.post<HortasResponse>(
    "/hortas_por_bairro.php",
    { bairro },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

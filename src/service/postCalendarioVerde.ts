import { api } from "@/lib/axios";

interface PostCalendarioVerdeRequest {
  cidade: string;
  data: string; // formato dd/mm/yyyy
}

export type SugestaoVerde = {
  produto: string;
  motivo_sazonalidade: string;
  motivo_mercado: string;
  dica_cultivo: string;
};

export type CalendarioVerdeResponse = {
  sugestoes: SugestaoVerde[];
};

export async function PostCalendarioVerde({
  cidade,
  data,
}: PostCalendarioVerdeRequest) {
  const res = await api.post<CalendarioVerdeResponse>(
    "https://hortashost.vercel.app/api/calendario_verde.php",
    {
      cidade,
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
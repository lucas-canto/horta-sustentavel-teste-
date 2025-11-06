import { api } from "@/lib/axios";

interface PostGerarReceitaRequest {
  Alimentos: string;
  Restrições: string;
  Adicionais: string;
  id_produtor?: string; // opcional
}

export interface ReceitaResponse {
  NomeDaReceita: string;
  Descricao: string;
  Ingredientes: string[];
  Instrucoes: string[];
  TempoDePreparo: string;
  Porcoes: string;
  TabelaNutricional: {
    Calorias: string;
    Carboidratos: string;
    Proteinas: string;
    Gorduras: string;
  };
}

export async function PostGerarReceita({
  Alimentos,
  Adicionais,
  Restrições,
  id_produtor,
}: PostGerarReceitaRequest) {
  // corpo da requisição
  const body: Record<string, any> = {
    0: {
      Alimentos,
      Restrições,
      Adicionais,
    },
  };

  // se tiver id_produtor, adiciona no corpo
  if (id_produtor) {
    body.id_produtor = id_produtor;
  }

  const res = await api.post<ReceitaResponse>("/gerar_receita.php", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
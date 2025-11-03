import { ProdutorType, SignInProdutorRequest } from "@/@types/produtor.type";
import { api } from "@/lib/axios";

export async function PostSignIn({
  email_produtor,
  nome_produtor,
  nr_cpf,
  pergunta_1,
  pergunta_2,
  resposta_1,
  resposta_2,
  telefone_produtor,
  senha,
}: SignInProdutorRequest) {
  const res = await api.post<ProdutorType>(
    "/cadastro_produtor.php",
    {
      email_produtor,
      nome_produtor,
      nr_cpf,
      telefone_produtor,
      pergunta_1,
      pergunta_2,
      resposta_1,
      resposta_2,
      senha,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

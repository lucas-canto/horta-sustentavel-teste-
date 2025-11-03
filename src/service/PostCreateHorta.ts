import { api } from "@/lib/axios";
import { HortaFormData } from "@/pages/components/cadastrarHortaForm";

interface CreateHortaRequest extends HortaFormData{
    id_produtor:number
}

export async function PostCreateHorta({
    id_produtor,
  bairro,
  cep,
  cidade,
  cnpj,
  descricao,
  estado,
  nome_horta,
  pais,
  rua,
  visibilidade,
}: CreateHortaRequest) {
  const res = await api.post(
    "/cadastro_horta.php",
    {
      bairro,
      id_produtor,
      cep,
      cidade,
      cnpj,
      descricao,
      estado,
      nome_horta,
      pais,
      rua,
      visibilidade,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

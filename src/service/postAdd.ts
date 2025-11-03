import { api } from "@/lib/axios";

interface AuthRequest {
  token: string;
  nome_produto: string;
  descricao_produto:string
  unidade:string
  quantidade:number
  dt_plantio:string
  dt_colheita:string
  motivo:string
}


interface AuthResponse
{
    status: string,
    mensagem: string,
    id_produtor: number,
    expira_em: string
}

export async function PostAddEstoque({ ...rest}: AuthRequest) {
  console.log({...rest});
  
  const res = await api.post(
    "/add_mov.php",
    { ...rest },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

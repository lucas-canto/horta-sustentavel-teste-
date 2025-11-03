import { useAuth } from "@/hooks/use-auth";
import { Horta } from "@/service/getHorta";
import { ChevronLeft, Eye, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface CardHortaPropr {
  data: Horta;
}

export function CardhortaView({ data }: CardHortaPropr) {
  const { logout } = useAuth();
  const navigate = useNavigate()
  return (
    <div className=" rounded-md p-4 gap-3 flex flex-col  shadow-xl  mx-auto w-full md:w-[60%]">
      <div className="flex flex-row items-center border w-[120px] mb-3 hover:border-green-500 p-1 rounded-sm cursor-pointer" onClick={()=>navigate('/map')}>
        <ChevronLeft />
        <p>Voltar</p>
      </div>

      <div className="flex items-start flex-row justify-between">
        <div>
          <p className="text-xl font-semibold">{data.nome}</p>
          <p className="min-h-[100px] w-[80%] text-slate-400">
            {data.descricao}
          </p>
        </div>

        <div className="shadow-xl p-3 text-center rounded-sm">
          <span className="flex text-sm flex-row gap-2 items-center">
            Visibilidade <Eye size={16} />
          </span>
          {data.visibilidade ? (
            <p className="text-green-500 font-bold">Publico</p>
          ) : (
            <p className="text-slate-400 font-bold">Privado</p>
          )}
        </div>
      </div>

      <div className="flex justify-between flex-row border-t mt-3 pt-3">
        <div className="">
          <p>CNPJ</p>
          {data.cnpj ? (
            <p className="text-green-500 font-bold">{data.cnpj}</p>
          ) : (
            <p className="text-slate-400 font-bold">Não cadastrado</p>
          )}
        </div>

        <div className="text-center">
          <p>Receitas geradas</p>
          {data.receitas_geradas ? (
            <p className="text-green-500 font-bold">{data.receitas_geradas}</p>
          ) : (
            <p className="text-slate-400 font-bold">Nenhuma</p>
          )}
        </div>
      </div>

      <div className="justify-between border-t mt-3 pt-3">
        <span className="flex flex-row gap-2 items-center font-semibold">
          Endereço <MapPin size={16} />
        </span>
        <div>
          <p>
            {data.endereco.rua}, {data.endereco.bairro} - {data.endereco.cidade}
            ,{data.endereco.estado}
          </p>
        </div>
      </div>
    </div>
  );
}

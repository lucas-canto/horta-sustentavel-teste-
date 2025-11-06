import { ONGsAlimentaçãoCuritiba } from "@/hooks/ongList";
import { HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OngsScreen() {
  const navigate = useNavigate();
  return (
    <div className="px-10 flex flex-col gap-5">
      <div className="flex flex-col  items-center">
        <div className="text-green-500 text-xl font-semibold flex flex-col items-center mt-7">
          <HeartHandshake size={40} />
          <p>Lista de ONG's</p>
        </div>
        <p className="text-slate-400">
          Segue abaixo a lista de algumas ongs que possa entrar em contato
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-3">
        {ONGsAlimentaçãoCuritiba.map((ong, i) => (
          <div className="border rounded-sm flex flex-col justify-between border-green-500 p-3 min-h-[300px]">
            <div className="gap-3 flex flex-col pb-5">
              <div>
                <p className="text-lg font-semibold text-green-600"> {ong.titulo}</p>
                <p className="text-sm text-slate-500">{ong.subtitulo}</p>
              </div>

              <div className="flex gap-2 flex-col">
                <p>
                  {" "}
                  <span className="font-semibold text-green-600">
                    Telefone:
                  </span>{" "}
                  {ong.contatotelefone}
                </p>
                <span>
                  {" "}
                  <span className="font-semibold text-green-600">
                    {" "}
                    Horario de funcionamento:
                  </span>{" "}
                  {ong.horarioFuncionamento}
                </span>
              </div>
            </div>

            <a href={ong.site} target="_blank" className="w-full bg-green-600 p-2 text-center rounded-sm hover:bg-green-500 text-white">
              Acessar site
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

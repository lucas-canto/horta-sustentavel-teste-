import { GetEstoque } from "@/service/getEstoque";
import { GetHorta } from "@/service/getHorta";
import { useMutation } from "@tanstack/react-query";
import { Building, RefreshCw, Sprout } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cardhorta } from "./components/cardHorta";

export function ViewUser() {
  const { id } = useParams<{ id: string }>();

  // 🔹 Busca os dados da horta
  const {
    mutate: MutateGetHorta,
    data: DataHorta,
    isPending: isPendingHorta,
  } = useMutation({
    mutationFn: GetHorta,
  });

  // 🔹 Busca o estoque do produtor
  const {
    mutate: MutateGetEstoque,
    data: DataEstoque,
    isPending: isPendingEstoque,
  } = useMutation({
    mutationFn: GetEstoque,
  });

  useEffect(() => {
    if (id) {
      MutateGetHorta({ id_produtor: id.toString() });
      MutateGetEstoque({ id_produtor: Number(id) });
    }
  }, [id]);

  const horta = DataHorta?.horta;
  const produtos = DataEstoque?.horta?.produtos || [];

  return (
    <div className="min-h-screen bg-background px-10 pt-3">
      <div className="flex flex-col items-center text-3xl font-bold">
        <div className="p-3 bg-green-600 rounded-full">
          <Building className="text-white" />
        </div>
        <h1>{horta?.nome}</h1>
      </div>

      {/* Card da horta */}
      {isPendingHorta ? (
        <div className="flex justify-center mt-10">
          <RefreshCw className="animate-spin text-green-600" size={30} />
        </div>
      ) : horta ? (
        <div className="flex justify-center mt-6">
          <Cardhorta data={horta}  JustView/>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Nenhuma horta encontrada para este produtor.
        </p>
      )}

      {/* Estoque */}
      <div className="mx-auto w-full mt-10">
        <div className="text-green-600 text-lg flex flex-col items-center mb-3">
          <Sprout />
          <p className="font-bold">Estoque de Produtos</p>
        </div>

        {isPendingEstoque ? (
          <div className="flex justify-center mt-5">
            <RefreshCw className="animate-spin text-green-600" size={30} />
          </div>
        ) : (
          <div className="flex gap-3 max-sm:flex-col w-full shadow-xl p-10 rounded-md">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[650px]">
              {produtos.length > 0 ? (
                produtos.map((data: any, i: number) => (
                  <div
                    key={i}
                    className="bg-green-500 hover:bg-green-600 transition-all justify-between flex flex-col text-white flex-shrink-0 max-h-[200px] p-2 rounded-lg"
                  >
                    <div>
                      <p className="text-xl font-semibold">
                        {data.nm_produto}
                      </p>
                      <p className="text-sm">
                        {data.ds_quantidade} {data.unidade_medida_padrao}
                      </p>
                    </div>
                    <div>
                      <p>{data.descricao}</p>
                    </div>
                    <div className="border-t mt-3 pt-3">
                      <p className="text-sm">
                        Última colheita: {data.dt_colheita}
                      </p>
                      <p className="text-sm">
                        Último plantio: {data.dt_plantio}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  Nenhum produto encontrado nesta horta.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
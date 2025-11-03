import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { PostEditEstoque } from "@/service/DelProd";
import { PostAddEstoque } from "@/service/postAdd";
import { PostDeleteProduto } from "@/service/postDeleteProd";
import { PostSaidaEstoque } from "@/service/PostSaidaEstoque";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const EditSchema = z.object({
  nm_produto: z.string().min(1, "Nome obrigatório"),
  descricao: z.string().optional(),
  unidade_medida_padrao: z.enum(["kg", "unidade"]),
  dt_plantio: z.string().optional(),
  dt_colheita: z.string().optional(),
});

type EditForm = z.infer<typeof EditSchema>;

export function ProductDialogContent({
  product,
  onSuccess,
}: {
  product: any;
  token: string;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { token } = useAuth();

  // ===============================
  // FORM DE EDIÇÃO
  // ===============================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      nm_produto: product.nm_produto ?? "",
      descricao: product.descricao ?? "",
      unidade_medida_padrao: product.unidade_medida_padrao ?? "kg",
      dt_plantio: product.dt_plantio ?? "",
      dt_colheita: product.dt_colheita ?? "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: PostEditEstoque,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Produto atualizado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["Horta"] });
      onSuccess?.();
    },
    onError: (err: any) => {
      toast({
        title: "Erro!",
        description: err?.response?.data?.mensagem ?? err.message,
      });
    },
  });

  // ===============================
  // FORM DE SAÍDA
  // ===============================
  const saidaMutation = useMutation({
    mutationFn: PostSaidaEstoque,
    onSuccess: () => {
      toast({
        title: "Saída registrada!",
        description: "Saída realizada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["Horta"] });
      onSuccess?.();
    },
    onError: (err: any) => {
      toast({
        title: "Erro!",
        description: err?.response?.data?.mensagem ?? err.message,
      });
    },
  });

  const { register: regSaida, handleSubmit: handleSaida } = useForm<{
    quantidade: number;
    motivo: string;
  }>({
    defaultValues: { quantidade: 1, motivo: "venda" },
  });

  const onSaida = (values: { quantidade: number; motivo: string }) => {
    if (values.quantidade <= 0) {
      toast({
        title: "Erro!",
        description: "Quantidade deve ser maior que zero.",
      });
      return;
    }

    saidaMutation.mutate({
      token,
      id_produto: product.id_produto,
      quantidade: values.quantidade,
      motivo: values.motivo,
    });
  };

  // ===============================
  // FORM DE ENTRADA (nova seção)
  // ===============================
  const entradaMutation = useMutation({
    mutationFn: PostAddEstoque,
    onSuccess: () => {
      toast({
        title: "Entrada registrada!",
        description: "Entrada realizada com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["Horta"] });
      onSuccess?.();
    },
    onError: (err: any) => {
      toast({
        title: "Erro!",
        description: err?.response?.data?.mensagem ?? err.message,
      });
      console.log(entradaMutation.variables);
    },
  });

  const {
    register: regEntrada,
    handleSubmit: handleEntrada,
    reset: resetEntrada,
  } = useForm<{ quantidade: number; motivo: string }>({
    defaultValues: { quantidade: 1, motivo: "reposição" },
  });

  const onEntrada = (values: { quantidade: number; motivo: string }) => {
    if (values.quantidade <= 0) {
      toast({
        title: "Erro!",
        description: "Quantidade deve ser maior que zero.",
      });
      return;
    }

    entradaMutation.mutate({
      token,
      quantidade: values.quantidade,
      motivo: values.motivo,
      descricao_produto: product.descricao,
      dt_colheita: product.dt_colheita,
      dt_plantio: product.dt_plantio,
      nome_produto: product.nm_produto,
      unidade: product.medida,
    });

    resetEntrada();
  };

  // ===============================
  // DELETAR PRODUTO
  // ===============================
  const deleteMutation = useMutation({
    mutationFn: PostDeleteProduto,
    onSuccess: () => {
      toast({
        title: "Removido!",
        description: "Produto excluído com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["Horta"] });
      onSuccess?.();
    },
    onError: (err: any) => {
      toast({
        title: "Erro!",
        description: err?.response?.data?.mensagem ?? err.message,
      });
    },
  });

  const onDelete = () => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    deleteMutation.mutate({
      token,
      id_produto: product.id_produto,
    });
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="flex flex-col max-h-[600px] overflow-y-auto gap-4">
      <h2 className="text-lg font-semibold">Editar produto / estoque</h2>

      {/* Formulário de edição */}
      <form
        onSubmit={handleSubmit((values) =>
          updateMutation.mutate({
            token,
            id_produto: product.id_produto,
            descricao_produto: values.descricao,
            dt_colheita: values.dt_colheita,
            dt_plantio: values.dt_plantio,
            nome_produto: values.nm_produto,
            unidade: values.unidade_medida_padrao,
          })
        )}
        className="flex flex-col gap-3 border p-3 rounded-md"
      >
        <label className="flex flex-col">
          Nome
          <input {...register("nm_produto")} className="border rounded p-2" />
          {errors.nm_produto && (
            <span className="text-red-500 text-sm">
              {errors.nm_produto.message}
            </span>
          )}
        </label>

        <label className="flex flex-col">
          Descrição
          <input {...register("descricao")} className="border rounded p-2" />
        </label>

        <label className="flex flex-col">
          Unidade
          <select
            {...register("unidade_medida_padrao")}
            className="border rounded p-2"
          >
            <option value="kg">Kg</option>
            <option value="unidade">Unidade</option>
          </select>
        </label>

        <label className="flex flex-col">
          Data de plantio
          <input
            type="date"
            {...register("dt_plantio")}
            className="border rounded p-2"
          />
        </label>

        <label className="flex flex-col">
          Data da colheita
          <input
            type="date"
            {...register("dt_colheita")}
            className="border rounded p-2"
          />
        </label>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {updateMutation.isPending ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>

      {/* Seção de entrada */}
      <div className="border p-3 rounded-md space-y-3">
        <h3 className="font-semibold">Registrar entrada</h3>
        <form
          onSubmit={handleEntrada(onEntrada)}
          className="flex flex-col gap-3"
        >
          <label className="flex flex-col">
            Quantidade
            <input
              type="number"
              {...regEntrada("quantidade")}
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col">
            Motivo
            <select {...regEntrada("motivo")} className="border rounded p-2">
              <option value="reposição">Reposição</option>
              <option value="colheita">Colheita</option>
              <option value="ajuste">Ajuste de estoque</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={entradaMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            {entradaMutation.isPending ? "Registrando..." : "Registrar entrada"}
          </button>
        </form>
      </div>

      {/* Seção de saída */}
      <div className="border p-3 rounded-md space-y-3">
        <h3 className="font-semibold">Registrar saída</h3>
        <form onSubmit={handleSaida(onSaida)} className="flex flex-col gap-3">
          <label className="flex flex-col">
            Quantidade
            <input
              type="number"
              {...regSaida("quantidade")}
              className="border rounded p-2"
            />
          </label>

          <label className="flex flex-col">
            Motivo
            <select {...regSaida("motivo")} className="border rounded p-2">
              <option value="venda">Venda</option>
              <option value="consumo">Consumo</option>
              <option value="perda/disperdicio">Perda/Desperdício</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={saidaMutation.isPending}
            className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded"
          >
            {saidaMutation.isPending ? "Registrando..." : "Registrar saída"}
          </button>
        </form>
      </div>

      {/* Botão de exclusão */}
      <button
        onClick={onDelete}
        disabled={deleteMutation.isPending}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
      >
        {deleteMutation.isPending ? "Excluindo..." : "Excluir produto"}
      </button>
    </div>
  );
}

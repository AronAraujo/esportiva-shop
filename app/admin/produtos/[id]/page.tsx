import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProdutoForm } from "@/components/ProdutoForm";
import { updateProdutoAction } from "../../actions";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await prisma.produto.findUnique({ where: { id } });

  if (!produto) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateProdutoAction(id, formData);
  };

  return (
    <div>
      <h1 className="mb-4 font-display text-xl font-semibold text-ink">
        Editar produto
      </h1>
      <ProdutoForm
        action={action}
        textoBotao="Salvar alterações"
        valoresIniciais={{
          nome: produto.nome,
          time: produto.time,
          liga: produto.liga,
          categoria: produto.categoria,
          imagens: JSON.parse(produto.imagens),
          tamanhos: JSON.parse(produto.tamanhos),
          precoVenda: produto.precoVenda,
          custoNacional: produto.custoNacional,
          custoInternacional: produto.custoInternacional,
          disponivelNacional: produto.disponivelNacional,
          ativo: produto.ativo,
        }}
      />
    </div>
  );
}

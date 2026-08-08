import { ProdutoForm } from "@/components/ProdutoForm";
import { createProdutoAction } from "../../actions";

export default function NovoProdutoPage() {
  return (
    <div>
      <h1 className="mb-4 font-display text-xl font-semibold text-ink">Novo produto</h1>
      <ProdutoForm action={createProdutoAction} textoBotao="Cadastrar produto" />
    </div>
  );
}

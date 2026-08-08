import { ProductCard, ProdutoCard } from "./ProductCard";

export function ProductGrid({
  produtos,
  whatsappNumero,
}: {
  produtos: ProdutoCard[];
  whatsappNumero: string;
}) {
  if (produtos.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="font-display text-lg text-thread-dark">
          Nenhuma camisa encontrada com esse filtro.
        </p>
        <p className="mt-1 text-sm text-thread-dark/70">
          Tenta tirar o filtro de entrega rápida ou buscar por outro time.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3 xl:grid-cols-6">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} whatsappNumero={whatsappNumero} />
      ))}
    </div>
  );
}

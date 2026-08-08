export function formatPrecoAPartirDe(valor: number) {
  const formatado = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `A partir ${formatado}`;
}

/**
 * Selos de confiança exibidos entre o banner e o catálogo.
 * Pra adicionar/trocar um, é só editar esse array — o layout se ajusta sozinho.
 */
export type Selo = {
  id: string;
  icone: string; // emoji, simples de trocar sem precisar de biblioteca de ícones
  texto: string;
};

export const SELOS: Selo[] = [
  { id: "frete", icone: "🚚", texto: "Frete grátis" },
  { id: "parcelamento", icone: "💳", texto: "Até 12x no cartão" },
  { id: "personalizacao", icone: "🧵", texto: "Personalizamos nome e número" },
  { id: "tempo-mercado", icone: "🏆", texto: "Desde 2023" },
];
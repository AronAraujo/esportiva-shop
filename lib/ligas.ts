/**
 * Lista fixa de ligas/categorias usadas pro filtro do menu e pro
 * cadastro de produto. Editar aqui muda em todo o site de uma vez.
 */
export const LIGAS = [
  "Brasileirão",
  "Bundesliga",
  "La Liga",
  "Ligue 1",
  "Premier League",
  "Serie A",
  "Outros Times",
  "Seleções",
] as const;

export type Liga = (typeof LIGAS)[number];

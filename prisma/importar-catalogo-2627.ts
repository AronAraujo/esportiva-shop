/**
 * Script de importação em massa das camisas 26/27 (torcedor).
 * Roda UMA VEZ com: npx tsx prisma/importar-catalogo-2627.ts
 *
 * Se rodar de novo por engano, vai duplicar os produtos — nesse caso
 * é só apagar os duplicados pelo admin.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Preços variando entre 99,9 e 109,9 pra não ficar tudo idêntico.
const PRECOS = [99.9, 104.9, 109.9];
function precoPara(indice: number) {
  return PRECOS[indice % PRECOS.length];
}

const TAMANHOS_PADRAO = ["P", "M", "G", "GG"];

type TimesPorLiga = { liga: string; times: string[] };

// Base: cada time gera "Time I 26/27" e "Time II 26/27"
const CATALOGO_BASE: TimesPorLiga[] = [
  {
    liga: "Brasileirão",
    times: [
      "Flamengo", "Palmeiras", "Corinthians", "São Paulo", "Santos",
      "Internacional", "Grêmio", "Atlético Mineiro", "Cruzeiro",
      "Fluminense", "Vasco da Gama", "Botafogo", "Bahia",
    ],
  },
  {
    liga: "Bundesliga",
    times: [
      "Bayern de Munique", "Borussia Dortmund", "Bayer Leverkusen",
      "RB Leipzig", "Wolfsburg", "Borussia Mönchengladbach",
    ],
  },
  {
    liga: "La Liga",
    times: [
      "Real Madrid", "Barcelona", "Atlético de Madrid", "Sevilla",
      "Valencia", "Real Betis", "Real Sociedad", "Villarreal",
    ],
  },
  {
    liga: "Ligue 1",
    times: [
      "Paris Saint-Germain", "Olympique de Marseille", "Olympique Lyonnais",
      "AS Monaco", "Lille", "RC Lens", "Nice",
    ],
  },
  {
    liga: "Premier League",
    times: [
      "Manchester United", "Manchester City", "Liverpool", "Arsenal",
      "Chelsea", "Tottenham", "Newcastle United", "Aston Villa",
    ],
  },
  {
    liga: "Serie A",
    times: [
      "Juventus", "Inter de Milão", "Milan", "Napoli", "Roma", "Lazio",
      "Atalanta",
    ],
  },
  {
    liga: "Seleções",
    times: [
      "Brasil", "Argentina", "Portugal", "França", "Espanha", "Alemanha",
      "Inglaterra", "Itália", "Holanda", "Bélgica", "Croácia", "Uruguai",
      "México", "Estados Unidos", "Japão",
    ],
  },
  {
    liga: "Outros Times",
    times: [
      "Al Nassr", "Al Hilal", "Ajax", "PSV Eindhoven", "Feyenoord",
      "Galatasaray", "Fenerbahçe", "Beşiktaş", "Olympiacos", "Inter Miami",
      "Sporting CP", "Benfica", "Porto", "Celtic", "Rangers", "Club América",
      "Boca Juniors", "River Plate", "Al Ittihad", "Shakhtar Donetsk",
      "Red Bull Salzburg", "Dinamo Zagreb", "Zenit",
    ],
  },
];

// Nomes exatos (Time + "I"/"II" + temporada) que estavam na lista de
// "pronta entrega" e batem com um item do catálogo base acima.
const NOMES_COM_PRONTA_ENTREGA = new Set([
  "Atlético Mineiro I 26/27",
  "Argentina I 26/27",
  "Arsenal I 26/27",
  "Arsenal II 26/27",
  "Bahia I 26/27",
  "Barcelona I 26/27",
  "Bayern de Munique I 26/27",
  "Borussia Dortmund I 26/27",
  "Brasil I 26/27",
  "Brasil II 26/27",
  "Corinthians I 26/27",
  "Corinthians II 26/27",
  "Cruzeiro I 26/27",
  "Espanha II 26/27",
  "Flamengo I 26/27",
  "Flamengo II 26/27",
  "Fluminense I 26/27",
  "Fluminense II 26/27",
  "França II 26/27",
  "Internacional I 26/27",
  "Japão I 26/27",
  "Liverpool I 26/27",
  "Manchester City I 26/27",
  "Manchester United I 26/27",
  "Palmeiras I 26/27",
  "Palmeiras II 26/27",
  "Real Madrid I 26/27",
  "Santos II 26/27",
  "São Paulo II 26/27",
  "Vasco da Gama I 26/27",
  "Vasco da Gama II 26/27",
]);

// Produtos que só existiam na 2ª lista (variação, temporada diferente,
// feminino, treino, edição especial, retrô) — todos com pronta entrega.
const PRODUTOS_EXTRAS: { nome: string; liga: string; categoria?: string }[] = [
  { nome: "Atlético Mineiro Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Bahia Listrada I 25/26", liga: "Brasileirão" },
  { nome: "Barcelona Edição Especial 26/27", liga: "La Liga" },
  { nome: "Brasil Feminina I 26/27", liga: "Seleções" },
  { nome: "Brasil Feminina II 26/27", liga: "Seleções" },
  { nome: "Brasil Jogador I 26/27", liga: "Seleções", categoria: "jogador" },
  { nome: "Brasil Retrô 1998", liga: "Seleções" },
  { nome: "Brasil Retrô 2004", liga: "Seleções" },
  { nome: "Corinthians Pré-Jogo 26/27", liga: "Brasileirão" },
  { nome: "Corinthians Treino Vinho 26/27", liga: "Brasileirão" },
  { nome: "Cruzeiro Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Cruzeiro Treino Azul Marinho 26/27", liga: "Brasileirão" },
  { nome: "Cruzeiro Treino Azul Royal Competition 26/27", liga: "Brasileirão" },
  { nome: "Flamengo Edição Especial 25/26", liga: "Brasileirão" },
  { nome: "Flamengo Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Flamengo Feminina II 26/27", liga: "Brasileirão" },
  { nome: "Flamengo Feminina III 25/26", liga: "Brasileirão" },
  { nome: "Flamengo Treino Bege 26/27", liga: "Brasileirão" },
  { nome: "Flamengo Treino Marrom 26/27", liga: "Brasileirão" },
  { nome: "Fluminense Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Fluminense Feminina II 26/27", liga: "Brasileirão" },
  { nome: "Fluminense Treino Azul 26/27", liga: "Brasileirão" },
  { nome: "Grêmio Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Grêmio Pampa III 25/26", liga: "Brasileirão" },
  { nome: "Jamaica I 26/27", liga: "Seleções" },
  { nome: "Jamaica II 26/27", liga: "Seleções" },
  { nome: "Palmeiras Feminina I 26/27", liga: "Brasileirão" },
  { nome: "Palmeiras Feminina II 26/27", liga: "Brasileirão" },
  { nome: "Paris Saint-Germain I 25/26", liga: "Ligue 1" },
  { nome: "Real Madrid I 25/26", liga: "La Liga" },
  { nome: "Real Madrid II 25/26", liga: "La Liga" },
  { nome: "Real Madrid III 25/26", liga: "La Liga" },
  { nome: "São Paulo Feminina I 26/27", liga: "Brasileirão" },
];

async function main() {
  let contador = 0;

  for (const grupo of CATALOGO_BASE) {
    for (const time of grupo.times) {
      for (const numero of ["I", "II"]) {
        const nome = `${time} ${numero} 26/27`;
        await prisma.produto.create({
          data: {
            nome,
            time,
            liga: grupo.liga,
            categoria: "torcedor",
            imagens: "[]",
            tamanhos: JSON.stringify(TAMANHOS_PADRAO),
            precoVenda: precoPara(contador),
            disponivelNacional: NOMES_COM_PRONTA_ENTREGA.has(nome),
            ativo: true,
          },
        });
        contador++;
      }
    }
  }

  for (const extra of PRODUTOS_EXTRAS) {
    await prisma.produto.create({
      data: {
        nome: extra.nome,
        time: extra.nome.split(" ")[0],
        liga: extra.liga,
        categoria: extra.categoria ?? "torcedor",
        imagens: "[]",
        tamanhos: JSON.stringify(TAMANHOS_PADRAO),
        precoVenda: precoPara(contador),
        disponivelNacional: true,
        ativo: true,
      },
    });
    contador++;
  }

  console.log(`Importação concluída: ${contador} produtos criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
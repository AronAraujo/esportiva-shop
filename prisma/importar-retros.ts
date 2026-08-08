/**
 * Adiciona camisas retrô famosas ao catálogo (categoria "retro").
 * Roda UMA VEZ com: npx tsx prisma/importar-retros.ts
 * Não mexe nos produtos que já existem, só cria novos.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRECOS = [129.9, 149.9];
function precoPara(indice: number) {
  return PRECOS[indice % PRECOS.length];
}

const TAMANHOS_PADRAO = ["P", "M", "G", "GG"];

const RETROS: { nome: string; time: string; liga: string }[] = [
  // Seleções (só os mais icônicos)
  { nome: "Brasil Retrô Copa 1970", time: "Brasil", liga: "Seleções" },
  { nome: "Brasil Retrô Copa 1994", time: "Brasil", liga: "Seleções" },
  { nome: "Brasil Retrô Copa 2002", time: "Brasil", liga: "Seleções" },
  { nome: "Argentina Retrô Copa 1986", time: "Argentina", liga: "Seleções" },
  { nome: "França Retrô Copa 1998", time: "França", liga: "Seleções" },

  // Era dos craques (Cristiano, Messi, Neymar)
  { nome: "Manchester United Retrô CR7 2007/08", time: "Manchester United", liga: "Premier League" },
  { nome: "Real Madrid Retrô CR7 2013/14", time: "Real Madrid", liga: "La Liga" },
  { nome: "Juventus Retrô CR7 2018/19", time: "Juventus", liga: "Serie A" },
  { nome: "Barcelona Retrô Messi 2008/09", time: "Barcelona", liga: "La Liga" },
  { nome: "Barcelona Retrô MSN 2014/15", time: "Barcelona", liga: "La Liga" },
  { nome: "Paris Saint-Germain Retrô Neymar 2017/18", time: "Paris Saint-Germain", liga: "Ligue 1" },
  { nome: "Santos Retrô Neymar 2011", time: "Santos", liga: "Brasileirão" },

  // Brasileirão clássicos
  { nome: "Flamengo Retrô Mundial 1981", time: "Flamengo", liga: "Brasileirão" },
  { nome: "Corinthians Retrô 1990", time: "Corinthians", liga: "Brasileirão" },
  { nome: "São Paulo Retrô Mundial 1992", time: "São Paulo", liga: "Brasileirão" },
  { nome: "Grêmio Retrô Libertadores 1983", time: "Grêmio", liga: "Brasileirão" },
  { nome: "Palmeiras Retrô Libertadores 1999", time: "Palmeiras", liga: "Brasileirão" },
  { nome: "Vasco da Gama Retrô Libertadores 1998", time: "Vasco da Gama", liga: "Brasileirão" },

  // Outros clubes icônicos
  { nome: "Boca Juniors Retrô Anos 80", time: "Boca Juniors", liga: "Outros Times" },
  { nome: "River Plate Retrô Anos 80", time: "River Plate", liga: "Outros Times" },
  { nome: "Manchester United Retrô Treble 1999", time: "Manchester United", liga: "Premier League" },
  { nome: "Liverpool Retrô Anos 80", time: "Liverpool", liga: "Premier League" },
  { nome: "Milan Retrô Anos 90", time: "Milan", liga: "Serie A" },
  { nome: "Milan Retrô Kaká 2006/07", time: "Milan", liga: "Serie A" },
  { nome: "Arsenal Retrô Henry 2005/06", time: "Arsenal", liga: "Premier League" },
  { nome: "Fiorentina Retrô Nintendo 1998/99", time: "Fiorentina", liga: "Outros Times" },

  // La Liga
  { nome: "Real Madrid Retrô Galácticos 2002", time: "Real Madrid", liga: "La Liga" },
  { nome: "Barcelona Retrô Dream Team 1992", time: "Barcelona", liga: "La Liga" },
  { nome: "Real Betis Retrô Denilson 1998", time: "Real Betis", liga: "La Liga" },
];

async function main() {
  let contador = 0;

  for (const retro of RETROS) {
    await prisma.produto.create({
      data: {
        nome: retro.nome,
        time: retro.time,
        liga: retro.liga,
        categoria: "retro",
        imagens: "[]",
        tamanhos: JSON.stringify(TAMANHOS_PADRAO),
        precoVenda: precoPara(contador),
        disponivelNacional: false,
        ativo: true,
      },
    });
    contador++;
  }

  console.log(`Importação concluída: ${contador} camisas retrô criadas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
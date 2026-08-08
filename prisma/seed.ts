import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.configLoja.upsert({
    where: { id: "config-unica" },
    update: {},
    create: {
      id: "config-unica",
      whatsappNumero: "5511999999999", // TROQUE pelo número real da loja
      freteNacional: 30,
      freteInternacional: 0,
      prazoNacionalMin: 5,
      prazoNacionalMax: 10,
      prazoInternMin: 20,
      prazoInternMax: 40,
      avisoPrazo: "",
    },
  });

  const produtosExemplo = [
    {
      nome: "Flamengo 24/25 Home",
      time: "Flamengo",
      liga: "Brasileirão",
      categoria: "torcedor",
      imagens: ["https://placehold.co/600x800/16371F/F7F5EF?text=Flamengo"],
      tamanhos: ["P", "M", "G", "GG"],
      precoVenda: 99.9,
      custoNacional: 85,
      custoInternacional: 10,
      disponivelNacional: true,
    },
    {
      nome: "Real Madrid 24/25 Home",
      time: "Real Madrid",
      liga: "La Liga",
      categoria: "jogador",
      imagens: ["https://placehold.co/600x800/16371F/F7F5EF?text=Real+Madrid"],
      tamanhos: ["M", "G", "GG"],
      precoVenda: 129.9,
      custoNacional: null,
      custoInternacional: 10,
      disponivelNacional: false,
    },
    {
      nome: "Corinthians 24/25 Home",
      time: "Corinthians",
      liga: "Brasileirão",
      categoria: "torcedor",
      imagens: ["https://placehold.co/600x800/16371F/F7F5EF?text=Corinthians"],
      tamanhos: ["P", "M", "G"],
      precoVenda: 99.9,
      custoNacional: 90,
      custoInternacional: 10,
      disponivelNacional: true,
    },
    {
      nome: "Arsenal 24/25 Away",
      time: "Arsenal",
      liga: "Premier League",
      categoria: "torcedor",
      imagens: ["https://placehold.co/600x800/16371F/F7F5EF?text=Arsenal"],
      tamanhos: ["M", "G", "GG"],
      precoVenda: 109.9,
      custoNacional: null,
      custoInternacional: 10,
      disponivelNacional: false,
    },
  ];

  for (const p of produtosExemplo) {
    await prisma.produto.create({
      data: {
        ...p,
        imagens: JSON.stringify(p.imagens),
        tamanhos: JSON.stringify(p.tamanhos),
      },
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

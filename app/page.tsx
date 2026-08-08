import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { BannerCarousel } from "@/components/BannerCarousel";
import { TrustBadges } from "@/components/TrustBadges";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { BANNERS } from "@/lib/banners";
import type { ProdutoCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const PRODUTOS_POR_PAGINA = 30;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    rapido?: string;
    busca?: string;
    liga?: string;
    pagina?: string;
  }>;
}) {
  const { rapido, busca, liga, pagina } = await searchParams;
  const rapidoAtivo = rapido === "1";
  const paginaAtual = Math.max(1, Number(pagina) || 1);

  const config = await prisma.configLoja.findFirst();
  const whatsappNumero = config?.whatsappNumero ?? "5500000000000";

  const where = {
    ativo: true,
    ...(rapidoAtivo ? { disponivelNacional: true } : {}),
    ...(liga ? { liga } : {}),
    ...(busca
      ? {
          OR: [
            { time: { contains: busca } },
            { nome: { contains: busca } },
            { categoria: { contains: busca } },
            { liga: { contains: busca } },
          ],
        }
      : {}),
  };

  const totalProdutos = await prisma.produto.count({ where });
  const totalPaginas = Math.max(1, Math.ceil(totalProdutos / PRODUTOS_POR_PAGINA));

  const produtosDb = await prisma.produto.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (paginaAtual - 1) * PRODUTOS_POR_PAGINA,
    take: PRODUTOS_POR_PAGINA,
  });

  const produtos: ProdutoCard[] = produtosDb.map((p) => ({
    id: p.id,
    nome: p.nome,
    time: p.time,
    categoria: p.categoria,
    imagens: JSON.parse(p.imagens) as string[],
    precoVenda: p.precoVenda,
    disponivelNacional: p.disponivelNacional,
    tamanhos: JSON.parse(p.tamanhos) as string[],
  }));

  return (
    <main className="min-h-screen bg-chalk">
      <Header ligaAtiva={liga} buscaAtual={busca} rapidoAtual={rapido} />

      <BannerCarousel banners={BANNERS} />

      <TrustBadges />

      <section className="border-b border-thread-dark/10 bg-pitch-2/5 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-grass">
            Enviamos pra todo o Brasil
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Camisa de time com preço combinado no zap
          </h1>
          <p className="mt-2 max-w-xl text-sm text-thread-dark">
            Escolhe a camisa, confere o tamanho e clica em consultar — a gente
            fecha o preço final e o prazo direto com você.
          </p>
        </div>
      </section>

      <FilterBar rapidoAtivo={rapidoAtivo} buscaAtual={busca} ligaAtual={liga} />
      <ProductGrid produtos={produtos} whatsappNumero={whatsappNumero} />

      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        liga={liga}
        busca={busca}
        rapido={rapido}
      />

      <Footer whatsappNumero={whatsappNumero} />
    </main>
  );
}
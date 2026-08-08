import { BadgeRapido } from "./Badge";
import { WhatsappButton } from "./WhatsappButton";
import { ProductGallery } from "./ProductGallery";
import { formatPrecoAPartirDe } from "@/lib/format";

export type ProdutoCard = {
  id: string;
  nome: string;
  time: string;
  categoria: string;
  imagens: string[];
  precoVenda: number;
  disponivelNacional: boolean;
  tamanhos: string[];
};

export function ProductCard({
  produto,
  whatsappNumero,
}: {
  produto: ProdutoCard;
  whatsappNumero: string;
}) {
  return (
    <div className="tag-hover relative rounded-lg bg-chalk shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
      {produto.disponivelNacional && <BadgeRapido />}

      {/* "furo" de etiqueta no canto, estilo hangtag
      <div className="absolute left-4 top-3 z-10 h-3 w-3 rounded-full bg-chalk ring-2 ring-thread" /> */}

      <ProductGallery imagens={produto.imagens} alt={produto.nome} />

      {/* perfuração estilo ticket entre a foto e as infos */}
      <div className="stitch mx-3" />

      <div className="p-3">
        <p className="font-display text-[11px] uppercase tracking-wider text-thread-dark">
          {produto.time} · {produto.categoria}
        </p>
        <h3 className="mt-0.5 font-display text-base font-medium leading-tight text-ink">
          {produto.nome}
        </h3>

        <p className="mt-2 font-display text-lg font-semibold text-pitch">
          {formatPrecoAPartirDe(produto.precoVenda)}
        </p>

        <WhatsappButton
          numero={whatsappNumero}
          produtoNome={produto.nome}
          className="mt-3 w-full"
        />
      </div>
    </div>
  );
}
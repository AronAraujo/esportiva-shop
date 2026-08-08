import Link from "next/link";

export function FilterBar({
  rapidoAtivo,
  buscaAtual,
  ligaAtual,
}: {
  rapidoAtivo: boolean;
  buscaAtual?: string;
  ligaAtual?: string;
}) {
  const paramsBase = new URLSearchParams();
  if (buscaAtual) paramsBase.set("busca", buscaAtual);
  if (ligaAtual) paramsBase.set("liga", ligaAtual);

  const paramsOff = new URLSearchParams(paramsBase);
  const paramsOn = new URLSearchParams(paramsBase);
  paramsOn.set("rapido", "1");

  // link pra limpar só o filtro de liga, mantendo busca e "entrega rápida"
  const paramsSemLiga = new URLSearchParams();
  if (buscaAtual) paramsSemLiga.set("busca", buscaAtual);
  if (rapidoAtivo) paramsSemLiga.set("rapido", "1");

  return (
    <div id="catalogo" className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
      {ligaAtual && (
        <Link
          href={`/?${paramsSemLiga.toString()}`}
          className="flex items-center gap-2 rounded-full bg-pitch px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-chalk hover:bg-pitch-2"
        >
          {ligaAtual}
          <span aria-hidden className="text-chalk-2">×</span>
        </Link>
      )}
      <Link
        href={`/?${paramsOff.toString()}`}
        className={`rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
          !rapidoAtivo
            ? "bg-pitch-2 text-chalk"
            : "bg-chalk-2 text-thread-dark hover:bg-chalk-2/70"
        }`}
      >
        Todo o catálogo
      </Link>
      <Link
        href={`/?${paramsOn.toString()}`}
        className={`rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
          rapidoAtivo
            ? "bg-grass text-chalk"
            : "bg-chalk-2 text-thread-dark hover:bg-chalk-2/70"
        }`}
      >
        ⚡ Só entrega rápida (Brasil)
      </Link>
    </div>
  );
}
import Link from "next/link";

function buildHref(params: {
  liga?: string;
  busca?: string;
  rapido?: string;
  pagina: number;
}) {
  const sp = new URLSearchParams();
  if (params.busca) sp.set("busca", params.busca);
  if (params.liga) sp.set("liga", params.liga);
  if (params.rapido) sp.set("rapido", params.rapido);
  if (params.pagina > 1) sp.set("pagina", String(params.pagina));
  const query = sp.toString();
  return query ? `/?${query}` : "/";
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  liga,
  busca,
  rapido,
}: {
  paginaAtual: number;
  totalPaginas: number;
  liga?: string;
  busca?: string;
  rapido?: string;
}) {
  if (totalPaginas <= 1) return null;

  const paginaAnterior = Math.max(1, paginaAtual - 1);
  const proximaPagina = Math.min(totalPaginas, paginaAtual + 1);

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 pb-16">
      <Link
        href={buildHref({ liga, busca, rapido, pagina: paginaAnterior })}
        aria-disabled={paginaAtual === 1}
        className={`rounded-md px-3 py-2 font-display text-sm ${
          paginaAtual === 1
            ? "pointer-events-none text-thread-dark/40"
            : "text-thread-dark hover:bg-chalk-2"
        }`}
      >
        ‹ Anterior
      </Link>

      <span className="px-3 font-display text-sm text-thread-dark">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <Link
        href={buildHref({ liga, busca, rapido, pagina: proximaPagina })}
        aria-disabled={paginaAtual === totalPaginas}
        className={`rounded-md px-3 py-2 font-display text-sm ${
          paginaAtual === totalPaginas
            ? "pointer-events-none text-thread-dark/40"
            : "text-thread-dark hover:bg-chalk-2"
        }`}
      >
        Próxima ›
      </Link>
    </nav>
  );
}
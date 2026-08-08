"use client";

import Link from "next/link";
import { useState } from "react";
import { LIGAS } from "@/lib/ligas";

function buildHref(params: {
  liga?: string;
  busca?: string;
  rapido?: string;
}) {
  const sp = new URLSearchParams();
  if (params.busca) sp.set("busca", params.busca);
  if (params.rapido) sp.set("rapido", params.rapido);
  if (params.liga) sp.set("liga", params.liga);
  const query = sp.toString();
  return query ? `/?${query}` : "/";
}

export function CategoriasMenu({
  ligaAtiva,
  buscaAtual,
  rapidoAtual,
}: {
  ligaAtiva?: string;
  buscaAtual?: string;
  rapidoAtual?: string;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-thread-dark/40 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-chalk hover:border-gold hover:text-gold"
      >
        <span aria-hidden>☰</span> Categorias
      </button>

      {aberto && (
        <>
          {/* fundo pra fechar o menu clicando fora */}
          <button
            aria-hidden
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute left-0 z-40 mt-2 w-56 rounded-md bg-chalk py-2 shadow-xl ring-1 ring-black/10">
            <Link
              href={buildHref({ busca: buscaAtual, rapido: rapidoAtual })}
              onClick={() => setAberto(false)}
              className={`block px-4 py-2 font-display text-sm uppercase tracking-wide ${
                !ligaAtiva ? "text-gold-dark" : "text-ink hover:bg-chalk-2"
              }`}
            >
              Todas as ligas
            </Link>
            <div className="my-1 stitch mx-4" />
            {LIGAS.map((liga) => (
              <Link
                key={liga}
                href={buildHref({ liga, busca: buscaAtual, rapido: rapidoAtual })}
                onClick={() => setAberto(false)}
                className={`block px-4 py-2 font-display text-sm uppercase tracking-wide ${
                  ligaAtiva === liga ? "text-gold-dark" : "text-ink hover:bg-chalk-2"
                }`}
              >
                {liga}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

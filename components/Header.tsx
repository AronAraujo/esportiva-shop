import { CategoriasMenu } from "./CategoriasMenu";
import Link from "next/link";
export function Header({
  ligaAtiva,
  buscaAtual,
  rapidoAtual,
}: {
  ligaAtiva?: string;
  buscaAtual?: string;
  rapidoAtual?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-thread-dark/30 bg-pitch">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
         <Link
      href="/"
      className="font-display text-2xl font-bold italic uppercase leading-none tracking-tight"
    >
      <span className="text-gold">Esportiva</span>{" "}
      <span className="text-chalk">Shop</span>
    </Link>
    
        <CategoriasMenu
          ligaAtiva={ligaAtiva}
          buscaAtual={buscaAtual}
          rapidoAtual={rapidoAtual}
        />

        <form action="/" className="ml-2 flex-1">
          {rapidoAtual && (
            <input type="hidden" name="rapido" value={rapidoAtual} />
          )}
          {ligaAtiva && <input type="hidden" name="liga" value={ligaAtiva} />}
          <input
            type="text"
            name="busca"
            defaultValue={buscaAtual}
            placeholder="Busca por time (ex: Flamengo, Real Madrid...)"
            className="w-full rounded-md border border-thread-dark/40 bg-pitch-2 px-4 py-2 text-sm text-chalk placeholder:text-chalk-2/40 focus:border-gold focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProdutoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string }>;
}) {
  const { busca } = await searchParams;

  const produtos = await prisma.produto.findMany({
    where: busca ? { nome: { contains: busca } } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-ink">
          Produtos ({produtos.length})
        </h1>
        <Link
          href="/admin/produtos/novo"
          className="rounded-md bg-gold px-4 py-2 font-display text-sm font-semibold uppercase text-pitch hover:bg-gold-dark"
        >
          + Novo produto
        </Link>
      </div>

      <form action="/admin" className="mt-4 flex gap-2">
        <input
          type="text"
          name="busca"
          defaultValue={busca}
          placeholder="Buscar por nome (ex: Flamengo, Real Madrid...)"
          className="w-full max-w-sm rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-pitch px-4 py-2 font-display text-xs font-semibold uppercase text-chalk hover:bg-pitch-2"
        >
          Buscar
        </button>
        {busca && (
          <Link
            href="/admin"
            className="rounded-md border border-thread px-4 py-2 font-display text-xs font-semibold uppercase text-thread-dark hover:bg-chalk-2"
          >
            Limpar
          </Link>
        )}
      </form>

      <div className="mt-4 overflow-hidden rounded-lg bg-chalk shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-pitch-2/10 text-xs uppercase text-thread-dark">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Liga</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Nacional</th>
              <th className="px-4 py-2">Ativo</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-t border-thread/30">
                <td className="px-4 py-2">{p.nome}</td>
                <td className="px-4 py-2">{p.time}</td>
                <td className="px-4 py-2">{p.liga}</td>
                <td className="px-4 py-2">
                  {p.precoVenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="px-4 py-2">{p.disponivelNacional ? "✅" : "—"}</td>
                <td className="px-4 py-2">{p.ativo ? "✅" : "⏸️"}</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/produtos/${p.id}`}
                    className="mr-3 text-thread-dark underline hover:text-pitch"
                  >
                    Editar
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProdutoAction(p.id);
                    }}
                    className="inline"
                  >
                    <button className="text-red-600 underline hover:text-red-800">
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {produtos.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-thread-dark">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
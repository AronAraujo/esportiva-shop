import Link from "next/link";
import { logoutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-chalk-2">
      <nav className="flex items-center justify-between border-b border-thread bg-pitch px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg font-bold text-chalk">
            Esportiva<span className="text-gold">.</span> admin
          </span>
          <Link href="/admin" className="text-sm text-chalk-2 hover:text-gold">
            Produtos
          </Link>
          <Link href="/admin/configuracoes" className="text-sm text-chalk-2 hover:text-gold">
            Configurações
          </Link>
          <Link href="/" target="_blank" className="text-sm text-chalk-2 hover:text-gold">
            Ver site
          </Link>
        </div>
        <form action={logoutAction}>
          <button className="text-sm text-chalk-2 hover:text-gold">Sair</button>
        </form>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
    </div>
  );
}

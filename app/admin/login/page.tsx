import { loginAction } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-pitch px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-lg bg-chalk p-6 shadow-lg"
      >
        <h1 className="font-display text-xl font-semibold text-ink">
          Entrar no admin
        </h1>
        <p className="mt-1 text-sm text-thread-dark">
          Área restrita — só pra vocês dois editarem o catálogo.
        </p>

        {erro && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            Senha incorreta. Tenta de novo.
          </p>
        )}

        <label className="mt-4 block text-sm font-medium text-ink">
          Senha
          <input
            type="password"
            name="senha"
            required
            autoFocus
            className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-pitch py-2 font-display text-sm font-semibold uppercase tracking-wide text-chalk hover:bg-pitch-2"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

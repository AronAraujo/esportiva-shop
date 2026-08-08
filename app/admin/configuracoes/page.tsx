import { prisma } from "@/lib/prisma";
import { updateConfigAction } from "../actions";

export default async function ConfiguracoesPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const { salvo } = await searchParams;
  const config = await prisma.configLoja.findFirst();

  return (
    <div>
      <h1 className="mb-4 font-display text-xl font-semibold text-ink">
        Configurações da loja
      </h1>

      {salvo && (
        <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Configurações salvas!
        </p>
      )}

      <form action={updateConfigAction} className="max-w-xl space-y-4 rounded-lg bg-chalk p-6 shadow">
        <label className="block text-sm font-medium text-ink">
          Número do WhatsApp (só números, com DDI 55 + DDD)
          <input
            name="whatsappNumero"
            defaultValue={config?.whatsappNumero}
            required
            placeholder="5511999999999"
            className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-ink">
            Frete nacional (R$)
            <input
              type="number"
              step="0.01"
              name="freteNacional"
              defaultValue={config?.freteNacional ?? 30}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Frete internacional (R$)
            <input
              type="number"
              step="0.01"
              name="freteInternacional"
              defaultValue={config?.freteInternacional ?? 0}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-ink">
            Prazo nacional mínimo (dias)
            <input
              type="number"
              name="prazoNacionalMin"
              defaultValue={config?.prazoNacionalMin ?? 5}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Prazo nacional máximo (dias)
            <input
              type="number"
              name="prazoNacionalMax"
              defaultValue={config?.prazoNacionalMax ?? 10}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-ink">
            Prazo internacional mínimo (dias)
            <input
              type="number"
              name="prazoInternMin"
              defaultValue={config?.prazoInternMin ?? 20}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Prazo internacional máximo (dias)
            <input
              type="number"
              name="prazoInternMax"
              defaultValue={config?.prazoInternMax ?? 40}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-ink">
          Aviso de prazo (opcional — some some no site quando vazio)
          <textarea
            name="avisoPrazo"
            defaultValue={config?.avisoPrazo ?? ""}
            rows={2}
            placeholder="Ex: Atenção: por alta demanda, os prazos podem aumentar."
            className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="rounded-md bg-pitch px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide text-chalk hover:bg-pitch-2"
        >
          Salvar configurações
        </button>
      </form>
    </div>
  );
}

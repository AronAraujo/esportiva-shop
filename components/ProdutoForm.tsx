import { LIGAS } from "@/lib/ligas";
import { ImagensManager } from "./ImagensManager";

type ProdutoValores = {
  nome?: string;
  time?: string;
  liga?: string;
  categoria?: string;
  imagens?: string[];
  tamanhos?: string[];
  precoVenda?: number;
  custoNacional?: number | null;
  custoInternacional?: number | null;
  disponivelNacional?: boolean;
  ativo?: boolean;
};

export function ProdutoForm({
  action,
  valoresIniciais,
  textoBotao,
}: {
  action: (formData: FormData) => void;
  valoresIniciais?: ProdutoValores;
  textoBotao: string;
}) {
  const v = valoresIniciais ?? {};

  return (
    <form action={action} className="max-w-2xl space-y-4 rounded-lg bg-chalk p-6 shadow">
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-ink">
          Nome do produto
          <input
            name="nome"
            defaultValue={v.nome}
            required
            placeholder="Ex: Real Madrid 24/25 Home"
            className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </label>

        <label className="block text-sm font-medium text-ink">
          Time
          <input
            name="time"
            defaultValue={v.time}
            required
            placeholder="Ex: Real Madrid"
            className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-ink">
        Liga / categoria (aparece no filtro do menu)
        <select
          name="liga"
          defaultValue={v.liga ?? LIGAS[0]}
          className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
        >
          {LIGAS.map((liga) => (
            <option key={liga} value={liga}>
              {liga}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-ink">
        Categoria
        <select
          name="categoria"
          defaultValue={v.categoria ?? "torcedor"}
          className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
        >
          <option value="torcedor">Torcedor</option>
          <option value="jogador">Jogador (player)</option>
          <option value="retro">Retrô</option>
        </select>
      </label>

      <ImagensManager valoresIniciais={v.imagens ?? []} />

      <label className="block text-sm font-medium text-ink">
        Tamanhos disponíveis (separados por vírgula)
        <input
          name="tamanhos"
          defaultValue={v.tamanhos?.join(", ")}
          required
          placeholder="P, M, G, GG"
          className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-ink">
        Preço de venda mostrado no site (&quot;a partir de&quot;)
        <input
          type="number"
          step="0.01"
          name="precoVenda"
          defaultValue={v.precoVenda}
          required
          className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
        />
      </label>

      <div className="rounded-md border border-dashed border-thread p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-thread-dark">
          Uso interno — não aparece pro cliente
        </p>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-ink">
            Custo fornecedor nacional (R$)
            <input
              type="number"
              step="0.01"
              name="custoNacional"
              defaultValue={v.custoNacional ?? undefined}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Custo fornecedor internacional (US$)
            <input
              type="number"
              step="0.01"
              name="custoInternacional"
              defaultValue={v.custoInternacional ?? undefined}
              className="mt-1 w-full rounded-md border border-thread px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </label>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input
          type="checkbox"
          name="disponivelNacional"
          defaultChecked={v.disponivelNacional}
          className="h-4 w-4"
        />
        Disponível no fornecedor nacional (mostra selo &quot;pronta entrega&quot;)
      </label>

      {valoresIniciais && (
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="ativo"
            defaultChecked={v.ativo}
            className="h-4 w-4"
          />
          Ativo (visível no catálogo)
        </label>
      )}

      <button
        type="submit"
        className="rounded-md bg-pitch px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide text-chalk hover:bg-pitch-2"
      >
        {textoBotao}
      </button>
    </form>
  );
}
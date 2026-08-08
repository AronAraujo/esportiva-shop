import { SELOS } from "@/lib/selos";

export function TrustBadges() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SELOS.map((selo) => (
          <div
            key={selo.id}
            className="flex items-center gap-3 rounded-lg border border-thread/50 bg-chalk px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chalk-2 text-lg"
            >
              {selo.icone}
            </span>
            <span className="font-display text-xs font-semibold uppercase leading-tight tracking-wide text-ink sm:text-sm">
              {selo.texto}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
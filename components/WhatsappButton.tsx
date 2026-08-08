import { buildWhatsappLink } from "@/lib/whatsapp";

export function WhatsappButton({
  numero,
  produtoNome,
  tamanho,
  className = "",
}: {
  numero: string;
  produtoNome: string;
  tamanho?: string;
  className?: string;
}) {
  const href = buildWhatsappLink({ numero, produtoNome, tamanho });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-pitch transition-colors hover:bg-gold-dark ${className}`}
    >
      Consultar no WhatsApp
    </a>
  );
}

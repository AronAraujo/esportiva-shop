import Link from "next/link";
import { REDES_SOCIAIS } from "@/lib/social";
import { buildWhatsappLinkGenerico } from "@/lib/whatsapp";

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeTiktok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M14.5 3c.3 1.9 1.5 3.4 3.5 3.8v2.6c-1.3 0-2.5-.4-3.5-1.1v6.2c0 3.1-2.5 5.5-5.6 5.5S3.3 17.6 3.3 14.5c0-3 2.4-5.4 5.3-5.5v2.7a2.8 2.8 0 1 0 2.9 2.8V3h3z" />
    </svg>
  );
}

export function Footer({ whatsappNumero }: { whatsappNumero: string }) {
  const anoAtual = new Date().getFullYear();

  const linkRastrear = buildWhatsappLinkGenerico(
    whatsappNumero,
    "Oi! Queria saber o status do meu pedido 📦"
  );
  const linkFalarConosco = buildWhatsappLinkGenerico(
    whatsappNumero,
    "Oi! Tenho uma dúvida sobre a loja."
  );

  return (
    <footer className="border-t border-thread-dark/30 bg-pitch text-chalk-2">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-xl font-bold italic uppercase leading-none tracking-tight">
              <span className="text-gold">Esportiva</span> <span className="text-chalk">Shop</span>
            </p>
            <p className="mt-3 text-sm text-chalk-2/80">
              Camisa de time com atendimento direto no WhatsApp. Enviamos pra
              todo o Brasil.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-chalk">
              Atendimento
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={linkRastrear} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  Rastrear pedido
                </a>
              </li>
              <li>
                <a href={linkFalarConosco} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  Falar com a loja
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-gold">
                  Ver catálogo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-chalk">
              Redes sociais
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={REDES_SOCIAIS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                  <IconeInstagram /> Instagram
                </a>
              </li>
              <li>
                <a href={REDES_SOCIAIS.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                  <IconeTiktok /> TikTok
                </a>
              </li>
              <li>
                <a href={REDES_SOCIAIS.destaquesFeedback} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  Feedbacks de clientes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-chalk">
              Compra segura
            </p>
            <ul className="mt-3 space-y-2 text-sm text-chalk-2/80">
              <li className="flex items-center gap-2">🔒 Atendimento verificado</li>
              <li className="flex items-center gap-2">✅ Preço e prazo combinados antes de pagar</li>
              <li className="flex items-center gap-2">📦 Acompanhamento direto no WhatsApp</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-thread-dark/30 pt-6 text-center text-xs text-chalk-2/60">
          © {anoAtual} Esportiva Shop. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
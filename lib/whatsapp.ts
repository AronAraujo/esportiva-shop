/**
 * Monta o link do WhatsApp já com a mensagem pré-preenchida,
 * pra pessoa não precisar digitar nada ao clicar em "Consultar".
 */
export function buildWhatsappLink(params: {
  numero: string; // formato: 5511999999999 (só dígitos, com DDI+DDD)
  produtoNome: string;
  tamanho?: string;
}) {
  const { numero, produtoNome, tamanho } = params;

  let texto = `Oi! Vi a camisa *${produtoNome}* no catálogo`;
  if (tamanho) texto += ` (tamanho ${tamanho})`;
  texto += ` e queria saber o preço e o prazo. 🙂`;

  return buildWhatsappLinkGenerico(numero, texto);
}

/**
 * Versão genérica, pra qualquer mensagem pronta (ex: rastrear pedido,
 * falar com a loja) sem depender de um produto específico.
 */
export function buildWhatsappLinkGenerico(numero: string, texto: string) {
  const numeroLimpo = numero.replace(/\D/g, "");
  return `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(texto)}`;
}
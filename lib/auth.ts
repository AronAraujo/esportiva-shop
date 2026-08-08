/**
 * Autenticação simples por senha única (não é multiusuário).
 * Guardamos no cookie um hash da senha, não a senha em texto puro.
 *
 * Usamos a Web Crypto API (globalThis.crypto.subtle) em vez do módulo
 * "crypto" do Node, porque o middleware roda no Edge Runtime — que não
 * suporta o módulo nativo do Node, só a API padrão da Web.
 */
const COOKIE_NAME = "admin_session";

async function sha256Hex(texto: string) {
  const dados = new TextEncoder().encode(texto);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedToken() {
  const senha = process.env.ADMIN_PASSWORD ?? "";
  return sha256Hex(senha);
}

export function checkPassword(senhaDigitada: string) {
  return senhaDigitada === process.env.ADMIN_PASSWORD;
}

export function sessionCookieName() {
  return COOKIE_NAME;
}

export async function sessionCookieValue() {
  return expectedToken();
}

export async function isValidSessionCookie(valorDoCookie: string | undefined) {
  if (!valorDoCookie) return false;
  const esperado = await expectedToken();
  return valorDoCookie === esperado;
}

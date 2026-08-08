"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { checkPassword, sessionCookieName, sessionCookieValue } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");

  if (!checkPassword(senha)) {
    redirect("/admin/login?erro=1");
  }

  const store = await cookies();
  store.set(sessionCookieName(), await sessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(sessionCookieName());
  redirect("/admin/login");
}

function parseListaCampo(valor: FormDataEntryValue | null): string[] {
  return String(valor ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createProdutoAction(formData: FormData) {
  const imagens = parseListaCampo(formData.get("imagens"));
  const tamanhos = parseListaCampo(formData.get("tamanhos"));

  await prisma.produto.create({
    data: {
      nome: String(formData.get("nome")),
      time: String(formData.get("time")),
      liga: String(formData.get("liga")),
      categoria: String(formData.get("categoria")),
      imagens: JSON.stringify(imagens),
      tamanhos: JSON.stringify(tamanhos),
      precoVenda: Number(formData.get("precoVenda")),
      custoNacional: formData.get("custoNacional")
        ? Number(formData.get("custoNacional"))
        : null,
      custoInternacional: formData.get("custoInternacional")
        ? Number(formData.get("custoInternacional"))
        : null,
      disponivelNacional: formData.get("disponivelNacional") === "on",
      ativo: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProdutoAction(id: string, formData: FormData) {
  const imagens = parseListaCampo(formData.get("imagens"));
  const tamanhos = parseListaCampo(formData.get("tamanhos"));

  await prisma.produto.update({
    where: { id },
    data: {
      nome: String(formData.get("nome")),
      time: String(formData.get("time")),
      liga: String(formData.get("liga")),
      categoria: String(formData.get("categoria")),
      imagens: JSON.stringify(imagens),
      tamanhos: JSON.stringify(tamanhos),
      precoVenda: Number(formData.get("precoVenda")),
      custoNacional: formData.get("custoNacional")
        ? Number(formData.get("custoNacional"))
        : null,
      custoInternacional: formData.get("custoInternacional")
        ? Number(formData.get("custoInternacional"))
        : null,
      disponivelNacional: formData.get("disponivelNacional") === "on",
      ativo: formData.get("ativo") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProdutoAction(id: string) {
  await prisma.produto.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateConfigAction(formData: FormData) {
  const existente = await prisma.configLoja.findFirst();

  const data = {
    whatsappNumero: String(formData.get("whatsappNumero")),
    freteNacional: Number(formData.get("freteNacional")),
    freteInternacional: Number(formData.get("freteInternacional")),
    prazoNacionalMin: Number(formData.get("prazoNacionalMin")),
    prazoNacionalMax: Number(formData.get("prazoNacionalMax")),
    prazoInternMin: Number(formData.get("prazoInternMin")),
    prazoInternMax: Number(formData.get("prazoInternMax")),
    avisoPrazo: String(formData.get("avisoPrazo") ?? ""),
  };

  if (existente) {
    await prisma.configLoja.update({ where: { id: existente.id }, data });
  } else {
    await prisma.configLoja.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes?salvo=1");
}

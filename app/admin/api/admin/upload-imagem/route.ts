import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  console.log("[upload-imagem] Requisição recebida");
  console.log("[upload-imagem] Cloud name configurado:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("[upload-imagem] API key configurada:", process.env.CLOUDINARY_API_KEY ? "sim" : "NÃO ENCONTRADA");
  console.log("[upload-imagem] API secret configurada:", process.env.CLOUDINARY_API_SECRET ? "sim" : "NÃO ENCONTRADA");

  const formData = await request.formData();
  const arquivo = formData.get("file");
  console.log("[upload-imagem] Arquivo recebido:", arquivo instanceof File ? arquivo.name : "nenhum/inválido");

  if (!arquivo || !(arquivo instanceof File)) {
    return NextResponse.json({ erro: "Nenhum arquivo enviado." }, { status: 400 });
  }

  if (!arquivo.type.startsWith("image/")) {
    return NextResponse.json({ erro: "Só é possível enviar imagens." }, { status: 400 });
  }

  const TAMANHO_MAXIMO_MB = 10;
  if (arquivo.size > TAMANHO_MAXIMO_MB * 1024 * 1024) {
    return NextResponse.json(
      { erro: `Imagem muito grande (máximo ${TAMANHO_MAXIMO_MB}MB).` },
      { status: 400 }
    );
  }

  try {
    const bytes = await arquivo.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${arquivo.type};base64,${base64}`;

    console.log("[upload-imagem] Enviando pro Cloudinary...");
    const resultado = await cloudinary.uploader.upload(dataUri, {
      folder: "esportiva-shop/produtos",
      quality: "auto",
      fetch_format: "auto",
    });
    console.log("[upload-imagem] Sucesso:", resultado.secure_url);

    return NextResponse.json({ url: resultado.secure_url });
  } catch (erro) {
  console.error("========== ERRO ==========");
  console.error(erro);

  if (erro instanceof Error) {
    console.error(erro.message);
    console.error(erro.stack);
  }

  return NextResponse.json(
    {
      erro: erro instanceof Error ? erro.message : "Erro desconhecido",
    },
    { status: 500 }
  );
  }
}
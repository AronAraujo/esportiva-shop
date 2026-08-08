/**
 * Insere uma transformação de tamanho/qualidade numa URL do Cloudinary,
 * pra pedir só o tamanho de imagem que a tela realmente precisa —
 * em vez de sempre baixar a foto no tamanho original (que pode ter
 * vários MB se veio direto de uma foto de celular).
 *
 * Se a URL não for do Cloudinary (ex: ainda tem link antigo do Yupoo),
 * devolve a URL original sem mexer, então é seguro usar em qualquer imagem.
 */
export function otimizarImagemCloudinary(
  url: string,
  opcoes: { largura: number; qualidade?: "auto" | number }
) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const { largura, qualidade = "auto" } = opcoes;
  const transformacao = `w_${largura},c_limit,q_${qualidade},f_auto`;

  return url.replace("/upload/", `/upload/${transformacao}/`);
}
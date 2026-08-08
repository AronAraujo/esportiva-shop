/**
 * Banners do carrossel da home. Pra adicionar um novo, só copia um objeto
 * e cola no array — o carrossel se ajusta sozinho pra quantos banners tiver.
 *
 * Tamanho ideal das imagens:
 *  - desktopSrc: 1920 x 640px  (proporção 3:1, horizontal)
 *  - mobileSrc:  1080 x 1350px (proporção 4:5, vertical)
 *
 * Pode ser um caminho local (solte o arquivo em /public/banners/ e use
 * "/banners/nome-do-arquivo.jpg") ou um link direto de imagem hospedada
 * em outro lugar — os dois formatos funcionam.
 */
export type Banner = {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
};

export const BANNERS: Banner[] = [
  {
    id: "banner-1",
    desktopSrc: "/banners/banner1-desktop.png",
    mobileSrc: "/banners/banner1-mobile.png",
    alt: "Ben-vindo",
  },
  {
    id: "banner-2",
    desktopSrc: "/banners/banner2-desktop.png",
    mobileSrc: "/banners/banner2-mobile.png",
    alt: "Enviamos pra todo o Brasil",
  },
];

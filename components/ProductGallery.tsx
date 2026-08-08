"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { otimizarImagemCloudinary } from "@/lib/cloudinaryUrl";

export function ProductGallery({
  imagens,
  alt,
}: {
  imagens: string[];
  alt: string;
}) {
  const [indice, setIndice] = useState(0);
  const [lightboxAberto, setLightboxAberto] = useState(false);

  if (imagens.length === 0) {
    return (
      <div className="flex aspect-3/4 items-center justify-center rounded-t-lg bg-pitch-2">
        <span className="font-display text-chalk-2/60">sem foto</span>
      </div>
    );
  }

  const trocar = (e: React.MouseEvent, novoIndice: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndice(novoIndice);
  };

  return (
    <div>
      <div
        onClick={() => setLightboxAberto(true)}
        className="relative aspect-3/4 cursor-zoom-in overflow-hidden rounded-t-lg bg-pitch-2"
      >
        <Image
          src={otimizarImagemCloudinary(imagens[indice], { largura: 400 })}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover"
          unoptimized
        />

        {imagens.length > 1 && (
          <>
            <button
              onClick={(e) => trocar(e, (indice - 1 + imagens.length) % imagens.length)}
              aria-label="Foto anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-pitch/70 px-2 py-1 text-chalk hover:bg-pitch"
            >
              ‹
            </button>
            <button
              onClick={(e) => trocar(e, (indice + 1) % imagens.length)}
              aria-label="Próxima foto"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-pitch/70 px-2 py-1 text-chalk hover:bg-pitch"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {imagens.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => trocar(e, i)}
                  aria-label={`Ver foto ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === indice ? "bg-gold" : "bg-chalk/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightboxAberto && (
        <Lightbox
          imagens={imagens}
          indiceInicial={indice}
          alt={alt}
          onClose={() => setLightboxAberto(false)}
        />
      )}
    </div>
  );
}
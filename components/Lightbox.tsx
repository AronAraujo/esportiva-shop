"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { otimizarImagemCloudinary } from "@/lib/cloudinaryUrl";

export function Lightbox({
  imagens,
  indiceInicial,
  alt,
  onClose,
}: {
  imagens: string[];
  indiceInicial: number;
  alt: string;
  onClose: () => void;
}) {
const [indice, setIndice] = useState(indiceInicial);
const [touchStartX, setTouchStartX] = useState(0);

// trava o scroll da página de fundo e liga as setas do teclado

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndice((i) => (i + 1) % imagens.length);
      if (e.key === "ArrowLeft") setIndice((i) => (i - 1 + imagens.length) % imagens.length);
    };

    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [imagens.length, onClose]);

if (typeof document === "undefined") return null;

  const aoTocarInicio = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);

  const aoTocarFim = (e: React.TouchEvent) => {
    const diferenca = e.changedTouches[0].clientX - touchStartX;
    if (diferenca > 50) setIndice((i) => (i - 1 + imagens.length) % imagens.length);
    else if (diferenca < -50) setIndice((i) => (i + 1) % imagens.length);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-pitch/95"
      onClick={onClose}
      onTouchStart={aoTocarInicio}
      onTouchEnd={aoTocarFim}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fechar"
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-chalk/10 text-2xl text-chalk hover:bg-chalk/20"
      >
        ×
      </button>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          src={otimizarImagemCloudinary(imagens[indice], { largura: 1600 })}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain"
          unoptimized
        />

        {imagens.length > 1 && (
          <>
            <button
              onClick={() => setIndice((i) => (i - 1 + imagens.length) % imagens.length)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-chalk/10 text-2xl text-chalk hover:bg-chalk/20"
            >
              ‹
            </button>
            <button
              onClick={() => setIndice((i) => (i + 1) % imagens.length)}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-chalk/10 text-2xl text-chalk hover:bg-chalk/20"
            >
              ›
            </button>
          </>
        )}
      </div>

      {imagens.length > 1 && (
        <div
          className="flex justify-center gap-2 pb-6 pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          {imagens.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndice(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === indice ? "bg-gold" : "bg-chalk/40"}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
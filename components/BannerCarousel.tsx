"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import type { Banner } from "@/lib/banners";

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);
  const [selecionado, setSelecionado] = useState(0);

  const rolarPara = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const anterior = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const proximo = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const aoSelecionar = () => setSelecionado(emblaApi.selectedScrollSnap());
    emblaApi.on("select", aoSelecionar);
    aoSelecionar();

    return () => {
      emblaApi.off("select", aoSelecionar);
    };
  }, [emblaApi]);

  if (banners.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, i) => (
            <div key={banner.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[3/1]">
                {/* Desktop/tablet: só aparece a partir do breakpoint sm */}
                <Image
                  src={banner.desktopSrc}
                  alt={banner.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                  className="hidden object-cover sm:block"
                />
                {/* Mobile: some a partir do breakpoint sm */}
                <Image
                  src={banner.mobileSrc}
                  alt={banner.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                  className="object-cover sm:hidden"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={anterior}
            aria-label="Banner anterior"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pitch/60 text-lg text-chalk transition-colors hover:bg-pitch/80 sm:h-10 sm:w-10"
          >
            ‹
          </button>
          <button
            onClick={proximo}
            aria-label="Próximo banner"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pitch/60 text-lg text-chalk transition-colors hover:bg-pitch/80 sm:h-10 sm:w-10"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => rolarPara(i)}
                aria-label={`Ver banner ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === selecionado ? "bg-gold" : "bg-chalk/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

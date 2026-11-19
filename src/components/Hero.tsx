"use client";

import { useEffect, useRef, useState } from "react";
import { highlights } from "@/lib/site";
import { Icon } from "./Icon";
import { Img, PrimaryCta } from "./ui";

export function AlamedaLogo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Alameda Juruá Residencial"
      className={`block aspect-[848/392] bg-current ${className}`}
      style={{
        WebkitMaskImage: "url(/media/brand/alameda-jurua.svg)",
        maskImage: "url(/media/brand/alameda-jurua.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}

/** Drone loop that fades in over the façade render (the static fallback). */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;
    const desktop = window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches;
    setSrc(desktop ? "/media/video/hero-desktop.mp4" : "/media/video/hero-mobile.mp4");
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.play().catch(() => {});
  }, [src]);

  if (!src) return null;
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative bg-olive-950 text-cream">
      <div className="relative flex min-h-svh flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Img
            name="fachada"
            alt="Fachada das três casas do Alameda Juruá Residencial"
            sizes="100vw"
            priority
            className="h-full w-full object-cover object-[50%_55%]"
          />
          <HeroVideo />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-olive-950 via-olive-950/60 to-olive-950/30 md:bg-gradient-to-r md:from-olive-950/95 md:via-olive-950/60 md:to-olive-950/5"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-olive-950 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-20">
          <AlamedaLogo className="rise w-36 text-cream md:w-48" />

          <h1
            id="hero-title"
            className="rise display mt-8 max-w-4xl text-[3.1rem] sm:text-6xl md:text-7xl lg:text-[5.75rem]"
            style={{ "--d": "220ms" } as React.CSSProperties}
          >
            Três casas.
            <em className="mt-2 block text-[0.52em] leading-[1.12] text-cream/90 md:text-[0.48em]">
              Um novo estilo de viver em Morada&nbsp;de&nbsp;Laranjeiras.
            </em>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream/85 md:text-lg"
            style={{ "--d": "340ms" } as React.CSSProperties}
          >
            Triplex de até 210 m² privativos, 3 suítes e rooftop gourmet com churrasqueira e espaço preparado
            para spa. 5 minutos do Shopping Montserrat, 10 minutos da praia e 15 minutos de Jardim Camburi.
          </p>

          <div
            className="rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "460ms" } as React.CSSProperties}
          >
            <PrimaryCta where="hero" />
          </div>
          <div
            className="rise mt-5 flex flex-col gap-2.5 pr-16 text-sm text-cream/75 sm:pr-0 md:flex-row md:items-center md:gap-0"
            style={{ "--d": "560ms" } as React.CSSProperties}
          >
            <p className="flex shrink-0 items-center gap-2">
              <Icon name="pin" size={16} className="shrink-0 text-lime" />
              <span>
                <strong className="font-semibold text-cream">Morada de Laranjeiras</strong> · Serra/ES
              </span>
            </p>
            <span aria-hidden="true" className="mx-5 hidden h-4 w-px bg-cream/25 md:block" />
            <p className="flex items-center gap-2">
              <Icon name="levels" size={16} className="shrink-0 text-lime" />
              <span>
                <strong className="font-semibold text-cream">Apenas 3 unidades.</strong> Atendimento e venda direto com
                a construtora.
              </span>
            </p>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-4 right-5 hidden text-[0.68rem] tracking-wide text-cream/50 md:block">
          Imagens ilustrativas
        </p>
      </div>

      <div className="relative border-t border-cream/10 bg-olive-950">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {highlights.map((h, i) => (
            <li
              key={h.label}
              className={`flex items-start gap-3 px-5 py-6 md:items-center md:px-10 md:py-8 ${
                i % 2 === 1 ? "border-l border-cream/10" : ""
              } ${i > 1 ? "border-t border-cream/10 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <Icon name={h.icon} size={28} className="shrink-0 text-lime" />
              <span className="text-[0.9rem] leading-snug text-cream/90">{h.label}</span>
            </li>
          ))}
        </ul>
        <div className="ticks opacity-60" aria-hidden="true" />
      </div>
    </section>
  );
}

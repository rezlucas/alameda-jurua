"use client";

import { useEffect, useRef } from "react";
import { destinos, mapsLink, wazeLink } from "@/lib/site";
import { track } from "@/lib/lead";
import { Icon } from "./Icon";
import { Eyebrow, Img, Reveal } from "./ui";

// Pin position on the aerial photo (from the commercial book), as % of the image.
const PIN = { x: 56.66, y: 48.2 };
const rings = [
  { size: 30, label: "5 min" },
  { size: 56, label: "10 min" },
  { size: 84, label: "15 min" },
];

function BairroReel() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.4,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="absolute bottom-4 left-4 hidden w-36 overflow-hidden rounded-2xl border border-cream/30 shadow-2xl md:block lg:w-44">
      <video
        ref={ref}
        src="/media/video/bairro-reel.mp4"
        poster="/media/video/bairro-reel-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="Vista aérea de Morada de Laranjeiras"
        className="aspect-[9/16] w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-950/90 to-transparent p-3 text-[0.68rem] leading-tight text-cream">
        Morada de Laranjeiras vista de cima
      </figcaption>
    </figure>
  );
}

export function Localizacao() {
  return (
    <section
      id="localizacao"
      aria-labelledby="loc-title"
      className="grain grain-dark relative overflow-hidden bg-olive-900 py-20 text-cream md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.25fr] lg:gap-x-16 lg:gap-y-0">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <Eyebrow n="04" light>
              Localização
            </Eyebrow>
            <h2 id="loc-title" className="display mt-5 text-[2.5rem] md:text-6xl">
              Tranquilidade de bairro, <em>tudo a poucos minutos</em>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cream/80">
              Em um dos bairros mais valorizados da Serra, o Alameda Juruá une ruas residenciais calmas à praticidade.
              Poucos minutos de supermercados, shopping, escolas, restaurantes, hospitais e acesso rápido às principais
              vias. E, quando bater vontade, a praia está logo ali.
            </p>
          </Reveal>

        <Reveal delay={150} className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-olive-950 md:aspect-[16/11] lg:aspect-[4/5]">
            <div
              className="absolute inset-y-0 left-1/2 aspect-[2716/1528] h-full"
              style={{ transform: `translateX(-${PIN.x}%)` }}
            >
              <Img
                name="aerea"
                alt="Vista aérea de Morada de Laranjeiras com o mar ao fundo"
                widths={[640, 1280, 1920, 2560]}
                w={2716}
                h={1528}
                sizes="(min-width: 1024px) 90vw, 220vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-olive-950/30" />
              {rings.map((r) => (
                <div
                  key={r.label}
                  aria-hidden="true"
                  className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-cream/75"
                  style={{ left: `${PIN.x}%`, top: `${PIN.y}%`, height: `${r.size}%` }}
                >
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive-950/80 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-cream">
                    {r.label}
                  </span>
                </div>
              ))}
              <div className="absolute" style={{ left: `${PIN.x}%`, top: `${PIN.y}%` }}>
                <span
                  aria-hidden="true"
                  className="pulse-ring absolute left-0 top-0 h-16 w-16 rounded-full bg-lime/50"
                  style={{ animation: "ring 2.4s cubic-bezier(.22,1,.36,1) infinite" }}
                />
                <span className="absolute left-0 top-0 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime ring-4 ring-olive-950/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive-950" />
                </span>
                <span className="absolute bottom-5 left-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream px-3.5 py-1.5 text-xs font-bold text-olive-900 shadow-lg">
                  Alameda Juruá
                </span>
              </div>
            </div>
            <BairroReel />
            <p className="absolute right-4 top-4 rounded-full bg-olive-950/60 px-3 py-1 text-[0.65rem] text-cream/80 backdrop-blur">
              Raios ilustrativos
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener"
              onClick={() => track("maps_click", { app: "google" })}
              className="btn btn-ghost-light px-3"
            >
              <Icon name="map" size={18} />
              Google Maps
            </a>
            <a
              href={wazeLink}
              target="_blank"
              rel="noopener"
              onClick={() => track("maps_click", { app: "waze" })}
              className="btn btn-ghost-light px-3"
            >
              <Icon name="pin" size={18} />
              Waze
            </a>
          </div>
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal as="ul" delay={100} className="border-t border-cream/15 lg:mt-10" role="list">
            {destinos.map((d) => (
              <li key={d.nome} className="flex items-center gap-4 border-b border-cream/15 py-3.5">
                <Icon name={d.tipo} size={20} className="shrink-0 text-lime" />
                <span className="flex-1 text-[0.95rem] text-cream/90">{d.nome}</span>
                <span className="shrink-0 font-display text-xl tabular-nums text-cream">
                  {d.min}
                  <span className="ml-1 font-sans text-xs text-cream/60">min</span>
                </span>
              </li>
            ))}
          </Reveal>
          <p className="mt-3 text-xs text-cream/55">Tempos aproximados de carro.</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reels } from "@/lib/site";
import { track } from "@/lib/lead";
import { Icon } from "./Icon";
import { Eyebrow, Reveal } from "./ui";

const DURATION = 5000;
const pad = (n: number) => String(n).padStart(2, "0");
const gutter = "max(1.25rem, calc((100vw - 80rem) / 2 + 2.5rem))";

export function Reels() {
  const section = useRef<HTMLElement>(null);
  const track_ = useRef<HTMLUListElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const programmatic = useRef(false);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (section.current) io.observe(section.current);
    return () => io.disconnect();
  }, []);

  // Track which card the user is looking at while swiping.
  useEffect(() => {
    const root = track_.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (programmatic.current) return;
        const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(Number((best.target as HTMLElement).dataset.i));
      },
      { root, threshold: [0.6, 0.9] },
    );
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    const root = track_.current;
    const card = cards.current[i];
    if (!root || !card) return;
    programmatic.current = true;
    const padL = parseFloat(getComputedStyle(root).paddingLeft) || 0;
    root.scrollTo({ left: card.offsetLeft - padL, behavior: "smooth" });
    setActive(i);
    window.setTimeout(() => (programmatic.current = false), 700);
  }, []);

  const interact = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 7000);
  }, []);

  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => goTo((active + 1) % reels.length), DURATION);
    return () => window.clearTimeout(t);
  }, [playing, active, goTo]);

  const step = (d: number) => {
    interact();
    goTo((active + d + reels.length) % reels.length);
    track("reels_nav", { para: active + d });
  };

  return (
    <section
      id="ambientes"
      ref={section}
      aria-labelledby="reels-title"
      className="grain overflow-hidden bg-paper py-20 md:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <Reveal>
          <Eyebrow n="01">Ambientes</Eyebrow>
          <h2 id="reels-title" className="display mt-5 text-[2.5rem] text-olive-900 md:text-6xl">
            Entre e sinta <em>cada ambiente</em>
          </h2>
          <p className="mt-4 max-w-md text-muted md:text-lg">Um passeio pela casa, do térreo ao rooftop.</p>
        </Reveal>

        <div className="flex items-center gap-4">
          <p className="font-display text-lg tabular-nums text-olive-800" aria-live="polite">
            <span className="text-2xl">{pad(active + 1)}</span>
            <span className="text-muted"> / {pad(reels.length)}</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Ambiente anterior"
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-olive-800/30 text-olive-800 transition hover:bg-olive-800 hover:text-cream"
            >
              <Icon name="arrowLeft" size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próximo ambiente"
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-olive-800 text-cream transition hover:bg-olive-700"
            >
              <Icon name="arrowRight" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* stories-style progress */}
      <div className="mx-auto mt-8 flex max-w-7xl gap-1.5 px-5 md:px-10" aria-hidden="true">
        {reels.map((r, i) => (
          <span key={r.img} className="h-[3px] flex-1 overflow-hidden rounded-full bg-olive-800/15">
            <span
              key={i === active ? `a${active}` : `i${i}`}
              className="block h-full origin-left rounded-full bg-olive-700"
              style={
                i < active
                  ? { transform: "scaleX(1)" }
                  : i === active
                    ? {
                        animation: reduce ? "none" : `fill ${DURATION}ms linear forwards`,
                        animationPlayState: playing ? "running" : "paused",
                        transform: reduce ? "scaleX(1)" : undefined,
                      }
                    : { transform: "scaleX(0)" }
              }
            />
          </span>
        ))}
      </div>

      <ul
        ref={track_}
        role="list"
        aria-label="Ambientes da casa"
        onPointerDown={interact}
        onWheel={interact}
        onKeyDown={interact}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-5"
        style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
      >
        {reels.map((r, i) => {
          const on = i === active;
          return (
            <li
              key={r.img}
              data-i={i}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="w-[76vw] max-w-[340px] shrink-0 snap-start sm:w-[300px]"
            >
              <figure
                className={`relative aspect-[9/16] overflow-hidden rounded-[22px] bg-olive-900 transition-[transform,box-shadow] duration-500 ${
                  on ? "shadow-[0_30px_60px_-30px_rgb(38_45_30/0.7)]" : "md:scale-[0.97]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/media/reels/${r.img}-480.webp`}
                  srcSet={`/media/reels/${r.img}-480.webp 480w, /media/reels/${r.img}-792.webp 792w`}
                  sizes="(min-width: 640px) 300px, 76vw"
                  alt={`${r.title} — perspectiva ilustrativa`}
                  width={792}
                  height={1408}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="kenburns absolute inset-0 h-full w-full object-cover will-change-transform"
                  style={
                    on && playing
                      ? { animation: `kenburns ${DURATION + 1500}ms cubic-bezier(.22,1,.36,1) forwards` }
                      : undefined
                  }
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-olive-950/90 via-olive-950/10 to-olive-950/30"
                />
                <span className="absolute left-5 top-4 font-display text-xl italic text-cream/90">{pad(i + 1)}</span>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="font-display text-[1.65rem] leading-tight">{r.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-snug text-cream/85">{r.text}</p>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <p className="mx-auto mt-6 max-w-7xl px-5 text-xs text-muted md:px-10">
        Imagens com revestimentos, decoração, mobiliário e paisagismo meramente ilustrativos. *Item entregue
        preparado para instalação.
      </p>
    </section>
  );
}

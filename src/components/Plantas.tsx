"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { casas, floors, type FloorId } from "@/lib/site";
import { track } from "@/lib/lead";
import { Icon } from "./Icon";
import { Eyebrow, PrimaryCta, Reveal, WhatsAppButton, openLeadModal } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** Arrow-key navigation for WAI-ARIA tablists. */
function onTabKeys(e: KeyboardEvent<HTMLDivElement>, count: number, current: number, set: (i: number) => void) {
  const k = e.key;
  let next = current;
  if (k === "ArrowRight") next = (current + 1) % count;
  else if (k === "ArrowLeft") next = (current - 1 + count) % count;
  else if (k === "Home") next = 0;
  else if (k === "End") next = count - 1;
  else return;
  e.preventDefault();
  set(next);
  (e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next])?.focus();
}

export function Plantas() {
  const [casa, setCasa] = useState(0);
  const [floor, setFloor] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const c = casas[casa];
  const f = floors[floor];
  const file = `casa${c.n}-${f.id}`;

  const pickCasa = (i: number) => {
    setCasa(i);
    track("planta_casa", { casa: i + 1 });
  };
  const pickFloor = (i: number) => {
    setFloor(i);
    track("planta_pavimento", { pavimento: floors[i].id });
  };

  return (
    <section id="plantas" aria-labelledby="plantas-title" className="grain bg-kraft/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow n="03">Plantas</Eyebrow>
            <h2 id="plantas-title" className="display mt-5 text-[2.5rem] text-olive-900 md:text-6xl">
              Conheça a planta, <em>andar por andar</em>
            </h2>
            <p className="mt-5 max-w-lg text-muted md:text-lg">
              As três casas seguem o mesmo programa, com pequenas variações de metragem. Escolha a casa e navegue
              pelos pavimentos.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <dl className="grid grid-cols-3 divide-x divide-olive-800/15 border-y border-olive-800/15">
              {[
                ["Tipologia", "Sobrados triplex", "3 pavimentos"],
                ["Unidades", "3 casas", "individuais"],
                ["Privativa", "Até 210 m²", "205,46 a 210,77 m²"],
              ].map(([t, v, s]) => (
                <div key={t} className="px-3 py-5 first:pl-0 md:px-5">
                  <dt className="eyebrow text-[0.6rem] tracking-[0.18em] text-olive-600 md:tracking-[0.28em]">{t}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight text-olive-900 md:text-2xl">{v}</dd>
                  <dd className="mt-1 text-xs text-muted">{s}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Casa tabs */}
        <div
          role="tablist"
          aria-label="Escolha a casa"
          onKeyDown={(e) => onTabKeys(e, casas.length, casa, pickCasa)}
          className="mt-12 grid grid-cols-3 gap-2 rounded-full bg-olive-900/5 p-1.5 md:inline-grid md:min-w-[520px]"
        >
          {casas.map((k, i) => (
            <button
              key={k.n}
              role="tab"
              id={`tab-casa-${k.n}`}
              aria-selected={casa === i}
              aria-controls="painel-planta"
              tabIndex={casa === i ? 0 : -1}
              onClick={() => pickCasa(i)}
              className={`flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-full px-2 transition-colors duration-200 ${
                casa === i ? "bg-olive-800 text-cream shadow-md" : "text-olive-800 hover:bg-olive-900/5"
              }`}
            >
              <span className="font-display text-lg leading-none">Casa {pad(k.n)}</span>
              <span className={`mt-1 text-[0.7rem] tabular-nums ${casa === i ? "text-lime" : "text-muted"}`}>
                {k.total} m²
              </span>
            </button>
          ))}
        </div>

        <div
          id="painel-planta"
          role="tabpanel"
          aria-labelledby={`tab-casa-${c.n}`}
          className="mt-6 overflow-hidden rounded-[26px] bg-white shadow-[0_40px_80px_-50px_rgb(38_45_30/0.5)]"
        >
          {/* Floor switcher */}
          <div className="flex flex-col gap-4 border-b border-olive-900/10 p-4 md:flex-row md:items-center md:justify-between md:p-6">
            <div
              role="tablist"
              aria-label="Escolha o pavimento"
              onKeyDown={(e) => onTabKeys(e, floors.length, floor, pickFloor)}
              className="grid grid-cols-3 gap-2"
            >
              {floors.map((fl, i) => (
                <button
                  key={fl.id}
                  role="tab"
                  aria-selected={floor === i}
                  aria-controls="planta-figura"
                  tabIndex={floor === i ? 0 : -1}
                  onClick={() => pickFloor(i)}
                  className={`min-h-11 cursor-pointer rounded-full border px-3 text-sm font-semibold transition-colors md:px-5 ${
                    floor === i
                      ? "border-lime bg-lime text-olive-950"
                      : "border-olive-900/15 text-olive-800 hover:border-olive-800"
                  }`}
                >
                  {fl.id === "superior" ? (
                    <>
                      <span className="sm:hidden">2º pav.</span>
                      <span className="hidden sm:inline">{fl.label}</span>
                    </>
                  ) : (
                    fl.label
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted">
              Área coberta do pavimento:{" "}
              <strong className="font-semibold tabular-nums text-olive-900">
                {c.areas[f.id as FloorId]} m²
              </strong>
              {f.id === "rooftop" && <span className="text-xs"> (coberta + descoberta)</span>}
            </p>
          </div>

          <div>
            <figure id="planta-figura" className="relative bg-white p-3 md:px-10 md:py-8">
              <button
                type="button"
                onClick={() => {
                  dialog.current?.showModal();
                  track("planta_ampliar", { planta: file });
                }}
                className="group relative block w-full cursor-zoom-in"
                aria-label={`Ampliar planta da Casa ${pad(c.n)}, ${f.label}`}
              >
                <picture key={file} className="block animate-[rise_.6s_var(--ease-out-soft)_both]">
                  <source media="(min-width: 768px)" srcSet={`/media/plantas/${file}.webp`} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/media/plantas/${file}-foco.webp`}
                    alt={`Planta humanizada da Casa ${pad(c.n)} — ${f.label}`}
                    width={900}
                    height={1350}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto max-h-[70vh] w-auto rounded-xl md:max-h-none md:w-full"
                  />
                </picture>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-olive-900/85 px-3.5 py-2 text-xs font-semibold text-cream backdrop-blur transition group-hover:bg-olive-900">
                  <Icon name="expand" size={16} />
                  Ampliar
                </span>
              </button>
              <figcaption className="sr-only">{f.intro}</figcaption>
            </figure>

            <div className="grid gap-6 border-t border-olive-900/10 p-6 md:p-8 lg:grid-cols-[1fr_1.5fr_auto] lg:gap-10">
              <div>
                <p className="eyebrow text-olive-600">
                  Casa {pad(c.n)} · {f.label}
                </p>
                <p className="mt-3 leading-relaxed text-ink/85">{f.intro}</p>
                <p className="mt-4 text-xs text-muted">
                  Área descoberta permeável da Casa {pad(c.n)}: {c.permeavel} m².
                  {f.id === "rooftop" && " *Entregue preparado para instalação."}
                </p>
              </div>
              <ol className="grid grid-cols-1 content-start gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {f.legend.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 text-[0.92rem] text-ink">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-olive-800/40 bg-kraft/60 text-[0.7rem] font-bold tabular-nums text-olive-800">
                      {pad(i + 1)}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <div className="lg:self-end">
                <button
                  type="button"
                  onClick={() => openLeadModal("plantas-pdf")}
                  className="btn btn-dark w-full lg:w-auto"
                >
                  <Icon name="download" size={18} />
                  Receber as plantas em PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted">Imagens meramente ilustrativas. Projeto sujeito a alteração.</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCta where="plantas" />
          <WhatsAppButton where="plantas" className="btn btn-ghost-dark" />
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label={`Planta ampliada — Casa ${pad(c.n)}, ${f.label}`}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto h-[92dvh] max-h-none w-[96vw] max-w-[1600px] overflow-hidden rounded-2xl bg-white p-0 backdrop:bg-olive-950/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-olive-900/10 px-5 py-3">
            <p className="font-display text-lg text-olive-900">
              Casa {pad(c.n)} · {f.label}
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Fechar planta ampliada"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-olive-900 hover:bg-olive-900/5"
              autoFocus
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/media/plantas/${file}-hd.webp`}
              alt={`Planta ampliada da Casa ${pad(c.n)} — ${f.label}`}
              className="h-auto w-[260%] max-w-none md:w-full"
              loading="lazy"
            />
          </div>
          <p className="border-t border-olive-900/10 px-5 py-2 text-xs text-muted md:hidden">
            Arraste para navegar pela planta.
          </p>
        </div>
      </dialog>
    </section>
  );
}

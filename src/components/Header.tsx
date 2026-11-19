"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/lead";

const links = [
  { href: "#ambientes", label: "Ambientes" },
  { href: "#plantas", label: "Plantas" },
  { href: "#localizacao", label: "Localização" },
  { href: "#arquiteta", label: "Arquitetura" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-cream/10 bg-olive-950/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" aria-label="Perin & Lima — voltar ao topo" className="-ml-1 p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/brand/perin-lima-light.svg"
            alt="Perin & Lima Construção e Incorporação"
            width={673}
            height={210}
            className="h-8 w-auto md:h-10"
          />
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#agendar"
          onClick={() => track("cta_click", { local: "header" })}
          className="btn min-h-11 border border-lime/70 bg-olive-950/40 px-5 text-sm text-lime backdrop-blur-sm hover:bg-lime hover:text-olive-950"
        >
          Agendar visita
        </a>
      </div>
    </header>
  );
}

import { site, waLink } from "@/lib/site";
import { AlamedaLogo } from "./Hero";
import { Icon } from "./Icon";

export function Footer() {
  const rows: [string, React.ReactNode][] = [
    [
      "Incorporação e construção",
      "Perin & Lima Construção e Incorporação Ltda. / Usina Arquitetura Interiores e Design Ltda.",
    ],
    ["Projeto de arquitetura e interiores", "Rachel Perin Luchi"],
    ["Escritório", site.office],
    ["Empreendimento", site.address],
  ];
  return (
    <footer className="grain grain-dark bg-olive-950 pb-28 pt-16 text-cream md:pb-16">
      <div className="ticks mb-14 opacity-40" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_2fr] md:px-10">
        <div className="flex flex-col gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/brand/perin-lima-light.svg"
            alt="Perin & Lima Construção e Incorporação"
            width={673}
            height={210}
            loading="lazy"
            className="h-12 w-auto self-start"
          />
          <AlamedaLogo className="w-40 text-cream/70" />
        </div>
        <div>
          <dl className="grid gap-6 sm:grid-cols-2">
            {rows.map(([t, v]) => (
              <div key={t}>
                <dt className="eyebrow text-[0.62rem] text-lime">{t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/80">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-cream hover:text-lime"
            >
              <Icon name="whatsapp" size={18} />
              {site.phoneDisplay}
            </a>
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-cream hover:text-lime"
            >
              <Icon name="instagram" size={18} />@{site.instagram}
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-[0.7rem] leading-relaxed text-cream/45 md:px-10">
        Imagens com revestimentos, decoração, mobiliário, eletrodomésticos e paisagismo meramente ilustrativos. Projeto
        sujeito a alteração. *O imóvel será entregue preparado para instalação dos itens mencionados, que não estão
        incluídos na entrega do empreendimento. © {new Date().getFullYear()} Perin &amp; Lima.
      </p>
    </footer>
  );
}

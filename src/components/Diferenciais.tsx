import { diferenciais } from "@/lib/site";
import { Icon } from "./Icon";
import { Eyebrow, Img, Reveal } from "./ui";

export function Diferenciais() {
  return (
    <section aria-labelledby="dif-title" className="grain grain-dark relative bg-olive-800 py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow n="02" light>
              Diferenciais
            </Eyebrow>
            <h2 id="dif-title" className="display mt-5 text-[2.5rem] md:text-6xl">
              Acabamento à altura <em>de quem vai morar</em>
            </h2>
            <p className="mt-5 max-w-sm text-cream/80">
              Mais de 25 anos de tradição da Perin &amp; Lima, do primeiro traço à última peça de acabamento.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 hidden overflow-hidden rounded-[22px] lg:block">
            <Img
              name="rooftop-spa"
              alt="Rooftop com spa, deck e jardim vertical"
              sizes="(min-width: 1024px) 34vw, 0px"
              className="aspect-[4/5] w-full object-cover object-[40%_60%]"
            />
          </Reveal>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[22px] bg-cream/10 sm:grid-cols-2" role="list">
          {diferenciais.map((d, i) => (
            <Reveal
              as="li"
              key={d.text}
              delay={(i % 4) * 60}
              className="flex items-start gap-4 bg-olive-800 p-6 md:p-7"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-lime/40 text-lime">
                <Icon name={d.icon} size={24} />
              </span>
              <span className="pt-1 leading-snug text-cream/90">{d.text}</span>
            </Reveal>
          ))}
          <li className="hidden items-end bg-olive-800 p-7 sm:flex">
            <span className="ticks w-full opacity-70" aria-hidden="true" />
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-cream/60 md:px-10">
        *O imóvel será entregue preparado para instalação dos itens mencionados. Não estão incluídos na entrega do
        empreendimento.
      </p>
    </section>
  );
}

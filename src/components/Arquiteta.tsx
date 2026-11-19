import { Eyebrow, Img, Reveal } from "./ui";

/**
 * Portrait pending from the client. Drop the photo at /public/media/img/rachel.webp
 * and set PORTRAIT to its path — until then the frame shows her interiors project.
 */
const PORTRAIT: string | null = null;

export function Arquiteta() {
  return (
    <section id="arquiteta" aria-labelledby="arq-title" className="grain bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[26px] bg-kraft">
            {PORTRAIT ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={PORTRAIT}
                alt="Rachel Perin Luchi, arquiteta do Alameda Juruá"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            ) : (
              <Img
                name="suite-master"
                alt="Suíte master com marcenaria em madeira e luz natural filtrada pela persiana — projeto de Rachel Perin Luchi"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-[38%_50%]"
              />
            )}
          </div>
          <div className="absolute -bottom-6 right-4 max-w-[15rem] rounded-2xl bg-olive-800 p-5 text-cream shadow-xl md:-right-8">
            <p className="eyebrow text-[0.6rem] text-lime">Projeto</p>
            <p className="mt-2 text-sm leading-snug">Arquitetura e interiores das áreas comuns</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="pt-6 md:pt-0">
          <Eyebrow n="05">A arquiteta</Eyebrow>
          <h2 id="arq-title" className="display mt-5 text-[2.5rem] text-olive-900 md:text-6xl">
            Arquitetura <em>com assinatura</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            O Alameda Juruá nasceu na prancheta de Rachel Perin Luchi, responsável pelo projeto de arquitetura e pelos
            interiores das áreas comuns. O resultado é uma casa em que cada ambiente tem função clara, a luz entra no
            lugar certo e o rooftop vira extensão natural da vida em família.
          </p>
          <div className="mt-10 flex items-center gap-5 border-t border-olive-800/15 pt-6">
            <span className="h-px w-10 bg-olive-600" aria-hidden="true" />
            <div>
              <p className="font-display text-3xl italic text-olive-900">Rachel Perin Luchi</p>
              <p className="mt-1 text-sm text-muted">Arquiteta · Projeto de arquitetura e interiores</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

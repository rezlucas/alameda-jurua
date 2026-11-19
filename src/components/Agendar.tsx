import { LeadForm } from "./LeadForm";
import { AlamedaLogo } from "./Hero";
import { Eyebrow, Img, Reveal } from "./ui";

export function Agendar() {
  return (
    <section id="agendar" aria-labelledby="agendar-title" className="relative overflow-hidden bg-olive-950 text-cream">
      <div className="absolute inset-0" aria-hidden="true">
        <Img
          name="fachada-rua"
          alt=""
          w={2667}
          h={1500}
          sizes="100vw"
          className="h-full w-full object-cover object-[50%_40%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-950/80 via-olive-950/85 to-olive-950 md:bg-gradient-to-r md:from-olive-950/95 md:via-olive-950/75 md:to-olive-950/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <Eyebrow n="06" light>
            Visita
          </Eyebrow>
          <h2 id="agendar-title" className="display mt-5 text-[2.6rem] md:text-6xl">
            Agende sua visita <em>ao Alameda Juruá</em>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/85">
            Deixe seu contato e um consultor da Perin &amp; Lima fala com você em poucos minutos para apresentar as
            casas, as plantas e as condições comerciais.
          </p>
          <ul className="mt-8 hidden gap-3 text-sm text-cream/80 md:grid" role="list">
            {["Apenas 3 unidades", "Atendimento e venda direto com a construtora", "Mais de 25 anos de tradição"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                  {t}
                </li>
              ),
            )}
          </ul>
          <AlamedaLogo className="mt-12 hidden w-40 text-cream/80 lg:block" />
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[26px] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] md:p-9">
            <p className="font-display text-2xl text-olive-900">Fale com um consultor</p>
            <p className="mt-1 text-sm text-muted">Resposta em poucos minutos, em horário comercial.</p>
            <div className="mt-6">
              <LeadForm origem="agendar-visita" submitLabel="Quero ser atendido" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

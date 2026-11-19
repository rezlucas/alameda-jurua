"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { maskPhone, submitLead, track } from "@/lib/lead";
import { site, waLink } from "@/lib/site";
import { Icon } from "./Icon";

type Field = "nome" | "whatsapp" | "email";
type Values = Record<Field, string>;

const validate = (v: Values): Partial<Record<Field, string>> => {
  const e: Partial<Record<Field, string>> = {};
  if (v.nome.trim().length < 3) e.nome = "Informe seu nome para o consultor saber com quem falar.";
  const d = v.whatsapp.replace(/\D/g, "");
  if (d.length < 10 || d.length > 11) e.whatsapp = "Digite o WhatsApp com DDD, ex.: (27) 9 0000-0000.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Confira o e-mail, ex.: seu@email.com.";
  return e;
};

export function LeadForm({
  origem,
  submitLabel,
  tone = "light",
}: {
  origem: string;
  submitLabel: string;
  tone?: "light" | "dark";
}) {
  const uid = useId();
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({ nome: "", whatsapp: "", email: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [mode, setMode] = useState<"endpoint" | "whatsapp">("endpoint");
  const errors = validate(values);
  const isPdf = origem === "plantas-pdf";

  const set = (k: Field, v: string) => setValues((s) => ({ ...s, [k]: k === "whatsapp" ? maskPhone(v) : v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ nome: true, whatsapp: true, email: true });
    const first = (Object.keys(errors) as Field[])[0];
    if (first) {
      form.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const m = await submitLead({ ...values, nome: values.nome.trim(), email: values.email.trim(), origem });
      setMode(m);
      setStatus("done");
    } catch {
      setStatus("error");
      track("lead_error", { origem });
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-2">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-olive-950">
          <Icon name="check" size={28} strokeWidth={2} />
        </span>
        <p className="font-display text-3xl text-olive-900">
          {isPdf ? "Pronto! As plantas são suas." : `Obrigado, ${values.nome.split(" ")[0]}!`}
        </p>
        <p className="text-ink/80">
          {mode === "whatsapp"
            ? "Abrimos o WhatsApp para você concluir o atendimento com a Perin & Lima."
            : isPdf
              ? "Baixe agora o PDF com as plantas das três casas. Um consultor também vai falar com você."
              : "Recebemos seu contato. Um consultor da Perin & Lima vai falar com você em poucos minutos."}
        </p>
        {isPdf && (
          <a
            href={site.plantasPdf}
            download
            onClick={() => track("pdf_download")}
            className="btn btn-primary w-full sm:w-auto"
          >
            <Icon name="download" size={18} />
            Baixar plantas em PDF
          </a>
        )}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener"
          onClick={() => track("whatsapp_click", { local: `pos-lead-${origem}` })}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-olive-800 underline-offset-4 hover:underline"
        >
          <Icon name="whatsapp" size={18} />
          Prefere adiantar? Fale agora no WhatsApp
        </a>
      </div>
    );
  }

  const fields: { k: Field; label: string; ph: string; type: string; ac: string; im?: "tel" | "email" | "text" }[] = [
    { k: "nome", label: "Nome", ph: "Seu nome", type: "text", ac: "name" },
    { k: "whatsapp", label: "WhatsApp", ph: "(27) 9 0000-0000", type: "tel", ac: "tel-national", im: "tel" },
    { k: "email", label: "E-mail", ph: "seu@email.com", type: "email", ac: "email", im: "email" },
  ];

  const labelCls = tone === "dark" ? "text-cream/85" : "text-olive-900";

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {fields.map((f) => {
        const err = touched[f.k] ? errors[f.k] : undefined;
        const id = `${uid}-${f.k}`;
        return (
          <div key={f.k}>
            <label htmlFor={id} className={`mb-1.5 block text-sm font-semibold ${labelCls}`}>
              {f.label} <span aria-hidden="true" className="text-brick">*</span>
            </label>
            <input
              id={id}
              name={f.k}
              type={f.type}
              inputMode={f.im}
              autoComplete={f.ac}
              placeholder={f.ph}
              required
              value={values[f.k]}
              onChange={(e) => set(f.k, e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, [f.k]: true }))}
              aria-invalid={!!err}
              aria-describedby={err ? `${id}-err` : undefined}
              className={`h-[52px] w-full rounded-xl border bg-white px-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-olive-700 focus:ring-4 focus:ring-lime/30 ${
                err ? "border-brick" : "border-olive-900/20"
              }`}
            />
            {err && (
              <p id={`${id}-err`} role="alert" className={`mt-1.5 text-sm ${tone === "dark" ? "text-[#f3c9b4]" : "text-brick"}`}>
                {err}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-brick/10 p-3 text-sm text-brick">
          Não conseguimos enviar agora. Tente de novo ou{" "}
          <a href={waLink()} target="_blank" rel="noopener" className="font-semibold underline">
            fale direto no WhatsApp
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-2 w-full disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-olive-950/30 border-t-olive-950" />
            Enviando…
          </>
        ) : (
          <>
            {submitLabel}
            <Icon name="arrowRight" size={18} strokeWidth={2} />
          </>
        )}
      </button>
      <p className={`text-xs leading-relaxed ${tone === "dark" ? "text-cream/60" : "text-muted"}`}>
        Seus dados são usados apenas para o atendimento da Perin &amp; Lima sobre o Alameda Juruá.
      </p>
    </form>
  );
}

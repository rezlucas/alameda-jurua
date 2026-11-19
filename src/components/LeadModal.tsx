"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/lead";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

export function LeadModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [origem, setOrigem] = useState("plantas-pdf");
  const [key, setKey] = useState(0);

  useEffect(() => {
    const open = (e: Event) => {
      const o = (e as CustomEvent<{ origem: string }>).detail?.origem ?? "plantas-pdf";
      setOrigem(o);
      setKey((k) => k + 1);
      ref.current?.showModal();
      track("lead_modal_open", { origem: o });
    };
    window.addEventListener("open-lead-modal", open);
    return () => window.removeEventListener("open-lead-modal", open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto w-[min(94vw,480px)] max-h-[92dvh] overflow-auto rounded-[26px] bg-paper p-0 text-ink backdrop:bg-olive-950/80 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Fechar"
          className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-olive-900 hover:bg-olive-900/5"
        >
          <Icon name="close" size={22} />
        </button>
        <p className="eyebrow text-olive-600">Plantas em PDF</p>
        <h2 id="modal-title" className="display mt-3 pr-8 text-3xl text-olive-900">
          Receba as plantas <em>das três casas</em>
        </h2>
        <p className="mt-3 text-sm text-muted">
          Térreo, 2º pavimento e rooftop de cada casa, com a ficha técnica completa.
        </p>
        <div className="mt-6">
          <LeadForm key={key} origem={origem} submitLabel="Receber as plantas" />
        </div>
      </div>
    </dialog>
  );
}

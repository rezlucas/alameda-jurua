import { site, waLink } from "./site";

type Dict = Record<string, unknown>;
type W = Window & { dataLayer?: Dict[]; fbq?: (...a: unknown[]) => void };

const UTM_KEY = "aj_utm";
const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

export function track(event: string, params: Dict = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (event === "generate_lead") w.fbq?.("track", "Lead", params);
  else w.fbq?.("trackCustom", event, params);
}

/** Persists ad-campaign params from the landing URL for the whole session. */
export function captureUtms() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    UTM_FIELDS.forEach((k) => {
      const v = q.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch {
    /* storage unavailable */
  }
}

function getUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}");
  } catch {
    return {};
  }
}

export type Lead = { nome: string; whatsapp: string; email: string; origem: string };

/**
 * Sends the lead to NEXT_PUBLIC_LEAD_ENDPOINT. Uses a text/plain body so the
 * request is "simple" (no CORS preflight) — Zapier, Make and Apps Script parse it fine.
 * Without an endpoint, falls back to opening WhatsApp so no lead is ever lost.
 */
export async function submitLead(lead: Lead): Promise<"endpoint" | "whatsapp"> {
  const payload = {
    ...lead,
    ...getUtms(),
    empreendimento: site.name,
    pagina: window.location.href,
    enviadoEm: new Date().toISOString(),
  };

  if (site.leadEndpoint) {
    const res = await fetch(site.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Lead endpoint ${res.status}`);
    track("generate_lead", { origem: lead.origem });
    return "endpoint";
  }

  const msg =
    lead.origem === "plantas-pdf"
      ? `Olá! Sou ${lead.nome} e gostaria de receber as plantas do Alameda Juruá. E-mail: ${lead.email}`
      : `Olá! Sou ${lead.nome} e gostaria de agendar uma visita ao Alameda Juruá. E-mail: ${lead.email}`;
  window.open(waLink(msg), "_blank", "noopener");
  track("generate_lead", { origem: lead.origem, canal: "whatsapp-fallback" });
  return "whatsapp";
}

export function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
}

"use client";

import { useEffect } from "react";
import { captureUtms, track } from "@/lib/lead";
import { waLink } from "@/lib/site";
import { Icon } from "./Icon";

/** Fixed WhatsApp button (pre-filled message) + session UTM capture on boot. */
export function WhatsAppFloat() {
  useEffect(() => captureUtms(), []);
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp com a Perin & Lima"
      onClick={() => track("whatsapp_click", { local: "flutuante" })}
      className="rise fixed right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 active:scale-95 md:right-6 md:h-16 md:w-16"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))", "--d": "1200ms" } as React.CSSProperties}
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}

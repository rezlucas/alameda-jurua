import type { SVGProps } from "react";

const paths: Record<string, React.ReactNode> = {
  levels: (
    <>
      <path d="M4 20h16M6 20V9.5L12 5l6 4.5V20" />
      <path d="M9 20v-4h6v4M9 12.5h6" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18v-6.5A1.5 1.5 0 0 1 4.5 10h15a1.5 1.5 0 0 1 1.5 1.5V18M3 15h18M3 18v2M21 18v2" />
      <path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h9A1.5 1.5 0 0 1 18 7.5V10M8 10V8.5h3V10M13 10V8.5h3V10" />
    </>
  ),
  grill: (
    <>
      <path d="M4 10h16a8 8 0 0 1-16 0ZM7 17l-2 4M17 17l2 4M12 18v3" />
      <path d="M9 3c-.8 1 .8 2 0 3.2M12 2.5c-.8 1.2.8 2.3 0 3.7M15 3c-.8 1 .8 2 0 3.2" />
    </>
  ),
  area: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 9h3M4 14h3M9 4v3M14 4v3M10 14l4-4M14 14v-4h-4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" />
      <path d="m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </>
  ),
  sink: (
    <>
      <rect x="3" y="11" width="18" height="8" rx="1.5" />
      <path d="M7 14h10M12 11V6.5A2.5 2.5 0 0 1 14.5 4h0A2.5 2.5 0 0 1 17 6.5" />
    </>
  ),
  vanity: (
    <>
      <path d="M4 10h16v10H4zM12 10v10M9 14v2M15 14v2" />
      <path d="M8 10a4 2 0 0 1 8 0M12 5v3" />
    </>
  ),
  spa: (
    <>
      <path d="M3 13h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2Z" />
      <path d="M8 9c-1-1.2 1-2.2 0-3.5M12 9c-1-1.2 1-2.2 0-3.5M16 9c-1-1.2 1-2.2 0-3.5M7 20l-1 1.5M17 20l1 1.5" />
    </>
  ),
  ev: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="m10 8-2 4h3l-2 4M14 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-2-2" />
    </>
  ),
  ac: (
    <>
      <rect x="3" y="5" width="18" height="8" rx="1.5" />
      <path d="M6 10h12M7 16c.8 1 .8 2 0 3M12 16c.8 1 .8 2 0 3M17 16c.8 1 .8 2 0 3" />
    </>
  ),
  lock: (
    <>
      <rect x="6" y="3" width="9" height="18" rx="2" />
      <path d="M10.5 11h7a1.5 1.5 0 0 1 0 3h-7M8.5 17.5a2 2 0 0 1 4 0" />
    </>
  ),
  window: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M12 4v16M6.5 15 9 12.5M15.5 15l2.5-2.5" />
    </>
  ),
  glass: (
    <>
      <path d="M3 6h18M3 19h18M5 6v13M19 6v13" />
      <path d="m8 14 3-3M12 15l4-4" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.4 12 3 12 3Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  shop: (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </>
  ),
  tree: (
    <>
      <path d="M12 21v-6M12 15c-4 0-6-2.3-6-5a6 6 0 0 1 12 0c0 2.7-2 5-6 5Z" />
      <path d="m12 12-2-2M12 13l2.5-2.5" />
    </>
  ),
  road: (
    <>
      <path d="M8 3 4 21M16 3l4 18M12 4v3M12 10.5v3M12 17v3" />
    </>
  ),
  wave: (
    <>
      <path d="M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 19c2 0 2-1.5 4-1.5S8 19 10 19s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <circle cx="16" cy="7" r="3" />
    </>
  ),
  plane: (
    <path d="M10.5 13.5 4 12l-1 1.5 6 3 3 6 1.5-1-1.5-6.5 4.5-4.5c1.5-1.5 2.5-3.5 2-4.5-1-.5-3 .5-4.5 2L10.5 13.5ZM7 7l7.5 1.5M15.5 9.5 17 17" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r=".6" fill="currentColor" />
    </>
  ),
  map: (
    <>
      <path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4ZM9 4v13.5M15 6.5V20" />
    </>
  ),
};

export type IconName = keyof typeof paths | "whatsapp";

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  ...rest
}: { name: IconName | string; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...rest}>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

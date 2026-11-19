# Alameda Juruá Residencial — Landing page

Next.js 16 + Tailwind 4, exportação estática (`out/`), mobile-first.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera /out (pronto para Vercel, Netlify, S3, Hostinger…)
```

## Configuração (`.env.local`, ver `.env.example`)

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_LEAD_ENDPOINT` | Webhook que recebe os leads (Zapier, Make, RD Station, Apps Script). POST com JSON em corpo `text/plain` (sem preflight CORS). **Se vazio, o formulário abre o WhatsApp com os dados preenchidos** — nenhum lead se perde. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (opcional) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (opcional) — dispara `Lead` no envio |

Payload do lead: `nome, whatsapp, email, origem (agendar-visita | plantas-pdf), utm_*, gclid, fbclid, pagina, enviadoEm`.
Eventos no `dataLayer`: `generate_lead`, `whatsapp_click` (com `local`), `cta_click`, `planta_casa`, `planta_pavimento`, `planta_ampliar`, `pdf_download`, `maps_click`, `reels_nav`.

Textos, número de WhatsApp, destinos e áreas: `src/lib/site.ts`.

## Pendências de conteúdo

- **Retrato da Rachel Perin Luchi**: salvar em `public/media/img/rachel.webp` e ajustar `PORTRAIT` em `src/components/Arquiteta.tsx` (hoje o quadro mostra a suíte master, projeto dela).
- **Domínio**: atualizar `site.url` em `src/lib/site.ts` (usado no OG/SEO).
- **PDF das plantas** (`public/alameda-jurua-plantas.pdf`, 1,9 MB) é liberado após o cadastro. Foi gerado a partir do book (capa, plantas das 3 casas, ficha técnica e contato).

## Mídia

Tudo em `public/media`, gerado a partir de `assets/` (que não vai para o git):
- `video/` — hero (drone, 12 s, 1280p desktop / 720p vertical mobile) e reel do bairro; sem áudio, com poster. Não carregam com `prefers-reduced-motion` ou economia de dados; o render da fachada é o fallback.
- `img/` e `reels/` — renders do book em WebP responsivo (640/1280/1920) e recortes 9:16.
- `plantas/` — planta completa (desktop), recorte focado por casa (mobile) e versão HD para o zoom.
- `brand/` — logos vetoriais extraídos do book e do manual Perin & Lima.

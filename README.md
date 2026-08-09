# VHOX WRLD

Experiential React/Vite frontend for [vhoxwrld.com](https://vhoxwrld.com). VHOX is presented as an independent premium streetwear brand: original forms, selected materials and an exclusive visual language.

## Stack and deployment contract

- React 19 + TypeScript + Vite 6
- GSAP/ScrollTrigger and Lenis for restrained editorial motion
- Three.js for one code-split, proximity-loaded fiber study
- CSS variables and dedicated base, component and section layers
- Node.js 20, `npm ci`, `npm run build`, output `dist`

The WebGL chapter is not a purchasable product. It adapts particle density to the viewport and device, respects reduced motion and has a static fallback. Its chunk is requested only when the visitor approaches the chapter; there is no idle preload.

## Local development

```bash
npm ci
npm run dev
```

## Release verification

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm audit --omit=dev --audit-level=high
npm run preview
```

The production build must create `dist/index.html`.

## Product readiness and commerce safety

BAT, ROSE and VOID are currently editorial concept studies. They have no confirmed physical specification, price, approved media, variants or release status and therefore cannot be added to the bag.

`isProductPurchasable(product)` in `src/data/products.ts` is the single commerce gate. It requires:

- `availability: "available"`;
- a positive confirmed price;
- at least one approved media asset;
- confirmed size and color variants;
- confirmed construction/material information.

The cart revalidates stored lines on every load and removes obsolete, malformed or non-purchasable concepts. Checkout remains only an HTTPS handoff to an approved `VITE_SHOP_URL`; this repository contains no payment system, credentials or secret keys.

## Environment variables

Copy `.env.example` to `.env.local`. Every value is optional and public at build time:

```bash
VITE_SHOP_URL=https://approved-storefront.example
VITE_WAITLIST_URL=https://approved-waitlist.example
VITE_INSTAGRAM_URL=https://instagram.com/approved-profile
VITE_TIKTOK_URL=https://tiktok.com/@approved-profile
VITE_YOUTUBE_URL=https://youtube.com/@approved-channel
```

Only valid HTTPS URLs are accepted. Without a waitlist URL the Inner Circle shows `REGISTRATION PENDING`; it never simulates a successful submission. Without approved social URLs the footer and community chapter show `APPROVED CHANNELS PENDING`.

## Experience and content model

- Session-only V H O X loader with reduced-motion handling.
- Responsive navigation whose menu contains one brand mark only.
- Scroll-linked BAT / ROSE / VOID campaign and particle fiber study.
- Interactive five-tone near-black digital material system with light, angle and distance controls.
- Existing embroidery, textile, seam and silhouette construction studies preserved below it.
- Concept-safe collection cards and product routes.
- Centralized route metadata, canonical URL, Open Graph URL and robots policy.
- EN/ES/PT/FR typed translations.

Primary content sources:

- `src/data/products.ts` — product and concept records plus readiness gate.
- `src/data/materialStudies.ts` — the five digital near-black studies.
- `src/data/editorial.ts` — campaign chapters and construction studies.
- `src/i18n/translations.ts` — all interface copy.
- `src/seo/metadata.ts` — route metadata policy.
- `src/cart/cartPersistence.ts` — stored-cart validation.

The material simulator is explicitly a digital color/light study. It does not claim that dyes, textiles, finishes or physical samples have been approved.

Supported routes:

- `/` — indexable campaign homepage.
- `/product/:slug` — concept/product detail; current concepts are `noindex, follow`.
- `/cart` — local bag and future handoff layer; `noindex, follow`.
- unknown routes — branded 404 experience; `noindex, follow`.

See [ASSET_GUIDE.md](./ASSET_GUIDE.md), [AUDIT_VHOX.md](./AUDIT_VHOX.md) and [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md).

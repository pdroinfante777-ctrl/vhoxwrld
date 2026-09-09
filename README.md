# VHOX WRLD

Editorial React/Vite storefront foundation for [vhoxwrld.com](https://vhoxwrld.com). The current campaign is **Chromatic Black**: garments that read as black from a distance and reveal distinct dark tones under light.

## Stack and deployment contract

- React 19 + TypeScript + Vite 6
- GSAP/ScrollTrigger and Lenis remain available for restrained editorial motion
- Existing Three.js source and dependency are preserved for future approved work, but no WebGL or particle scene is mounted on the public homepage
- Manrope Variable plus Cormorant Garamond Variable (normal and italic), limited to three Latin WOFF2 files
- CSS variables and dedicated base, component, section and luxury-house layers
- Node.js 20, `npm ci`, `npm run build`, output `dist`

The public experience is product-led and image-led. It intentionally avoids simulators, particles and futuristic interface effects so the garments, material depth and campaign direction remain central.

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

DROP 001: SIGNAL contains three planned pieces: SIGNAL CORE TEE, NIGHT BLOOM TEE and CRYSTAL SIGNAL TEE. Existing imagery is campaign-study material, not approved product photography. Product specifications, prices, variants and release remain pending; purchases are disabled.

`isProductPurchasable(product)` in `src/data/products.ts` is the single commerce gate. It requires:

- `availability: "available"`;
- a positive confirmed price;
- explicit launch approval and at least one approved product media asset;
- confirmed size and color variants;
- confirmed materials, fabric weight, construction, fit, size guide, care, delivery and returns information;
- a confirmed product code and safe approved purchase destination.

The cart revalidates stored lines on every load and removes obsolete, malformed or non-purchasable concepts. Checkout remains only an HTTPS handoff to an approved `VITE_SHOP_URL`; this repository contains no payment system, credentials or secret keys.

## Environment variables

Copy `.env.example` to `.env.local`. Every value is optional and public at build time:

```bash
VITE_SHOP_URL=https://approved-storefront.example
VITE_WAITLIST_URL=https://approved-waitlist.example
VITE_INSTAGRAM_URL=https://instagram.com/approved-profile
VITE_TIKTOK_URL=https://tiktok.com/@approved-profile
VITE_YOUTUBE_URL=https://youtube.com/@approved-channel
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_ANALYTICS_CONSENT=denied
VITE_GOOGLE_SITE_VERIFICATION=verification-token-only
```

Only valid HTTPS URLs are accepted. Without a waitlist URL the Inner Circle shows `REGISTRATION PENDING`; it never simulates a successful submission. Without approved social URLs the footer and community chapter show `APPROVED CHANNELS PENDING`.

## Experience and content model

- Session-only V H O X loader with reduced-motion handling.
- Full-bleed Chromatic Black campaign cover with the line “From a distance, black. Up close, VHOX.”
- Editorial chapters for the near-black palette, tonal studies, garment detail, collection and campaign.
- Responsive navigation and mobile overlay with one official brand mark.
- Restrained image reveals and hover motion; touch and reduced-motion modes remain fully usable.
- All ten approved ZIP assets live in `public/chromatic-black/` and declare intrinsic dimensions to prevent layout shift.
- Concept-safe collection cards and indexable collection-study routes without unverified `Product` schema.
- Existing cart validation, HTTPS store handoff, waitlist, analytics consent, routing, policies and translations remain intact.
- Unique route metadata, absolute canonical URLs, campaign Open Graph imagery, breadcrumbs and JSON-LD.
- Build-time SEO generation for `sitemap.xml`, `robots.txt`, `llms.txt` and prerendered route heads.
- EN/ES/PT/FR typed translations.

Primary content sources:

- `src/data/products.ts` — product and concept records plus readiness gate.
- `src/data/chromaticBlack.ts` — localized Chromatic Black campaign copy.
- `src/sections/ChromaticBlack.tsx` — campaign, palette, detail and collection composition.
- `src/data/editorial.ts` — campaign chapters and construction studies.
- `src/i18n/translations.ts` — all interface copy.
- `src/seo/metadata.ts` — route metadata policy.
- `src/cart/cartPersistence.ts` — stored-cart validation.

Chromatic Black is presented as the approved visual direction. Product specifications remain explicitly pending until physical material, fit and construction information is supplied and approved.

Supported routes:

- `/` — indexable campaign homepage.
- `/collections/` — indexable DROP 001: SIGNAL overview with visible FAQ.
- `/collections/signal-core-tee/`, `/collections/night-bloom-tee/`, `/collections/crystal-signal-tee/` — planned-piece previews, `noindex, follow`, excluded from the sitemap.
- Former BAT / ROSE / VOID paths under `/collections/` and `/product/` — permanent redirects to `/collections/` on Apache; local client fallback provided.
- `/journal/` — indexable editorial hub.
- `/manifesto/` — indexable long-form house manifesto with In Brief and table of contents.
- `/cart/` — local bag and future handoff layer; `noindex, follow`.
- `/product/:slug` — permanent 301 migration to the corresponding `/collections/:slug/` route.
- unknown routes — branded 404 experience; `noindex, follow`.

See [SEO_AUDIT.md](./SEO_AUDIT.md), [ASSET_GUIDE.md](./ASSET_GUIDE.md), [AUDIT_VHOX.md](./AUDIT_VHOX.md) and [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md).

Current continuation evidence and PR review order: [VALIDATION_SIGNAL.md](./VALIDATION_SIGNAL.md). Node 20.20.2 / npm 10.9.2 clean installation, typecheck, lint, 38 tests, production build and both dependency audits passed on 2026-09-09. This does not constitute a production deployment or confirmation of Hostinger's actual runtime.

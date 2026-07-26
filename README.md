# VHOX WRLD

Experiential frontend for [vhoxwrld.com](https://vhoxwrld.com), built as a static React application with Vite and TypeScript. VHOX is presented as an independent premium streetwear brand with original design, selected materials and a distinct visual language.

The visual system is monochrome, industrial and editorial, with one configurable accent (`--color-accent` in `src/styles/base.css`).

## Stack

- React 19 + TypeScript
- Vite 6
- GSAP + ScrollTrigger for editorial and scroll-linked motion
- Lenis for restrained smooth scrolling
- Three.js for one deferred, procedural fiber study
- CSS variables and separated base, component and section styles

Three.js remains code-split, but its particle targets are prepared during browser idle time so the white-manifesto-to-black-study transition does not pause. The scene adapts particle count and scale to phone, tablet, desktop, orientation and constrained devices. It does not represent a product for sale and falls back to a static garment study when WebGL or motion is unavailable.

## Requirements

- Node.js 20
- npm 10+

## Local development

```bash
npm ci
npm run dev
```

The Vite development server is available on the URL printed in the terminal, normally `http://localhost:5173`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

The production build is written to `dist/`.

## Commerce and social destinations

Copy `.env.example` to `.env.local` and replace the public placeholders:

```bash
VITE_SHOP_URL=https://approved-storefront.example
VITE_INSTAGRAM_URL=https://instagram.com/approved-vhox-profile
VITE_TIKTOK_URL=https://tiktok.com/@approved-vhox-profile
VITE_YOUTUBE_URL=https://youtube.com/@approved-vhox-channel
```

Product CTAs use the local, persistent VHOX bag. The bag stores only product IDs, selected variants and quantities in the visitor's browser. Checkout is enabled only when an approved `VITE_SHOP_URL` and confirmed product prices exist; this repository contains no credentials, payment logic or secret keys.

Supported routes:

- `/` — experiential campaign homepage
- `/product/:slug` — modular product detail and media gallery
- `/cart` — local bag and handoff layer for a future approved storefront
- every unknown route — branded 404 fallback

## Experience

- Session-only sequential V H O X loader with reduced-motion handling
- Cinematic BAT / ROSE / VOID campaign sequence with manual controls, a pause control and cursor light for precise pointers
- Scroll-controlled fiber morph: VHOX bat → oversized T-shirt → cap → hoodie → VHOX signal
- `BEYOND FORM` manifesto and asymmetric DROP 001 chapters
- Macro construction studies for embroidery, textile, seam and silhouette
- Editorial product cards with media swap, desktop tilt and direct product routes
- Keyboard- and swipe-ready product gallery with thumbnails, arrows and an accessible lightbox when approved media exists
- Local modular bag with quantity controls, live counter and no simulated payment flow
- Related-product module titled `COMPLEMENTA EL ECOSISTEMA`
- Immersive VHOX WRLD chapter, three-column journal and private-access interface
- Responsive mobile menu, keyboard support, motion fallbacks and static 404/legal pages

## Content model

- `src/data/products.ts` holds product media, pricing, variants, care, shipping, availability and purchase links.
- `src/data/editorial.ts` defines the BAT / ROSE / VOID hero sequence, DROP 001 chapters, construction studies and journal entries.
- `src/data/lookbook.ts` defines editorial image/video placements.
- `src/data/categories.ts` defines the apparel category index.
- `src/data/research.ts` holds garment research themes.
- `src/i18n/translations.ts` is the typed EN/ES/PT/FR copy source.
- `src/commerce/currency.ts` contains the centralized temporary USD/MXN/EUR display rates, their date and provider label.
- Product and editorial placeholders are explicit. They do not claim to be real releases, photography, specifications or customer statements.
- The private-access form is a validated interface only. Connect an approved mailing provider before expecting live registrations.
- `public/policies.html` and `public/terms.html` are temporary legal-copy placeholders and must be replaced with approved copy before commerce activation.

See [ASSET_GUIDE.md](./ASSET_GUIDE.md) before adding logos, product photography or lookbook media.

## Language and displayed currency

The interface detects EN, ES, PT or FR from the browser, persists the visitor's manual choice and updates the document language, title and description. Language and currency selectors are available in desktop navigation, the mobile menu and the footer.

Product prices are stored in USD as the commerce base. The selected USD, MXN or EUR value is a display estimate produced from the centralized local table in `src/commerce/currency.ts`. These temporary rates are deliberately labeled as reference values in product and cart UI; the authorized external storefront remains responsible for the final checkout currency and amount. Replace the local provider with a reviewed exchange-rate service before activating live priced commerce.

## Deployment

See [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md) for the exact Hostinger Web Apps configuration, preview checklist, logs and rollback procedure.

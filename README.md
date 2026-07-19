# VHOX WRLD

Experiential frontend for [vhoxwrld.com](https://vhoxwrld.com), built as a static React application with Vite and TypeScript. The visual system is intentionally monochrome, industrial and editorial, with one configurable accent (`--color-accent` in `src/styles/base.css`).

## Stack

- React 19 + TypeScript
- Vite 6
- GSAP + ScrollTrigger for editorial motion
- Lenis for restrained smooth scrolling
- CSS variables and separated base, component and section styles

Three.js is intentionally excluded from this version. There is no approved 3D asset in the repository, and the lightweight CSS composition provides the intended depth without blocking the first render or adding a WebGL dependency.

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
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Commerce destination

Copy `.env.example` to `.env.local` and replace the placeholder with the approved storefront URL:

```bash
VITE_SHOP_URL=https://approved-storefront.example
```

Every shop and collection CTA reads this variable. If it is missing or invalid, CTAs safely fall back to `#collection`. No credentials or payment logic are stored in this repository.

## Content model

- `src/data/products.ts` holds temporary collection records and fields for future media, price, variants, availability and purchase links.
- `src/data/lookbook.ts` defines future editorial image/video placements.
- `src/data/research.ts` holds the research index.
- Product, lookbook and testimonial placeholders are explicit. They do not claim to be real releases, photography or customer statements.
- `public/policies.html` and `public/terms.html` are transparent legal-copy placeholders and must be replaced by approved copy before commerce activation.

## Deployment

See [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md) for the exact Hostinger Web Apps configuration, preview checklist, logs and rollback procedure.

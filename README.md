# VHOX WRLD

Experiential frontend for [vhoxwrld.com](https://vhoxwrld.com), built as a static React application with Vite and TypeScript. VHOX is presented as a custom apparel movement—T-shirts, caps, footwear and future forms—not as a technology company.

The visual system is monochrome, industrial and editorial, with one configurable accent (`--color-accent` in `src/styles/base.css`).

## Stack

- React 19 + TypeScript
- Vite 6
- GSAP + ScrollTrigger for editorial and scroll-linked motion
- Lenis for restrained smooth scrolling
- Three.js for one deferred, procedural fiber study
- CSS variables and separated base, component and section styles

Three.js is dynamically loaded only as the fiber-study section approaches the viewport. The scene uses fewer particles on mobile, does not represent a product for sale, and falls back to a static garment study when WebGL or motion is unavailable.

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

## Commerce and social destinations

Copy `.env.example` to `.env.local` and replace the public placeholders:

```bash
VITE_SHOP_URL=https://approved-storefront.example
VITE_INSTAGRAM_URL=https://instagram.com/approved-vhox-profile
```

Every commerce CTA reads `VITE_SHOP_URL`. If it is missing or invalid, CTAs safely fall back to `#collection`. No credentials, payment logic or secret keys are stored here.

## Experience

- Session-only sequential V H O X loader with reduced-motion handling
- Cinematic campaign hero and cursor light for precise pointers
- Scroll-controlled fiber morph: field → T-shirt → cap → VHOX signal
- Movement manifesto and apparel categories
- Product cards with media swap, desktop tilt and accessible detail dialog
- Asymmetric lookbook with future image/video and lightbox support
- Garment research, customization workflow, community channels and verified-testimonial slots
- Responsive mobile menu, keyboard support, motion fallbacks and static 404/legal pages

## Content model

- `src/data/products.ts` holds product media, pricing, variants, care, shipping, availability and purchase links.
- `src/data/lookbook.ts` defines editorial image/video placements.
- `src/data/categories.ts` defines the apparel category index.
- `src/data/research.ts` holds garment research themes.
- Product, lookbook and testimonial placeholders are explicit. They do not claim to be real releases, photography or customer statements.
- `public/policies.html` and `public/terms.html` are temporary legal-copy placeholders and must be replaced with approved copy before commerce activation.

See [ASSET_GUIDE.md](./ASSET_GUIDE.md) before adding logos, product photography or lookbook media.

## Deployment

See [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md) for the exact Hostinger Web Apps configuration, preview checklist, logs and rollback procedure.

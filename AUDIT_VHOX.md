# VHOX architecture, security and experience audit

Audit date: 2026-08-31  
Audited baseline: `origin/main` at `dc5cb27`  
Canonical origin: `https://vhoxwrld.com`  
Deployment contract: Hostinger static Web App, `main`, Node 20.x, npm 10.9.2, `npm ci`, `npm run build`, output `dist`

## Executive summary

The repository is a React 19 + TypeScript + Vite 6 single-page application. It is not Next.js. It has a small pathname router, localized copy, a guarded local cart, route metadata, generated crawl files and a static Hostinger deployment contract.

The approved Chromatic Black campaign already gives the homepage a strong product-led direction, but the public information architecture still exposes the former BAT / ROSE / VOID system. That conflicts with the approved source of truth: DROP 001 — SIGNAL and SIGNAL CORE TEE, NIGHT BLOOM TEE and CRYSTAL SIGNAL TEE. The product system correctly blocks commerce while specifications are unknown, but several visual captions still imply unverified material or construction details.

The full dependency audit initially reported five vulnerable package groups: one critical, three high and one moderate. Hostinger's preceding automated commit changed the Vitest range in `package.json` without regenerating `package-lock.json`; a clean tree still installed the vulnerable versions. The security phase must update compatible parent packages, regenerate the lockfile and verify both complete and production-only trees.

## 1. System architecture

### Real stack

| Layer | Current implementation |
| --- | --- |
| Runtime contract | Node 20.x (`.nvmrc` and `engines`); npm 10.9.2 (`packageManager`) |
| Local audit runtime | Node 24.18.0 / npm 11.16.0; useful for inspection but not proof of Hostinger's exact runtime |
| UI | React 19 + React DOM 19 |
| Build | Vite 6 + TypeScript project references |
| Motion | GSAP and Lenis; reduced-motion hook |
| Legacy visual source | Three.js source remains but is not mounted on the public homepage |
| Testing | Vitest |
| Lint | ESLint flat config + typescript-eslint |
| Hosting | Static `dist` deployed by Hostinger; Apache rules in `public/.htaccess` |

No `.openai/hosting.json`, Next.js configuration, server entry, API route, database adapter or server-side session exists.

### Application flow

```text
index.html
  → src/main.tsx
    → LocaleProvider / CurrencyProvider / CartProvider
      → src/App.tsx pathname router
        → shared Loader / Navigation / Footer
        → route page
        → route metadata + analytics event policy
```

Product records in `src/data/products.ts` drive collection cards, product detail, related products, cart validation and analytics payloads. `isProductPurchasable` is the central safety gate. The cart persists only sanitized, currently purchasable product lines in local storage. No payment is processed in this repository; an approved HTTPS destination is required for checkout handoff.

### Reusable components

- Identity/navigation: `BrandMark`, `Navigation`, `Footer`, `MarketControls`, `Loader`.
- Commerce: `ProductCard`, `ProductGallery`, `ProductDetailDialog`, `RelatedProducts`, `MobileStickyCta`, cart context and persistence.
- Editorial/SEO: `Breadcrumbs`, `SectionHeading`, `ShareButton`, `StructuredData`.
- Motion/accessibility: reduced-motion hook, Lenis hook and GSAP page/section utilities.
- Campaign: `Hero` plus Chromatic Black story, studies, detail, collection and campaign chapters.

Several older section and Three.js modules are not mounted by `App.tsx`. They increase maintenance surface and create misleading search results during audits, but removing them should remain a separate reviewed cleanup because tests and future work reference parts of them.

## 2. Site map and hierarchy

### Existing public routes

| Route | Purpose | Indexing baseline | Audit result |
| --- | --- | --- | --- |
| `/` | Chromatic Black campaign home | index, follow | Strong visual desire; SIGNAL not identified above the fold |
| `/collections/` | Concept overview | index, follow | Still framed around BAT / ROSE / VOID; conflicts with approved drop |
| `/collections/bat/` | Former concept detail | index, follow | Unapproved public product name |
| `/collections/rose/` | Former concept detail | index, follow | Unapproved public product name |
| `/collections/void/` | Former concept detail | index, follow | Unapproved public product name |
| `/journal/` | Editorial hub | index, follow | Useful trust layer; some legacy content keys require copy cleanup |
| `/manifesto/` | Brand philosophy | index, follow | Appropriate if kept concise and product-adjacent |
| `/cart/` | Local bag / future handoff | noindex, follow | Safely empty while no product is approved |
| `/policies.html` | Draft policy placeholder | noindex expected | Must remain visibly draft until legal approval |
| `/terms.html` | Draft terms placeholder | noindex expected | Must remain visibly draft until legal approval |
| unknown | Branded 404 | noindex, follow | Correct real 404 fallback through Apache |

### Required hierarchy

1. Home: VHOX + DROP 001 — SIGNAL + Chromatic Black + primary collection CTA.
2. SIGNAL collection: the three approved planned names, each clearly marked as preview or pending when commercial data is incomplete.
3. Product preview: imagery, confirmed information and explicit pending fields; never simulated purchase.
4. Journal and Manifesto: evidence of material thinking and brand discipline, not technology fiction.
5. Inner Circle / contact: truthful route to confirmed release information.

Legacy BAT / ROSE / VOID URLs should permanently redirect to `/collections/` and leave the sitemap, internal links and structured data.

## 3. Assets

### Available campaign assets

- Official logo and header identity in `public/brand/`.
- Ten Chromatic Black campaign images in `public/chromatic-black/`.
- One coming-soon architecture image in `public/campaign/`.
- Local Manrope and Cormorant Garamond variable fonts.
- Generated favicon family and web manifest.

### Asset risks

- The repository does not contain provenance metadata mapping each campaign image to a confirmed SIGNAL product.
- Existing product cards treat any configured media path as approved product media. Media should distinguish campaign/reference media from commerce-approved product media.
- Several product images use `cover`; this is acceptable for campaign cards but not for a full product proof view when the crop removes garment edges.
- No image pipeline generates AVIF/WebP variants. Existing JPEGs are usable but should be reviewed for file weight and responsive sources before a high-traffic launch.

## 4. Information architecture and hardcodes

Important hardcodes found:

- BAT / ROSE / VOID names, slugs, URLs, analytics IDs and SEO text across product data, routes, footer, collection page, SEO configuration and generated crawl files.
- English-only labels inside several SEO and product components.
- Canonical domain and public contact address, intentionally stable.
- Campaign image paths and intrinsic dimensions in the Chromatic Black section.
- Pending policy copy in static HTML.

The approved source of truth is recorded in `VHOX_Master_Brief_v1.md`. All public product and route data should derive from the SIGNAL taxonomy.

## 5. Commerce, authentication and integrations

### Cart and checkout

- Local cart state is guarded by `isProductPurchasable`.
- Stored lines are parsed, revalidated and clamped to a maximum quantity.
- No current product passes the readiness gate; add-to-cart controls remain unavailable.
- Checkout is only an external HTTPS handoff when `VITE_SHOP_URL` is approved and all cart prices are confirmed.

### Current integrations

- Optional approved HTTPS waitlist URL.
- Optional approved social profile URLs.
- Optional consent-gated GA4 and Search Console verification token.
- No CMS, commerce API, payment processor, email service or inventory source is connected.

### Actual platform needs

- Authentication: not needed for the current discovery and waitlist experience.
- Database: not needed until VHOX owns inventory, orders or customer records in this application.
- CMS: optional later for Journal and release operations; current typed local data is adequate for the present catalog size.
- Commerce API: required before real purchase, price, stock and fulfillment states can be enabled.
- Server/API: required only if VHOX accepts form submissions directly; the current external waitlist handoff avoids pretending a local form succeeds.

## 6. Security baseline

### Dependency tree before correction

```text
eslint 9.39.5
├─ @eslint/eslintrc 3.3.6 → js-yaml 4.3.0
└─ minimatch 3.1.5 → brace-expansion 1.1.16
typescript-eslint 8.64.0
└─ minimatch 10.2.5 → brace-expansion 5.0.7
vite 6.4.3
├─ esbuild 0.25.12
└─ postcss 8.5.19 → nanoid 3.3.16
vitest 3.2.4 (invalid against the patched manifest range)
```

Initial full `npm audit`: 1 critical, 3 high, 1 moderate across 5 package groups. Production-only audit: 0 vulnerabilities. Although these packages are build/dev dependencies and are not shipped as runtime modules in the static site, the build chain must still be corrected.

### Static security findings

- No tracked secrets, credentials or private keys were found.
- `.env.example` is tracked; real `.env*` files are ignored.
- No `dangerouslySetInnerHTML`, `eval`, dynamic function construction or unsanitized HTML rendering was found.
- Structured data escapes `<` before writing JSON into a script element.
- Local storage contains only cart, locale and currency; session storage contains only the loader flag.
- No local submission form exists, so there is no current spam endpoint.
- Public build source maps are disabled.
- External links use `rel="noreferrer"`; add explicit `noopener` for defense in depth.
- `VITE_*` values are correctly documented as public build-time values, never secrets.
- `src/config/shop.ts` accepts external HTTP URLs; external commerce handoff must require HTTPS.
- `public/.htaccess` lacks security headers.
- GA consent is a build-time flag, not a user-controlled consent mechanism. Keep it denied until an approved consent flow exists.

## 7. SEO status

Strengths:

- Unique route metadata model, absolute canonicals, one H1 per route and route-specific robots policy.
- Generated sitemap, robots and `llms.txt`.
- Organization/Brand/WebSite, breadcrumb, article, collection and FAQ structured data without fake reviews or offers.
- Legacy `/product/:slug` migration pattern and branded real 404.

Required corrections:

- Remove BAT / ROSE / VOID from titles, descriptions, sitemap, `llms.txt`, schemas and internal links.
- Add SIGNAL collection and planned product routes to the canonical model.
- Keep planned product previews `noindex` until unique, useful, confirmed product content exists, or index them only as clearly labeled editorial previews with no Product/Offer schema.
- Preserve the exact core message and avoid unconfirmed performance claims.

## 8. Customer journey audit

### Route A — first discovery

`Home hero → SIGNAL collection → product preview → confirmed details/pending fields → Inner Circle`

Baseline problem: the hero explains Chromatic Black but does not identify SIGNAL; collection links lead to former concept names.

### Route B — product-intent visitor

`Collection landing → product imagery → fit/material/size/delivery questions → buy or release-information state`

Baseline problem: imagery creates interest, but every important buying field is pending. The interface must organize unknowns honestly and avoid implying approved product media or availability.

### Route C — trust-building visitor

`Hero → Chromatic Black proof → detail imagery → Journal/Manifesto → policies/contact → Inner Circle`

Baseline problem: trust is weakened when copy implies heavyweight construction, nylon, embroidery or other specifications that are not confirmed.

## 9. Visual, responsive and accessibility risks

- Hero typography is responsive, but mobile landscape and very small widths require direct browser verification after copy changes.
- The collection/card system must switch to product-safe image treatment and avoid garment cropping.
- The mobile menu has focus trapping, Escape handling, scroll locking and ARIA state; it still needs interaction verification at 320, 390, tablet and landscape sizes.
- The sticky CTA must not overlap content or safe areas.
- Focus visibility exists globally, but every custom control and dialog must be keyboard-tested.
- Reduced motion is implemented globally and per hero; new motion must inherit it.
- Some legacy CSS and unmounted components contain technological/neon presentation. They are not currently public, but should not be reintroduced.

## 10. Performance risks

- Hero image is eagerly loaded and preloaded, which is appropriate for LCP but must be measured at mobile sizes.
- Later campaign images are lazy loaded with intrinsic dimensions.
- GSAP and Lenis are part of the main experience; verify bundle size and avoid animation work off screen.
- Three.js is not mounted and should not be loaded in the public bundle.
- Static SPA navigation produces full page loads for links; acceptable for current scope, but route payload and cache behavior should be measured.
- Large JPEGs should receive responsive variants when original product photography is approved.
- Global CSS still contains historical sections; route-level or feature-level splitting is a later optimization.

## 11. Small, verifiable implementation plan

1. Audit and source of truth: record architecture, risks, SIGNAL taxonomy and approval gates.
2. Security: update compatible parent packages, regenerate lockfile, add safe headers and HTTPS-only handoffs, document the withdrawn esbuild alert.
3. Design tokens: formalize restrained color, type, spacing, image and state tokens without changing the logo.
4. Visual structure: make the hero and home journey explicitly product- and SIGNAL-led.
5. Copy/conversion: remove legacy names and unconfirmed claims across four locales; add truthful buying questions and pending states.
6. Interactions: preserve navigation, cart safety, share and waitlist behavior; verify keyboard and reduced motion.
7. SEO: migrate routes, metadata, schemas, sitemap, robots and `llms.txt` to SIGNAL.
8. Final QA: clean install, audits, typecheck, lint, tests, build, local browser matrix, links, images, console and documentation.

Each layer must remain a focused commit or stacked PR so it can be reviewed and reverted independently. No production merge or Hostinger change is part of this work.

## Continuación verificada — 2026-09-09

La arquitectura permanece en React 19 / Vite 6 / TypeScript. La estructura SIGNAL, contenidos, interacciones, rutas y validación se continuaron en PR separados a partir del trabajo existente. El estado vigente, evidencia, archivos modificados y pendientes están en VALIDATION_SIGNAL.md. SECURITY_AUDIT.md incluye el nuevo control de septiembre y las auditorías completas y de producción en cero. La metodología del usuario se conserva íntegra en METHODOLOGY_VHOX.md y complementa el brief maestro; no autoriza cambios automáticos de producción.

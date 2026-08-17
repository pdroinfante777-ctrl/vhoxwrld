# VHOX WRLD — technical and content SEO audit

Audit scope: React/Vite repository, production route model, semantic content, crawl controls, structured data, measurement readiness, accessibility and responsive presentation. Canonical origin: `https://vhoxwrld.com`.

## Architecture found

- React 19 + TypeScript + Vite 6, rendered as a client-side SPA.
- Lightweight pathname router in `src/App.tsx`; no React Router, SSR or server application.
- CSS split into base, components, sections, luxury and SEO editorial layers.
- GSAP, Lenis and one deferred Three.js chapter remain intact.
- Build now prerenders a unique `<head>` for every known route while React renders the interactive body.
- No `.openai/hosting.json` exists, so the Hostinger `dist` deployment contract remains authoritative.
- `/page/` does not exist in source, build output or routing; no noindex change was necessary.

## Recommendation status

| # | Recommendation | Status | Implementation |
| --- | --- | --- | --- |
| 1 | Unique meta titles | Implemented | Unique route data in `seo.config.mjs` and localized client metadata in `src/seo/content.ts`. |
| 2 | Unique meta descriptions | Implemented | Every indexable route has a content-specific description and proposition. |
| 3 | One H1 per page | Implemented | Home, collection, Journal, Manifesto, study, cart and 404 routes each render one H1. |
| 4 | H1 differs from title | Implemented | Editorial H1 copy is separate from search-oriented titles. |
| 5 | Search intent | Implemented | Brand discovery, collection exploration, editorial information, identity/trust and support are separated by route. |
| 6 | Key Takeaways | Implemented | The long-form Manifesto has a visible `In brief` block; it is not forced onto short routes. |
| 7 | Table of contents | Implemented | Manifesto TOC follows the introduction and uses fixed-header scroll offsets; short Journal hub intentionally has none. |
| 8 | Contextual early CTA | Implemented | Collection, Journal and Manifesto use different contextual CTAs after their introduction. |
| 9 | Heading hierarchy | Implemented | Page H1, section H2 and card/subsection H3 structure audited and preserved visually with CSS. |
| 10 | Internal links/clusters | Implemented | Home, collection studies, Journal, Manifesto, details, Inner Circle, policies and related studies interlink with descriptive labels. |
| 11 | Semantic tables/lists | Implemented | Collection readiness table, study readiness table and Manifesto summary list; unknown data is explicitly pending. |
| 12 | Useful FAQ | Implemented | Visible collection FAQ covers availability, materials/sizing, restock status and official release information without invented policy. |
| 13 | FAQPage schema | Implemented | One route-specific JSON-LD graph mirrors the visible collection FAQ exactly. |
| 14 | Descriptive image names | Implemented | Existing public assets already use descriptive VHOX names; no live reference required a risky rename. |
| 15 | Alt text | Implemented | Informative campaign/logo media are named; decorative bat and geometry assets use empty alt; campaign alt follows locale. |
| 16 | Business schema | Implemented | `Organization`, `Brand` and `WebSite`; no LocalBusiness/address/phone or unverified OnlineStore claim. |
| 17 | robots.txt | Implemented | Public crawl allowed, cart disallowed, assets untouched and absolute sitemap declared. |
| 18 | Clean URLs | Implemented | Canonical `/collections/:slug/` routes; legacy `/product/:slug` paths receive one 301. |
| 19 | `/page/` noindex | Not applicable | Route/subfolder absent; documented here and excluded from sitemap by construction. |
| 20 | `llms.txt` | Implemented | Public brand description, canonical sections, collection-study truth status, policies and official contact. |
| 21 | Mobile sticky CTA | Implemented | Collection and study routes only; uses private-access context while commerce remains unconfirmed and respects safe areas. |
| 22 | Share button | Implemented | Web Share API plus clipboard fallback, canonical URL, accessible live confirmation and GA4 share event. |
| 23 | Google Analytics 4 | Implemented / activation pending | Consent-gated loader, SPA pageviews and real interaction events. Requires approved ID and consent state. |
| 24 | Google Search Console | Implemented / verification pending | Build and runtime accept a verification token. Authenticated verification still must be completed externally. |
| 25 | Automated sitemap | Implemented | Generated during every production build from canonical public route data; no fake dates, frequencies or priorities. |
| 26 | Submit sitemap | Pending external | Resource is ready at `https://vhoxwrld.com/sitemap.xml`; authenticated Search Console submission is not falsely claimed. |

## Audited public pages and metadata

| URL | Title | Description |
| --- | --- | --- |
| `/` | VHOX — Exclusive Movement \| Premium Streetwear | Enter VHOX WRLD: an independent streetwear house exploring near-black material, exact form and movement through BAT, ROSE and VOID. |
| `/collections/` | BAT, ROSE & VOID — VHOX Collection Studies | Explore BAT, ROSE and VOID, three VHOX concept studies shaped by nocturnal identity, controlled tension and near-black depth. |
| `/collections/bat/` | BAT — Nocturnal Form Study \| VHOX | Explore BAT, the original VHOX signal; physical product specifications remain pending approval. |
| `/collections/rose/` | ROSE — Controlled Tension Study \| VHOX | Explore ROSE, a VHOX contrast study; commercial release details remain pending. |
| `/collections/void/` | VOID — Near-Black Depth Study \| VHOX | Explore VOID, a VHOX near-black depth study; physical validation remains pending. |
| `/journal/` | VHOX Journal — Design, Identity & Beyond Form | Read VHOX field notes on symbols, construction, material language and the identity behind Beyond Form. |
| `/manifesto/` | VHOX Manifesto — An Independent Streetwear Language | Discover the VHOX manifesto: a disciplined language of near-black material, exact form and identity without compromise. |

`/cart/`, `/policies.html`, `/terms.html` and 404 responses are `noindex, follow`. BAT, ROSE and VOID are indexable editorial studies, but they receive no `Product` schema until price, currency, availability, media, material and variants are commercially verified.

## Structured data

- Site-wide `Organization`, `Brand` and `WebSite` graph using the official logo and public contact email.
- `BreadcrumbList` on Collection, Journal, Manifesto and study routes.
- `CollectionPage` + `ItemList` for the BAT / ROSE / VOID overview.
- `FAQPage` only on the route where the same questions and answers are visible.
- `Article` for the long-form Manifesto.
- Deliberately absent: `LocalBusiness`, fake address, unverified `OnlineStore`, review/rating and premature `Product`/`Offer` data.

## GA4 measurement design

Configured events: `page_view`, `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `generate_lead` and `share`. The analytics helper also reserves the standard `purchase` and `sign_up` event names, but does not emit them because the repository has no real purchase or live sign-up completion. No PII is sent. Module-level guards prevent duplicate SPA pageviews and duplicate route view events under React Strict Mode.

Required public build variables:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_ANALYTICS_CONSENT=granted|denied
VITE_GOOGLE_SITE_VERIFICATION=token-only
```

Default consent is `denied`; no analytics script is requested without a valid ID and explicit granted state. Before setting it to `granted`, connect the approved consent-management flow for the applicable markets.

## Redirects and crawl policy

- `/product/bat` → `/collections/bat/` (301)
- `/product/rose` → `/collections/rose/` (301)
- `/product/void` → `/collections/void/` (301)
- Apache `DirectorySlash` normalizes canonical route directories to one trailing slash.
- Cart remains noindex and omitted from the sitemap.
- CSS, JavaScript, fonts, logos and campaign media remain crawlable.

## Verification record

- `npm ci`: passed. Local workstation used Node 24 and reported the expected engine warning; Hostinger must use required Node 20.
- `npm run typecheck`: passed.
- `npm run lint`: passed with zero warnings.
- `npm test`: 9 files, 31 tests passed.
- `npm run build`: passed; Vite generated `dist` and route-specific prerendered heads.
- Production dependency audit: 0 known vulnerabilities (`npm audit --omit=dev`).
- Generated sitemap: 7 absolute, public, canonical URLs; no unsupported `lastmod`, frequency or priority claims.

## External steps still required

1. Add the real GA4 Measurement ID in Hostinger and connect the approved consent decision before enabling analytics storage.
2. Add the exact Search Console HTML-tag token as `VITE_GOOGLE_SITE_VERIFICATION`, redeploy, then verify the `https://vhoxwrld.com/` URL-prefix property. For a Domain property, use Google's DNS record instead; do not configure both without reason.
3. In Search Console → **Sitemaps**, submit exactly `https://vhoxwrld.com/sitemap.xml` and confirm success after the production domain serves the new build.
4. Supply approved material, fit, size, care, shipping, returns, price, stock and media data before enabling commerce or Product/Offer schema.

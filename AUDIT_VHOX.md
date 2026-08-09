# VHOX implementation audit

## Scope

Audit of the React/Vite repository for visual integrity, commercial truthfulness, route metadata, Hostinger compatibility, performance and responsive behavior.

## Findings corrected

1. **Duplicated mobile-menu identity.** The overlay rendered a second branded top row beneath the persistent header. That row and its CSS were removed; the menu now relies on the single header brand mark.
2. **Concepts could inherit commerce behavior.** BAT, ROSE and VOID are now explicit concept studies. A centralized readiness gate blocks purchase UI and cart persistence until approved data is complete.
3. **Stored carts could preserve invalid concepts.** Storage now passes through a strict parser and revalidation step.
4. **Waitlist success was simulated locally.** The form was replaced with an approved HTTPS handoff or a truthful registration-pending state.
5. **Generic social destinations could appear.** Only configured, valid HTTPS profiles render.
6. **Page metadata was split across components.** Title, description, canonical URL, Open Graph URL and robots are now applied from a single route policy. Locale switching no longer overwrites route-specific metadata.
7. **The fiber scene was prepared too early.** Idle preloading was removed; the Three.js chunk remains code-split and mounts only near its viewport chapter.
8. **Near-black color exploration lacked a usable system.** Five named digital studies now expose controlled light, angle and distance simulation while explicitly stating that physical validation is pending.
9. **Unknown-route handling was too broad.** Apache rewrite rules now target known SPA routes and direct other unknown paths to the branded 404 document.

## Product readiness policy

A product is purchasable only when it is available and has a positive confirmed price, approved media, size/color variants and confirmed construction data. Current concepts fail this policy by design. This is covered by unit tests alongside stored-cart sanitation.

## SEO policy

- Homepage: `index, follow`.
- Confirmed purchasable product page: `index, follow`.
- Current concepts, cart and 404 routes: `noindex, follow`.
- Canonical and Open Graph URLs use `https://vhoxwrld.com`.

## Verification commands

Run under Node.js 20:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm audit --omit=dev --audit-level=high
```

Production dependency audit result at implementation time: zero known vulnerabilities. Development-tool advisories, if reported by a full audit, do not ship in the static `dist` output and should be addressed through a reviewed toolchain upgrade rather than an automatic breaking fix.

## Remaining approval gates

- Physical textiles, dyes, finishes and samples require real-world validation.
- Prices, quantities, variants and release availability require commercial approval.
- Storefront, waitlist and social URLs require approved destinations.
- Domain cutover requires a successful Hostinger preview and a documented rollback path.
- Temporary legal copy requires legal review before live commerce.

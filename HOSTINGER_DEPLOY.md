# VHOX — Hostinger Web Apps deployment

This is a flat Vite project. `package.json`, `package-lock.json`, `index.html` and `vite.config.ts` are in the repository root.

## Required settings

| Setting | Value |
| --- | --- |
| Repository | `pdroinfante777-ctrl/vhoxwrld` |
| Production branch | `main` |
| Framework | Vite / React |
| Node.js | `20.x` |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | `dist` |
| Server entry | None; static frontend |

## Preview-first deployment

1. Open **Websites → Add Website → Deploy Web App** in Hostinger hPanel.
2. Import `pdroinfante777-ctrl/vhoxwrld` through the GitHub integration.
3. Select branch `main`, Node.js 20, install command `npm ci`, build command `npm run build` and output `dist`.
4. Deploy to a Hostinger temporary domain first.
5. Do not disconnect, delete or replace the current Website Builder site at `vhoxwrld.com` during preview validation.

If Hostinger detects the framework as **Other**, retain the same commands and `dist`; do not add a server entry file.

## Public environment variables

Add only the approved destinations that exist:

```text
VITE_SHOP_URL=https://approved-storefront.example
VITE_WAITLIST_URL=https://approved-waitlist.example
VITE_INSTAGRAM_URL=https://instagram.com/approved-profile
VITE_TIKTOK_URL=https://tiktok.com/@approved-profile
VITE_YOUTUBE_URL=https://youtube.com/@approved-channel
```

All `VITE_*` values are public in the browser bundle. Never add private API tokens, Stripe secrets, passwords or credentials. Empty social/waitlist values intentionally render pending states. Redeploy after changing any variable.

## Preview checklist

- Homepage, `/product/bat`, `/product/rose`, `/product/void`, `/cart` and an unknown URL render correctly.
- Menu opens with a single logo, closes by link/overlay/Escape and traps keyboard focus.
- Header hides while scrolling down and returns while scrolling up.
- Material studies respond to keyboard/pointer controls and contain the digital-study disclaimer.
- Current concept studies show private-access CTAs and never quantity, variant or add-to-bag controls.
- An obsolete saved concept bag is cleared.
- Inner Circle never displays a fake success state.
- Social links appear only when their approved HTTPS values exist.
- Loader appears once per session.
- Reduced-motion mode disables nonessential motion.
- Mobile and desktop widths have no horizontal overflow.
- Console has no critical errors.
- `dist/404.html`, `dist/policies.html` and `dist/terms.html` exist.

The committed `.htaccess` passes real assets through, rewrites only the known SPA routes and uses `404.html` for unknown Apache routes. Confirm the actual HTTP status in Hostinger preview because local Vite preview does not emulate Apache rules.

## Logs and failure recovery

Open the failed deployment and read the first error in the full log. Confirm Node 20 and the exact commands above.

- Lock mismatch: regenerate `package-lock.json` with Node 20, commit and redeploy.
- Framework detection failure: use Vite or **Other** with output `dist` and no entry file.
- TypeScript/build failure: reproduce with `npm ci && npm run build` locally.
- Missing destination: add the approved environment value and redeploy.
- “No se ha podido preparar el servicio”: wait for the prior preparation job to end, then retry the GitHub deployment. Contact Hostinger support with the deployment ID if the platform state remains stuck.

## Domain cutover and rollback

Cutover is outside this repository change. Before moving `vhoxwrld.com`, preserve the published Builder site, save a backup and record current domain/DNS settings.

If rollback is needed after cutover:

1. Move the Web App back to its temporary domain or disconnect `vhoxwrld.com` from it.
2. Reconnect the preserved Builder site.
3. Publish and verify apex plus `www` hostnames.
4. Allow DNS propagation and test from a private window.

If hPanel asks to remove a website to release the domain, stop. Do not delete anything until a current backup exists and the account owner has confirmed the exact recovery path.

# VHOX — Hostinger Web Apps deployment

This repository is a flat Vite project: `package.json`, `package-lock.json`, `index.html` and `vite.config.ts` are all in the repository root. It produces a static `dist/` directory and does not need a persistent Node server or entry file.

## Required production settings

| Setting | Value |
| --- | --- |
| Repository | `pdroinfante777-ctrl/vhoxwrld` |
| Production branch | `main` |
| Framework | Vite / React |
| Node.js version | `20.x` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Server entry file | None (static frontend) |

## 1. Connect the repository

1. Sign in to Hostinger hPanel.
2. Open **Websites → Add Website → Deploy Web App**.
3. Choose **Import Git Repository**.
4. Authorize the Hostinger GitHub App for `pdroinfante777-ctrl/vhoxwrld`, or paste the repository URL if it is public.
5. Deploy this app to a Hostinger temporary/preview domain first. **Do not disconnect or replace the current Website Builder site at `vhoxwrld.com` during this step.**

Hostinger's current Web Apps instructions are available in its [official Node.js Web App guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

## 2. Select the production branch

Select `main`. The feature pull request must be reviewed and merged into `main` before the production Web App is expected to contain this version.

## 3. Select Node.js 20

Choose Node.js `20.x`. The repository also declares `"node": "20.x"` in `package.json` and includes `.nvmrc` with `20`.

## 4. Configure the install command

Use:

```text
npm ci
```

`npm ci` installs the exact versions recorded in `package-lock.json`. Do not replace it with `npm install` in production.

## 5. Configure the build command

Use:

```text
npm run build
```

This runs the TypeScript project build first and then Vite. A TypeScript failure stops the deployment.

## 6. Configure the output directory

Set:

```text
dist
```

If Hostinger labels the detected framework as **Other**, select Vite manually when offered, or retain **Other** and enter `dist` as the output directory. Do not add an entry file; this is a static frontend.

## 7. Configure `VITE_SHOP_URL`

In the Web App dashboard, open **Environment Variables** and add:

```text
VITE_SHOP_URL=https://the-approved-storefront-url.example
```

Optionally add the approved public social profile:

```text
VITE_INSTAGRAM_URL=https://instagram.com/the-approved-vhox-profile
```

Use the final HTTPS storefront destination approved by VHOX. Vite injects this value at build time, so trigger a new deployment after changing it. Never place Storefront API private tokens, Stripe secret keys, passwords or other secrets in a `VITE_*` variable; values with that prefix are public in the browser bundle.

## 8. Verify before connecting `vhoxwrld.com`

Open the Hostinger temporary/preview URL and confirm:

- the homepage loads with no blank screen;
- navigation anchors reach every section;
- the mobile menu opens, closes and remains keyboard accessible;
- collection buttons resolve to the configured `VITE_SHOP_URL`;
- `/404.html`, `/policies.html` and `/terms.html` load;
- the loader appears once per browser session;
- reduced-motion mode disables smooth scroll and nonessential movement;
- the deferred fiber study morphs smoothly and falls back without WebGL;
- there are no console errors at desktop and mobile widths;
- refresh and direct navigation do not return a server error.

Hostinger documents where to find the temporary URL in its [official preview-domain guide](https://support.hostinger.com/en/articles/2489693-how-to-access-your-website-content-without-a-domain-in-hostinger).

Only after this checklist passes and VHOX explicitly approves the preview should `vhoxwrld.com` be moved from Website Builder to the Web App. Domain cutover is intentionally outside the scope of this repository change.

## 9. Review logs when a deployment fails

1. Open **Websites → [temporary VHOX Web App] → Dashboard**.
2. Check **Last deployment** and open its full log, or open **Deployments** and select the failed run.
3. Find the first error, not only the final `exit code 1` line.
4. Confirm the log shows Node 20, `npm ci`, `npm run build` and `dist`.
5. Typical fixes:
   - `npm ci` lock mismatch: regenerate `package-lock.json` locally with Node 20, commit it and redeploy.
   - framework not detected: choose Vite or **Other** with output `dist` and no entry file.
   - missing environment value: add `VITE_SHOP_URL`, save it and redeploy.
   - TypeScript error: reproduce with `npm ci && npm run build` locally and fix the first reported file.
6. If a ZIP deployment reports “No se ha podido preparar el servicio”, prefer the GitHub integration after confirming the root files and settings above. Retry only after the previous deployment has left the preparing state; otherwise contact Hostinger support with the deployment ID and full log.

The Hostinger Web App dashboard exposes last-deployment details and a direct full-log link according to the [official Web App guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

## 10. Temporary rollback to the previous site

Prepare rollback **before** domain cutover:

1. Keep the current Website Builder site intact and published while validating the Web App preview.
2. Duplicate the Builder site to a generated preview domain if hPanel permits it, and download an account/site backup before any domain reassignment.
3. Record the current domain and DNS configuration.

If the Web App has already received `vhoxwrld.com` and rollback is needed:

1. Reassign the Web App to its temporary domain, or disconnect `vhoxwrld.com` from that app.
2. Reconnect `vhoxwrld.com` to the preserved Website Builder site or its verified duplicate.
3. Publish the Builder site and verify both apex and `www` hostnames.
4. Allow for DNS/domain propagation and retest from a private browser window.

Hostinger's Builder documentation explains using a temporary domain and reconnecting a preferred domain in its [domain connection guide](https://support.hostinger.com/en/articles/8347449-how-to-connect-a-domain-to-hostinger-website-builder).

> Safety stop: some hPanel flows may require removing a website to release a domain. Removing a website can delete deployments and associated data. If that prompt appears, do not continue until a fresh backup exists and Hostinger support or the account owner confirms the exact rollback path. This deployment guide does not authorize deletion of the current public site.

## Local release verification

Run from the repository root with Node 20:

```bash
npm ci
npm run lint
npm run build
npm run preview
```

The release is deployable only when these checks pass and `dist/index.html` exists.

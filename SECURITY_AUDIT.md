# VHOX security and dependency remediation

Audit date: 2026-08-31  
Baseline: `origin/main` at `dc5cb27`  
Target runtime: Node 20.x and npm 10.9.2 on Hostinger

## Outcome

The vulnerable lockfile tree was replaced with patched versions available inside the existing compatible major ranges. No major toolchain upgrade, `npm audit fix --force` or incompatible esbuild override was used.

The exact Node 20 patch used by Hostinger is not stored in the repository. The deployment log must confirm Node 20.9.0 or newer because the patched `typescript-eslint` toolchain requires that minimum. Local validation uses a newer Node runtime and therefore emits the expected project engine warning.

## Hostinger alerts

| # | Reported package | Advisory | Parent before | Final version | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | `js-yaml@4.3.0` | GHSA-5p4m-2wfm-xmqj | ESLint → `@eslint/eslintrc` | `4.3.2` | Fixed |
| 2 | `brace-expansion@1.1.16` | CVE-2026-69152 | ESLint → minimatch 3 | `1.1.18` | Fixed |
| 3 | `brace-expansion@5.0.7` | CVE-2026-69152 | typescript-eslint → minimatch 10 | `5.0.9` | Fixed |
| 4 | `brace-expansion@1.1.16` | CVE-2026-14257 | ESLint → minimatch 3 | `1.1.18` | Fixed |
| 5 | `brace-expansion@5.0.7` | CVE-2026-14257 | typescript-eslint → minimatch 10 | `5.0.9` | Fixed |
| 6 | `esbuild@0.25.12` | GHSA-gv7w-rqvm-qjhr | Vite 6.4.3 | `0.25.12` | No applicable finding; advisory withdrawn and absent from npm audit |
| 7 | `postcss@8.5.19` | CVE-2026-69153 | Vite 6.4.3 | `8.5.26` | Fixed |
| 8 | `nanoid@3.3.16` | CVE-2026-67213 | PostCSS | `3.3.18` | Fixed |

The current npm advisory database also reported a critical issue in `vitest@3.2.4`. The Hostinger bot had changed only the manifest range and left the lockfile stale. The regenerated lockfile now installs `vitest@3.2.7`.

## Dependency tree

### Before

```text
eslint@9.39.5
├─ @eslint/eslintrc@3.3.6 → js-yaml@4.3.0
└─ minimatch@3.1.5 → brace-expansion@1.1.16

typescript-eslint@8.64.0
└─ typescript-estree → minimatch@10.2.5 → brace-expansion@5.0.7

vite@6.4.3
├─ esbuild@0.25.12
└─ postcss@8.5.19 → nanoid@3.3.16

vitest@3.2.4
```

### After

```text
eslint@9.39.5
├─ @eslint/eslintrc@3.3.6 → js-yaml@4.3.2
└─ minimatch@3.1.5 → brace-expansion@1.1.18

typescript-eslint@8.68.0
└─ typescript-estree → minimatch@10.2.6 → brace-expansion@5.0.9

vite@6.4.3
├─ esbuild@0.25.12
└─ postcss@8.5.26 → nanoid@3.3.18

vitest@3.2.7
```

No override remains in `package.json`: after updating compatible parent packages and regenerating the lockfile, every patched transitive version resolves inside its parent's published semver range.

## Why esbuild was not forced

Vite 6.4.3 declares `esbuild: ^0.25.0`. The version `0.28.1` requested by the withdrawn alert lies outside that compatible range. The advisory does not appear in the current npm audit because the affected package was misidentified and the reported case concerned the Deno module. Forcing `0.28.1` would create an unsupported toolchain without fixing an applicable repository vulnerability.

## Static security review

- No tracked private keys, credentials or common secret-token patterns were found.
- `.env.example` is the only tracked environment file; local `.env*` files are ignored.
- `VITE_*` values are treated and documented as public build-time configuration.
- No `dangerouslySetInnerHTML`, raw `innerHTML`, `eval`, dynamic function construction or unsanitized HTML sink was found.
- JSON-LD is serialized and escapes `<` before DOM insertion.
- Local storage contains only sanitized cart data, locale and currency. Session storage contains only the loader flag.
- The site has no local submission endpoint. The waitlist is an approved HTTPS handoff, so provider-side rate limiting, bot protection and double opt-in remain the provider's responsibility.
- External checkout now accepts same-site routes or HTTPS only; HTTP and executable protocols fall back to the collection.
- External new-tab links explicitly use `noopener noreferrer`.
- Production source maps remain disabled.
- There is no backend or CORS policy in this static repository.
- GA4 stays inactive unless a valid measurement ID and explicit granted configuration exist. Because this is not per-user consent, production should keep analytics denied until a consent layer is approved.

## Security headers

`public/.htaccess` now defines:

- Content-Security-Policy with same-origin defaults, no framing or objects, HTTPS upgrades, local media/fonts and the exact build-generated hash for the inline organization schema;
- Strict-Transport-Security;
- X-Content-Type-Options;
- X-Frame-Options;
- Referrer-Policy;
- Permissions-Policy;
- the modern recommendation `X-XSS-Protection: 0` to disable obsolete browser filters.

The production build calculates the CSP hash from the final inline JSON-LD instead of relying on a fragile hand-maintained value. GA4 domains are allowed only for the existing consent-gated integration.

## Remaining operational risks

1. Confirm the exact Node 20 patch in the next Hostinger preview build log before merge.
2. Verify Hostinger's Apache modules apply every header on the temporary URL.
3. Keep GA consent denied until a real per-user consent experience exists.
4. Confirm the external waitlist provider's anti-abuse and data-protection controls before activation.
5. Three.js source is not public-bundle reachable but remains maintenance surface; remove it only in a separate approved cleanup.

## Required verification

```bash
npm ci
npm audit --json
npm audit --omit=dev --json
npm ls js-yaml brace-expansion esbuild postcss nanoid vitest
npm run typecheck
npm run lint
npm test
npm run build
```

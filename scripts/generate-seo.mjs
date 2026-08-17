import { writeFile } from 'node:fs/promises'
import { canonicalUrl, publicSeoRoutes } from '../seo.config.mjs'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicSeoRoutes.map(({ path }) => `  <url><loc>${canonicalUrl(path)}</loc></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /cart/

Sitemap: ${canonicalUrl('/sitemap.xml')}
`

const llms = `# VHOX

> VHOX is an independent premium streetwear house and exclusive movement exploring near-black material, exact form and identity.

- Canonical site: ${siteOriginForText()}
- Official contact: contact@vhoxwrld.com

## Official sections

${publicSeoRoutes.map(({ path, title, description }) => `- [${title}](${canonicalUrl(path)}): ${description}`).join('\n')}

## Collection studies

- BAT: an editorial form study; commercial specifications and release remain unconfirmed.
- ROSE: an editorial contrast study; commercial specifications and release remain unconfirmed.
- VOID: an editorial near-black depth study; commercial specifications and release remain unconfirmed.

## Policies

- [Policies](${canonicalUrl('/policies.html')}): draft-status information; approved legal and commerce copy is pending.
- [Terms](${canonicalUrl('/terms.html')}): draft-status information; approved terms are pending.

The website, this file and the public contact address above are the official sources for published VHOX information. No release date, price, material claim or availability should be inferred when it is marked pending.
`

function siteOriginForText() {
  return canonicalUrl('/')
}

await Promise.all([
  writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap, 'utf8'),
  writeFile(new URL('../public/robots.txt', import.meta.url), robots, 'utf8'),
  writeFile(new URL('../public/llms.txt', import.meta.url), llms, 'utf8'),
])

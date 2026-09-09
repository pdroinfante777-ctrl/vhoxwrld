import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { canonicalUrl, noindexSeoRoutes, publicSeoRoutes } from '../seo.config.mjs'

const distRoot = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('index.html', distRoot), 'utf8')

function getInlineSchemaHash(html) {
  const schema = html.match(/<script id="vhox-organization-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  if (!schema) throw new Error('VHOX organization schema was not found while generating the CSP hash.')
  return createHash('sha256').update(schema, 'utf8').digest('base64')
}

const inlineSchemaHash = getInlineSchemaHash(template)

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function pageHtml(route, robots) {
  const url = canonicalUrl(route.path)
  let html = template
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`)
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`)
  html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/i, `<meta name="robots" content="${robots}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
  return html
}

for (const route of [...publicSeoRoutes, ...noindexSeoRoutes]) {
  const output = new URL(`.${route.path}index.html`, distRoot)
  await mkdir(dirname(fileURLToPath(output)), { recursive: true })
  await writeFile(fileURLToPath(output), pageHtml(route, publicSeoRoutes.includes(route) ? 'index, follow' : 'noindex, follow'), 'utf8')
}

// Preserve the Hostinger routing and status-page configuration in the production artifact.
for (const filename of ['.htaccess', '404.html']) {
  const source = new URL(`../public/${filename}`, import.meta.url)
  const destination = join(fileURLToPath(distRoot), filename)
  const sourceContent = await readFile(source, 'utf8')
  const outputContent = filename === '.htaccess'
    ? sourceContent.replace('__VHOX_SCHEMA_HASH__', inlineSchemaHash)
    : sourceContent
  await writeFile(destination, outputContent, 'utf8')
}

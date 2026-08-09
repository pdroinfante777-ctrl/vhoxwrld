export type PageRobots = 'index, follow' | 'noindex, follow'

export type PageMetadata = {
  title: string
  description: string
  path: string
  robots: PageRobots
}

const siteOrigin = 'https://vhoxwrld.com'

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

export function applyPageMetadata({ title, description, path, robots }: PageMetadata) {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const canonicalUrl = new URL(normalizedPath, siteOrigin).toString()

  document.title = title
  setMeta('meta[name="description"]', description)
  setMeta('meta[name="robots"]', robots)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:url"]', canonicalUrl)
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
}

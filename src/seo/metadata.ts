import type { Locale } from '../i18n/translations'

export type PageRobots = 'index, follow' | 'noindex, follow'

export type PageMetadata = {
  title: string
  description: string
  path: string
  robots: PageRobots
  locale?: Locale
  type?: 'website' | 'article'
  image?: string
}

export const siteOrigin = 'https://vhoxwrld.com'
export const defaultSocialImage = `${siteOrigin}/brand/vhox-logo-source.png`

export function normalizePath(path: string) {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `/${clean}/` : '/'
}

export function canonicalUrl(path: string) {
  return new URL(normalizePath(path), siteOrigin).toString()
}

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

export function applyPageMetadata({
  title,
  description,
  path,
  robots,
  locale = 'en',
  type = 'website',
  image = defaultSocialImage,
}: PageMetadata) {
  const url = canonicalUrl(path)

  document.title = title
  document.documentElement.lang = locale
  setMeta('meta[name="description"]', description)
  setMeta('meta[name="robots"]', robots)
  setMeta('meta[property="og:type"]', type)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:url"]', url)
  setMeta('meta[property="og:image"]', image)
  setMeta('meta[name="twitter:title"]', title)
  setMeta('meta[name="twitter:description"]', description)
  setMeta('meta[name="twitter:image"]', image)
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url)
}

export function configureGoogleSiteVerification() {
  const token = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
  const existing = document.querySelector<HTMLMetaElement>('meta[name="google-site-verification"]')

  if (!token) {
    existing?.remove()
    return
  }

  const meta = existing ?? document.createElement('meta')
  meta.name = 'google-site-verification'
  meta.content = token
  if (!existing) document.head.append(meta)
}

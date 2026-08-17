import { canonicalUrl, defaultSocialImage } from './metadata'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${canonicalUrl('/')}#organization`, name: 'VHOX', url: canonicalUrl('/'), logo: { '@type': 'ImageObject', url: defaultSocialImage, width: 1254, height: 1254 }, email: 'contact@vhoxwrld.com', brand: { '@id': `${canonicalUrl('/')}#brand` } },
      { '@type': 'Brand', '@id': `${canonicalUrl('/')}#brand`, name: 'VHOX', logo: defaultSocialImage, slogan: 'Beyond Form' },
      { '@type': 'WebSite', '@id': `${canonicalUrl('/')}#website`, name: 'VHOX WRLD', url: canonicalUrl('/'), publisher: { '@id': `${canonicalUrl('/')}#organization` }, inLanguage: ['en', 'es', 'pt', 'fr'] },
    ],
  }
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: canonicalUrl(item.path) })) }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }
}

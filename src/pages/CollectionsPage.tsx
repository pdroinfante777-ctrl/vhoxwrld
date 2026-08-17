import { useEffect, useMemo } from 'react'
import { trackEntityView } from '../analytics/ga4'
import { ArrowIcon } from '../components/ArrowIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { MobileStickyCta } from '../components/MobileStickyCta'
import { ProductCard } from '../components/ProductCard'
import { ShareButton } from '../components/ShareButton'
import { products } from '../data/products'
import { useLocale } from '../i18n/useLocale'
import { seoCopy } from '../seo/content'
import { canonicalUrl } from '../seo/metadata'
import { breadcrumbSchema, faqSchema } from '../seo/schema'
import { StructuredData } from '../seo/StructuredData'

export function CollectionsPage() {
  const { locale } = useLocale()
  const copy = seoCopy[locale]
  const itemListSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: copy.breadcrumbHome, path: '/' }, { name: 'BAT / ROSE / VOID', path: '/collections/' }]),
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl('/collections/')}#collection`,
        name: copy.collections.title,
        description: copy.collections.description,
        url: canonicalUrl('/collections/'),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${product.name} concept study`,
            url: canonicalUrl(`/collections/${product.slug}/`),
          })),
        },
      },
    ],
  }), [copy])

  useEffect(() => {
    window.scrollTo(0, 0)
    trackEntityView('collections:bat-rose-void', 'view_item_list', {
      item_list_id: 'vhox-concept-studies',
      item_list_name: 'VHOX concept studies',
      items: products.map((product) => ({ item_id: product.id, item_name: product.name, item_category: 'Concept study' })),
    })
  }, [])

  return (
    <>
      <StructuredData id="vhox-collections-schema" data={itemListSchema} />
      <StructuredData id="vhox-collections-faq-schema" data={faqSchema(copy.faq)} />
      <article className="seo-page seo-page--collections">
        <header className="seo-page__hero">
          <Breadcrumbs items={[{ label: copy.breadcrumbHome, href: '/' }, { label: 'BAT / ROSE / VOID' }]} />
          <span className="seo-page__kicker">VHOX / COLLECTION STUDIES</span>
          <h1>{copy.collections.h1}</h1>
          <div className="seo-page__intro">
            <p>{copy.collectionIntro}</p>
            <a className="text-link seo-inline-cta" href="/#inner-circle">{copy.collectionCta} <ArrowIcon /></a>
            <ShareButton path="/collections/" title={copy.collections.title} description={copy.collections.description} />
          </div>
        </header>

        <section className="seo-collection" aria-labelledby="collection-studies-title">
          <header className="seo-section-heading">
            <span>01 / BAT · ROSE · VOID</span>
            <h2 id="collection-studies-title">VHOX FORM STUDIES.</h2>
          </header>
          <div className="collection__grid">
            {products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
          </div>
        </section>

        <section className="seo-status" aria-labelledby="collection-status-title">
          <header className="seo-section-heading">
            <span>02 / VERIFIED STATUS</span>
            <h2 id="collection-status-title">{copy.collectionStatus}</h2>
          </header>
          <div className="responsive-table" role="region" aria-label={copy.collectionStatus} tabIndex={0}>
            <table>
              <thead><tr><th scope="col">{copy.concept}</th><th scope="col">{copy.status}</th></tr></thead>
              <tbody>{products.map((product) => <tr key={product.id}><th scope="row">{product.name}</th><td>{copy.pending}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="seo-faq" aria-labelledby="collection-faq-title">
          <header className="seo-section-heading">
            <span>03 / FAQ</span>
            <h2 id="collection-faq-title">{copy.faqTitle}</h2>
          </header>
          <div className="seo-faq__items">
            {copy.faq.map((item, index) => (
              <details key={item.question}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
      <MobileStickyCta href="/#inner-circle" label={copy.collectionCta} meta="BAT / ROSE / VOID" />
    </>
  )
}

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
      breadcrumbSchema([{ name: copy.breadcrumbHome, path: '/' }, { name: 'DROP 001: SIGNAL', path: '/collections/' }]),
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl('/collections/')}#collection`,
        name: 'VHOX DROP 001: SIGNAL',
        description: 'From a distance, black. Up close, VHOX. Preview DROP 001: SIGNAL before product details, price and availability are confirmed.',
        url: canonicalUrl('/collections/'),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.name,
            url: canonicalUrl(`/collections/${product.slug}/`),
          })),
        },
      },
    ],
  }), [copy])

  useEffect(() => {
    window.scrollTo(0, 0)
    trackEntityView('collections:drop-001-signal', 'view_item_list', {
      item_list_id: 'vhox-drop-001-signal',
      item_list_name: 'VHOX Drop 001: Signal',
      items: products.map((product) => ({ item_id: product.id, item_name: product.name, item_category: product.category })),
    })
  }, [])

  return (
    <>
      <StructuredData id="vhox-collections-schema" data={itemListSchema} />
      <StructuredData id="vhox-collection-faq" data={faqSchema(copy.faq)} />
      <article className="seo-page seo-page--collections">
        <header className="seo-page__hero">
          <Breadcrumbs items={[{ label: copy.breadcrumbHome, href: '/' }, { label: 'DROP 001: SIGNAL' }]} />
          <span className="seo-page__kicker">VHOX / DROP 001</span>
          <h1>SIGNAL.</h1>
          <div className="seo-page__intro">
            <p>FROM A DISTANCE, BLACK. UP CLOSE, VHOX.</p>
            <p>{copy.collectionIntro}</p>
            <a className="text-link seo-inline-cta" href="/#inner-circle">{copy.collectionCta} <ArrowIcon /></a>
            <ShareButton path="/collections/" title="VHOX DROP 001: SIGNAL" description="From a distance, black. Up close, VHOX." />
          </div>
        </header>

        <section className="seo-collection" aria-labelledby="collection-studies-title">
          <header className="seo-section-heading">
            <span>01 / DROP 001</span>
            <h2 id="collection-studies-title">SIGNAL.</h2>
          </header>
          <div className="collection__grid">
            {products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
          </div>
        </section>

        <section className="seo-status" aria-labelledby="collection-status-title">
          <header className="seo-section-heading">
            <span>02 / RELEASE STATUS</span>
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
          <h2 id="collection-faq-title">{copy.faqTitle}</h2>
          {copy.faq.map(({ question, answer }) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </section>
      </article>
      <MobileStickyCta href="/#inner-circle" label={copy.collectionCta} meta="DROP 001 / SIGNAL" />
    </>
  )
}

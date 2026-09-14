import { ArrowIcon } from '../components/ArrowIcon'
import { ProductCard } from '../components/ProductCard'
import { chromaticBlackCopy } from '../data/chromaticBlack'
import { editorialCopy } from '../data/artDirection'
import { products } from '../data/products'
import { useLocale } from '../i18n/useLocale'

export function EditorialSelection() {
  const { locale } = useLocale()
  const copy = editorialCopy[locale]
  return (
    <section id="collection" className="editorial-selection" aria-labelledby="selection-title">
      <header className="editorial-section-heading">
        <div><p className="editorial-label">DROP 001 — SIGNAL</p><h2 id="selection-title">{copy.selection}</h2></div>
        <a className="editorial-link" href="/collections/">{copy.explore}<ArrowIcon /></a>
      </header>
      <p className="editorial-selection__note">{copy.preview}</p>
      <div className="collection__grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}</div>
    </section>
  )
}

export function EditorialStory() {
  const { locale, t } = useLocale()
  const copy = editorialCopy[locale]
  return (
    <section id="chromatic-black" className="editorial-story" aria-labelledby="chromatic-title">
      <header><p className="editorial-label">Chromatic Black</p><h2 id="chromatic-title">{copy.studyTitle}</h2><p>{copy.studyDescription}</p></header>
      <div id="chromatic-studies" className="editorial-story__images">
        <figure className="editorial-story__lead"><img src="/chromatic-black/vhox-midnight-violet-tee.jpeg" width="1448" height="1086" alt={chromaticBlackCopy[locale].collectionAlt[2]} loading="lazy" decoding="async" /><figcaption>Midnight Violet <span>{t('product.campaignStudy')}</span></figcaption></figure>
        <figure className="editorial-story__inset"><img src="/chromatic-black/vhox-burnt-earth-tee.jpeg" width="1122" height="1402" alt={chromaticBlackCopy[locale].collectionAlt[1]} loading="lazy" decoding="async" /><figcaption>Burnt Earth <span>{t('product.campaignStudy')}</span></figcaption></figure>
      </div>
    </section>
  )
}

export function EditorialDetail() {
  const { locale } = useLocale()
  const copy = editorialCopy[locale]
  return (
    <section id="signature" className="editorial-detail" aria-labelledby="detail-title">
      <figure><img src="/chromatic-black/vhox-purple-detail.jpeg" width="1448" height="1086" alt={chromaticBlackCopy[locale].detailAlt} loading="lazy" decoding="async" /><figcaption>{copy.detailNote}</figcaption></figure>
      <div><h2 id="detail-title">{copy.detailTitle}</h2><p>{copy.detailDescription}</p><a className="editorial-link" href="/collections/">{copy.explore}<ArrowIcon /></a></div>
    </section>
  )
}

export function EditorialIdentity() {
  const { locale } = useLocale()
  const copy = editorialCopy[locale]
  return (
    <section id="campaign" className="editorial-identity" aria-labelledby="identity-title">
      <h2 id="identity-title">Movimiento<br />Exclusivo.</h2>
      <div><p>{copy.identity}</p><a className="editorial-link" href="/manifesto/">{copy.identityLink}<ArrowIcon /></a></div>
    </section>
  )
}

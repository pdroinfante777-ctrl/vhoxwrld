import { ArrowIcon } from '../components/ArrowIcon'
import { SectionHeading } from '../components/SectionHeading'
import { shopIsExternal, shopUrl } from '../config/shop'
import { products } from '../data/products'

export function Collection() {
  return (
    <section id="collection" className="collection section" aria-labelledby="collection-title">
      <SectionHeading
        id="collection-title"
        index="02"
        label="COLLECTION / PROTOTYPE"
        title="THREE POINTS OF ENTRY."
        description="A modular release system prepared for real media, variants, pricing and commerce data. Current records are intentionally marked as coming soon."
      />

      <div className="collection__grid">
        {products.map((product, index) => (
          <article className="product-card" key={product.id} data-reveal>
            <div className={`product-card__visual product-card__visual--${product.visual}`}>
              <span className="product-card__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="product-card__geometry" aria-hidden="true" />
              <div className="product-card__media-status">
                <span>MEDIA PLACEHOLDER</span>
                <span>{product.code}</span>
              </div>
            </div>
            <div className="product-card__meta">
              <div>
                <span>{product.category}</span>
                <h3>{product.name}</h3>
              </div>
              <span className="status-dot">{product.availability.replace('-', ' ')}</span>
            </div>
            <p>{product.description}</p>
            <a
              className="product-card__link"
              href={product.purchaseUrl ?? shopUrl}
              target={shopIsExternal ? '_blank' : undefined}
              rel={shopIsExternal ? 'noreferrer' : undefined}
            >
              Collection access <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

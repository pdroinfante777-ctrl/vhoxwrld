import { useEffect, useRef } from 'react'
import { useCart } from '../cart/useCart'
import { formatProductPrice, isProductPurchasable, productDescription, productPath, type Product } from '../data/products'
import { ArrowIcon } from './ArrowIcon'
import { useLocale } from '../i18n/useLocale'
import { useCurrency } from '../commerce/useCurrency'

type ProductCardProps = {
  product: Product
  index: number
  compact?: boolean
}

export function ProductCard({ product, index, compact = false }: ProductCardProps) {
  const { locale, t } = useLocale()
  const { currency } = useCurrency()
  const cardRef = useRef<HTMLElement>(null)
  const { addItem } = useCart()
  const primary = product.media[0]
  const alternate = product.media[1]
  const purchasable = isProductPurchasable(product)

  useEffect(() => {
    const card = cardRef.current
    if (!card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const handleMove = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      card.style.setProperty('--tilt-x', `${(-y * 2.5).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 3.5).toFixed(2)}deg`)
    }
    const reset = () => {
      card.style.setProperty('--tilt-x', '0deg')
      card.style.setProperty('--tilt-y', '0deg')
    }

    card.addEventListener('pointermove', handleMove)
    card.addEventListener('pointerleave', reset)
    return () => {
      card.removeEventListener('pointermove', handleMove)
      card.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <article ref={cardRef} className={`product-card ${compact ? 'product-card--compact' : ''}`} data-reveal>
      <a
        className={`product-card__visual product-card__visual--${product.visual}`}
        href={productPath(product)}
        aria-label={`${t('product.view')} ${product.name}`}
      >
        <span className="product-card__number">{String(index + 1).padStart(2, '0')}</span>
        {primary ? (
          <>
            {primary.type === 'image' ? (
              <img
                className="product-card__image product-card__image--primary"
                src={primary.src}
                alt={primary.alt}
                loading="lazy"
                decoding="async"
                style={{ objectFit: primary.objectFit, objectPosition: primary.objectPosition }}
              />
            ) : (
              <video className="product-card__image product-card__image--primary" src={primary.src} poster={primary.poster} muted loop playsInline preload="metadata" aria-label={primary.alt} />
            )}
            {alternate?.type === 'image' && (
              <img
                className="product-card__image product-card__image--alternate"
                src={alternate.src}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectFit: alternate.objectFit, objectPosition: alternate.objectPosition }}
              />
            )}
          </>
        ) : (
          <>
            <span className="product-card__geometry" aria-hidden="true" />
            <span className="product-card__garment-guide" aria-hidden="true" />
          </>
        )}
        <span className="product-card__media-status">
          <span>{primary ? t('product.mediaApproved') : t('product.mediaPending')}</span>
          <span>{product.code}</span>
        </span>
      </a>

      <div className="product-card__meta">
        <div>
          <span>{product.category}</span>
          <h3><a href={productPath(product)}>{product.name}</a></h3>
        </div>
        <span className="status-dot">{purchasable ? t('product.available') : t('product.conceptStudy')}</span>
      </div>
      <div className="product-card__commerce">
        <span>{formatProductPrice(product, currency, locale, t('product.pricePending'))}</span>
        {product.compareAtPrice !== null && <del>{formatProductPrice({ ...product, price: product.compareAtPrice }, currency, locale)}</del>}
      </div>
      {!compact && <p>{productDescription(product, locale)}</p>}
      <div className="product-card__actions">
        <a className="product-card__link" href={productPath(product)}>{t('product.view')} <ArrowIcon /></a>
        {purchasable ? (
          <button
            type="button"
            onClick={() => addItem(product, { size: product.sizes[0], color: product.colors[0] })}
            aria-label={`${t('product.add')} ${product.name}`}
          >
            {t('product.add')}
          </button>
        ) : (
          <a href="/#inner-circle">{t('product.requestPrivateAccess')}</a>
        )}
      </div>
    </article>
  )
}

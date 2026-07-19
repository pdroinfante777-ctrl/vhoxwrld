import { useEffect, useRef } from 'react'
import type { Product } from '../data/products'
import { ArrowIcon } from './ArrowIcon'

type ProductCardProps = {
  product: Product
  index: number
  onExplore: (product: Product) => void
}

export function ProductCard({ product, index, onExplore }: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const primary = product.media[0]
  const alternate = product.media[1]

  useEffect(() => {
    const card = cardRef.current
    if (!card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const handleMove = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      card.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 4.5).toFixed(2)}deg`)
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
    <article ref={cardRef} className="product-card" data-reveal>
      <button
        className={`product-card__visual product-card__visual--${product.visual}`}
        type="button"
        onClick={() => onExplore(product)}
        aria-label={`Explore ${product.name}`}
      >
        <span className="product-card__number">{String(index + 1).padStart(2, '0')}</span>
        {primary ? (
          <>
            {primary.type === 'image' ? (
              <img className="product-card__image product-card__image--primary" src={primary.src} alt={primary.alt} loading="lazy" decoding="async" />
            ) : (
              <video className="product-card__image product-card__image--primary" src={primary.src} poster={primary.poster} muted loop playsInline preload="metadata" aria-label={primary.alt} />
            )}
            {alternate?.type === 'image' && (
              <img className="product-card__image product-card__image--alternate" src={alternate.src} alt="" loading="lazy" decoding="async" />
            )}
          </>
        ) : (
          <>
            <span className="product-card__geometry" aria-hidden="true" />
            <span className="product-card__garment-guide" aria-hidden="true" />
          </>
        )}
        <span className="product-card__media-status">
          <span>{primary ? 'APPROVED PRODUCT MEDIA' : 'PRODUCT MEDIA PENDING'}</span>
          <span>{product.code}</span>
        </span>
      </button>

      <div className="product-card__meta">
        <div>
          <span>{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <span className="status-dot">{product.availability.replace('-', ' ')}</span>
      </div>
      <p>{product.description}</p>
      <button className="product-card__link" type="button" onClick={() => onExplore(product)}>
        Explore product <ArrowIcon />
      </button>
    </article>
  )
}

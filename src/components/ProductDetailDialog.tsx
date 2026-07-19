import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { shopIsExternal, shopUrl } from '../config/shop'
import { ArrowIcon } from './ArrowIcon'

type ProductDetailDialogProps = {
  product: Product | null
  onClose: () => void
}

export function ProductDetailDialog({ product, onClose }: ProductDetailDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const [mediaIndex, setMediaIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    if (!product) return
    setMediaIndex(0)
    setSelectedColor(product.colors[0] ?? '')
    setSelectedSize(product.sizes[0] ?? '')
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])
      if (!controls.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose, product])

  if (!product) return null

  const media = product.media[mediaIndex]
  const destination = product.purchaseUrl ?? shopUrl

  return (
    <div className="product-dialog" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="product-dialog__panel">
        <button ref={closeRef} className="product-dialog__close" type="button" onClick={onClose} aria-label="Close product details">CLOSE / ESC</button>
        <div className="product-dialog__gallery">
          {media ? (
            media.type === 'image' ? (
              <img src={media.src} alt={media.alt} />
            ) : (
              <video src={media.src} poster={media.poster} controls playsInline aria-label={media.alt} />
            )
          ) : (
            <div className={`product-dialog__placeholder product-card__visual--${product.visual}`}>
              <span className="product-card__geometry" aria-hidden="true" />
              <span>APPROVED PRODUCT PHOTOGRAPHY PENDING</span>
            </div>
          )}
          {product.media.length > 1 && (
            <div className="product-dialog__thumbs" aria-label="Product gallery">
              {product.media.map((item, index) => (
                <button type="button" key={item.src} aria-label={`Show view ${index + 1}`} aria-pressed={mediaIndex === index} onClick={() => setMediaIndex(index)}>
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-dialog__content">
          <span>{product.code} / {product.category}</span>
          <h2 id="product-dialog-title">{product.name}</h2>
          <p>{product.description}</p>
          <dl>
            <div><dt>PRICE</dt><dd>{product.price ?? 'TO BE CONFIRMED'}</dd></div>
            <div><dt>COLORS</dt><dd>{product.colors.join(' / ') || 'DATA PENDING'}</dd></div>
            <div><dt>SIZES</dt><dd>{product.sizes.join(' / ') || 'DATA PENDING'}</dd></div>
            <div><dt>MATERIALS</dt><dd>{product.materials ?? 'DATA PENDING'}</dd></div>
            <div><dt>CARE</dt><dd>{product.care ?? 'DATA PENDING'}</dd></div>
            <div><dt>SHIPPING</dt><dd>{product.shipping ?? 'DATA PENDING'}</dd></div>
          </dl>
          {(product.colors.length > 0 || product.sizes.length > 0) && (
            <div className="product-dialog__selectors">
              {product.colors.length > 0 && (
                <fieldset>
                  <legend>COLOR</legend>
                  {product.colors.map((color) => (
                    <button type="button" key={color} aria-pressed={selectedColor === color} onClick={() => setSelectedColor(color)}>{color}</button>
                  ))}
                </fieldset>
              )}
              {product.sizes.length > 0 && (
                <fieldset>
                  <legend>SIZE</legend>
                  {product.sizes.map((size) => (
                    <button type="button" key={size} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>
                  ))}
                </fieldset>
              )}
            </div>
          )}
          <a className="button button--primary" href={destination} target={shopIsExternal ? '_blank' : undefined} rel={shopIsExternal ? 'noreferrer' : undefined}>
            Collection access <ArrowIcon />
          </a>
          <small>No payment is processed on this website. Checkout remains connected to the approved external storefront.</small>
        </div>
      </section>
    </div>
  )
}

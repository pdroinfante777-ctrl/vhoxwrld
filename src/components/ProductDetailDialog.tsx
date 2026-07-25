import { useEffect, useRef, useState } from 'react'
import { formatProductPrice, productDescription, type Product } from '../data/products'
import { shopIsExternal, shopUrl } from '../config/shop'
import { ArrowIcon } from './ArrowIcon'
import { useLocale } from '../i18n/useLocale'
import { useCurrency } from '../commerce/useCurrency'

type ProductDetailDialogProps = {
  product: Product | null
  onClose: () => void
}

export function ProductDetailDialog({ product, onClose }: ProductDetailDialogProps) {
  const { locale, t } = useLocale()
  const { currency } = useCurrency()
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
        <button ref={closeRef} className="product-dialog__close" type="button" onClick={onClose} aria-label={t('lookbook.closeLabel')}>{t('lookbook.close')}</button>
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
              <span>{t('product.mediaPending')}</span>
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
          <p>{productDescription(product, locale)}</p>
          <dl>
            <div><dt>PRICE</dt><dd>{formatProductPrice(product, currency, locale, t('product.pricePending'))}</dd></div>
            <div><dt>{t('product.color')}</dt><dd>{product.colors.join(' / ') || t('product.dataPending')}</dd></div>
            <div><dt>{t('product.size')}</dt><dd>{product.sizes.join(' / ') || t('product.dataPending')}</dd></div>
            <div><dt>{t('product.materials')}</dt><dd>{product.materials ?? t('product.dataPending')}</dd></div>
            <div><dt>{t('product.care')}</dt><dd>{product.care ?? t('product.dataPending')}</dd></div>
            <div><dt>{t('product.shipping')}</dt><dd>{product.shipping ?? t('product.dataPending')}</dd></div>
          </dl>
          {(product.colors.length > 0 || product.sizes.length > 0) && (
            <div className="product-dialog__selectors">
              {product.colors.length > 0 && (
                <fieldset>
                  <legend>{t('product.color')}</legend>
                  {product.colors.map((color) => (
                    <button type="button" key={color} aria-pressed={selectedColor === color} onClick={() => setSelectedColor(color)}>{color}</button>
                  ))}
                </fieldset>
              )}
              {product.sizes.length > 0 && (
                <fieldset>
                  <legend>{t('product.size')}</legend>
                  {product.sizes.map((size) => (
                    <button type="button" key={size} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>
                  ))}
                </fieldset>
              )}
            </div>
          )}
          <a className="button button--primary" href={destination} target={shopIsExternal ? '_blank' : undefined} rel={shopIsExternal ? 'noreferrer' : undefined}>
            {t('closing.cta')} <ArrowIcon />
          </a>
          <small>{t('product.commerceNote')}</small>
        </div>
      </section>
    </div>
  )
}

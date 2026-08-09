import { useEffect, useState } from 'react'
import { useCart } from '../cart/useCart'
import { useCurrency } from '../commerce/useCurrency'
import { ProductGallery } from '../components/ProductGallery'
import { RelatedProducts } from '../components/RelatedProducts'
import { formatProductPrice, isProductPurchasable, productDescription, type Product } from '../data/products'
import { useLocale } from '../i18n/useLocale'

export function ProductPage({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { locale, t } = useLocale()
  const { currency } = useCurrency()
  const [size, setSize] = useState(product.sizes[0] ?? '')
  const [color, setColor] = useState(product.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [announcement, setAnnouncement] = useState('')
  const description = productDescription(product, locale)
  const purchasable = isProductPurchasable(product)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  const addToCart = () => {
    if (!purchasable) return
    addItem(product, { quantity, size, color })
    setAnnouncement(t('product.added', { name: product.name }))
  }

  return (
    <>
      <article className="product-page" aria-labelledby="product-title">
        <div className="product-page__gallery-column">
          <ProductGallery product={product} />
        </div>

        <div className="product-page__info">
          <div className="product-page__breadcrumb"><a href="/#collection">{t('product.shop')}</a><span>/</span><span>{product.code}</span></div>
          {!purchasable && <span className="concept-badge">{t('product.conceptStudy')}</span>}
          <span className="product-page__category">{product.category}</span>
          <h1 id="product-title">{product.name}</h1>
          {product.subtitle && <p className="product-page__subtitle">{product.subtitle}</p>}
          <div className="product-page__price">
            <span>{formatProductPrice(product, currency, locale, t('product.pricePending'))}</span>
            {product.compareAtPrice !== null && (
              <del>{formatProductPrice({ ...product, price: product.compareAtPrice }, currency, locale)}</del>
            )}
          </div>
          <p className="product-page__description">{description}</p>

          {purchasable && product.colors.length > 0 && (
            <fieldset className="product-options">
              <legend>{t('product.color')} <span>{color}</span></legend>
              <div>
                {product.colors.map((item) => <button type="button" key={item} aria-pressed={color === item} onClick={() => setColor(item)}>{item}</button>)}
              </div>
            </fieldset>
          )}

          {purchasable && product.sizes.length > 0 && (
            <fieldset className="product-options">
              <legend>{t('product.size')} <span>{size}</span></legend>
              <div>
                {product.sizes.map((item) => <button type="button" key={item} aria-pressed={size === item} onClick={() => setSize(item)}>{item}</button>)}
              </div>
            </fieldset>
          )}

          {purchasable ? (
            <div className="product-purchase">
              <div className="quantity-control" aria-label={t('product.quantity')}>
                <button type="button" aria-label={t('product.decrease')} onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" aria-label={t('product.increase')} onClick={() => setQuantity((current) => Math.min(10, current + 1))}>+</button>
              </div>
              <button className="button button--primary product-purchase__add" type="button" onClick={addToCart}>{t('product.add')}</button>
            </div>
          ) : (
            <div className="product-concept-access">
              <a className="button button--primary" href="/#inner-circle">{t('product.requestPrivateAccess')}</a>
              <span>{t('product.physicalValidationPending')}</span>
            </div>
          )}
          <p className="product-page__commerce-note">{t('product.commerceNote')}</p>
          {product.price !== null && (
            <p className="product-page__commerce-note">{t('product.displayCurrencyNote', { currency })}</p>
          )}
          <p className="sr-only" aria-live="polite">{announcement}</p>

          <div className="product-specs">
            <details open><summary>{t('product.description')}</summary><p>{description}</p></details>
            <details><summary>{t('product.materials')}</summary><p>{product.materials ?? t('product.infoPending')}</p></details>
            <details><summary>{t('product.features')}</summary><p>{product.features.join(' / ') || t('product.infoPending')}</p></details>
            <details><summary>{t('product.fit')}</summary><p>{product.fit ?? t('product.infoPending')}</p></details>
            <details><summary>{t('product.care')}</summary><p>{product.care ?? t('product.infoPending')}</p></details>
            <details><summary>{t('product.shipping')}</summary><p>{product.shipping ?? t('product.infoPending')}</p></details>
          </div>
        </div>
      </article>
      <RelatedProducts product={product} />
    </>
  )
}

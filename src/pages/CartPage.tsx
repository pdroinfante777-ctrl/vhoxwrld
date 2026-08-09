import { useEffect } from 'react'
import { useCart } from '../cart/useCart'
import { useCurrency } from '../commerce/useCurrency'
import { ArrowIcon } from '../components/ArrowIcon'
import { formatProductPrice, getProductById, isProductPurchasable, productPath } from '../data/products'
import { shopIsExternal, shopUrl } from '../config/shop'
import { useLocale } from '../i18n/useLocale'

export function CartPage() {
  const { items, totalQuantity, updateQuantity, removeItem, clearCart } = useCart()
  const { locale, t } = useLocale()
  const { currency, formatFromUsd } = useCurrency()
  const lines = items.flatMap((line) => {
    const product = getProductById(line.productId)
    return product && isProductPurchasable(product) ? [{ line, product }] : []
  })
  const allPricesConfirmed = lines.length > 0 && lines.every(({ product }) => isProductPurchasable(product))
  const subtotal = lines.reduce((total, { line, product }) => total + (product.price ?? 0) * line.quantity, 0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <header className="cart-page__header">
        <span>{t('cart.meta')}</span>
        <h1 id="cart-title">{t('cart.title')}</h1>
        <p>{totalQuantity === 1 ? t('cart.countOne') : t('cart.count', { count: totalQuantity })}</p>
      </header>

      {lines.length === 0 ? (
        <div className="cart-empty">
          <span>{t('cart.emptyLabel')}</span>
          <h2>{t('cart.empty')}</h2>
          <a className="button button--primary" href="/#collection">{t('cart.view')} <ArrowIcon /></a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {lines.map(({ line, product }, index) => {
              const media = product.media[0]
              return (
                <article className="cart-line" key={line.key}>
                  <a className={`cart-line__visual product-card__visual--${product.visual}`} href={productPath(product)}>
                    {media?.type === 'image'
                      ? <img src={media.src} alt={media.alt} style={{ objectFit: media.objectFit ?? 'contain', objectPosition: media.objectPosition }} />
                      : <><span className="product-card__geometry" aria-hidden="true" /><span>{t('cart.mediaPending')}</span></>}
                  </a>
                  <div className="cart-line__info">
                    <span>{String(index + 1).padStart(2, '0')} / {product.code}</span>
                    <h2><a href={productPath(product)}>{product.name}</a></h2>
                    <p>{[line.color, line.size].filter(Boolean).join(' / ') || t('product.variantPending')}</p>
                    <strong>{formatProductPrice(product, currency, locale, t('product.pricePending'))}</strong>
                  </div>
                  <div className="cart-line__actions">
                    <div className="quantity-control" aria-label={`${t('product.quantity')} ${product.name}`}>
                      <button type="button" aria-label={`${t('product.decrease')} ${product.name}`} onClick={() => updateQuantity(line.key, line.quantity - 1)}>−</button>
                      <output>{line.quantity}</output>
                      <button type="button" aria-label={`${t('product.increase')} ${product.name}`} onClick={() => updateQuantity(line.key, line.quantity + 1)}>+</button>
                    </div>
                    <button type="button" className="cart-line__remove" onClick={() => removeItem(line.key)}>{t('cart.remove')}</button>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="cart-summary" aria-label={t('cart.summary')}>
            <span>SUMMARY / {String(totalQuantity).padStart(2, '0')}</span>
            <div><span>{t('cart.subtotal')}</span><strong>{allPricesConfirmed ? formatFromUsd(subtotal) : t('cart.pending')}</strong></div>
            {allPricesConfirmed && <p>{t('product.displayCurrencyNote', { currency })}</p>}
            <p>{t('cart.disclaimer')}</p>
            {shopIsExternal && allPricesConfirmed ? (
              <a className="button button--primary" href={shopUrl} target="_blank" rel="noreferrer">{t('cart.continue')} <ArrowIcon /></a>
            ) : (
              <button className="button button--primary" type="button" disabled>{t('cart.unavailable')}</button>
            )}
            <button type="button" className="cart-summary__clear" onClick={clearCart}>{t('cart.clear')}</button>
          </aside>
        </div>
      )}
    </section>
  )
}

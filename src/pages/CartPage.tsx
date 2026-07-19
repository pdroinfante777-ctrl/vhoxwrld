import { useEffect } from 'react'
import { useCart } from '../cart/useCart'
import { ArrowIcon } from '../components/ArrowIcon'
import { formatProductPrice, getProductById, productPath } from '../data/products'
import { shopIsExternal, shopUrl } from '../config/shop'

export function CartPage() {
  const { items, totalQuantity, updateQuantity, removeItem, clearCart } = useCart()
  const lines = items.flatMap((line) => {
    const product = getProductById(line.productId)
    return product ? [{ line, product }] : []
  })
  const allPricesConfirmed = lines.length > 0 && lines.every(({ product }) => product.price !== null)
  const subtotal = lines.reduce((total, { line, product }) => total + (product.price ?? 0) * line.quantity, 0)

  useEffect(() => {
    document.title = 'Bolsa — VHOX'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <header className="cart-page__header">
        <span>BAG / LOCAL COMMERCE LAYER</span>
        <h1 id="cart-title">TU BOLSA.</h1>
        <p>{totalQuantity} {totalQuantity === 1 ? 'pieza' : 'piezas'}. Ningún pago se procesa en esta web.</p>
      </header>

      {lines.length === 0 ? (
        <div className="cart-empty">
          <span>00 / EMPTY</span>
          <h2>LA BOLSA ESTÁ VACÍA.</h2>
          <a className="button button--primary" href="/#collection">VER COLECCIÓN <ArrowIcon /></a>
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
                      : <><span className="product-card__geometry" aria-hidden="true" /><span>MEDIA PENDING</span></>}
                  </a>
                  <div className="cart-line__info">
                    <span>{String(index + 1).padStart(2, '0')} / {product.code}</span>
                    <h2><a href={productPath(product)}>{product.name}</a></h2>
                    <p>{[line.color, line.size].filter(Boolean).join(' / ') || 'VARIANT DATA PENDING'}</p>
                    <strong>{formatProductPrice(product)}</strong>
                  </div>
                  <div className="cart-line__actions">
                    <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                      <button type="button" aria-label={`Reducir ${product.name}`} onClick={() => updateQuantity(line.key, line.quantity - 1)}>−</button>
                      <output>{line.quantity}</output>
                      <button type="button" aria-label={`Aumentar ${product.name}`} onClick={() => updateQuantity(line.key, line.quantity + 1)}>+</button>
                    </div>
                    <button type="button" className="cart-line__remove" onClick={() => removeItem(line.key)}>ELIMINAR</button>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="cart-summary" aria-label="Resumen de la bolsa">
            <span>SUMMARY / {String(totalQuantity).padStart(2, '0')}</span>
            <div><span>SUBTOTAL</span><strong>{allPricesConfirmed ? `$${subtotal.toFixed(2)} USD` : 'POR CONFIRMAR'}</strong></div>
            <p>Impuestos, envío y disponibilidad se confirman únicamente en la tienda autorizada.</p>
            {shopIsExternal && allPricesConfirmed ? (
              <a className="button button--primary" href={shopUrl} target="_blank" rel="noreferrer">CONTINUAR EN TIENDA <ArrowIcon /></a>
            ) : (
              <button className="button button--primary" type="button" disabled>CHECKOUT NO DISPONIBLE</button>
            )}
            <button type="button" className="cart-summary__clear" onClick={clearCart}>VACIAR BOLSA</button>
          </aside>
        </div>
      )}
    </section>
  )
}

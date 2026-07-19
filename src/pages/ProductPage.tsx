import { useEffect, useState } from 'react'
import { useCart } from '../cart/useCart'
import { ProductGallery } from '../components/ProductGallery'
import { RelatedProducts } from '../components/RelatedProducts'
import { formatProductPrice, type Product } from '../data/products'

export function ProductPage({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState(product.sizes[0] ?? '')
  const [color, setColor] = useState(product.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    document.title = `${product.name} — VHOX`
    window.scrollTo(0, 0)
  }, [product])

  const addToCart = () => {
    addItem(product, { quantity, size, color })
    setAnnouncement(`${product.name} agregado a la bolsa`)
  }

  return (
    <>
      <article className="product-page" aria-labelledby="product-title">
        <div className="product-page__gallery-column">
          <ProductGallery product={product} />
        </div>

        <div className="product-page__info">
          <div className="product-page__breadcrumb"><a href="/#collection">TIENDA</a><span>/</span><span>{product.code}</span></div>
          <span className="product-page__category">{product.category}</span>
          <h1 id="product-title">{product.name}</h1>
          {product.subtitle && <p className="product-page__subtitle">{product.subtitle}</p>}
          <div className="product-page__price">
            <span>{formatProductPrice(product)}</span>
            {product.compareAtPrice !== null && <del>${product.compareAtPrice.toFixed(2)}</del>}
          </div>
          <p className="product-page__description">{product.description}</p>

          {product.colors.length > 0 && (
            <fieldset className="product-options">
              <legend>COLOR <span>{color}</span></legend>
              <div>
                {product.colors.map((item) => <button type="button" key={item} aria-pressed={color === item} onClick={() => setColor(item)}>{item}</button>)}
              </div>
            </fieldset>
          )}

          {product.sizes.length > 0 && (
            <fieldset className="product-options">
              <legend>TALLA <span>{size}</span></legend>
              <div>
                {product.sizes.map((item) => <button type="button" key={item} aria-pressed={size === item} onClick={() => setSize(item)}>{item}</button>)}
              </div>
            </fieldset>
          )}

          <div className="product-purchase">
            <div className="quantity-control" aria-label="Cantidad">
              <button type="button" aria-label="Reducir cantidad" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button>
              <output aria-live="polite">{quantity}</output>
              <button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity((current) => Math.min(10, current + 1))}>+</button>
            </div>
            <button className="button button--primary product-purchase__add" type="button" onClick={addToCart}>AGREGAR AL CARRITO</button>
          </div>
          <p className="product-page__commerce-note">La bolsa es local y no procesa pagos. Precio y disponibilidad se muestran únicamente cuando VHOX los confirma.</p>
          <p className="sr-only" aria-live="polite">{announcement}</p>

          <div className="product-specs">
            <details open><summary>DESCRIPCIÓN</summary><p>{product.description}</p></details>
            <details><summary>MATERIALES</summary><p>{product.materials ?? 'Información pendiente de confirmación.'}</p></details>
            <details><summary>CARACTERÍSTICAS</summary><p>{product.features.join(' / ') || 'Información pendiente de confirmación.'}</p></details>
            <details><summary>FIT</summary><p>{product.fit ?? 'Información pendiente de confirmación.'}</p></details>
            <details><summary>CUIDADOS</summary><p>{product.care ?? 'Información pendiente de confirmación.'}</p></details>
            <details><summary>ENVÍO</summary><p>{product.shipping ?? 'Información pendiente de confirmación.'}</p></details>
          </div>
        </div>
      </article>
      <RelatedProducts product={product} />
    </>
  )
}

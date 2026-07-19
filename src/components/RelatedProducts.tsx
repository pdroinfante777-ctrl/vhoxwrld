import { useState } from 'react'
import { getRelatedProducts, type Product } from '../data/products'
import { ProductCard } from './ProductCard'

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product)
  const [page, setPage] = useState(0)
  const pageSize = 4
  const pageCount = Math.max(1, Math.ceil(related.length / pageSize))
  const visible = related.slice(page * pageSize, page * pageSize + pageSize)

  if (!related.length) return null

  return (
    <section className="related-products section" aria-labelledby="related-title">
      <div className="related-products__header">
        <div>
          <span>RELATED / {product.code}</span>
          <h2 id="related-title">COMPLEMENTA EL ECOSISTEMA</h2>
        </div>
        <div className="related-products__controls" aria-label="Paginación de productos relacionados">
          <button type="button" aria-label="Página anterior" disabled={pageCount === 1} onClick={() => setPage((current) => (current - 1 + pageCount) % pageCount)}>←</button>
          <span>{String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}</span>
          <button type="button" aria-label="Página siguiente" disabled={pageCount === 1} onClick={() => setPage((current) => (current + 1) % pageCount)}>→</button>
        </div>
      </div>
      <div className="related-products__grid">
        {visible.map((item, index) => <ProductCard key={item.id} product={item} index={index} compact />)}
      </div>
    </section>
  )
}

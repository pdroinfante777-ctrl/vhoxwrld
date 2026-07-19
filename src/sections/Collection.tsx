import { useCallback, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductDetailDialog } from '../components/ProductDetailDialog'
import { SectionHeading } from '../components/SectionHeading'
import type { Product } from '../data/products'
import { products } from '../data/products'

export function Collection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const closeDialog = useCallback(() => setSelectedProduct(null), [])

  return (
    <section id="collection" className="collection section" aria-labelledby="collection-title">
      <SectionHeading
        id="collection-title"
        index="04"
        label="COLLECTION / GARMENT SLOTS"
        title="THREE POINTS OF ENTRY."
        description="SHADOW, VOID and ORIGIN are structured content slots—not fabricated releases. Real imagery, pricing, variants and availability can be added without rebuilding the experience."
      />

      <div className="collection__grid">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} onExplore={setSelectedProduct} key={product.id} />
        ))}
      </div>
      <ProductDetailDialog product={selectedProduct} onClose={closeDialog} />
    </section>
  )
}

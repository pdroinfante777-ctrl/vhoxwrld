import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'

export function Collection() {
  return (
    <section id="collection" className="collection section" aria-labelledby="collection-title">
      <SectionHeading
        id="collection-title"
        index="04"
        label="COLLECTION / GARMENT SLOTS"
        title="THREE POINTS OF ENTRY."
        description="SHADOW, VOID and ORIGIN are structured content slots, not fabricated releases. Real imagery, pricing, variants and availability can be added without rebuilding the experience."
      />

      <div className="collection__grid">
        {products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
      </div>
    </section>
  )
}

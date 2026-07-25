import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'
import { useLocale } from '../i18n/useLocale'

export function Collection() {
  const { t } = useLocale()

  return (
    <section id="collection" className="collection section" aria-labelledby="collection-title">
      <SectionHeading
        id="collection-title"
        index="04"
        label={t('collection.label')}
        title={t('collection.title')}
        description={t('collection.description')}
      />

      <div className="collection__grid">
        {products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}
      </div>
    </section>
  )
}

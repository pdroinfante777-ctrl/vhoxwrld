import { useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'
import { useLocale } from '../i18n/useLocale'
import { trackEntityView } from '../analytics/ga4'

export function Collection() {
  const { t } = useLocale()

  useEffect(() => {
    trackEntityView('home:concept-studies', 'view_item_list', {
      item_list_id: 'vhox-home-concept-studies',
      item_list_name: 'VHOX home concept studies',
      items: products.map((product) => ({ item_id: product.id, item_name: product.name, item_category: product.category })),
    })
  }, [])

  return (
    <section id="collection" className="collection section" aria-labelledby="collection-title">
      <SectionHeading
        id="collection-title"
        index="05"
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

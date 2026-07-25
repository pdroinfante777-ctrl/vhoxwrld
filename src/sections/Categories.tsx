import { SectionHeading } from '../components/SectionHeading'
import { CategoryVisual } from '../components/CategoryVisual'
import { categories } from '../data/categories'
import { useLocale } from '../i18n/useLocale'

export function Categories() {
  const { t } = useLocale()

  return (
    <section id="categories" className="categories section" aria-labelledby="categories-title">
      <SectionHeading
        id="categories-title"
        index="03"
        label={t('categories.label')}
        title={t('categories.title')}
        description={t('categories.description')}
      />
      <div className="categories__list">
        {categories.map((category) => (
          <article className={`category-row category-row--${category.visual}`} key={category.index} tabIndex={0} data-reveal>
            <span className="category-row__index">{category.index}</span>
            <h3>{t(category.nameKey)}</h3>
            <span className="category-row__state">{t(category.stateKey)}</span>
            <CategoryVisual visual={category.visual} />
          </article>
        ))}
      </div>
    </section>
  )
}

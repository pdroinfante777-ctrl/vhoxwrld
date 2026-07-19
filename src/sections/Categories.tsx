import { SectionHeading } from '../components/SectionHeading'
import { categories } from '../data/categories'

export function Categories() {
  return (
    <section id="categories" className="categories section" aria-labelledby="categories-title">
      <SectionHeading
        id="categories-title"
        index="03"
        label="GARMENT INDEX / VHOX"
        title="THE MOVEMENT TAKES FORM."
        description="VHOX is a custom apparel movement. These categories define the current direction without claiming unreleased products as available."
      />
      <div className="categories__list">
        {categories.map((category) => (
          <article className={`category-row category-row--${category.visual}`} key={category.index} data-reveal>
            <span className="category-row__index">{category.index}</span>
            <h3>{category.name}</h3>
            <span className="category-row__state">{category.state}</span>
            <span className="category-row__form" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

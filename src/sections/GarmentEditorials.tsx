import { EditorialGallery } from '../components/EditorialGallery'
import { ArrowIcon } from '../components/ArrowIcon'
import { garmentCopy, garmentStories, premiumImages } from '../data/garmentEditorials'
import { useLocale } from '../i18n/useLocale'

export function GarmentEditorials({ preview = false }: { preview?: boolean }) {
  const { locale } = useLocale()
  return (
    <section id="garments" className={`garment-edit${preview ? ' garment-edit--preview' : ''}`} aria-labelledby="garments-title">
      <header className="garment-edit__heading">
        <h2 id="garments-title">{garmentCopy.title[locale]}</h2>
        <div><p>{garmentCopy.intro[locale]}</p>{preview && <a className="editorial-link" href="/collections/#garments">{garmentCopy.explore[locale]}<ArrowIcon /></a>}</div>
      </header>
      <div className="garment-edit__grid">
        {(preview ? [garmentStories[0], garmentStories[3]] : garmentStories).map(story => <article className={`garment-story garment-story--${story.id}`} key={story.id}>
          <EditorialGallery images={preview ? [story.images[0]] : story.images} title={story.title[locale]} />
          <h3>{story.title[locale]}</h3>
          <p>{story.description[locale]}</p>
        </article>)}
      </div>
      <p className="garment-edit__note">{garmentCopy.note[locale]}</p>
    </section>
  )
}

export function PremiumEditorial() {
  const { locale } = useLocale()
  return (
    <section id="premium" className="premium-edit" aria-labelledby="premium-title">
      <header><h2 id="premium-title">{garmentCopy.premiumTitle[locale]}</h2><p>{garmentCopy.premiumDescription[locale]}</p></header>
      <div className="premium-edit__images">
        <figure><EditorialGallery images={[premiumImages[0]]} title={garmentCopy.atelier[locale]} /><figcaption>{garmentCopy.atelier[locale]}</figcaption></figure>
        <figure><EditorialGallery images={[premiumImages[1]]} title={garmentCopy.courtyard[locale]} /><figcaption>{garmentCopy.courtyard[locale]}</figcaption></figure>
      </div>
      <p className="garment-edit__note">{garmentCopy.premiumNote[locale]}</p>
    </section>
  )
}

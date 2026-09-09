import { ArrowIcon } from '../components/ArrowIcon'
import { chromaticBlackCopy } from '../data/chromaticBlack'
import { products } from '../data/products'
import { useLocale } from '../i18n/useLocale'
import type { CSSProperties } from 'react'

const palette = [
  { name: 'OBSIDIAN', color: '#090909' },
  { name: 'ABYSS BLUE', color: '#0d1420' },
  { name: 'MIDNIGHT VIOLET', color: '#171124' },
  { name: 'BLACK CHERRY', color: '#25080c' },
  { name: 'SHADOW FOREST', color: '#111c17' },
  { name: 'BURNT EARTH', color: '#251a17' },
]

const studyMedia = [
  { src: '/chromatic-black/vhox-black-cherry-tee.jpeg', width: 1122, height: 1402 },
  { src: '/chromatic-black/vhox-burnt-earth-tee.jpeg', width: 1122, height: 1402 },
  { src: '/chromatic-black/vhox-midnight-violet-tee.jpeg', width: 1448, height: 1086 },
]

const collectionMedia = [
  { src: '/chromatic-black/vhox-textured-black-tee.jpeg', width: 1448, height: 1086 },
  { src: '/chromatic-black/vhox-nylon-jacket.jpeg', width: 1254, height: 1254 },
  { src: '/chromatic-black/vhox-cargo-pant.jpeg', width: 1254, height: 1254 },
]

export function ChromaticStory() {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="chromatic-black" className="chromatic-story chromatic-section" aria-labelledby="chromatic-story-title">
      <div className="chromatic-kicker" data-reveal>{copy.codeLabel}</div>
      <div className="chromatic-story__grid">
        <h2 id="chromatic-story-title" data-reveal>{copy.codeTitle}</h2>
        <div className="chromatic-story__copy" data-reveal>
          <p>{copy.codeParagraphOne}</p>
          <p>{copy.codeParagraphTwo}</p>
        </div>
      </div>
      <ol className="chromatic-palette" aria-label={copy.codeLabel}>
        {palette.map((tone, index) => (
          <li key={tone.name} style={{ '--tone': tone.color } as CSSProperties} data-reveal>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{tone.name}</b>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function ChromaticStudies() {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="chromatic-studies" className="chromatic-studies chromatic-section" aria-labelledby="chromatic-studies-title">
      <header className="chromatic-heading" data-reveal>
        <div>
          <span>{copy.studiesLabel}</span>
          <h2 id="chromatic-studies-title">{copy.studiesTitle}</h2>
        </div>
        <p>{copy.studiesIntro}</p>
      </header>

      <div className="chromatic-studies__grid">
        {copy.studies.map((study, index) => (
          <article key={study.name} className="chromatic-study" data-reveal>
            <figure>
              <img
                src={studyMedia[index].src}
                width={studyMedia[index].width}
                height={studyMedia[index].height}
                alt={`${study.name} — ${study.description}`}
                loading="lazy"
                decoding="async"
                data-parallax="2"
              />
            </figure>
            <div className="chromatic-study__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{study.name}</h3>
                <p>{study.description}</p>
              </div>
              <i style={{ '--tone': palette[index + 3]?.color ?? palette[index].color } as CSSProperties} aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ChromaticDetail() {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="signature" className="chromatic-detail" aria-labelledby="chromatic-detail-title">
      <figure className="chromatic-detail__media">
        <img
          src="/chromatic-black/vhox-purple-detail.jpeg"
          width="1448"
          height="1086"
          alt={copy.detailAlt}
          loading="lazy"
          decoding="async"
          data-parallax="3"
        />
      </figure>
      <div className="chromatic-detail__copy" data-reveal>
        <span>{copy.detailLabel}</span>
        <h2 id="chromatic-detail-title">{copy.detailTitle}</h2>
        <p>{copy.detailCopy}</p>
        <ol>
          {copy.detailCodes.map((code, index) => (
            <li key={code}><span>{String(index + 1).padStart(2, '0')}</span>{code}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ChromaticCollection() {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="collection" className="chromatic-collection chromatic-section" aria-labelledby="chromatic-collection-title">
      <header className="chromatic-heading" data-reveal>
        <div>
          <span>{copy.collectionLabel}</span>
          <h2 id="chromatic-collection-title">{copy.collectionTitle}</h2>
        </div>
        <p>{copy.collectionIntro}</p>
      </header>

      <div className="chromatic-collection__grid">
        {copy.pieces.map((piece, index) => (
          <article key={piece.name} className="chromatic-piece" data-reveal>
            <a href={`/collections/${products[index].slug}/`} className="chromatic-piece__media" data-cursor="VIEW">
              <img
                src={collectionMedia[index].src}
                width={collectionMedia[index].width}
                height={collectionMedia[index].height}
                alt={copy.collectionAlt[index]}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className="chromatic-piece__meta">
              <div>
                <span>{String(index + 1).padStart(2, '0')} / VHOX</span>
                <h3>{piece.name}</h3>
                <p>{piece.detail}</p>
              </div>
              <a href={`/collections/${products[index].slug}/`}>{piece.action} <ArrowIcon /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ChromaticCampaign() {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="campaign" className="chromatic-campaign" aria-labelledby="chromatic-campaign-title">
      <img
        src="/chromatic-black/vhox-drop-001-family.jpeg"
        width="1448"
        height="1086"
        alt={copy.campaignAlt}
        loading="lazy"
        decoding="async"
      />
      <div className="chromatic-campaign__shade" aria-hidden="true" />
      <div className="chromatic-campaign__copy" data-reveal>
        <span>{copy.campaignLabel}</span>
        <h2 id="chromatic-campaign-title">{copy.campaignTitle}</h2>
        <a className="button button--campaign" href="#inner-circle">{copy.campaignAction} <ArrowIcon /></a>
      </div>
    </section>
  )
}

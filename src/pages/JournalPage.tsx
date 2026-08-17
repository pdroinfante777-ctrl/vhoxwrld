import { ArrowIcon } from '../components/ArrowIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ShareButton } from '../components/ShareButton'
import { journalEntries } from '../data/editorial'
import { useLocale } from '../i18n/useLocale'
import { seoCopy } from '../seo/content'
import { breadcrumbSchema } from '../seo/schema'
import { StructuredData } from '../seo/StructuredData'

const paths = ['/manifesto/', '/collections/', '/#vhox-world']

export function JournalPage() {
  const { locale, t } = useLocale()
  const copy = seoCopy[locale]

  return (
    <article className="seo-page seo-page--journal">
      <StructuredData id="vhox-journal-breadcrumb-schema" data={breadcrumbSchema([{ name: copy.breadcrumbHome, path: '/' }, { name: 'Journal', path: '/journal/' }])} />
      <header className="seo-page__hero">
        <Breadcrumbs items={[{ label: copy.breadcrumbHome, href: '/' }, { label: 'Journal' }]} />
        <span className="seo-page__kicker">VHOX JOURNAL / FIELD NOTES</span>
        <h1>{copy.journal.h1}</h1>
        <div className="seo-page__intro">
          <p>{copy.journalIntro}</p>
          <a className="text-link seo-inline-cta" href="/manifesto/">{copy.journalCta} <ArrowIcon /></a>
          <ShareButton path="/journal/" title={copy.journal.title} description={copy.journal.description} />
        </div>
      </header>
      <section className="seo-journal-grid" aria-labelledby="published-notes-title">
        <header className="seo-section-heading">
          <span>01 / PUBLISHED NOTES</span>
          <h2 id="published-notes-title">BEYOND THE SURFACE.</h2>
        </header>
        <div className="journal__grid">
          {journalEntries.map((entry, index) => (
            <article className={`journal-card journal-card--${entry.id}`} key={entry.id}>
              <a href={paths[index]}>
                <div className="journal-card__visual" aria-hidden="true"><span />{entry.id === 'origin' && <img src="/brand/vhox-bat-particle-source.png" alt="" loading="lazy" decoding="async" />}</div>
                <div className="journal-card__meta"><span>{entry.index} / VHOX JOURNAL</span><h3>{t(entry.titleKey)}</h3><p>{t(entry.copyKey)}</p><b>{t('journal.read')} <ArrowIcon /></b></div>
              </a>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}

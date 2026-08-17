import { ArrowIcon } from '../components/ArrowIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ShareButton } from '../components/ShareButton'
import { useLocale } from '../i18n/useLocale'
import { seoCopy } from '../seo/content'
import { canonicalUrl } from '../seo/metadata'
import { breadcrumbSchema } from '../seo/schema'
import { StructuredData } from '../seo/StructuredData'

export function ManifestoPage() {
  const { locale, t } = useLocale()
  const copy = seoCopy[locale]
  const sections = [
    { id: 'hidden-material', title: t('house.hiddenTitle'), body: t('house.hiddenCopy') },
    { id: 'exact-form', title: t('house.exactTitle'), body: t('house.exactCopy') },
    { id: 'private-discipline', title: t('house.privateTitle'), body: t('house.privateCopy') },
  ]
  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: copy.breadcrumbHome, path: '/' }, { name: 'Manifesto', path: '/manifesto/' }]),
      { '@type': 'Article', '@id': `${canonicalUrl('/manifesto/')}#article`, headline: copy.manifesto.h1, description: copy.manifesto.description, url: canonicalUrl('/manifesto/'), author: { '@type': 'Organization', name: 'VHOX' }, publisher: { '@type': 'Organization', name: 'VHOX', logo: { '@type': 'ImageObject', url: canonicalUrl('/brand/vhox-logo-source.png') } }, inLanguage: locale },
    ],
  }

  return (
    <article className="seo-page seo-page--manifesto">
      <StructuredData id="vhox-manifesto-schema" data={schemas} />
      <header className="seo-page__hero">
        <Breadcrumbs items={[{ label: copy.breadcrumbHome, href: '/' }, { label: 'Manifesto' }]} />
        <span className="seo-page__kicker">VHOX / BEYOND FORM</span>
        <h1>{copy.manifesto.h1}</h1>
        <div className="seo-page__intro">
          <p>{copy.manifestoIntro}</p>
          <a className="text-link seo-inline-cta" href="/collections/">{copy.manifestoCta} <ArrowIcon /></a>
          <ShareButton path="/manifesto/" title={copy.manifesto.title} description={copy.manifesto.description} />
        </div>
      </header>

      <section className="key-takeaways" aria-labelledby="takeaways-title">
        <span>01 / TL;DR</span>
        <h2 id="takeaways-title">{copy.inBrief}</h2>
        <ul>{sections.map((section) => <li key={section.id}><strong>{section.title}</strong><span>{section.body}</span></li>)}</ul>
      </section>

      <nav className="article-toc" aria-labelledby="contents-title">
        <span>02 / NAVIGATION</span>
        <h2 id="contents-title">{copy.contents}</h2>
        <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}</ol>
      </nav>

      <div className="manifesto-article">
        {sections.map((section, index) => (
          <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <span>0{index + 3} / HOUSE CODE</span>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}

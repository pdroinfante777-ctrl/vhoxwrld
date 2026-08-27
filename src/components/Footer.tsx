import { socialProfiles } from '../config/social'
import type { TranslationKey } from '../i18n/translations'
import { useLocale } from '../i18n/useLocale'
import { BrandMark } from './BrandMark'
import { MarketControls } from './MarketControls'

const year = new Date().getFullYear()

const collectionLinks = [
  { label: 'BAT', href: '/collections/bat/' },
  { label: 'ROSE', href: '/collections/rose/' },
  { label: 'VOID', href: '/collections/void/' },
] as const

const exploreLinks = [
  { labelKey: 'nav.details' as TranslationKey, href: '/#chromatic-black' },
  { labelKey: 'nav.world' as TranslationKey, href: '/#campaign' },
  { labelKey: 'nav.journal' as TranslationKey, href: '/journal/' },
  { labelKey: 'footer.beyondForm' as TranslationKey, href: '/manifesto/' },
] as const

export function Footer() {
  const { t } = useLocale()

  return (
    <footer id="contact" className="site-footer site-footer--chromatic">
      <div className="site-footer__masthead" data-reveal>
        <a href="/#top" aria-label={t('nav.homeLabel')}><BrandMark /></a>
        <div>
          <p>FROM A DISTANCE, BLACK.</p>
          <p>UP CLOSE, VHOX.</p>
        </div>
        <span>{t('footer.movement')}</span>
      </div>

      <div className="site-footer__columns">
        <section className="site-footer__contact">
          <span>{t('footer.contact')}</span>
          <h2>{t('footer.talk')}</h2>
          <a href="mailto:contact@vhoxwrld.com">contact@vhoxwrld.com</a>
        </section>

        <nav aria-label={t('footer.shop')}>
          <span>{t('footer.shop')}</span>
          <a href="/collections/">{t('nav.drop001')}</a>
          {collectionLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <nav aria-label={t('footer.explore')}>
          <span>{t('footer.explore')}</span>
          {exploreLinks.map((item) => <a key={item.href} href={item.href}>{t(item.labelKey)}</a>)}
        </nav>

        <section className="site-footer__client">
          <span>{t('footer.client')}</span>
          <a href="/policies.html">{t('footer.policies')}</a>
          <a href="/terms.html">{t('footer.terms')}</a>
          <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20Support">{t('footer.requestSupport')}</a>
          <MarketControls placement="footer" />
        </section>
      </div>

      <div className="site-footer__social">
        <span>{t('footer.social')}</span>
        {socialProfiles.length > 0 ? socialProfiles.map((profile) => (
          <a key={profile.label} href={profile.url} target="_blank" rel="noreferrer">{profile.label}</a>
        )) : <p>{t('social.pending')}</p>}
      </div>

      <div className="site-footer__bottom">
        <span>{t('footer.copyright', { year })}</span>
        <span>VHOX WRLD / CHROMATIC BLACK</span>
        <a href="#top">{t('footer.back')}</a>
      </div>
    </footer>
  )
}

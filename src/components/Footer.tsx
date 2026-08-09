import { socialProfiles } from '../config/social'
import type { TranslationKey } from '../i18n/translations'
import { useLocale } from '../i18n/useLocale'
import { BrandMark } from './BrandMark'
import { MarketControls } from './MarketControls'

const year = new Date().getFullYear()

const shopLinks = [
  { labelKey: 'footer.drop001' as TranslationKey, href: '/#drop-001' },
  { label: 'BAT', href: '/product/bat' },
  { label: 'ROSE', href: '/product/rose' },
  { label: 'VOID', href: '/product/void' },
] as const

const exploreLinks = [
  { labelKey: 'footer.beyondForm' as TranslationKey, href: '/#manifesto' },
  { labelKey: 'footer.details' as TranslationKey, href: '/#details' },
  { labelKey: 'footer.world' as TranslationKey, href: '/#vhox-world' },
  { labelKey: 'footer.journal' as TranslationKey, href: '/#journal' },
] as const

export function Footer() {
  const { t } = useLocale()

  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__masthead" data-reveal>
        <a href="/#top" aria-label={t('nav.homeLabel')}><BrandMark /></a>
        <p>JUST BE YOURSELF.</p>
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
          {shopLinks.map((item) => (
            <a key={item.href} href={item.href}>{'labelKey' in item ? t(item.labelKey) : item.label}</a>
          ))}
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

      <figure className="site-footer__campaign" aria-labelledby="footer-campaign-title" data-reveal>
        <div className="site-footer__campaign-media">
          <img
            src="/campaign/vhox-coming-soon-architecture.jpg"
            width="736"
            height="920"
            alt="VHOX architectural campaign — coming soon"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>
          <span>VHOX / VISUAL NOTE 001</span>
          <h2 id="footer-campaign-title">BEYOND FORM.</h2>
          <p>{t('footer.movement')}</p>
        </figcaption>
      </figure>

      <div className="site-footer__bottom">
        <span>{t('footer.copyright', { year })}</span>
        <span>VHOX WRLD / {t('brand.exclusiveMovement')}</span>
        <a href="#top">{t('footer.back')}</a>
      </div>
    </footer>
  )
}

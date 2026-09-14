import { useEffect, useRef, useState } from 'react'
import { useCart } from '../cart/useCart'
import { isProductPurchasable, products } from '../data/products'
import { useLocale } from '../i18n/useLocale'
import { BagIcon } from './BagIcon'
import { BrandMark } from './BrandMark'
import { MarketControls } from './MarketControls'

const navigationItems = [
  { labelKey: 'nav.home', href: '/#top' },
  { labelKey: 'nav.shop', href: '/collections/', collectionName: 'SIGNAL' },
  { labelKey: 'nav.details', href: '/#chromatic-black' },
  { labelKey: 'nav.world', href: '/#campaign' },
  { labelKey: 'nav.journal', href: '/journal/' },
  { labelKey: 'nav.access', href: '/#inner-circle' },
  { labelKey: 'nav.contact', href: '/#contact' },
] as const

type NavigationProps = {
  reducedMotion: boolean
}

export function Navigation({ reducedMotion }: NavigationProps) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bagAnimating, setBagAnimating] = useState(false)
  const { totalQuantity, pulseToken } = useCart()
  const showBag = totalQuantity > 0 || products.some(isProductPurchasable)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [open])

  useEffect(() => {
    if (open) mobileMenuRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
  }, [open])

  useEffect(() => {
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key !== 'Tab' || !open) return

      const focusable = [
        ...Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], select') ?? []),
        toggleRef.current,
      ].filter(Boolean) as HTMLElement[]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleMenuKeys)
    return () => document.removeEventListener('keydown', handleMenuKeys)
  }, [open])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.documentElement.classList.toggle('vhox-menu-open', open)
    if (open) document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('vhox-menu-open')
    }
  }, [open])

  useEffect(() => {
    if (!pulseToken || reducedMotion) return
    setBagAnimating(true)
    const timeout = window.setTimeout(() => setBagAnimating(false), 520)
    return () => window.clearTimeout(timeout)
  }, [pulseToken, reducedMotion])

  const headerClasses = [
    'site-header',
    scrolled ? 'site-header--scrolled' : '',
    open ? 'site-header--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <header className={headerClasses}>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t('nav.close') : t('nav.open')}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
        <b>{t('nav.menuLabel')}</b>
      </button>

      <a className="brand header-wordmark" href="/#top" aria-label={t('nav.homeLabel')} onClick={() => setOpen(false)}>
        <BrandMark className="header-wordmark__primary" decorative />
      </a>

      <div className="header-actions">
        <a className="header-drop-link" href="/collections/">DROP 001 / SIGNAL</a>
        <a className="header-access-link" href="/#inner-circle">{t('nav.access')}</a>
        {showBag && (
          <a
            className={`bag-link ${bagAnimating ? 'bag-link--pulse' : ''}`}
            href="/cart"
            aria-label={totalQuantity === 1 ? t('bag.labelOne') : t('bag.label', { count: totalQuantity })}
          >
            <BagIcon />
            {totalQuantity > 0 && <span className="bag-link__count" aria-hidden="true">{totalQuantity}</span>}
          </a>
        )}
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="mobile-menu"
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={t('nav.mobile')}
        inert={!open}
        aria-hidden={!open}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false)
        }}
      >
        <div className="mobile-menu__body">
          <nav aria-label={t('nav.mobile')}>
            {navigationItems.map((item) => (
              <a
                key={item.labelKey}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}{'collectionName' in item ? ` / ${item.collectionName}` : ''}
              </a>
            ))}
          </nav>
          <aside>
            <p>{t('nav.overlayCopy')}</p>
            <MarketControls placement="mobile" tabIndex={open ? 0 : -1} />
          </aside>
        </div>
        <p className="mobile-menu__footer">VHOX WRLD / {t('brand.exclusiveMovement')}</p>
      </div>
    </header>
  )
}

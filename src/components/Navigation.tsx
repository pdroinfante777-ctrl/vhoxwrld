import { useEffect, useRef, useState } from 'react'
import { shopIsExternal, shopUrl } from '../config/shop'
import { BrandMark } from './BrandMark'

const navigationItems = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: shopUrl, external: shopIsExternal },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Process', href: '#process' },
  { label: 'Voices', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

type NavigationProps = {
  reducedMotion: boolean
}

export function Navigation({ reducedMotion }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll > 24)
      setHidden(!open && currentScroll > 180 && currentScroll > lastScroll.current + 5)
      lastScroll.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [open])

  useEffect(() => {
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key !== 'Tab' || !open) return

      const focusable = [toggleRef.current, ...Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])].filter(Boolean) as HTMLElement[]
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
    if (open) document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const headerClasses = [
    'site-header',
    scrolled ? 'site-header--scrolled' : '',
    hidden && !reducedMotion ? 'site-header--hidden' : '',
    open ? 'site-header--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <header className={headerClasses}>
      <a className="brand" href="#top" aria-label="VHOX home" onClick={() => setOpen(false)}>
        <BrandMark />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-hidden={!open}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false)
        }}
      >
        <nav aria-label="Mobile navigation">
          {navigationItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>WHO MOVES FIRST. / VHOX WRLD</p>
      </div>
    </header>
  )
}

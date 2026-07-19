import { useEffect, useRef, useState } from 'react'
import { shopIsExternal, shopUrl } from '../config/shop'

const navigationItems = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: shopUrl, external: shopIsExternal },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Research', href: '#research' },
  { label: 'Testimonials', href: '#testimonials' },
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
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

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
        VHOX<span className="brand__mark" aria-hidden="true">®</span>
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

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
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

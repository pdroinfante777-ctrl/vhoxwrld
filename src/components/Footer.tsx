import { BrandMark } from './BrandMark'
import { instagramUrl } from '../config/social'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__top">
        <a className="site-footer__brand" href="#top" aria-label="Back to top"><BrandMark /></a>
        <p>Custom garments and shared movement.<br />Made to originate, never imitate.</p>
        <a className="site-footer__mail" href="mailto:contact@vhoxwrld.com">
          contact@vhoxwrld.com
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>© {year} VHOX WRLD</span>
        <nav aria-label="Footer navigation">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a href="/policies.html">Policies</a>
          <a href="/terms.html">Terms</a>
        </nav>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

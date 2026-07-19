import { BrandMark } from './BrandMark'
import { instagramUrl } from '../config/social'

const year = new Date().getFullYear()
const footerNavigation = [
  ['Inicio', '/#top'],
  ['Tienda', '/#collection'],
  ['Lookbook', '/#lookbook'],
  ['Investigación', '/#research'],
  ['Testimonios', '/#testimonials'],
  ['Contacto', '/#contact'],
]

export function Footer() {
  return (
    <footer id="contact" className="site-footer" data-reveal>
      <span className="site-footer__rule" aria-hidden="true" />
      <div className="site-footer__intro">
        <a href="/#top" aria-label="VHOX home"><BrandMark /></a>
        <p>JUST BE YOURSELF.</p>
      </div>
      <div className="site-footer__monument" aria-hidden="true">VHOX</div>

      <div className="site-footer__columns">
        <section>
          <span>CONTACT / 01</span>
          <h2>HABLEMOS.</h2>
          <a href="mailto:contact@vhoxwrld.com">contact@vhoxwrld.com</a>
        </section>
        <section>
          <span>SUPPORT / 02</span>
          <p>Consultas sobre prendas, personalización, soporte y envíos.</p>
          <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20Support">SOLICITAR SOPORTE</a>
        </section>
        <nav aria-label="Footer navigation">
          <span>NAVIGATION / 03</span>
          {footerNavigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>© {year} VHOXWRLD — PRENDAS, IDENTIDAD Y MOVIMIENTO.</span>
        <nav aria-label="Legal and social navigation">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a href="/policies.html">Políticas</a>
          <a href="/terms.html">Términos</a>
        </nav>
        <a href="#top">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  )
}

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__top">
        <a className="site-footer__brand" href="#top" aria-label="Back to top">VHOX</a>
        <p>Independent study of form, movement<br />and urban identity.</p>
        <a className="site-footer__mail" href="mailto:contact@vhoxwrld.com">
          contact@vhoxwrld.com
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>© {year} VHOX WRLD</span>
        <nav aria-label="Footer navigation">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="/policies.html">Policies</a>
          <a href="/terms.html">Terms</a>
        </nav>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

import { ArrowIcon } from '../components/ArrowIcon'
import { shopIsExternal, shopUrl } from '../config/shop'

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="closing__meta" data-reveal>
        <span>06 / ACCESS POINT</span>
        <span>VHOX WRLD / 2026</span>
      </div>
      <h2 id="closing-title" data-reveal>ENTER THE WORLD<br />OF <em>VHOX.</em></h2>
      <a
        className="button button--closing"
        href={shopUrl}
        target={shopIsExternal ? '_blank' : undefined}
        rel={shopIsExternal ? 'noreferrer' : undefined}
        data-reveal
      >
        Enter the collection <ArrowIcon />
      </a>
    </section>
  )
}

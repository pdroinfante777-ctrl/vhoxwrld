import { ArrowIcon } from '../components/ArrowIcon'
import { instagramUrl } from '../config/social'

export function Community() {
  return (
    <section className="community section" aria-labelledby="community-title">
      <div className="community__copy" data-reveal>
        <span>08 / COMMUNITY SIGNAL</span>
        <h2 id="community-title">FOLLOW THE<br /><em>MOVEMENT.</em></h2>
      </div>
      <div className="community__channels">
        <article data-reveal>
          <span>INSTAGRAM</span>
          <p>Campaigns, process and release signals will live in the approved VHOX social channel.</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer">OPEN INSTAGRAM <ArrowIcon /></a>
        </article>
        <article data-reveal>
          <span>DROP LETTER</span>
          <p>No pretend subscription backend. Until the mailing system is connected, contact VHOX directly.</p>
          <a href="mailto:contact@vhoxwrld.com?subject=Join%20the%20VHOX%20drop%20letter">JOIN BY EMAIL <ArrowIcon /></a>
        </article>
      </div>
    </section>
  )
}

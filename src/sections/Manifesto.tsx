export function Manifesto() {
  return (
    <section id="manifesto" className="manifesto section" aria-labelledby="manifesto-title">
      <div className="manifesto__meta" data-reveal>
        <span>01 / MANIFESTO</span>
        <p>VHOX begins with a personal mark, takes form on a garment and moves through the people who refuse to follow.</p>
      </div>

      <h2 id="manifesto-title" className="manifesto__statement">
        <span className="manifesto__line"><span className="manifesto__line-inner">NO FOLLOWERS.</span></span>
        <span className="manifesto__line manifesto__line--outline"><span className="manifesto__line-inner">ONLY ORIGINATORS.</span></span>
      </h2>

      <div className="manifesto__rule" aria-hidden="true"><span className="manifesto__rule-fill" /></div>
      <div className="manifesto__footer" data-reveal>
        <span>CUSTOM GARMENTS / SHARED MOVEMENT</span>
        <p>Not designed to fit the moment.<br />Designed to move it.</p>
      </div>
    </section>
  )
}

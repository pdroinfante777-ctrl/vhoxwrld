export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="VHOX inicio">VHOX</a>
        <nav>
          <a href="#manifesto">Manifiesto</a>
          <a href="#collection">Colección</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="noise" />
        <div className="orb orbOne" />
        <div className="orb orbTwo" />
        <p className="eyebrow">DARK STREETWEAR / VHOX WRLD</p>
        <h1>
          WHO
          <span> MOVES FIRST.</span>
        </h1>
        <p className="intro">
          Una experiencia digital para quienes no siguen el movimiento:
          lo provocan.
        </p>
        <a className="cta" href="#manifesto">Entrar al mundo</a>
        <div className="scroll">SCROLL ↓</div>
      </section>

      <section id="manifesto" className="panel">
        <p className="index">01 / MANIFIESTO</p>
        <h2>NO FOLLOWERS.<br />ONLY ORIGINATORS.</h2>
        <p className="copy">
          VHOX vive entre lo industrial, lo urbano y lo experimental.
          Esta primera base ya contiene movimiento, profundidad, tipografía
          de impacto y una estructura preparada para crecer.
        </p>
      </section>

      <section id="collection" className="collection">
        <p className="index">02 / COLLECTION 001</p>
        <div className="cards">
          {["SHADOW", "VOID", "ORIGIN"].map((name, i) => (
            <article className="card" key={name}>
              <div className="cardVisual">
                <span>0{i + 1}</span>
              </div>
              <h3>{name}</h3>
              <p>COMING SOON</p>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <p>VHOX WRLD © 2026</p>
        <a href="mailto:contact@vhoxwrld.com">CONTACT@VHOXWRLD.COM</a>
      </footer>
    </main>
  );
}

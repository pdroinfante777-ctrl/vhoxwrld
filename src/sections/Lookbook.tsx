import { useRef } from 'react'
import { useSectionMotion } from '../animations/useSectionMotion'
import { SectionHeading } from '../components/SectionHeading'
import { lookbookFrames } from '../data/lookbook'

function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionMotion(sectionRef)

  return (
    <section ref={sectionRef} className="lookbook section" aria-labelledby="lookbook-title">
      <SectionHeading
        id="lookbook-title"
        index="03"
        label="LOOKBOOK / FIELD STUDIES"
        title="MOVEMENT, HELD IN FRAME."
        description="An editorial system awaiting approved VHOX campaign imagery and motion. Every placeholder preserves the intended composition and aspect ratio."
      />

      <div className="lookbook__grid">
        {lookbookFrames.map((frame, index) => (
          <figure className={`lookbook-frame lookbook-frame--${frame.format}`} key={frame.id} data-reveal>
            <div className="lookbook-frame__viewport">
              <div
                className={`lookbook-frame__placeholder lookbook-frame__placeholder--${index + 1}`}
                data-parallax={frame.parallax}
                aria-hidden="true"
              >
                <span className="lookbook-frame__cross" />
                <span className="lookbook-frame__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="lookbook-frame__stamp">VHOX / IMAGE STUDY</span>
              </div>
            </div>
            <figcaption>
              <span>{frame.label}</span>
              <span>{frame.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Lookbook

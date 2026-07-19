import { useEffect, useRef, useState } from 'react'
import { useSectionMotion } from '../animations/useSectionMotion'
import { SectionHeading } from '../components/SectionHeading'
import { lookbookFrames, type LookbookFrame } from '../data/lookbook'

function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFrame, setActiveFrame] = useState<LookbookFrame | null>(null)
  useSectionMotion(sectionRef)

  useEffect(() => {
    if (!activeFrame) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveFrame(null)
    }
    document.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', close)
    }
  }, [activeFrame])

  return (
    <section ref={sectionRef} className="lookbook section" aria-labelledby="lookbook-title">
      <SectionHeading
        id="lookbook-title"
        index="05"
        label="LOOKBOOK / FIELD STUDIES"
        title="MOVEMENT, HELD IN FRAME."
        description="The editorial layout is ready for approved VHOX photography and motion. Placeholders remain explicit until real assets enter the repository."
      />

      <div className="lookbook__grid">
        {lookbookFrames.map((frame, index) => (
          <figure className={`lookbook-frame lookbook-frame--${frame.format}`} key={frame.id} data-reveal>
            <div className="lookbook-frame__viewport">
              {frame.src ? (
                <button type="button" className="lookbook-frame__media-button" onClick={() => setActiveFrame(frame)} aria-label={`Open ${frame.label}`}>
                  {frame.mediaType === 'image' ? (
                    <img src={frame.src} alt={frame.alt} loading="lazy" decoding="async" data-parallax={frame.parallax} />
                  ) : (
                    <video src={frame.src} aria-label={frame.alt} muted loop playsInline preload="metadata" data-parallax={frame.parallax} />
                  )}
                </button>
              ) : (
                <div className={`lookbook-frame__placeholder lookbook-frame__placeholder--${index + 1}`} data-parallax={frame.parallax} aria-hidden="true">
                  <span className="lookbook-frame__cross" />
                  <span className="lookbook-frame__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="lookbook-frame__stamp">VHOX / APPROVED MEDIA PENDING</span>
                </div>
              )}
            </div>
            <figcaption><span>{frame.label}</span><span>{frame.note}</span></figcaption>
          </figure>
        ))}
      </div>

      {activeFrame?.src && (
        <div className="lookbook-lightbox" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveFrame(null)
        }}>
          <div role="dialog" aria-modal="true" aria-label={activeFrame.label}>
            <button type="button" onClick={() => setActiveFrame(null)} aria-label="Close lookbook media">CLOSE / ESC</button>
            {activeFrame.mediaType === 'image' ? (
              <img src={activeFrame.src} alt={activeFrame.alt} />
            ) : (
              <video src={activeFrame.src} aria-label={activeFrame.alt} controls autoPlay playsInline />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Lookbook

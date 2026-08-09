import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { getMaterialStudy, materialStudies, type MaterialStudy } from '../data/materialStudies'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLocale } from '../i18n/useLocale'

type MaterialStyle = CSSProperties & {
  '--material-tone': string
  '--material-rgb': string
  '--material-light-x': string
  '--material-light-strength': string
  '--material-distance': string
}

type ParticleStyle = CSSProperties & {
  '--particle-x': string
  '--particle-y': string
  '--particle-delay': string
  '--particle-opacity': string
}

const particleSeeds = Array.from({ length: 26 }, (_, index) => ({
  x: (index * 37 + 11) % 96,
  y: (index * 61 + 7) % 92,
  delay: (index % 9) * -0.42,
  opacity: 0.16 + (index % 5) * 0.07,
}))

export function MaterialSystem() {
  const { t } = useLocale()
  const reducedMotion = useReducedMotion()
  const visualRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<MaterialStudy['id']>('void-green')
  const [illumination, setIllumination] = useState(62)
  const [angle, setAngle] = useState(58)
  const [distance, setDistance] = useState(42)
  const active = getMaterialStudy(activeId)

  const materialStyle: MaterialStyle = {
    '--material-tone': active.undertone,
    '--material-rgb': active.undertoneRgb,
    '--material-light-x': `${angle}%`,
    '--material-light-strength': String(illumination / 100),
    '--material-distance': String(distance / 100),
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    visualRef.current?.style.setProperty('--pointer-x', `${x.toFixed(2)}%`)
    visualRef.current?.style.setProperty('--pointer-y', `${y.toFixed(2)}%`)
  }

  const resetPointer = () => {
    visualRef.current?.style.setProperty('--pointer-x', '50%')
    visualRef.current?.style.setProperty('--pointer-y', '46%')
  }

  return (
    <div className="material-system" data-reveal>
      <header className="material-system__header">
        <div>
          <span>{t('materialSystem.label')}</span>
          <h3>{t('materialSystem.title')}</h3>
        </div>
        <p>{t('materialSystem.description')}</p>
      </header>

      <div className="material-system__layout">
        <div className="material-system__selector" role="group" aria-label={t('materialSystem.activeLabel')}>
          {materialStudies.map((study) => (
            <button
              key={study.id}
              type="button"
              aria-pressed={active.id === study.id}
              onClick={() => setActiveId(study.id)}
            >
              <span>{study.index}</span>
              <strong>{study.name}</strong>
              <i style={{ backgroundColor: study.undertone }} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          ref={visualRef}
          id="material-simulator"
          className="material-system__visual"
          style={materialStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          aria-label={`${t('materialSystem.digitalStudy')}: ${active.name}`}
        >
          <div className="material-system__surface" aria-hidden="true">
            <span className="material-system__light" />
            <span className="material-system__grain" />
            <span className="material-system__fold material-system__fold--one" />
            <span className="material-system__fold material-system__fold--two" />
            <span className="material-system__fold material-system__fold--three" />
            <span className="material-system__particles">
              {particleSeeds.map((particle, index) => (
                <i
                  key={index}
                  style={{
                    '--particle-x': `${particle.x}%`,
                    '--particle-y': `${particle.y}%`,
                    '--particle-delay': `${particle.delay}s`,
                    '--particle-opacity': String(particle.opacity),
                  } as ParticleStyle}
                />
              ))}
            </span>
          </div>
          <div className="material-system__readout">
            <span>{active.index} / {t('materialSystem.digitalStudy')}</span>
            <strong aria-live="polite">{active.name}</strong>
            <p>{t(active.copyKey)}</p>
          </div>
        </div>
      </div>

      <div className="material-system__controls" aria-label={t('materialSystem.controls')}>
        <label>
          <span>{t('materialSystem.illumination')}</span>
          <input type="range" min="18" max="90" value={illumination} onChange={(event) => setIllumination(Number(event.target.value))} />
        </label>
        <label>
          <span>{t('materialSystem.angle')}</span>
          <input type="range" min="5" max="95" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
        </label>
        <label>
          <span>{t('materialSystem.distance')}</span>
          <input type="range" min="10" max="90" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />
        </label>
      </div>

      <p className="material-system__disclaimer">{t('materialSystem.disclaimer')}</p>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three'
import { ScrollTrigger } from '../animations/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const stages = [
  { index: '01', name: 'THREAD FIELD', detail: 'LOOSE FIBERS / INITIAL SIGNAL' },
  { index: '02', name: 'T-SHIRT FORM', detail: 'PROCEDURAL SILHOUETTE / NOT A PRODUCT' },
  { index: '03', name: 'CAP FORM', detail: 'PROCEDURAL SILHOUETTE / NOT A PRODUCT' },
  { index: '04', name: 'VHOX SIGNAL', detail: 'MOVEMENT CONDENSED INTO A MARK' },
]

function seededRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = value * 16807 % 2147483647
    return (value - 1) / 2147483646
  }
}

function createTargets(count: number) {
  const random = seededRandom(1307)
  const ring = new Float32Array(count * 3)
  const shirt = new Float32Array(count * 3)
  const cap = new Float32Array(count * 3)
  const signal = new Float32Array(count * 3)
  const letterSegments = [
    [[-3.2, 1], [-2.7, -1]], [[-2.7, -1], [-2.2, 1]],
    [[-1.7, 1], [-1.7, -1]], [[-0.7, 1], [-0.7, -1]], [[-1.7, 0], [-0.7, 0]],
    [[0.1, 0.9], [0.1, -0.9]], [[0.1, 0.9], [1.1, 0.9]], [[1.1, 0.9], [1.1, -0.9]], [[0.1, -0.9], [1.1, -0.9]],
    [[1.8, 1], [3.1, -1]], [[3.1, 1], [1.8, -1]],
  ]

  for (let i = 0; i < count; i += 1) {
    const offset = i * 3
    const angle = random() * Math.PI * 2
    const radius = 1.45 + (random() - 0.5) * 0.42
    ring[offset] = Math.cos(angle) * radius
    ring[offset + 1] = Math.sin(angle) * radius
    ring[offset + 2] = (random() - 0.5) * 0.6

    const shirtY = random() * 3.2 - 1.6
    const upper = shirtY > 0.48
    const torsoWidth = 1.08 + (shirtY + 1.6) * 0.05
    shirt[offset] = (random() - 0.5) * (upper ? 3.5 : torsoWidth * 2)
    shirt[offset + 1] = shirtY
    shirt[offset + 2] = (random() - 0.5) * 0.22
    if (upper && Math.abs(shirt[offset]) > 1.1) shirt[offset + 1] -= Math.abs(shirt[offset]) * 0.28

    const capX = (random() - 0.5) * 3.2
    const normalizedX = Math.min(1, Math.abs(capX) / 1.65)
    const capTop = Math.sqrt(1 - normalizedX * normalizedX) * 1.35
    const inBrim = random() > 0.78
    cap[offset] = inBrim ? 1.1 + random() * 1.5 : capX
    cap[offset + 1] = inBrim ? -0.42 + random() * 0.24 : -0.42 + random() * capTop
    cap[offset + 2] = (random() - 0.5) * (inBrim ? 0.18 : 0.48)

    const segment = letterSegments[i % letterSegments.length]
    const t = random()
    signal[offset] = segment[0][0] + (segment[1][0] - segment[0][0]) * t + (random() - 0.5) * 0.05
    signal[offset + 1] = segment[0][1] + (segment[1][1] - segment[0][1]) * t + (random() - 0.5) * 0.05
    signal[offset + 2] = (random() - 0.5) * 0.14
  }

  return [ring, shirt, cap, signal]
}

function FiberFallback() {
  return (
    <div className="fiber-study__fallback" aria-hidden="true">
      <span className="fiber-study__shirt-line" />
      <span className="fiber-study__stitch">VHOX</span>
    </div>
  )
}

function FiberStudy() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section || reducedMotion) return

    let renderer: WebGLRenderer | null = null
    let camera: PerspectiveCamera | null = null
    let geometry: BufferGeometry | null = null
    let points: Points | null = null
    let frame = 0
    let scrollTrigger: ScrollTrigger | null = null
    let progress = 0
    let pointerX = 0
    let pointerY = 0
    const precisePointer = window.matchMedia('(pointer: fine)').matches
    const cleanupRef: { current: (() => void) | null } = { current: null }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.3
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.2
    }
    if (precisePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })

    try {
      const mobile = window.matchMedia('(max-width: 48rem)').matches
      const count = mobile ? 850 : 2200
      const targets = createTargets(count)
      const positions = targets[0].slice()

      try {
        renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'high-performance' })
      } catch {
        setWebglFailed(true)
        if (precisePointer) window.removeEventListener('pointermove', onPointerMove)
        return
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.35 : 1.75))
      renderer.setClearColor(0x000000, 0)
      const scene = new Scene()
      camera = new PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.z = 7.2

      geometry = new BufferGeometry()
      geometry.setAttribute('position', new BufferAttribute(positions, 3))
      const material = new PointsMaterial({
        color: 0x7cff00,
        size: mobile ? 0.028 : 0.022,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.84,
        blending: AdditiveBlending,
        depthWrite: false,
      })
      points = new Points(geometry, material)
      scene.add(points)

      const resize = () => {
        if (!renderer || !camera) return
        const bounds = canvas.getBoundingClientRect()
        renderer.setSize(bounds.width, bounds.height, false)
        camera.aspect = bounds.width / Math.max(bounds.height, 1)
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      let previousStage = -1
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        onUpdate: (self) => {
          progress = self.progress * (targets.length - 1)
          const stage = Math.min(targets.length - 1, Math.round(progress))
          if (stage !== previousStage) {
            previousStage = stage
            setActiveStage(stage)
          }
        },
      })

      const render = () => {
        if (!renderer || !camera || !geometry || !points) return
        const fromIndex = Math.floor(progress)
        const toIndex = Math.min(targets.length - 1, fromIndex + 1)
        const mix = progress - fromIndex
        const from = targets[fromIndex]
        const to = targets[toIndex]
        const attribute = geometry.getAttribute('position')
        const array = attribute.array as Float32Array

        for (let i = 0; i < array.length; i += 1) {
          const desired = from[i] + (to[i] - from[i]) * mix
          array[i] += (desired - array[i]) * 0.085
        }
        attribute.needsUpdate = true
        points.rotation.y += ((pointerX + progress * 0.025) - points.rotation.y) * 0.035
        points.rotation.x += ((-pointerY) - points.rotation.x) * 0.035
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(render)
      }
      render()

      const cleanupRenderer = () => {
        window.removeEventListener('resize', resize)
        material.dispose()
      }
      cleanupRef.current = cleanupRenderer
    } catch {
      setWebglFailed(true)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      scrollTrigger?.kill()
      if (precisePointer) window.removeEventListener('pointermove', onPointerMove)
      cleanupRef.current?.()
      geometry?.dispose()
      renderer?.dispose()
    }
  }, [reducedMotion])

  const useFallback = reducedMotion || webglFailed

  return (
    <section ref={sectionRef} id="fiber-study" className="fiber-study" aria-labelledby="fiber-study-title">
      <div className="fiber-study__sticky">
        <div className="fiber-study__header">
          <span>02 / FIBER STUDY</span>
          <p>AN ABSTRACT MOTION STUDY. NO PROCEDURAL FORM REPRESENTS A PRODUCT FOR SALE.</p>
        </div>
        <div className="fiber-study__stage">
          {!useFallback && <canvas ref={canvasRef} className="fiber-study__canvas" aria-hidden="true" />}
          {useFallback && <FiberFallback />}
          <div className="fiber-study__copy" aria-live="polite">
            <span>{stages[activeStage].index} / 04</span>
            <h2 id="fiber-study-title">{stages[activeStage].name}</h2>
            <p>{stages[activeStage].detail}</p>
          </div>
          <ol className="fiber-study__timeline" aria-label="Fiber study stages">
            {stages.map((stage, index) => (
              <li key={stage.index} className={activeStage === index ? 'is-active' : ''}>
                <span>{stage.index}</span>{stage.name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default FiberStudy

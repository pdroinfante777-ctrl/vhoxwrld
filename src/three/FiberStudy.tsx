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

const batReferenceSource = '/brand/vhox-bat-particle-source.png'
const batWorldWidth = 6.35

const stages = [
  { index: '01', name: 'VHOX BAT SIGNAL', detail: 'OFFICIAL SILHOUETTE / PARTICLE FIELD' },
  { index: '02', name: 'T-SHIRT FORM', detail: 'PROCEDURAL SILHOUETTE / NOT A PRODUCT' },
  { index: '03', name: 'CAP FORM', detail: 'PROCEDURAL SILHOUETTE / NOT A PRODUCT' },
  { index: '04', name: 'VHOX SIGNAL', detail: 'MOVEMENT CONDENSED INTO A MARK' },
]

type PixelCandidate = {
  x: number
  y: number
  red: number
  green: number
  blue: number
}

type BatSample = {
  positions: Float32Array
  colors: Float32Array
}

type Point2D = readonly [number, number]

const oversizedShirtOutline: Point2D[] = [
  [-0.56, 1.61],
  [-1.25, 1.48],
  [-1.93, 1.08],
  [-2.28, 0.55],
  [-1.62, 0.14],
  [-1.18, 0.48],
  [-1.16, -1.75],
  [1.16, -1.75],
  [1.18, 0.48],
  [1.62, 0.14],
  [2.28, 0.55],
  [1.93, 1.08],
  [1.25, 1.48],
  [0.56, 1.61],
  [0.5, 1.41],
  [0.38, 1.25],
  [0.22, 1.14],
  [0, 1.1],
  [-0.22, 1.14],
  [-0.38, 1.25],
  [-0.5, 1.41],
]

function seededRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = value * 16807 % 2147483647
    return (value - 1) / 2147483646
  }
}

function isInsidePolygon(x: number, y: number, polygon: Point2D[]) {
  let inside = false

  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current, current += 1) {
    const [currentX, currentY] = polygon[current]
    const [previousX, previousY] = polygon[previous]
    const crossesRay = (currentY > y) !== (previousY > y)
      && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX

    if (crossesRay) inside = !inside
  }

  return inside
}

function createOversizedShirtTarget(count: number, random: () => number) {
  const positions = new Float32Array(count * 3)
  const segmentLengths = oversizedShirtOutline.map((point, index) => {
    const next = oversizedShirtOutline[(index + 1) % oversizedShirtOutline.length]
    return Math.hypot(next[0] - point[0], next[1] - point[1])
  })
  const perimeter = segmentLengths.reduce((total, length) => total + length, 0)

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const useOutline = random() < 0.36
    let x = 0
    let y = 0

    if (useOutline) {
      let distance = random() * perimeter
      let segmentIndex = 0

      while (distance > segmentLengths[segmentIndex] && segmentIndex < segmentLengths.length - 1) {
        distance -= segmentLengths[segmentIndex]
        segmentIndex += 1
      }

      const start = oversizedShirtOutline[segmentIndex]
      const end = oversizedShirtOutline[(segmentIndex + 1) % oversizedShirtOutline.length]
      const progress = distance / Math.max(segmentLengths[segmentIndex], 0.0001)
      x = start[0] + (end[0] - start[0]) * progress + (random() - 0.5) * 0.018
      y = start[1] + (end[1] - start[1]) * progress + (random() - 0.5) * 0.018
    } else {
      do {
        x = random() * 4.56 - 2.28
        y = random() * 3.36 - 1.75
      } while (!isInsidePolygon(x, y, oversizedShirtOutline))
    }

    positions[offset] = x
    positions[offset + 1] = y
    positions[offset + 2] = (random() - 0.5) * 0.16
  }

  return positions
}

function loadReferenceImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Unable to load particle reference: ${source}`))
    image.src = source
  })
}

function sampleBatSilhouette(image: HTMLImageElement, count: number): BatSample {
  const width = 768
  const height = Math.max(1, Math.round(width * (image.naturalHeight / image.naturalWidth)))
  const samplingCanvas = document.createElement('canvas')
  samplingCanvas.width = width
  samplingCanvas.height = height

  const context = samplingCanvas.getContext('2d', { willReadFrequently: true })
  if (!context) throw new Error('Canvas sampling is unavailable')

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, 0, 0, width, height)

  const pixels = context.getImageData(0, 0, width, height).data
  const mask = new Uint8Array(width * height)
  const candidates: PixelCandidate[] = []
  let minimumX = width
  let maximumX = 0
  let minimumY = height
  let maximumY = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = (y * width + x) * 4
      const red = pixels[pixelIndex]
      const green = pixels[pixelIndex + 1]
      const blue = pixels[pixelIndex + 2]
      const alpha = pixels[pixelIndex + 3]
      const belongsToMark = alpha > 32 && green > 108 && green > red * 1.08 && green > blue * 1.65

      if (!belongsToMark) continue

      mask[y * width + x] = 1
      candidates.push({ x, y, red, green, blue })
      minimumX = Math.min(minimumX, x)
      maximumX = Math.max(maximumX, x)
      minimumY = Math.min(minimumY, y)
      maximumY = Math.max(maximumY, y)
    }
  }

  if (candidates.length < 100) throw new Error('The VHOX bat silhouette could not be sampled')

  const edgeCandidates = candidates.filter(({ x, y }) => {
    const index = y * width + x
    return x === 0
      || x === width - 1
      || y === 0
      || y === height - 1
      || mask[index - 1] === 0
      || mask[index + 1] === 0
      || mask[index - width] === 0
      || mask[index + width] === 0
  })

  const random = seededRandom(19072026)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const silhouetteWidth = Math.max(1, maximumX - minimumX)
  const centerX = (minimumX + maximumX) * 0.5
  const centerY = (minimumY + maximumY) * 0.5

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const useEdge = edgeCandidates.length > 0 && random() < 0.48
    const pool = useEdge ? edgeCandidates : candidates
    const candidate = pool[Math.floor(random() * pool.length)]
    const jitterX = (random() - 0.5) * 0.36
    const jitterY = (random() - 0.5) * 0.36
    const brightness = 0.84 + random() * 0.2

    positions[offset] = ((candidate.x + jitterX - centerX) / silhouetteWidth) * batWorldWidth
    positions[offset + 1] = -((candidate.y + jitterY - centerY) / silhouetteWidth) * batWorldWidth
    positions[offset + 2] = (random() - 0.5) * 0.075

    colors[offset] = Math.min(1, (candidate.red / 255) * brightness)
    colors[offset + 1] = Math.min(1, (candidate.green / 255) * brightness)
    colors[offset + 2] = Math.min(1, (candidate.blue / 255) * brightness)
  }

  return { positions, colors }
}

function createTargets(count: number, bat: Float32Array) {
  const random = seededRandom(1307)
  const shirt = createOversizedShirtTarget(count, random)
  const cap = new Float32Array(count * 3)
  const signal = new Float32Array(count * 3)
  const letterSegments = [
    [[-3.2, 1], [-2.7, -1]], [[-2.7, -1], [-2.2, 1]],
    [[-1.7, 1], [-1.7, -1]], [[-0.7, 1], [-0.7, -1]], [[-1.7, 0], [-0.7, 0]],
    [[0.1, 0.9], [0.1, -0.9]], [[0.1, 0.9], [1.1, 0.9]], [[1.1, 0.9], [1.1, -0.9]], [[0.1, -0.9], [1.1, -0.9]],
    [[1.8, 1], [3.1, -1]], [[3.1, 1], [1.8, -1]],
  ]

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const capX = (random() - 0.5) * 3.2
    const normalizedX = Math.min(1, Math.abs(capX) / 1.65)
    const capTop = Math.sqrt(1 - normalizedX * normalizedX) * 1.35
    const inBrim = random() > 0.78
    cap[offset] = inBrim ? 1.1 + random() * 1.5 : capX
    cap[offset + 1] = inBrim ? -0.42 + random() * 0.24 : -0.42 + random() * capTop
    cap[offset + 2] = (random() - 0.5) * (inBrim ? 0.18 : 0.48)

    const segment = letterSegments[index % letterSegments.length]
    const segmentProgress = random()
    signal[offset] = segment[0][0] + (segment[1][0] - segment[0][0]) * segmentProgress + (random() - 0.5) * 0.05
    signal[offset + 1] = segment[0][1] + (segment[1][1] - segment[0][1]) * segmentProgress + (random() - 0.5) * 0.05
    signal[offset + 2] = (random() - 0.5) * 0.14
  }

  return [bat, shirt, cap, signal]
}

function getParticleProfile() {
  const shortestSide = Math.min(window.innerWidth, window.innerHeight)
  const longestSide = Math.max(window.innerWidth, window.innerHeight)
  const phone = shortestSide <= 480 && longestSide <= 960
  const tablet = !phone && longestSide <= 1180

  if (phone) return { count: 6200, pointSize: 0.0175, maximumPixelRatio: 1.5 }
  if (tablet) return { count: 8200, pointSize: 0.0145, maximumPixelRatio: 1.75 }
  return { count: 11200, pointSize: 0.0125, maximumPixelRatio: 2 }
}

function getResponsiveLayout(camera: PerspectiveCamera, width: number, height: number) {
  const aspect = width / Math.max(height, 1)
  const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
  const visibleWidth = visibleHeight * aspect
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const phone = Math.min(viewportWidth, viewportHeight) <= 480 && Math.max(viewportWidth, viewportHeight) <= 960
  const landscape = viewportWidth > viewportHeight
  const tablet = !phone && Math.max(viewportWidth, viewportHeight) <= 1180

  if (phone && !landscape) {
    const compactPortrait = viewportHeight < 650
    return {
      scale: Math.min(0.42, Math.max(0.22, (visibleWidth * (compactPortrait ? 0.68 : 0.84)) / batWorldWidth)),
      x: 0,
      y: visibleHeight * (compactPortrait ? 0.25 : 0.13),
    }
  }

  if (phone && landscape) {
    return {
      scale: Math.min(0.98, Math.max(0.48, (visibleWidth * 0.56) / batWorldWidth)),
      x: visibleWidth * 0.2,
      y: visibleHeight * 0.04,
    }
  }

  if (tablet) {
    return {
      scale: Math.min(0.9, Math.max(0.46, (visibleWidth * (landscape ? 0.62 : 0.68)) / batWorldWidth)),
      x: landscape ? visibleWidth * 0.08 : 0,
      y: visibleHeight * (landscape ? 0.07 : 0.16),
    }
  }

  return {
    scale: Math.min(1.02, Math.max(0.68, (visibleWidth * 0.54) / batWorldWidth)),
    x: 0,
    y: visibleHeight * 0.15,
  }
}

function FiberFallback() {
  return (
    <div className="fiber-study__fallback" aria-hidden="true">
      <img src={batReferenceSource} alt="" />
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

    let cancelled = false
    let renderer: WebGLRenderer | null = null
    let camera: PerspectiveCamera | null = null
    let geometry: BufferGeometry | null = null
    let material: PointsMaterial | null = null
    let points: Points | null = null
    let resizeObserver: ResizeObserver | null = null
    let resizeHandler: (() => void) | null = null
    let frame = 0
    let scrollTrigger: ScrollTrigger | null = null
    let progress = 0
    let pointerX = 0
    let pointerY = 0
    let layoutX = 0
    let layoutY = 0
    const precisePointer = window.matchMedia('(pointer: fine)').matches

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5
      pointerY = event.clientY / window.innerHeight - 0.5
    }

    if (precisePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })

    const setup = async () => {
      try {
        const profile = getParticleProfile()
        const image = await loadReferenceImage(batReferenceSource)
        if (cancelled) return

        const batSample = sampleBatSilhouette(image, profile.count)
        const targets = createTargets(profile.count, batSample.positions)
        const positions = targets[0].slice()

        try {
          renderer = new WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
          })
        } catch {
          if (!cancelled) setWebglFailed(true)
          return
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maximumPixelRatio))
        renderer.setClearColor(0x000000, 0)

        const scene = new Scene()
        camera = new PerspectiveCamera(38, 1, 0.1, 100)
        camera.position.z = 7.2

        geometry = new BufferGeometry()
        geometry.setAttribute('position', new BufferAttribute(positions, 3))
        geometry.setAttribute('color', new BufferAttribute(batSample.colors, 3))

        material = new PointsMaterial({
          color: 0xffffff,
          size: profile.pointSize,
          sizeAttenuation: true,
          vertexColors: true,
          transparent: true,
          opacity: 0.91,
          blending: AdditiveBlending,
          depthWrite: false,
        })

        points = new Points(geometry, material)
        scene.add(points)

        const resize = () => {
          if (!renderer || !camera || !points) return
          const bounds = canvas.getBoundingClientRect()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maximumPixelRatio))
          renderer.setSize(bounds.width, bounds.height, false)
          camera.aspect = bounds.width / Math.max(bounds.height, 1)
          camera.updateProjectionMatrix()

          const layout = getResponsiveLayout(camera, bounds.width, bounds.height)
          points.scale.setScalar(layout.scale)
          layoutX = layout.x
          layoutY = layout.y
          points.position.set(layoutX, layoutY, 0)
        }

        resizeHandler = resize
        resize()
        window.addEventListener('resize', resize, { passive: true })
        window.addEventListener('orientationchange', resize)

        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(resize)
          resizeObserver.observe(canvas)
        }

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

        const render = (time = 0) => {
          if (!renderer || !camera || !geometry || !points || !material || cancelled) return

          const fromIndex = Math.floor(progress)
          const toIndex = Math.min(targets.length - 1, fromIndex + 1)
          const mix = progress - fromIndex
          const from = targets[fromIndex]
          const to = targets[toIndex]
          const attribute = geometry.getAttribute('position')
          const array = attribute.array as Float32Array

          for (let index = 0; index < array.length; index += 1) {
            const desired = from[index] + (to[index] - from[index]) * mix
            array[index] += (desired - array[index]) * 0.085
          }

          attribute.needsUpdate = true
          points.position.x += ((layoutX + pointerX * 0.08) - points.position.x) * 0.04
          points.position.y += ((layoutY - pointerY * 0.05 + Math.sin(time * 0.00048) * 0.018) - points.position.y) * 0.04
          points.rotation.y += ((pointerX * 0.055 + progress * 0.012) - points.rotation.y) * 0.025
          points.rotation.x += ((-pointerY * 0.035) - points.rotation.x) * 0.025
          points.rotation.z = Math.sin(time * 0.00022) * 0.0035
          material.opacity = 0.89 + Math.sin(time * 0.0007) * 0.025

          renderer.render(scene, camera)
          frame = window.requestAnimationFrame(render)
        }

        frame = window.requestAnimationFrame(render)
      } catch {
        if (!cancelled) setWebglFailed(true)
      }
    }

    void setup()

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      scrollTrigger?.kill()
      resizeObserver?.disconnect()
      if (precisePointer) window.removeEventListener('pointermove', onPointerMove)
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
        window.removeEventListener('orientationchange', resizeHandler)
      }
      geometry?.dispose()
      material?.dispose()
      renderer?.dispose()
    }
  }, [reducedMotion])

  const useFallback = reducedMotion || webglFailed

  return (
    <section ref={sectionRef} id="fiber-study" className="fiber-study" aria-labelledby="fiber-study-title">
      <div className="fiber-study__sticky">
        <div className="fiber-study__header">
          <span>02 / FIBER STUDY</span>
          <p>AN ABSTRACT MOTION STUDY. PROCEDURAL FORMS DO NOT REPRESENT PRODUCTS FOR SALE.</p>
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

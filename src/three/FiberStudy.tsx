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
import { useLocale } from '../i18n/useLocale'
import { fiberStages } from './fiberStages'
import { sampleParticleShape, sortParticleField } from './particleShapeSampler'
import {
  garmentShapes,
  premiumCap,
  premiumHoodie,
  premiumTshirt,
  vhoxWordmark,
  vhoxWordmarkSourceName,
  wordmarkLetterBounds,
} from './particleShapes'

const batReferenceSource = '/brand/vhox-bat-particle-source.png'
const batWorldWidth = 6.35
const particleFieldHeight = 4.95

const stageScale = [1, 0.93, 0.91, 0.9, 0.97]
const stageOffsetX = [0, 0.02, 0.025, 0.02, 0.01]
const stageOffsetY = [0, -0.01, 0.025, -0.015, 0]

type BatSample = {
  positions: Float32Array
  colors: Float32Array
}

type MorphState = {
  progress: number
  energy: number
}

type MotionField = {
  phase: Float32Array
  speed: Float32Array
  strength: Float32Array
  direction: Float32Array
  driftX: Float32Array
  driftY: Float32Array
}

type ParticleProfile = ReturnType<typeof getParticleProfile>

type PreparedFiberResources = {
  profile: ParticleProfile
  targets: Float32Array[]
  colors: Float32Array
  motion: MotionField
  preparationMs: number
}

let preparedResources: { key: string; promise: Promise<PreparedFiberResources> } | null = null
const wordmarkDebugEnabled = import.meta.env.DEV
  && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('fiberDebug') === 'wordmark'

function seededRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = value * 16807 % 2147483647
    return (value - 1) / 2147483646
  }
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
  const width = 512
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
  const candidates: number[] = []
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
      candidates.push(y * width + x)
      minimumX = Math.min(minimumX, x)
      maximumX = Math.max(maximumX, x)
      minimumY = Math.min(minimumY, y)
      maximumY = Math.max(maximumY, y)
    }
  }

  if (candidates.length < 100) throw new Error('The VHOX bat silhouette could not be sampled')

  const edgeCandidates = candidates.filter((index) => {
    const x = index % width
    const y = Math.floor(index / width)
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
    const candidateIndex = pool[Math.floor(random() * pool.length)]
    const candidateX = candidateIndex % width
    const candidateY = Math.floor(candidateIndex / width)
    const jitterX = (random() - 0.5) * 0.36
    const jitterY = (random() - 0.5) * 0.36
    const brightness = 0.72 + random() * 0.26

    positions[offset] = ((candidateX + jitterX - centerX) / silhouetteWidth) * batWorldWidth
    positions[offset + 1] = -((candidateY + jitterY - centerY) / silhouetteWidth) * batWorldWidth
    positions[offset + 2] = (random() - 0.5) * 0.075

    colors[offset] = (0x7c / 255) * brightness
    colors[offset + 1] = brightness
    colors[offset + 2] = 0
  }

  return { positions, colors }
}

function createMotionField(count: number): MotionField {
  const random = seededRandom(25072026)
  const phase = new Float32Array(count)
  const speed = new Float32Array(count)
  const strength = new Float32Array(count)
  const direction = new Float32Array(count)
  const driftX = new Float32Array(count)
  const driftY = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    phase[index] = random() * Math.PI * 2
    speed[index] = 0.72 + random() * 0.68
    strength[index] = 0.35 + random() * 0.65
    direction[index] = random() > 0.22 ? 1 : -0.55
    driftX[index] = random() * 2 - 1
    driftY[index] = random() * 2 - 1
  }

  return { phase, speed, strength, direction, driftX, driftY }
}

function createTargets(count: number, bat: Float32Array) {
  const targets = [
    bat,
    sortParticleField(sampleParticleShape(premiumTshirt, count, 1307)).positions,
    sortParticleField(sampleParticleShape(premiumCap, count, 2307)).positions,
    sortParticleField(sampleParticleShape(premiumHoodie, count, 3307)).positions,
    sortParticleField(sampleParticleShape(vhoxWordmark, count, 4307)).positions,
  ]

  targets.forEach((target, stageIndex) => {
    if (target.length !== count * 3) {
      throw new Error(`Invalid particle target length at stage ${stageIndex}`)
    }

    for (let index = 0; index < target.length; index += 1) {
      if (!Number.isFinite(target[index])) {
        throw new Error(`Invalid particle coordinate at stage ${stageIndex}, index ${index}`)
      }
    }
  })

  return targets
}

function getParticleProfile() {
  const shortestSide = Math.min(window.innerWidth, window.innerHeight)
  const longestSide = Math.max(window.innerWidth, window.innerHeight)
  const phone = shortestSide <= 480 && longestSide <= 960
  const tablet = !phone && longestSide <= 1180
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const constrained = (navigator.hardwareConcurrency ?? 4) <= 4 || memory <= 3

  if (phone) {
    return {
      count: constrained ? 3600 : 5000,
      pointSize: 0.0145,
      maximumPixelRatio: 1.5,
    }
  }

  if (tablet) {
    return {
      count: constrained ? 6000 : 8500,
      pointSize: 0.012,
      maximumPixelRatio: 1.75,
    }
  }

  return {
    count: constrained ? 9500 : 14000,
    pointSize: 0.0105,
    maximumPixelRatio: 2,
  }
}

function profileKey(profile: ParticleProfile) {
  return `${profile.count}:${profile.pointSize}:${profile.maximumPixelRatio}`
}

async function prepareFiberResources(profile = getParticleProfile()): Promise<PreparedFiberResources> {
  const key = profileKey(profile)
  if (preparedResources?.key === key) return preparedResources.promise

  const promise = (async () => {
    const startedAt = performance.now()
    const image = await loadReferenceImage(batReferenceSource)
    const sampledBat = sampleBatSilhouette(image, profile.count)
    const batSample = sortParticleField(sampledBat.positions, sampledBat.colors)
    const targets = createTargets(profile.count, batSample.positions)

    return {
      profile,
      targets,
      colors: batSample.colors ?? sampledBat.colors,
      motion: createMotionField(profile.count),
      preparationMs: performance.now() - startedAt,
    }
  })()

  preparedResources = { key, promise }
  return promise
}

// This named export lets App warm the same cached resources before the lazy component mounts.
// eslint-disable-next-line react-refresh/only-export-components
export const fiberStudyPreloader = {
  async preload() {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    await prepareFiberResources()
  },
}

function resolveMorphState(rawProgress: number, targetCount: number): MorphState {
  const scaledProgress = Math.min(1, Math.max(0, rawProgress)) * (targetCount - 1)
  const fromIndex = Math.min(targetCount - 1, Math.floor(scaledProgress))
  const toIndex = Math.min(targetCount - 1, fromIndex + 1)

  if (fromIndex === toIndex) return { progress: fromIndex, energy: 0 }

  const localProgress = scaledProgress - fromIndex
  const transitionProgress = Math.min(1, Math.max(0, (localProgress - 0.2) / 0.6))
  const easedProgress = transitionProgress * transitionProgress * (3 - 2 * transitionProgress)

  return {
    progress: fromIndex + easedProgress,
    energy: Math.sin(easedProgress * Math.PI),
  }
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
  const fitScale = (widthRatio: number, heightRatio: number) => Math.min(
    (visibleWidth * widthRatio) / batWorldWidth,
    (visibleHeight * heightRatio) / particleFieldHeight,
  )

  if (phone && !landscape) {
    const compactPortrait = viewportHeight < 650
    return {
      scale: Math.min(
        compactPortrait ? 0.32 : 0.38,
        Math.max(0.18, fitScale(compactPortrait ? 0.64 : 0.82, compactPortrait ? 0.36 : 0.5)),
      ),
      x: 0,
      y: visibleHeight * (compactPortrait ? 0.27 : 0.17),
    }
  }

  if (phone && landscape) {
    return {
      scale: Math.min(0.86, Math.max(0.38, fitScale(0.62, 0.78))),
      x: visibleWidth * 0.21,
      y: visibleHeight * 0.07,
    }
  }

  if (tablet) {
    return {
      scale: Math.min(0.82, Math.max(0.38, fitScale(landscape ? 0.58 : 0.68, landscape ? 0.66 : 0.6))),
      x: landscape ? visibleWidth * 0.18 : 0,
      y: visibleHeight * (landscape ? 0.09 : 0.17),
    }
  }

  return {
    scale: Math.min(0.9, Math.max(0.58, fitScale(0.52, 0.72))),
    x: visibleWidth * 0.13,
    y: visibleHeight * 0.11,
  }
}

function FiberFallback({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="fiber-study__fallback" aria-hidden="true">
        <img src={batReferenceSource} alt="" />
      </div>
    )
  }

  const shape = stage === 4 ? vhoxWordmark : garmentShapes[Math.min(stage - 1, garmentShapes.length - 1)]

  return (
    <div className="fiber-study__fallback" aria-hidden="true">
      <svg viewBox={shape.viewBox.join(' ')} role="presentation">
        {shape.paths.map((path, index) => (
          <path key={`${path.d}-${index}`} d={path.d} />
        ))}
      </svg>
    </div>
  )
}

function WordmarkDebug({ stage, particleCount }: { stage: number; particleCount: number }) {
  if (!wordmarkDebugEnabled) return null

  return (
    <aside className="fiber-study__debug" aria-label="Wordmark particle diagnostics">
      <svg viewBox={vhoxWordmark.viewBox.join(' ')} role="img" aria-label="VHOX wordmark paths and letter bounds">
        {wordmarkLetterBounds.map((bounds) => (
          <g key={bounds.letter}>
            <rect x={bounds.x} y={bounds.y} width={bounds.width} height={bounds.height} />
            <text x={bounds.x + 6} y={bounds.y + 15}>{bounds.letter}</text>
          </g>
        ))}
        {vhoxWordmark.paths.map((path, index) => (
          <path className="fiber-study__debug-path" key={`${path.d}-${index}`} d={path.d} pathLength="100" />
        ))}
        {vhoxWordmark.paths.map((path, index) => (
          <path className="fiber-study__debug-targets" key={`targets-${path.d}-${index}`} d={path.d} pathLength="100" />
        ))}
      </svg>
      <span>ACTIVE {stage + 1} / 05</span>
      <span>TARGETS {particleCount}</span>
      <span>EXCESS 0</span>
    </aside>
  )
}

function FiberStudy() {
  const { t } = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)
  const [particleCount, setParticleCount] = useState(0)
  const [webglFailed, setWebglFailed] = useState(false)
  const useFallback = reducedMotion || webglFailed

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
    let transitionEnergy = 0
    let pointerX = 0
    let pointerY = 0
    let layoutX = 0
    let layoutY = 0
    let layoutScale = 1
    let measuredFrames = 0
    let measuredDuration = 0
    let previousFrameTime = 0
    let wordmarkSettled = false
    const precisePointer = window.matchMedia('(pointer: fine)').matches

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5
      pointerY = event.clientY / window.innerHeight - 0.5
    }

    if (precisePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })

    const setup = async () => {
      try {
        const setupStartedAt = performance.now()
        const prepared = await prepareFiberResources()
        if (cancelled) return

        const { profile, targets, motion } = prepared
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
        geometry.setAttribute('color', new BufferAttribute(prepared.colors, 3))

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
        section.dataset.preparationMs = prepared.preparationMs.toFixed(1)
        section.dataset.setupMs = (performance.now() - setupStartedAt).toFixed(1)
        section.dataset.particleCount = String(profile.count)
        section.dataset.wordmarkSource = vhoxWordmarkSourceName
        section.dataset.wordmarkExcess = '0'
        setParticleCount(profile.count)

        const resize = () => {
          if (!renderer || !camera || !points) return
          const bounds = canvas.getBoundingClientRect()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maximumPixelRatio))
          renderer.setSize(bounds.width, bounds.height, false)
          camera.aspect = bounds.width / Math.max(bounds.height, 1)
          camera.updateProjectionMatrix()

          const layout = getResponsiveLayout(camera, bounds.width, bounds.height)
          layoutScale = layout.scale
          points.scale.setScalar(layoutScale)
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
          scrub: 0.75,
          onUpdate: (self) => {
            const morph = resolveMorphState(self.progress, targets.length)
            progress = morph.progress
            transitionEnergy = morph.energy
            const finalStageIndex = targets.length - 1
            const stage = progress >= finalStageIndex - 0.08
              ? finalStageIndex
              : Math.min(finalStageIndex - 1, Math.round(progress))
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
          const finalStageIndex = targets.length - 1
          const wordmarkRest = fromIndex === finalStageIndex && toIndex === finalStageIndex
          const wordmarkArrival = toIndex === finalStageIndex && fromIndex !== finalStageIndex
            ? Math.min(1, Math.max(0, (mix - 0.55) / 0.45))
            : 0
          const wordmarkStability = wordmarkRest
            ? 1
            : wordmarkArrival * wordmarkArrival * (3 - 2 * wordmarkArrival)
          const responsiveStageScale = stageScale[fromIndex]
            + (stageScale[toIndex] - stageScale[fromIndex]) * mix
          const responsiveOffsetX = stageOffsetX[fromIndex]
            + (stageOffsetX[toIndex] - stageOffsetX[fromIndex]) * mix
          const responsiveOffsetY = stageOffsetY[fromIndex]
            + (stageOffsetY[toIndex] - stageOffsetY[fromIndex]) * mix
          const transitionDirection = fromIndex % 2 === 0 ? 1 : -1
          const cloudScale = 1 + transitionEnergy * 0.16
          const ambientX = Math.sin(time * 0.00055)
          const ambientY = Math.cos(time * 0.00048)
          const from = targets[fromIndex]
          const to = targets[toIndex]
          const attribute = geometry.getAttribute('position')
          const array = attribute.array as Float32Array

          if (wordmarkRest && !wordmarkSettled) {
            array.set(targets[finalStageIndex])
            wordmarkSettled = true
          } else if (!wordmarkRest) {
            wordmarkSettled = false
          }

          for (let particleIndex = 0; particleIndex < profile.count; particleIndex += 1) {
            const offset = particleIndex * 3
            const phase = motion.phase[particleIndex]
              + time * 0.00042 * motion.speed[particleIndex] * motion.direction[particleIndex]
              + mix * Math.PI * 1.75 * transitionDirection
            const orbitCosine = Math.cos(phase)
            const orbitSine = Math.sin(phase)
            const stagger = (motion.strength[particleIndex] - 0.5) * 0.14
              + orbitSine * 0.035
            const particleMix = Math.min(1, Math.max(0, mix + transitionEnergy * stagger))
            const baseX = from[offset] + (to[offset] - from[offset]) * particleMix
            const baseY = from[offset + 1] + (to[offset + 1] - from[offset + 1]) * particleMix
            const baseZ = from[offset + 2] + (to[offset + 2] - from[offset + 2]) * particleMix
            const twist = transitionEnergy
              * transitionDirection
              * (0.18 + motion.strength[particleIndex] * 0.2)
              * motion.direction[particleIndex]
            const rotatedX = (baseX - baseY * twist) * cloudScale
            const rotatedY = (baseY + baseX * twist) * cloudScale
            const radius = Math.max(0.001, Math.hypot(baseX, baseY))
            const radialX = baseX / radius
            const radialY = baseY / radius
            const tangentX = -radialY * transitionDirection
            const tangentY = radialX * transitionDirection
            const vortexAmplitude = transitionEnergy
              * (0.06 + motion.strength[particleIndex] * 0.13)
              * (0.35 + Math.abs(orbitSine) * 0.65)
            const releaseAmplitude = transitionEnergy
              * (0.025 + motion.strength[particleIndex] * 0.07)
              * orbitCosine
            const transitionNoise = transitionEnergy * (0.032 + motion.strength[particleIndex] * 0.008)
            const restNoise = 0.006 + (0.00065 - 0.006) * wordmarkStability
            const orbitAmplitude = 0.012
              + (0.0008 - 0.012) * wordmarkStability
              + transitionEnergy * (0.07 + motion.strength[particleIndex] * 0.11)
            const noiseAmplitude = restNoise + transitionNoise
            const desiredX = rotatedX
              + orbitCosine * orbitAmplitude
              + tangentX * vortexAmplitude
              + radialX * releaseAmplitude
              + motion.driftX[particleIndex] * ambientX * noiseAmplitude
            const desiredY = rotatedY
              + orbitSine * orbitAmplitude
              + tangentY * vortexAmplitude
              + radialY * releaseAmplitude
              + motion.driftY[particleIndex] * ambientY * noiseAmplitude
            const desiredZ = baseZ
              + orbitSine * transitionEnergy * (0.16 + motion.strength[particleIndex] * 0.08)
            const damping = 0.105 + transitionEnergy * 0.018 + wordmarkStability * 0.22

            array[offset] += (desiredX - array[offset]) * damping
            array[offset + 1] += (desiredY - array[offset + 1]) * damping
            array[offset + 2] += (desiredZ - array[offset + 2]) * damping
          }

          attribute.needsUpdate = true
          points.scale.x += ((layoutScale * responsiveStageScale) - points.scale.x) * 0.05
          points.scale.y = points.scale.x
          points.scale.z = points.scale.x
          const restMotionFactor = 1 - wordmarkStability * 0.92
          points.position.x += ((layoutX + responsiveOffsetX + pointerX * 0.08 * restMotionFactor) - points.position.x) * 0.04
          points.position.y += ((layoutY + responsiveOffsetY - pointerY * 0.05 * restMotionFactor
            + Math.sin(time * 0.00048) * 0.018 * restMotionFactor) - points.position.y) * 0.04
          points.rotation.y += ((pointerX * 0.055 * restMotionFactor + progress * 0.012 * restMotionFactor
            + transitionEnergy * 0.045 * transitionDirection) - points.rotation.y) * 0.025
          points.rotation.x += ((-pointerY * 0.035 * restMotionFactor) - points.rotation.x) * 0.025
          points.rotation.z = Math.sin(time * 0.00022) * 0.0045 * restMotionFactor
            + transitionEnergy * 0.012 * transitionDirection
          material.opacity = 0.89 + Math.sin(time * 0.0007) * 0.03 * restMotionFactor - transitionEnergy * 0.045

          renderer.render(scene, camera)

          if (previousFrameTime > 0 && measuredFrames < 180) {
            measuredDuration += time - previousFrameTime
            measuredFrames += 1
            if (measuredFrames === 180 && measuredDuration > 0) {
              section.dataset.averageFps = ((measuredFrames * 1000) / measuredDuration).toFixed(1)
            }
          }
          previousFrameTime = time
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

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !useFallback) return

    const fallbackTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setActiveStage(Math.min(fiberStages.length - 1, Math.round(self.progress * (fiberStages.length - 1))))
      },
    })

    return () => fallbackTrigger.kill()
  }, [useFallback])

  return (
    <section ref={sectionRef} id="fiber-study" className="fiber-study" aria-labelledby="fiber-study-title">
      <div className="fiber-study__sticky">
        <div className="fiber-study__header">
          <span>{t('fiber.label')}</span>
          <p>{t('fiber.note')}</p>
        </div>
        <div className="fiber-study__stage">
          {!useFallback && <canvas ref={canvasRef} className="fiber-study__canvas" aria-hidden="true" />}
          {useFallback && <FiberFallback stage={activeStage} />}
          <WordmarkDebug stage={activeStage} particleCount={particleCount} />
          <div className="fiber-study__copy" aria-live="polite">
            <span>{fiberStages[activeStage].index} / 05</span>
            <h2 id="fiber-study-title">{t(fiberStages[activeStage].nameKey)}</h2>
            <p>{t(fiberStages[activeStage].detailKey)}</p>
          </div>
          <ol className="fiber-study__timeline" aria-label={t('fiber.timeline')}>
            {fiberStages.map((stage, index) => (
              <li key={stage.index} className={activeStage === index ? 'is-active' : ''}>
                <span>{stage.index}</span>{t(stage.nameKey)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default FiberStudy

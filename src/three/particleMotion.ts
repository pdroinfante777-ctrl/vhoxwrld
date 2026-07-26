export const particleLayer = {
  contour: 0,
  orbital: 1,
  free: 2,
} as const

export type ParticleLayer = (typeof particleLayer)[keyof typeof particleLayer]

export type ParticleLayerRatios = {
  orbital: number
  free: number
}

export type ParticleMotionField = {
  phase: Float32Array
  speed: Float32Array
  strength: Float32Array
  direction: Float32Array
  driftX: Float32Array
  driftY: Float32Array
  orbitRadius: Float32Array
  depth: Float32Array
  delay: Float32Array
  qualityRank: Float32Array
  layer: Uint8Array
}

export type AdaptiveParticleQuality = {
  name: 'full' | 'balanced' | 'reduced'
  freeDensity: number
  orbitalDensity: number
  depth: number
  glow: number
}

export type ParticleMotionPhase = 'forming' | 'holding' | 'dispersing' | 'morphing' | 'settling'

function seededRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = value * 16807 % 2147483647
    return (value - 1) / 2147483646
  }
}

function clampRatio(value: number) {
  return Math.min(0.25, Math.max(0, value))
}

export function createParticleMotionField(
  count: number,
  ratios: ParticleLayerRatios,
  seed = 25072026,
): ParticleMotionField {
  const random = seededRandom(seed)
  const phase = new Float32Array(count)
  const speed = new Float32Array(count)
  const strength = new Float32Array(count)
  const direction = new Float32Array(count)
  const driftX = new Float32Array(count)
  const driftY = new Float32Array(count)
  const orbitRadius = new Float32Array(count)
  const depth = new Float32Array(count)
  const delay = new Float32Array(count)
  const qualityRank = new Float32Array(count)
  const layer = new Uint8Array(count)
  const shuffledIndices = new Uint32Array(count)

  for (let index = 0; index < count; index += 1) {
    shuffledIndices[index] = index
  }

  for (let index = count - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffledIndices[index]
    shuffledIndices[index] = shuffledIndices[swapIndex]
    shuffledIndices[swapIndex] = current
  }

  const freeCount = Math.round(count * clampRatio(ratios.free))
  const orbitalCount = Math.min(
    count - freeCount,
    Math.round(count * clampRatio(ratios.orbital)),
  )

  for (let order = 0; order < count; order += 1) {
    const index = shuffledIndices[order]
    layer[index] = order < freeCount
      ? particleLayer.free
      : order < freeCount + orbitalCount
        ? particleLayer.orbital
        : particleLayer.contour
    qualityRank[index] = layer[index] === particleLayer.contour
      ? 0
      : layer[index] === particleLayer.orbital
        ? (order - freeCount) / Math.max(1, orbitalCount - 1)
        : order / Math.max(1, freeCount - 1)
  }

  for (let index = 0; index < count; index += 1) {
    const layerValue = layer[index] as ParticleLayer
    phase[index] = random() * Math.PI * 2
    speed[index] = layerValue === particleLayer.contour
      ? 0.52 + random() * 0.48
      : layerValue === particleLayer.orbital
        ? 0.34 + random() * 0.46
        : 0.26 + random() * 0.4
    strength[index] = 0.35 + random() * 0.65
    direction[index] = random() > 0.48 ? 1 : -1
    driftX[index] = random() * 2 - 1
    driftY[index] = random() * 2 - 1
    orbitRadius[index] = layerValue === particleLayer.contour
      ? 0.0015 + random() * 0.0025
      : layerValue === particleLayer.orbital
        ? 0.025 + random() * 0.04
        : 0.07 + random() * 0.09
    depth[index] = layerValue === particleLayer.contour
      ? 0.008 + random() * 0.012
      : layerValue === particleLayer.orbital
        ? 0.06 + random() * 0.08
        : 0.13 + random() * 0.15
    delay[index] = (random() - 0.5) * (layerValue === particleLayer.contour ? 0.09 : 0.16)
  }

  return {
    phase,
    speed,
    strength,
    direction,
    driftX,
    driftY,
    orbitRadius,
    depth,
    delay,
    qualityRank,
    layer,
  }
}

export function getLayerDistribution(layer: Uint8Array) {
  let contour = 0
  let orbital = 0
  let free = 0

  for (let index = 0; index < layer.length; index += 1) {
    if (layer[index] === particleLayer.contour) contour += 1
    else if (layer[index] === particleLayer.orbital) orbital += 1
    else free += 1
  }

  return { contour, orbital, free }
}

export function resolveAdaptiveParticleQuality(fps: number): AdaptiveParticleQuality {
  if (fps < 38) {
    return {
      name: 'reduced',
      freeDensity: 0.2,
      orbitalDensity: 0.58,
      depth: 0.5,
      glow: 0.58,
    }
  }

  if (fps < 50) {
    return {
      name: 'balanced',
      freeDensity: 0.52,
      orbitalDensity: 0.8,
      depth: 0.76,
      glow: 0.8,
    }
  }

  return {
    name: 'full',
    freeDensity: 1,
    orbitalDensity: 1,
    depth: 1,
    glow: 1,
  }
}

export function resolveParticleMotionPhase(
  transitionMix: number,
  transitionEnergy: number,
  scrollDirection: number,
): ParticleMotionPhase {
  if (transitionEnergy < 0.025) return 'holding'

  const directionalMix = scrollDirection >= 0 ? transitionMix : 1 - transitionMix
  if (directionalMix < 0.2) return 'dispersing'
  if (directionalMix < 0.68) return 'morphing'
  if (directionalMix < 0.9) return 'forming'
  return 'settling'
}

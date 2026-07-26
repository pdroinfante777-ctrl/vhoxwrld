import type { ParticleShape } from './particleShapes'

type SampledPath = {
  length: number
  weightedLength: number
  samples: Float32Array
}

export function allocateWeightedSamples(weightedLengths: readonly number[], count: number) {
  if (count < 0 || !Number.isInteger(count)) throw new Error('Particle count must be a non-negative integer')
  if (weightedLengths.length === 0) return new Uint32Array()

  const totalLength = weightedLengths.reduce((total, length) => {
    if (!Number.isFinite(length) || length <= 0) throw new Error('Particle paths must have a finite positive length')
    return total + length
  }, 0)
  const allocations = new Uint32Array(weightedLengths.length)
  const fractions = weightedLengths.map((length, index) => {
    const ideal = (length / totalLength) * count
    const allocated = Math.floor(ideal)
    allocations[index] = allocated
    return { index, fraction: ideal - allocated }
  })
  const remaining = count - allocations.reduce((total, value) => total + value, 0)

  fractions.sort((first, second) => second.fraction - first.fraction || first.index - second.index)
  for (let index = 0; index < remaining; index += 1) {
    allocations[fractions[index % fractions.length].index] += 1
  }

  return allocations
}

function seededRandom(seed: number) {
  let value = seed % 2147483647

  return () => {
    value = value * 16807 % 2147483647
    return (value - 1) / 2147483646
  }
}

function createSampledPaths(shape: ParticleShape) {
  const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  container.setAttribute('aria-hidden', 'true')
  container.setAttribute('width', '0')
  container.setAttribute('height', '0')
  container.style.position = 'fixed'
  container.style.visibility = 'hidden'
  container.style.pointerEvents = 'none'
  document.body.append(container)

  const paths = shape.paths.map<SampledPath>((path) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    element.setAttribute('d', path.d)
    container.append(element)
    const length = element.getTotalLength()
    const sampleCount = Math.max(48, Math.min(512, Math.ceil(length / 3)))
    const samples = new Float32Array((sampleCount + 1) * 2)

    for (let index = 0; index <= sampleCount; index += 1) {
      const point = element.getPointAtLength((index / sampleCount) * length)
      samples[index * 2] = point.x
      samples[index * 2 + 1] = point.y
    }

    return {
      length,
      weightedLength: length * (path.weight ?? 1),
      samples,
    }
  })

  container.remove()
  return paths
}

export function sampleParticleShape(shape: ParticleShape, count: number, seed: number) {
  const paths = createSampledPaths(shape)
  const allocations = allocateWeightedSamples(paths.map((path) => path.weightedLength), count)
  const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = shape.viewBox
  const centerX = viewBoxX + viewBoxWidth * 0.5
  const centerY = viewBoxY + viewBoxHeight * 0.5
  const random = seededRandom(seed)
  const positions = new Float32Array(count * 3)
  let particleIndex = 0

  paths.forEach((selectedPath, pathIndex) => {
    const pathParticleCount = allocations[pathIndex]

    for (let localIndex = 0; localIndex < pathParticleCount; localIndex += 1) {
      const offset = particleIndex * 3
      const normalizedDistance = Math.min(
        1,
        Math.max(0, (localIndex + 0.5 + (random() - 0.5) * 0.08) / pathParticleCount),
      )
      const sampleCount = selectedPath.samples.length / 2 - 1
      const samplePosition = normalizedDistance * sampleCount
      const sampleIndex = Math.min(sampleCount - 1, Math.floor(samplePosition))
      const sampleMix = samplePosition - sampleIndex
      const sampleOffset = sampleIndex * 2
      const nextOffset = sampleOffset + 2
      const pointX = selectedPath.samples[sampleOffset]
        + (selectedPath.samples[nextOffset] - selectedPath.samples[sampleOffset]) * sampleMix
      const pointY = selectedPath.samples[sampleOffset + 1]
        + (selectedPath.samples[nextOffset + 1] - selectedPath.samples[sampleOffset + 1]) * sampleMix
      const jitterX = (random() - 0.5) * shape.jitter
      const jitterY = (random() - 0.5) * shape.jitter

      positions[offset] = ((pointX - centerX) / viewBoxWidth) * shape.worldWidth + jitterX
      positions[offset + 1] = -((pointY - centerY) / viewBoxWidth) * shape.worldWidth + jitterY
      positions[offset + 2] = (random() - 0.5) * 0.11
      particleIndex += 1
    }
  })

  if (particleIndex !== count) throw new Error(`Particle allocation mismatch: expected ${count}, received ${particleIndex}`)

  return positions
}

export function sortParticleField(positions: Float32Array, colors?: Float32Array) {
  const count = positions.length / 3
  const sectorCount = 96
  const indexes = Array.from({ length: count }, (_, index) => index)
  const sectors = new Uint8Array(count)
  const radii = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const angle = Math.atan2(positions[offset + 1], positions[offset])
    sectors[index] = Math.min(sectorCount - 1, Math.floor(((angle + Math.PI) / (Math.PI * 2)) * sectorCount))
    radii[index] = Math.hypot(positions[offset], positions[offset + 1])
  }

  indexes.sort((first, second) => {
    if (sectors[first] !== sectors[second]) return sectors[first] - sectors[second]

    return radii[first] - radii[second]
  })

  const sortedPositions = new Float32Array(positions.length)
  const sortedColors = colors ? new Float32Array(colors.length) : undefined

  indexes.forEach((sourceIndex, targetIndex) => {
    const sourceOffset = sourceIndex * 3
    const targetOffset = targetIndex * 3
    sortedPositions[targetOffset] = positions[sourceOffset]
    sortedPositions[targetOffset + 1] = positions[sourceOffset + 1]
    sortedPositions[targetOffset + 2] = positions[sourceOffset + 2]

    if (colors && sortedColors) {
      sortedColors[targetOffset] = colors[sourceOffset]
      sortedColors[targetOffset + 1] = colors[sourceOffset + 1]
      sortedColors[targetOffset + 2] = colors[sourceOffset + 2]
    }
  })

  return { positions: sortedPositions, colors: sortedColors }
}

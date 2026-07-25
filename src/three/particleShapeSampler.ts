import type { ParticleShape } from './particleShapes'

type SampledPath = {
  element: SVGPathElement
  length: number
  weightedLength: number
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

    return {
      element,
      length,
      weightedLength: length * (path.weight ?? 1),
    }
  })

  return { container, paths }
}

export function sampleParticleShape(shape: ParticleShape, count: number, seed: number) {
  const { container, paths } = createSampledPaths(shape)
  const totalWeightedLength = paths.reduce((total, path) => total + path.weightedLength, 0)
  const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = shape.viewBox
  const centerX = viewBoxX + viewBoxWidth * 0.5
  const centerY = viewBoxY + viewBoxHeight * 0.5
  const random = seededRandom(seed)
  const positions = new Float32Array(count * 3)
  const goldenSelector = 0.618033988749895
  const goldenDistance = 0.754877666246693

  try {
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3
      let selector = ((index * goldenSelector + random() * 0.035) % 1) * totalWeightedLength
      let selectedPath = paths[paths.length - 1]

      for (const path of paths) {
        if (selector <= path.weightedLength) {
          selectedPath = path
          break
        }

        selector -= path.weightedLength
      }

      const distance = ((index * goldenDistance + random() * 0.045) % 1) * selectedPath.length
      const point = selectedPath.element.getPointAtLength(distance)
      const jitterX = (random() - 0.5) * shape.jitter
      const jitterY = (random() - 0.5) * shape.jitter

      positions[offset] = ((point.x - centerX) / viewBoxWidth) * shape.worldWidth + jitterX
      positions[offset + 1] = -((point.y - centerY) / viewBoxWidth) * shape.worldWidth + jitterY
      positions[offset + 2] = (random() - 0.5) * 0.11
    }
  } finally {
    container.remove()
  }

  return positions
}

export function sortParticleField(positions: Float32Array, colors?: Float32Array) {
  const count = positions.length / 3
  const sectorCount = 96
  const indexes = Array.from({ length: count }, (_, index) => index)

  indexes.sort((first, second) => {
    const firstOffset = first * 3
    const secondOffset = second * 3
    const firstAngle = Math.atan2(positions[firstOffset + 1], positions[firstOffset])
    const secondAngle = Math.atan2(positions[secondOffset + 1], positions[secondOffset])
    const firstSector = Math.floor(((firstAngle + Math.PI) / (Math.PI * 2)) * sectorCount)
    const secondSector = Math.floor(((secondAngle + Math.PI) / (Math.PI * 2)) * sectorCount)

    if (firstSector !== secondSector) return firstSector - secondSector

    const firstRadius = Math.hypot(positions[firstOffset], positions[firstOffset + 1])
    const secondRadius = Math.hypot(positions[secondOffset], positions[secondOffset + 1])
    return firstRadius - secondRadius
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

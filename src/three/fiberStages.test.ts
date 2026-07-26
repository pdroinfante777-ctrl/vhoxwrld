import { describe, expect, it } from 'vitest'
import { fiberStageOrder, fiberStages } from './fiberStages'
import { allocateWeightedSamples } from './particleShapeSampler'
import {
  garmentShapes,
  premiumTshirt,
  vhoxWordmark,
  wordmarkH,
  wordmarkLetterBounds,
  wordmarkO,
  wordmarkV,
  wordmarkX,
} from './particleShapes'

describe('VHOX particle narrative', () => {
  it('uses the approved five-stage order', () => {
    expect(fiberStageOrder).toEqual(['bat', 'tshirt', 'cap', 'hoodie', 'wordmark'])
    expect(fiberStages).toHaveLength(5)
  })

  it('keeps the three premium garment geometries and a detailed oversized shirt', () => {
    expect(garmentShapes.map((shape) => shape.id)).toEqual([
      'premium-tshirt',
      'premium-cap',
      'premium-hoodie',
    ])
    expect(premiumTshirt.paths.length).toBeGreaterThanOrEqual(5)
    expect(premiumTshirt.paths[0].d).toContain('L468 540')
  })

  it('builds VHOX from four clean, separately bounded vector letters', () => {
    expect(vhoxWordmark.paths).toEqual([
      ...wordmarkV,
      ...wordmarkH,
      ...wordmarkO,
      ...wordmarkX,
    ])
    expect(wordmarkLetterBounds.map(({ letter }) => letter)).toEqual(['V', 'H', 'O', 'X'])
    expect(new Set(vhoxWordmark.paths.map(({ d }) => d)).size).toBe(vhoxWordmark.paths.length)
  })

  it('keeps H orthogonal and X limited to two equivalent diagonals', () => {
    expect(wordmarkH.map(({ d }) => d)).toEqual([
      'M230 40 V200',
      'M350 40 V200',
      'M230 120 H350',
    ])
    expect(wordmarkH.every(({ d }) => !d.includes(' L'))).toBe(true)
    expect(wordmarkX.map(({ d }) => d)).toEqual([
      'M620 40 L800 200',
      'M800 40 L620 200',
    ])
    expect(wordmarkX.every(({ d }) => !/[VH]/.test(d))).toBe(true)
  })

  it('allocates particles by real path length without leaving a surplus', () => {
    const allocations = allocateWeightedSamples([160, 160, 120, 240], 5000)
    expect(Array.from(allocations).reduce((total, value) => total + value, 0)).toBe(5000)
    expect(allocations[3]).toBeGreaterThan(allocations[0])
    expect(Math.abs(allocations[0] - allocations[1])).toBeLessThanOrEqual(1)
  })
})

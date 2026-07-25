import { describe, expect, it } from 'vitest'
import { fiberStageOrder, fiberStages } from './fiberStages'
import { garmentShapes, premiumTshirt } from './particleShapes'

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
})

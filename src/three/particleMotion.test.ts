import { describe, expect, it } from 'vitest'
import {
  createParticleMotionField,
  getLayerDistribution,
  particleLayer,
  resolveAdaptiveParticleQuality,
  resolveParticleCoreInfluence,
  resolveParticleMotionPhase,
} from './particleMotion'

describe('VHOX living particle motion', () => {
  it('keeps the readable contour as the dominant layer', () => {
    const motion = createParticleMotionField(10_000, { orbital: 0.18, free: 0.05 })
    const distribution = getLayerDistribution(motion.layer)

    expect(distribution).toEqual({
      contour: 7700,
      orbital: 1800,
      free: 500,
    })
    expect(distribution.contour / motion.layer.length).toBeGreaterThanOrEqual(0.75)
  })

  it('uses stable per-particle properties instead of frame-randomized directions', () => {
    const first = createParticleMotionField(128, { orbital: 0.15, free: 0.04 }, 42)
    const second = createParticleMotionField(128, { orbital: 0.15, free: 0.04 }, 42)

    expect(Array.from(first.layer)).toEqual(Array.from(second.layer))
    expect(Array.from(first.phase)).toEqual(Array.from(second.phase))
    expect(Array.from(first.speed)).toEqual(Array.from(second.speed))
    expect(Array.from(first.direction)).toEqual(Array.from(second.direction))
    expect(first.layer.some((value) => value === particleLayer.free)).toBe(true)
  })

  it('degrades free and orbital motion before the contour', () => {
    expect(resolveAdaptiveParticleQuality(60)).toMatchObject({
      name: 'full',
      freeDensity: 1,
      orbitalDensity: 1,
    })
    expect(resolveAdaptiveParticleQuality(44)).toMatchObject({
      name: 'balanced',
      freeDensity: 0.52,
      orbitalDensity: 0.8,
    })
    expect(resolveAdaptiveParticleQuality(30)).toMatchObject({
      name: 'reduced',
      freeDensity: 0.2,
      orbitalDensity: 0.58,
    })
  })

  it('exposes continuous forming, holding, dispersing, morphing and settling phases', () => {
    expect(resolveParticleMotionPhase(0, 0, 1)).toBe('holding')
    expect(resolveParticleMotionPhase(0.08, 0.4, 1)).toBe('dispersing')
    expect(resolveParticleMotionPhase(0.45, 0.9, 1)).toBe('morphing')
    expect(resolveParticleMotionPhase(0.78, 0.55, 1)).toBe('forming')
    expect(resolveParticleMotionPhase(0.95, 0.2, 1)).toBe('settling')
    expect(resolveParticleMotionPhase(0.95, 0.4, -1)).toBe('dispersing')
  })

  it('compresses particles only around the center of an active transition', () => {
    expect(resolveParticleCoreInfluence(0, 1)).toBeCloseTo(0)
    expect(resolveParticleCoreInfluence(1, 1)).toBeCloseTo(0)
    expect(resolveParticleCoreInfluence(0.5, 0)).toBeCloseTo(0)
    expect(resolveParticleCoreInfluence(0.5, 1)).toBeCloseTo(1)
    expect(resolveParticleCoreInfluence(0.28, 0.9)).toBeGreaterThan(0.5)
  })
})

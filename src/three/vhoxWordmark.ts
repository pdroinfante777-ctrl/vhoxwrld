import wordmarkSvgSource from '../assets/vhox-wordmark-particle.svg?raw'
import type { ParticlePath, ParticleShape } from './particleShapes'

type WordmarkLetter = 'V' | 'H' | 'O' | 'X'

export type WordmarkLetterBounds = {
  letter: WordmarkLetter
  x: number
  y: number
  width: number
  height: number
}

function pathFromSource(id: string): ParticlePath {
  const match = wordmarkSvgSource.match(new RegExp(`<path[^>]+id="${id}"[^>]+d="([^"]+)"`))
  if (!match?.[1]) throw new Error(`Missing VHOX wordmark path: ${id}`)

  return { d: match[1], weight: 1 }
}

export const wordmarkV = [
  pathFromSource('wordmarkVStroke'),
] as const satisfies readonly ParticlePath[]

export const wordmarkH = [
  pathFromSource('wordmarkHLeft'),
  pathFromSource('wordmarkHRight'),
  pathFromSource('wordmarkHBar'),
] as const satisfies readonly ParticlePath[]

export const wordmarkO = [
  pathFromSource('wordmarkOStroke'),
] as const satisfies readonly ParticlePath[]

export const wordmarkX = [
  pathFromSource('wordmarkXDown'),
  pathFromSource('wordmarkXUp'),
] as const satisfies readonly ParticlePath[]

export const wordmarkLetterBounds: readonly WordmarkLetterBounds[] = [
  { letter: 'V', x: 20, y: 40, width: 160, height: 160 },
  { letter: 'H', x: 230, y: 40, width: 120, height: 160 },
  { letter: 'O', x: 410, y: 40, width: 160, height: 160 },
  { letter: 'X', x: 620, y: 40, width: 180, height: 160 },
] as const

export const vhoxWordmark: ParticleShape = {
  id: 'vhox-wordmark',
  label: 'VHOX wordmark',
  viewBox: [0, 0, 820, 240],
  worldWidth: 6.3,
  jitter: 0.0015,
  paths: [
    ...wordmarkV,
    ...wordmarkH,
    ...wordmarkO,
    ...wordmarkX,
  ],
}

export const vhoxWordmarkSourceName = 'src/assets/vhox-wordmark-particle.svg'

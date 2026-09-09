export const siteOrigin = 'https://vhoxwrld.com'

export const publicSeoRoutes = [
  {
    path: '/',
    title: 'VHOX — Chromatic Black | Premium Streetwear',
    description: 'VHOX develops premium near-black streetwear through weight, proportion and restraint. From a distance, black. Up close, VHOX.',
    h1: 'FROM A DISTANCE, BLACK. UP CLOSE, VHOX.',
  },
  {
    path: '/collections/',
    title: 'DROP 001: SIGNAL — VHOX Collection',
    description: 'Explore the planned pieces of DROP 001: SIGNAL. Product imagery, specifications, price and release remain pending.',
    h1: 'SIGNAL.',
  },
  {
    path: '/journal/',
    title: 'VHOX Journal — Material, Identity & Chromatic Black',
    description: 'Read VHOX field notes on near-black color, garment construction, proportion and the independent identity behind Chromatic Black.',
    h1: 'BEYOND THE SURFACE.',
  },
  {
    path: '/manifesto/',
    title: 'VHOX Manifesto — An Independent Streetwear Language',
    description: 'Discover the VHOX manifesto: a disciplined language of near-black material, exact form and identity without compromise.',
    h1: 'DARKNESS IS A SURFACE.',
  },

]

export const noindexSeoRoutes = [
  { path: '/collections/signal-core-tee/', title: 'SIGNAL CORE TEE — VHOX / Concept study', description: 'Preview SIGNAL CORE TEE from DROP 001: SIGNAL. Campaign study only; physical samples, specifications, price and release remain pending.' },
  { path: '/collections/night-bloom-tee/', title: 'NIGHT BLOOM TEE — VHOX / Concept study', description: 'Preview NIGHT BLOOM TEE from DROP 001: SIGNAL. Campaign study only; physical samples, specifications, price and release remain pending.' },
  { path: '/collections/crystal-signal-tee/', title: 'CRYSTAL SIGNAL TEE — VHOX / Concept study', description: 'Preview CRYSTAL SIGNAL TEE from DROP 001: SIGNAL. Campaign study only; physical samples, specifications, price and release remain pending.' },
  {
    path: '/cart/',
    title: 'Your Bag — VHOX',
    description: 'Review locally saved VHOX pieces. No payment is processed on this website.',
  },
]

export function canonicalUrl(path) {
  return new URL(path, siteOrigin).toString()
}

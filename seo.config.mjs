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
    title: 'BAT, ROSE & VOID — VHOX Collection Studies',
    description: 'Explore BAT, ROSE and VOID, three VHOX concept studies shaped by nocturnal identity, controlled tension and near-black depth.',
    h1: 'THREE FORMS. ONE SIGNAL.',
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
  {
    path: '/collections/bat/',
    title: 'BAT — Nocturnal Form Study | VHOX',
    description: 'Explore BAT, the original VHOX signal: a sharp nocturnal form study with physical product specifications still pending approval.',
    h1: 'BAT',
  },
  {
    path: '/collections/rose/',
    title: 'ROSE — Controlled Tension Study | VHOX',
    description: 'Explore ROSE, a VHOX contrast study balancing organic tension and controlled structure. Commercial release details remain pending.',
    h1: 'ROSE',
  },
  {
    path: '/collections/void/',
    title: 'VOID — Near-Black Depth Study | VHOX',
    description: 'Explore VOID, a VHOX study of near-black depth, negative space and hidden tonal response. Physical validation remains pending.',
    h1: 'VOID',
  },
]

export const noindexSeoRoutes = [
  {
    path: '/cart/',
    title: 'Your Bag — VHOX',
    description: 'Review locally saved VHOX pieces. No payment is processed on this website.',
  },
]

export function canonicalUrl(path) {
  return new URL(path, siteOrigin).toString()
}

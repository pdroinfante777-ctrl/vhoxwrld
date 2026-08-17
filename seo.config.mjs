export const siteOrigin = 'https://vhoxwrld.com'

export const publicSeoRoutes = [
  {
    path: '/',
    title: 'VHOX — Exclusive Movement | Premium Streetwear',
    description: 'Enter VHOX WRLD: an independent streetwear house exploring near-black material, exact form and movement through BAT, ROSE and VOID.',
    h1: 'DARKNESS REVEALED.',
  },
  {
    path: '/collections/',
    title: 'BAT, ROSE & VOID — VHOX Collection Studies',
    description: 'Explore BAT, ROSE and VOID, three VHOX concept studies shaped by nocturnal identity, controlled tension and near-black depth.',
    h1: 'THREE FORMS. ONE SIGNAL.',
  },
  {
    path: '/journal/',
    title: 'VHOX Journal — Design, Identity & Beyond Form',
    description: 'Read VHOX field notes on symbols, construction, material language and the independent identity behind Beyond Form.',
    h1: 'THE WORLD BEHIND THE FORM.',
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

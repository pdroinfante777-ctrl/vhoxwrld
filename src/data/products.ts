import { formatCurrency, type CurrencyCode } from '../commerce/currency'
import type { Locale } from '../i18n/translations'

export type ProductAvailability = 'coming-soon' | 'available' | 'archived'
export type ProductObjectFit = 'cover' | 'contain'

export type ProductMedia = {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
  thumbnail?: string
  objectFit?: ProductObjectFit
  objectPosition?: string
}

export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string | null
  code: string
  category: string
  price: number | null
  compareAtPrice: number | null
  currency: CurrencyCode
  description: Record<Locale, string>
  media: ProductMedia[]
  thumbnails: string[]
  sizes: string[]
  colors: string[]
  materials: string | null
  features: string[]
  fit: string | null
  care: string | null
  shipping: string | null
  availability: ProductAvailability
  related: string[]
  purchaseUrl: string | null
  visual: 'slab' | 'aperture' | 'axis'
}

// BAT, ROSE and VOID are editorial concept studies. They are not treated as
// confirmed products until every commercial field below has approved data.
export const products: Product[] = [
  {
    id: 'bat',
    slug: 'bat',
    name: 'BAT',
    subtitle: null,
    code: 'VHX-CST-01',
    category: 'VHOX / CONCEPT STUDY',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A VHOX form study exploring a sharp nocturnal identity. Physical materials, approved product media and release data remain pending.',
      es: 'Un estudio de forma VHOX que explora una identidad nocturna y precisa. Los materiales físicos, medios aprobados y datos de lanzamiento siguen pendientes.',
      pt: 'Um estudo de forma VHOX que explora uma identidade noturna e precisa. Materiais físicos, mídia aprovada e dados de lançamento seguem pendentes.',
      fr: 'Une étude de forme VHOX explorant une identité nocturne et précise. Les matières physiques, médias approuvés et données de sortie restent en attente.',
    },
    media: [],
    thumbnails: [],
    sizes: [],
    colors: [],
    materials: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    availability: 'coming-soon',
    related: ['rose', 'void'],
    purchaseUrl: null,
    visual: 'slab',
  },
  {
    id: 'rose',
    slug: 'rose',
    name: 'ROSE',
    subtitle: null,
    code: 'VHX-CST-02',
    category: 'VHOX / CONCEPT STUDY',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A VHOX contrast study balancing organic tension and controlled structure. No commercial specification or release is confirmed.',
      es: 'Un estudio de contraste VHOX que equilibra tensión orgánica y estructura controlada. Ninguna especificación comercial o lanzamiento está confirmado.',
      pt: 'Um estudo de contraste VHOX entre tensão orgânica e estrutura controlada. Nenhuma especificação comercial ou lançamento está confirmado.',
      fr: 'Une étude de contraste VHOX entre tension organique et structure contrôlée. Aucune spécification commerciale ni sortie n’est confirmée.',
    },
    media: [],
    thumbnails: [],
    sizes: [],
    colors: [],
    materials: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    availability: 'coming-soon',
    related: ['bat', 'void'],
    purchaseUrl: null,
    visual: 'aperture',
  },
  {
    id: 'void',
    slug: 'void',
    name: 'VOID',
    subtitle: null,
    code: 'VHX-CST-03',
    category: 'VHOX / CONCEPT STUDY',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A VHOX study of near-black depth and hidden tonal response. Physical validation, product construction and availability are pending.',
      es: 'Un estudio VHOX de profundidad casi negra y respuesta tonal oculta. La validación física, construcción y disponibilidad están pendientes.',
      pt: 'Um estudo VHOX de profundidade quase preta e resposta tonal oculta. Validação física, construção e disponibilidade estão pendentes.',
      fr: 'Une étude VHOX de profondeur presque noire et de réponse tonale cachée. Validation physique, construction et disponibilité sont en attente.',
    },
    media: [],
    thumbnails: [],
    sizes: [],
    colors: [],
    materials: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    availability: 'coming-soon',
    related: ['bat', 'rose'],
    purchaseUrl: null,
    visual: 'axis',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(product: Product) {
  return product.related
    .map(getProductById)
    .filter((item): item is Product => Boolean(item))
}

export function isProductPurchasable(product: Product) {
  const hasApprovedMedia = product.media.some((media) => Boolean(media.src.trim()))
  const hasVariants = product.sizes.length > 0 && product.colors.length > 0
  const hasConfirmedConstruction = Boolean(product.materials?.trim())
  const hasConfirmedPrice = typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0

  return product.availability === 'available'
    && hasConfirmedPrice
    && hasApprovedMedia
    && hasVariants
    && hasConfirmedConstruction
}

export function formatProductPrice(
  product: Product,
  currency: CurrencyCode,
  locale: Locale,
  pendingLabel = 'PRICE PENDING',
) {
  if (product.price === null) return pendingLabel
  return formatCurrency(product.price, currency, locale)
}

export function productDescription(product: Product, locale: Locale) {
  return product.description[locale]
}

export function productPath(product: Product) {
  return `/product/${product.slug}`
}

import { formatCurrency, type CurrencyCode } from '../commerce/currency'
import type { Locale } from '../i18n/translations'

export type ProductAvailability = 'coming-soon' | 'available' | 'archived'
export type ProductObjectFit = 'cover' | 'contain'
export type ProductMediaUsage = 'campaign-study' | 'product'

export type ProductMedia = {
  type: 'image' | 'video'
  src: string
  alt: string
  usage: ProductMediaUsage
  approvedForCommerce: boolean
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
  code: string | null
  category: string
  price: number | null
  compareAtPrice: number | null
  currency: CurrencyCode
  description: Record<Locale, string>
  media: ProductMedia[]
  thumbnails: string[]
  sizes: string[]
  colors: string[]
  fabricWeight: string | null
  sizeGuide: string | null
  construction: string | null
  materials: string | null
  features: string[]
  fit: string | null
  care: string | null
  shipping: string | null
  returns: string | null
  availability: ProductAvailability | null
  launchApproved: boolean
  related: string[]
  purchaseUrl: string | null
  visual: 'slab' | 'aperture' | 'axis'
}

// DROP 001: SIGNAL is the approved collection direction. These entries are
// planned pieces, not released products. Existing imagery is retained only as
// campaign study material and cannot satisfy the commerce-readiness gate.
export const products: Product[] = [
  {
    id: 'signal-core-tee',
    slug: 'signal-core-tee',
    name: 'SIGNAL CORE TEE',
    subtitle: null,
    code: null,
    category: 'VHOX / DROP 001 / SIGNAL',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A planned piece for DROP 001: SIGNAL. The current imagery is a campaign study only; the physical sample, specifications, release and official product media remain unconfirmed.',
      es: 'Una pieza planeada para DROP 001: SIGNAL. Las imágenes actuales son únicamente un estudio de campaña; la muestra física, especificaciones, lanzamiento y medios oficiales siguen sin confirmarse.',
      pt: 'Uma peça planejada para o DROP 001: SIGNAL. As imagens atuais são apenas um estudo de campanha; a amostra física, especificações, lançamento e mídia oficial seguem sem confirmação.',
      fr: 'Une pièce prévue pour le DROP 001 : SIGNAL. Les images actuelles sont uniquement une étude de campagne ; l’échantillon physique, les spécifications, la sortie et les médias officiels restent à confirmer.',
    },
    media: [
      {
        type: 'image',
        src: '/chromatic-black/vhox-textured-black-tee.jpeg',
        alt: 'Campaign study associated with SIGNAL CORE TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
      {
        type: 'image',
        src: '/chromatic-black/vhox-purple-detail.jpeg',
        alt: 'Detail campaign study associated with SIGNAL CORE TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
    ],
    thumbnails: [
      '/chromatic-black/vhox-textured-black-tee.jpeg',
      '/chromatic-black/vhox-purple-detail.jpeg',
    ],
    sizes: [],
    colors: [],
    materials: null,
    fabricWeight: null,
    sizeGuide: null,
    construction: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    returns: null,
    availability: null,
    launchApproved: false,
    related: ['night-bloom-tee', 'crystal-signal-tee'],
    purchaseUrl: null,
    visual: 'slab',
  },
  {
    id: 'night-bloom-tee',
    slug: 'night-bloom-tee',
    name: 'NIGHT BLOOM TEE',
    subtitle: null,
    code: null,
    category: 'VHOX / DROP 001 / SIGNAL',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A planned piece for DROP 001: SIGNAL. The current imagery is a campaign study only; the physical sample, specifications, release and official product media remain unconfirmed.',
      es: 'Una pieza planeada para DROP 001: SIGNAL. Las imágenes actuales son únicamente un estudio de campaña; la muestra física, especificaciones, lanzamiento y medios oficiales siguen sin confirmarse.',
      pt: 'Uma peça planejada para o DROP 001: SIGNAL. As imagens atuais são apenas um estudo de campanha; a amostra física, especificações, lançamento e mídia oficial seguem sem confirmação.',
      fr: 'Une pièce prévue pour le DROP 001 : SIGNAL. Les images actuelles sont uniquement une étude de campagne ; l’échantillon physique, les spécifications, la sortie et les médias officiels restent à confirmer.',
    },
    media: [
      {
        type: 'image',
        src: '/chromatic-black/vhox-black-cherry-tee.jpeg',
        alt: 'Campaign study associated with NIGHT BLOOM TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
      {
        type: 'image',
        src: '/chromatic-black/vhox-burnt-earth-tee.jpeg',
        alt: 'Alternate campaign study associated with NIGHT BLOOM TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
    ],
    thumbnails: [
      '/chromatic-black/vhox-black-cherry-tee.jpeg',
      '/chromatic-black/vhox-burnt-earth-tee.jpeg',
    ],
    sizes: [],
    colors: [],
    materials: null,
    fabricWeight: null,
    sizeGuide: null,
    construction: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    returns: null,
    availability: null,
    launchApproved: false,
    related: ['signal-core-tee', 'crystal-signal-tee'],
    purchaseUrl: null,
    visual: 'aperture',
  },
  {
    id: 'crystal-signal-tee',
    slug: 'crystal-signal-tee',
    name: 'CRYSTAL SIGNAL TEE',
    subtitle: null,
    code: null,
    category: 'VHOX / DROP 001 / SIGNAL',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A planned piece for DROP 001: SIGNAL. The current imagery is a campaign study only; the physical sample, specifications, release and official product media remain unconfirmed.',
      es: 'Una pieza planeada para DROP 001: SIGNAL. Las imágenes actuales son únicamente un estudio de campaña; la muestra física, especificaciones, lanzamiento y medios oficiales siguen sin confirmarse.',
      pt: 'Uma peça planejada para o DROP 001: SIGNAL. As imagens atuais são apenas um estudo de campanha; a amostra física, especificações, lançamento e mídia oficial seguem sem confirmação.',
      fr: 'Une pièce prévue pour le DROP 001 : SIGNAL. Les images actuelles sont uniquement une étude de campagne ; l’échantillon physique, les spécifications, la sortie et les médias officiels restent à confirmer.',
    },
    media: [
      {
        type: 'image',
        src: '/chromatic-black/vhox-midnight-violet-tee.jpeg',
        alt: 'Campaign study associated with CRYSTAL SIGNAL TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
      {
        type: 'image',
        src: '/chromatic-black/vhox-drop-001-family.jpeg',
        alt: 'Collection campaign study associated with CRYSTAL SIGNAL TEE; final product correspondence is unconfirmed',
        usage: 'campaign-study',
        approvedForCommerce: false,
        objectFit: 'contain',
      },
    ],
    thumbnails: [
      '/chromatic-black/vhox-midnight-violet-tee.jpeg',
      '/chromatic-black/vhox-drop-001-family.jpeg',
    ],
    sizes: [],
    colors: [],
    materials: null,
    fabricWeight: null,
    sizeGuide: null,
    construction: null,
    features: [],
    fit: null,
    care: null,
    shipping: null,
    returns: null,
    availability: null,
    launchApproved: false,
    related: ['signal-core-tee', 'night-bloom-tee'],
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
  const hasApprovedProductMedia = product.media.some((media) => (
    media.usage === 'product'
    && media.approvedForCommerce
    && Boolean(media.src.trim())
  ))
  const hasVariants = product.sizes.length > 0 && product.colors.length > 0
  const hasConfirmedPrice = typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0
  const hasCompleteProductData = [
    product.materials,
    product.fabricWeight,
    product.sizeGuide,
    product.construction,
    product.fit,
    product.care,
    product.shipping,
    product.returns,
  ].every((value) => Boolean(value?.trim()))
  const hasConfirmedCode = Boolean(product.code?.trim())
  const hasApprovedPurchaseUrl = isApprovedPurchaseUrl(product.purchaseUrl)

  return product.launchApproved
    && product.availability === 'available'
    && hasConfirmedPrice
    && hasApprovedProductMedia
    && hasVariants
    && hasCompleteProductData
    && hasConfirmedCode
    && hasApprovedPurchaseUrl
}

function isApprovedPurchaseUrl(value: string | null) {
  const candidate = value?.trim()
  if (!candidate) return false
  if (Array.from(candidate).some((char) => char === '\\' || char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return false
  if (candidate.startsWith('/') && !candidate.startsWith('//')) return true

  try {
    return new URL(candidate).protocol === 'https:'
  } catch {
    return false
  }
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
  return `/collections/${product.slug}/`
}

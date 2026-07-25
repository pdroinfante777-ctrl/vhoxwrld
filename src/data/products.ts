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

// These are structured product slots, not announced releases. Commercial fields
// remain null or empty until VHOX supplies approved product data and photography.
export const products: Product[] = [
  {
    id: 'shadow',
    slug: 'shadow',
    name: 'SHADOW',
    subtitle: null,
    code: 'VHX-001',
    category: 'T-SHIRT / MEDIA PENDING',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'Reserved for an approved VHOX T-shirt and its real campaign photography.',
      es: 'Reservado para una camiseta VHOX aprobada y su fotografía real de campaña.',
      pt: 'Reservado para uma camiseta VHOX aprovada e sua fotografia real de campanha.',
      fr: 'Réservé à un T-shirt VHOX approuvé et à sa véritable photographie de campagne.',
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
    related: ['void', 'origin'],
    purchaseUrl: null,
    visual: 'slab',
  },
  {
    id: 'void',
    slug: 'void',
    name: 'VOID',
    subtitle: null,
    code: 'VHX-002',
    category: 'CAP / MEDIA PENDING',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'Reserved for an approved VHOX cap, detail views and availability data.',
      es: 'Reservado para una gorra VHOX aprobada, vistas de detalle y datos de disponibilidad.',
      pt: 'Reservado para um boné VHOX aprovado, detalhes e dados de disponibilidade.',
      fr: 'Réservé à une casquette VHOX approuvée, aux vues de détail et aux données de disponibilité.',
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
    related: ['shadow', 'origin'],
    purchaseUrl: null,
    visual: 'aperture',
  },
  {
    id: 'origin',
    slug: 'origin',
    name: 'ORIGIN',
    subtitle: null,
    code: 'VHX-003',
    category: 'FOOTWEAR / FUTURE DROP',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'A future footwear slot prepared for verified product and commerce data.',
      es: 'Un espacio futuro de calzado preparado para datos verificados de producto y comercio.',
      pt: 'Um espaço futuro de calçado preparado para dados verificados de produto e comércio.',
      fr: 'Un futur espace chaussure préparé pour des données produit et commerciales vérifiées.',
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
    related: ['shadow', 'void'],
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
import { formatCurrency, type CurrencyCode } from '../commerce/currency'
import type { Locale } from '../i18n/translations'

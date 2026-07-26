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

// These entries define the editorial chapters of DROP 001. Commercial fields
// remain empty until VHOX supplies approved product data and photography.
export const products: Product[] = [
  {
    id: 'bat',
    slug: 'bat',
    name: 'BAT',
    subtitle: null,
    code: 'VHX-D001-01',
    category: 'DROP 001 / MEDIA PENDING',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'The first chapter of DROP 001. Final product media and verified release details are pending approval.',
      es: 'El primer capítulo de DROP 001. Los medios finales del producto y los detalles verificados del lanzamiento están pendientes de aprobación.',
      pt: 'O primeiro capítulo do DROP 001. A mídia final do produto e os detalhes verificados do lançamento aguardam aprovação.',
      fr: 'Le premier chapitre de DROP 001. Les médias finaux du produit et les détails vérifiés de la sortie sont en attente de validation.',
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
    code: 'VHX-D001-02',
    category: 'DROP 001 / MEDIA PENDING',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'The second chapter of DROP 001. Approved campaign imagery and confirmed commercial data will be added here.',
      es: 'El segundo capítulo de DROP 001. Aquí se añadirá la imagen de campaña aprobada y la información comercial confirmada.',
      pt: 'O segundo capítulo do DROP 001. A imagem de campanha aprovada e os dados comerciais confirmados serão adicionados aqui.',
      fr: 'Le deuxième chapitre de DROP 001. Les visuels de campagne approuvés et les données commerciales confirmées seront ajoutés ici.',
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
    code: 'VHX-D001-03',
    category: 'DROP 001 / MEDIA PENDING',
    price: null,
    compareAtPrice: null,
    currency: 'USD',
    description: {
      en: 'The closing chapter of DROP 001. This space is ready for verified product, material and availability data.',
      es: 'El capítulo final de DROP 001. Este espacio está preparado para datos verificados de producto, materiales y disponibilidad.',
      pt: 'O capítulo final do DROP 001. Este espaço está preparado para dados verificados de produto, materiais e disponibilidade.',
      fr: 'Le chapitre final de DROP 001. Cet espace est prêt pour les données vérifiées du produit, des matières et de la disponibilité.',
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

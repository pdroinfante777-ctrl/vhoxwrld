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
  currency: 'USD'
  description: string
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
    description: 'Reserved for an approved VHOX T-shirt and its real campaign photography.',
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
    description: 'Reserved for an approved VHOX cap, detail views and availability data.',
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
    description: 'A future footwear slot prepared for verified product and commerce data.',
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

export function formatProductPrice(product: Product) {
  if (product.price === null) return 'PRICE PENDING'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price)
}

export function productPath(product: Product) {
  return `/product/${product.slug}`
}

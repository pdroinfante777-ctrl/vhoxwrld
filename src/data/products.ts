export type ProductAvailability = 'coming-soon' | 'available' | 'archived'

export type ProductMedia = {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}

export type Product = {
  id: string
  name: string
  code: string
  category: string
  description: string
  media: ProductMedia[]
  price: string | null
  colors: string[]
  sizes: string[]
  materials: string | null
  care: string | null
  shipping: string | null
  purchaseUrl: string | null
  availability: ProductAvailability
  visual: 'slab' | 'aperture' | 'axis'
}

// Temporary collection records. Media and commercial fields stay intentionally
// empty until VHOX supplies approved product photography and store data.
export const products: Product[] = [
  {
    id: 'shadow',
    name: 'SHADOW',
    code: 'VHX-001',
    category: 'T-SHIRT / MEDIA PENDING',
    description: 'Reserved for an approved VHOX T-shirt and its real campaign photography.',
    media: [],
    price: null,
    colors: [],
    sizes: [],
    materials: null,
    care: null,
    shipping: null,
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'slab',
  },
  {
    id: 'void',
    name: 'VOID',
    code: 'VHX-002',
    category: 'CAP / MEDIA PENDING',
    description: 'Reserved for an approved VHOX cap, detail views and availability data.',
    media: [],
    price: null,
    colors: [],
    sizes: [],
    materials: null,
    care: null,
    shipping: null,
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'aperture',
  },
  {
    id: 'origin',
    name: 'ORIGIN',
    code: 'VHX-003',
    category: 'FOOTWEAR / FUTURE DROP',
    description: 'A future footwear slot prepared for verified product and commerce data.',
    media: [],
    price: null,
    colors: [],
    sizes: [],
    materials: null,
    care: null,
    shipping: null,
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'axis',
  },
]

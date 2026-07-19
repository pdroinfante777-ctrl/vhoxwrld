export type ProductAvailability = 'coming-soon' | 'available' | 'archived'

export type Product = {
  id: string
  name: string
  code: string
  category: string
  description: string
  image: string | null
  video: string | null
  price: string | null
  variants: string[]
  purchaseUrl: string | null
  availability: ProductAvailability
  visual: 'slab' | 'aperture' | 'axis'
}

// Temporary collection records. Media, pricing and variants stay intentionally
// empty until VHOX supplies real products and approved commerce data.
export const products: Product[] = [
  {
    id: 'shadow',
    name: 'SHADOW',
    code: 'VHX–001',
    category: 'COLLECTION SLOT 01',
    description: 'A reserved product module for the first VHOX release.',
    image: null,
    video: null,
    price: null,
    variants: [],
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'slab',
  },
  {
    id: 'void',
    name: 'VOID',
    code: 'VHX–002',
    category: 'COLLECTION SLOT 02',
    description: 'Structured for future imagery, motion, pricing and variants.',
    image: null,
    video: null,
    price: null,
    variants: [],
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'aperture',
  },
  {
    id: 'origin',
    name: 'ORIGIN',
    code: 'VHX–003',
    category: 'COLLECTION SLOT 03',
    description: 'Ready to connect to the selected external commerce system.',
    image: null,
    video: null,
    price: null,
    variants: [],
    purchaseUrl: null,
    availability: 'coming-soon',
    visual: 'axis',
  },
]

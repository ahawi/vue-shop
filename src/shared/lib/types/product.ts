export interface Product {
  id: string
  title: string
  price: string
  badge?: string
  rating: number
  cardPrice?: string
  image?: string
  hasCardPrice?: boolean
  hasSaleBadge?: boolean
  isFavorite?: boolean
}

export interface ProductSection {
  id: string
  title: string
  linkTitle: string
  products: Product[]
}

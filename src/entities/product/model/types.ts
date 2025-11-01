export interface ProductProps {
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

export interface ProductSectionProps {
  id: string
  title: string
  linkTitle: string
  products: ProductProps[]
}

export interface ProductProps {
  id: string
  title: string
  price: string
  discount?: string
  rating: number
  cardPrice?: string
  image?: string
  isFavorite?: boolean
  brand?: string
  weight?: string
  inStock: boolean
  categoryIds: string[]
}

export interface ProductSectionProps {
  id: string
  title: string
  linkTitle: string
  products: ProductProps[]
}

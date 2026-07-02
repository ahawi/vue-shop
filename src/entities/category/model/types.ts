export interface InnerCategory {
  id: string
  title: string
}

export interface Category {
  id: string
  title: string
  image: string
  categories?: InnerCategory[]
}

import type { ProductProps } from '@/entities/product'

export type SelectedCategory = { id: string; title: string }

export interface FiltersPayload {
  filterPrice: [number, number]
  filterCategories: SelectedCategory[]
  filterInStock: boolean
  hasActiveFilters: boolean
}

export interface FilterActive {
  type: 'category' | 'price' | 'stock'
  id: string
  title: string
  value: any
}

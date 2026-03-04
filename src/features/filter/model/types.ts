export type SelectedCategory = { id: string; title: string }

export interface FiltersPayload {
  filterPrice: [number, number]
  filterCategories: SelectedCategory[]
  filterInStock: boolean
  hasActiveFilters: boolean
}

export type FilterActive =
  | { type: 'category'; id: string; title: string; value: string }
  | { type: 'price'; id: string; title: string; value: [number, number] }
  | { type: 'stock'; id: string; title: string; value: boolean }

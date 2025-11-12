import type { Ref } from 'vue'
import type { FilterState } from './useFilterState'

export function useStockFilter(
  filterState: Ref<FilterState>,
  appliedFilters: Ref<FilterState>,
  emitFilters: (eventType?: 'update:filters' | 'apply:filters') => void,
) {
  const toggleInStock = () => {
    filterState.value.inStock = !filterState.value.inStock
    emitFilters('update:filters')
  }

  const removeStockFilter = () => {
    appliedFilters.value.inStock = false
    filterState.value.inStock = false
    emitFilters('apply:filters')
    emitFilters('update:filters')
  }

  return {
    toggleInStock,
    removeStockFilter,
  }
}

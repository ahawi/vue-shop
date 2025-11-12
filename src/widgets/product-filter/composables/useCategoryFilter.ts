import type { Ref } from 'vue'
import type { FilterState, SelectedCategory } from './useFilterState'

export function useCategoryFilter(
  filterState: Ref<FilterState>,
  appliedFilters: Ref<FilterState>,
  emitFilter: (eventType?: 'update:filters' | 'apply:filters') => void,
) {
  const isCategorySelected = (categoryId: string) => {
    return filterState.value.filterCategories.find((category) => category.id === categoryId)
  }

  const toggleCategory = (category: SelectedCategory) => {
    const existingIndex = filterState.value.filterCategories.findIndex(
      (cat) => cat.id === category.id,
    )

    if (existingIndex > -1) {
      filterState.value.filterCategories.splice(existingIndex, 1)
    } else {
      filterState.value.filterCategories.push(category)
    }
    emitFilter('update:filters')
  }

  const removeCategory = (categoryId: string, event: Event) => {
    event.stopPropagation()
    filterState.value.filterCategories = filterState.value.filterCategories.filter(
      (category) => category.id !== categoryId,
    )
    emitFilter('update:filters')
  }

  const removeCategoryById = (categoryId: string) => {
    appliedFilters.value.filterCategories = appliedFilters.value.filterCategories.filter(
      (category) => category.id !== categoryId,
    )
    filterState.value.filterCategories = [...appliedFilters.value.filterCategories]
    emitFilter('apply:filters')
    emitFilter('update:filters')
  }

  return {
    isCategorySelected,
    toggleCategory,
    removeCategory,
    removeCategoryById,
  }
}

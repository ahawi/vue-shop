import { ref } from 'vue'

export interface SelectedCategory {
  id: string
  title: string
}

export interface FilterState {
  filterPrice: [number, number]
  filterCategories: SelectedCategory[]
  inStock: boolean
}

export interface FilterStateProps {
  min: number
  max: number
  modelValue: [number, number]
}

export function useFilterState(
  props: FilterStateProps,
  emit: (event: 'update:modelValue' | 'update:filters' | 'apply:filters', ...args: any[]) => void,
) {
  const createInitialFilterState = (): FilterState => ({
    filterPrice: props.modelValue,
    filterCategories: [],
    inStock: false,
  })

  const filterState = ref(createInitialFilterState())
  const appliedFilters = ref(createInitialFilterState())

  const hasFilters = (state: FilterState): boolean => {
    return (
      state.filterPrice[0] !== props.min ||
      state.filterPrice[1] !== props.max ||
      state.filterCategories.length > 0 ||
      state.inStock
    )
  }

  const emitFilters = (eventType: 'update:filters' | 'apply:filters' = 'update:filters') => {
    const state = eventType === 'apply:filters' ? appliedFilters.value : filterState.value
    emit(eventType, {
      filterPrice: state.filterPrice,
      filterCategories: [...state.filterCategories],
      inStock: state.inStock,
      hasActiveFilters: hasFilters(state),
    })
  }

  const resetFilterState = () => {
    const defaultState: FilterState = {
      filterPrice: [props.min, props.max],
      filterCategories: [],
      inStock: false,
    }
    filterState.value = { ...defaultState }
    appliedFilters.value = { ...defaultState }
    emit('update:modelValue', [props.min, props.max])
    emitFilters('update:filters')
    emitFilters('apply:filters')
  }

  const applyFilters = () => {
    appliedFilters.value = {
      filterPrice: [...filterState.value.filterPrice],
      filterCategories: [...filterState.value.filterCategories],
      inStock: filterState.value.inStock,
    }
    emitFilters('apply:filters')
  }

  return {
    filterState,
    appliedFilters,
    hasFilters,
    emitFilters,
    resetFilterState,
    applyFilters,
  }
}

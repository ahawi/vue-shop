import { computed, ref, watch, type Ref } from 'vue'
import type { FilterState } from './useFilterState'

export interface PriceRangeProps {
  min: number
  max: number
  modelValue: [number, number]
}

export function usePriceRange(
  props: PriceRangeProps,
  emit: (event: 'update:modelValue' | 'update:filters' | 'apply:filters', ...args: any[]) => void,
  filterState: Ref<FilterState>,
  emitFilters: () => void,
) {
  const minInput = ref(props.modelValue[0])
  const maxInput = ref(props.modelValue[1])

  const range = computed({
    get: () => props.modelValue,
    set: (value: [number, number]) => {
      emit('update:modelValue', value)
      filterState.value.filterPrice = value
      emitFilters()
    },
  })

  watch(
    () => props.modelValue,
    (newValue) => {
      minInput.value = newValue[0]
      maxInput.value = newValue[1]
      filterState.value.filterPrice = newValue
    },
    { immediate: true },
  )

  const updateMinValue = (value: number | string) => {
    if (value === '' || value === null || value === undefined) {
      minInput.value = props.modelValue[0]
      return
    }

    const numValue = Number(value)
    if (isNaN(numValue) || numValue < props.min) {
      minInput.value = props.modelValue[0]
      return
    }

    let constrainedMin = Math.max(props.min, Math.min(numValue, props.max))

    if (constrainedMin >= props.modelValue[1]) {
      constrainedMin = Math.max(props.min, props.modelValue[1] - 1)
    }

    minInput.value = constrainedMin

    if (constrainedMin !== props.modelValue[0] || constrainedMin !== minInput.value) {
      emit('update:modelValue', [constrainedMin, props.modelValue[1]])
    }
  }

  const updateMaxValue = (value: number | string) => {
    if (value === '' || value === null || value === undefined) {
      maxInput.value = props.modelValue[1]
      return
    }

    const numValue = Number(value)
    if (isNaN(numValue) || numValue > props.max) {
      maxInput.value = props.modelValue[1]
      return
    }

    let constrainedMax = Math.max(props.min, Math.min(numValue, props.max))

    if (constrainedMax <= props.modelValue[0]) {
      constrainedMax = Math.min(props.max, props.modelValue[0] + 1)
    }

    maxInput.value = constrainedMax

    if (constrainedMax !== props.modelValue[1] || constrainedMax !== maxInput.value) {
      emit('update:modelValue', [props.modelValue[0], constrainedMax])
    }
  }

  const clearRange = () => {
    filterState.value.filterPrice = [props.min, props.max]
    emit('update:modelValue', [props.min, props.max])
    emitFilters()
  }

  return {
    range,
    minInput,
    maxInput,
    updateMaxValue,
    updateMinValue,
    clearRange,
  }
}

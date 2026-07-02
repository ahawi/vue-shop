import type { ProductProps } from '@/entities/product'
import { computed, ref, type Ref } from 'vue'
import type { FilterActive, FiltersPayload, SelectedCategory } from './types'
import { mockCategory } from '@/entities/category/mocks/mock-categories'

export const useFilter = (products: Ref<ProductProps[]>) => {
  const computePriceRange = () => {
    const prices = products.value
      .map((product) => parseFloat(String(product.price).replace(',', '.')) || 0)
      .filter(Boolean)
    if (prices.length === 0) return { min: 0, max: 0 }
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }

  const initial = computePriceRange()
  const min = ref<number>(initial.min)
  const max = ref<number>(initial.max)

  const price = ref<[number, number]>([min.value, max.value])

  const draftFilterState = ref<FiltersPayload>({
    filterPrice: [min.value, max.value],
    filterCategories: [],
    filterInStock: false,
    hasActiveFilters: false
  })

  const appliedFilterState = ref<FiltersPayload>({
    filterPrice: [min.value, max.value],
    filterCategories: [],
    filterInStock: false,
    hasActiveFilters: false
  })

  const appliedFilters = ref<FilterActive[]>([])

  const categoriesOptions = computed<SelectedCategory[]>(() => {
    const categories = new Set(products.value.map((product) => product.categoryIds[0]))

    return mockCategory
      .filter((category) => categories.has(category.id))
      .map((category) => ({ id: category.id, title: category.title }))
  })

  const buildAppliedFilters = () => {
    const filtersArr: FilterActive[] = []

    if (appliedFilterState.value.filterCategories.length) {
      appliedFilterState.value.filterCategories.forEach((category) => {
        filtersArr.push({
          type: 'category',
          id: `category-${category.id}`,
          title: category.title,
          value: category.id
        })
      })
    }

    const [minPrice, maxPrice] = appliedFilterState.value.filterPrice
    if (minPrice !== min.value || maxPrice !== max.value) {
      filtersArr.push({
        type: 'price',
        id: `price-range`,
        title: `Цена от ${minPrice} до ${maxPrice}`,
        value: appliedFilterState.value.filterPrice
      })
    }

    if (appliedFilterState.value.filterInStock) {
      filtersArr.push({
        type: 'stock',
        id: 'in-stock',
        title: 'В наличии',
        value: true
      })
    }

    appliedFilters.value = filtersArr
  }

  const toggleCategory = (category: SelectedCategory) => {
    const categoryId = draftFilterState.value.filterCategories.findIndex(
      (cat) => cat.id === category.id
    )

    if (categoryId === -1) draftFilterState.value.filterCategories.push(category)
    else draftFilterState.value.filterCategories.splice(categoryId, 1)
  }

  const removeCategoryById = (categoryId: string) => {
    draftFilterState.value.filterCategories = draftFilterState.value.filterCategories.filter(
      (cat) => cat.id !== categoryId
    )
    buildAppliedFilters()
  }

  const removeAppliedCategoryById = (categoryId: string) => {
    appliedFilterState.value.filterCategories = appliedFilterState.value.filterCategories.filter(
      (cat) => cat.id !== categoryId
    )

    draftFilterState.value.filterCategories = draftFilterState.value.filterCategories.filter(
      (cat) => cat.id !== categoryId
    )

    buildAppliedFilters()
  }

  const toggleInStock = () => {
    draftFilterState.value.filterInStock = !draftFilterState.value.filterInStock
  }

  const setPrice = (priceValue: [number, number]) => {
    price.value = priceValue
    draftFilterState.value.filterPrice = priceValue
  }

  const resetFilterState = () => {
    const range = computePriceRange()
    min.value = range.min
    max.value = range.max
    price.value = [min.value, max.value]
    const emptyState = {
      filterPrice: [min.value, max.value] as [number, number],
      filterCategories: [],
      filterInStock: false,
      hasActiveFilters: false
    }
    draftFilterState.value = { ...emptyState }
    appliedFilterState.value = { ...emptyState }
    appliedFilters.value = []
  }

  const removePriceFilter = () => {
    appliedFilterState.value.filterPrice = [min.value, max.value]
    price.value = [min.value, max.value]
    draftFilterState.value.filterPrice = [min.value, max.value]
    buildAppliedFilters()
  }

  const removeStockFilter = () => {
    appliedFilterState.value.filterInStock = false
    draftFilterState.value.filterInStock = false
    buildAppliedFilters()
  }

  const applyFilters = (): FiltersPayload => {
    draftFilterState.value.filterPrice = price.value

    appliedFilterState.value = {
      filterPrice: [...price.value],
      filterCategories: [...draftFilterState.value.filterCategories],
      filterInStock: draftFilterState.value.filterInStock,
      hasActiveFilters: false
    }
    buildAppliedFilters()

    const payload: FiltersPayload = {
      filterPrice: appliedFilterState.value.filterPrice,
      filterCategories: [...appliedFilterState.value.filterCategories],
      filterInStock: appliedFilterState.value.filterInStock,
      hasActiveFilters: !!appliedFilters.value.length
    }

    return payload
  }

  const filteredProducts = computed(() => {
    let result = products.value.slice()
    const applied = appliedFilterState.value

    if (applied.filterCategories.length) {
      const categoriesIds = applied.filterCategories.map((category) => category.id)
      result = result.filter((product) =>
        product.categoryIds.some((categoryId) => categoriesIds.includes(categoryId))
      )
    }

    const [minPrice, maxPrice] = applied.filterPrice
    result = result.filter((product) => {
      const priceNum = parseFloat(String(product.price).replace(',', '.')) || 0
      return priceNum >= minPrice && priceNum <= maxPrice
    })

    if (applied.filterInStock) result = result.filter((product) => product.inStock)

    return result
  })

  const removeFilterButtons = (filter: FilterActive) => {
    if (filter.type === 'category') {
      removeAppliedCategoryById(filter.value)
    } else if (filter.type === 'price') {
      removePriceFilter()
    } else if (filter.type === 'stock') {
      removeStockFilter()
    }
  }

  const recalcRangeFromProducts = () => {
    const result = computePriceRange()
    min.value = result.min
    max.value = result.max
    if (price.value[0] < min.value || price.value[1] > max.value) {
      const newPrice: [number, number] = [min.value, max.value]
      price.value = newPrice
      draftFilterState.value.filterPrice = newPrice
      appliedFilterState.value.filterPrice = newPrice
      buildAppliedFilters()
    }
  }

  return {
    price,
    min,
    max,
    draftFilterState,
    appliedFilterState,
    appliedFilters,
    categoriesOptions,
    filteredProducts,

    setPrice,
    toggleCategory,
    removeCategoryById,
    removeAppliedCategoryById,
    toggleInStock,
    applyFilters,
    resetFilterState,
    removePriceFilter,
    removeStockFilter,
    recalcRangeFromProducts,
    removeFilterButtons
  }
}

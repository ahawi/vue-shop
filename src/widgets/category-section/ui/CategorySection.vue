<script lang="ts" setup>
import { Button, Typography } from '@/shared/ui'
import { ProductCard, type ProductProps } from '@/entities/product'
import { ProductFilter } from '@/widgets/product-filter'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { mockProducts, type CategoryProduct } from '@/shared/lib/mocks/mock-products'
import { useRoute } from 'vue-router'
import router from '@/app/router'
import { useAddToCart } from '@/features/add-to-cart/useAddToCart'
import { useToggleFavorite } from '@/features/toggle-favorite/useToggleFavorite'

interface FiltersPayload {
  filterPrice: [number, number]
  filterCategories: { id: string; title: string }[]
  inStock: boolean
  hasActiveFilters: boolean
}

const goToProductPage = (product: CategoryProduct) => {
  router.push(`/catalog/${product.categoryIds[0]}/${product.id}`)
}

const addToCart = useAddToCart()
const { toggleFavorite } = useToggleFavorite()

const onProductToggleFavorite = (product: ProductProps) => {
  toggleFavorite(product)
}

const categoryProducts = computed(() => {
  if (!currentCategoryId.value) return []
  return mockProducts.filter((product) => product.categoryIds.includes(currentCategoryId.value))
})

const initialPriceRange = () => {
  const prices = categoryProducts.value.map((product) =>
    parseFloat(product.price.replace(',', '.')),
  )
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

const priceRange = ref({ min: 0, max: 0 })
const priceMin = ref(0)
const priceMax = ref(10000)

const step = 6
const visibleCount = ref(step)

const route = useRoute()
const currentCategoryId = ref('')

const updatePriceRange = () => {
  const range = initialPriceRange()
  priceRange.value = range
  priceMin.value = range.min
  priceMax.value = range.max
}

onMounted(() => {
  currentCategoryId.value = route.params.category as string
  updatePriceRange()
})

const tempPrice = ref<[number, number]>([priceMin.value, priceMax.value])

const appliedFiltersState = ref<FiltersPayload>({
  filterPrice: [priceMin.value, priceMax.value],
  filterCategories: [],
  inStock: false,
  hasActiveFilters: false,
})

watch(
  () => route.params.category,
  (newCategoryId) => {
    if (newCategoryId) {
      currentCategoryId.value = newCategoryId as string
      nextTick(() => {
        updatePriceRange()
        appliedFiltersState.value.filterPrice = [priceMin.value, priceMax.value]
        tempPrice.value = [priceMin.value, priceMax.value]
        visibleCount.value = step
        clearAllFilters()
      })
    }
  },
  { immediate: true },
)

watch(
  [priceMin, priceMax],
  ([min, max]) => {
    if (min !== 0 || max !== 200) {
      appliedFiltersState.value.filterPrice = [min, max]
      tempPrice.value = [min, max]
    }
  },
  { immediate: true },
)

const filteredProducts = computed(() => {
  let products = categoryProducts.value

  if (appliedFiltersState.value.filterCategories.length > 0) {
    const selectedCategoryIds = appliedFiltersState.value.filterCategories.map(
      (category) => category.id,
    )
    products = products.filter((product) =>
      product.categoryIds.some((categoryId) => selectedCategoryIds.includes(categoryId)),
    )
  }

  const [minPrice, maxPrice] = appliedFiltersState.value.filterPrice
  products = products.filter((product) => {
    const productPrice = parseFloat(product.price.replace(',', '.'))
    return productPrice >= minPrice && productPrice <= maxPrice
  })

  if (appliedFiltersState.value.inStock) {
    products = products.filter((product) => product.inStock)
  }

  return products
})

const displayedProducts = computed(() => {
  const products = filteredProducts.value ?? []
  return products.slice(0, visibleCount.value)
})

const showMore = () => {
  const total = filteredProducts.value.length ?? 0
  if (visibleCount.value < total) {
    visibleCount.value = Math.min(visibleCount.value + step, total)
  }
}

const price = computed<[number, number]>({
  get() {
    return tempPrice.value
  },
  set(value: [number, number]) {
    tempPrice.value = value
  },
})

const productFilter = ref<InstanceType<typeof ProductFilter> | null>(null)

interface ActiveFilter {
  type: 'category' | 'price' | 'stock'
  id: string
  title: string
  value: any
}

const appliedFilters = ref<ActiveFilter[]>([])

const updateAppliedFilters = (filters: FiltersPayload) => {
  appliedFiltersState.value = { ...filters }
  appliedFilters.value = []
  visibleCount.value = step

  if (filters.filterCategories && filters.filterCategories.length > 0) {
    filters.filterCategories.forEach((category: any) => {
      appliedFilters.value.push({
        type: 'category',
        id: `category-${category.id}`,
        title: category.title,
        value: category.id,
      })
    })
  }

  if (
    filters.filterPrice &&
    (filters.filterPrice[0] !== priceMin.value || filters.filterPrice[1] !== priceMax.value)
  ) {
    appliedFilters.value.push({
      type: 'price',
      id: 'price-range',
      title: `Цена от ${filters.filterPrice[0]} до ${filters.filterPrice[1]}`,
      value: filters.filterPrice,
    })
  }

  if (filters.inStock) {
    appliedFilters.value.push({
      type: 'stock',
      id: 'in-stock',
      title: 'В наличии',
      value: true,
    })
  }
}

const removeFilter = (filterId: string) => {
  const filter = appliedFilters.value.find((f) => f.id === filterId)
  if (!filter) return

  if (filter.type === 'category' && productFilter.value) {
    productFilter.value.removeCategoryById(filter.value)
  } else if (filter.type === 'price' && productFilter.value) {
    productFilter.value.removePriceFilter()
  } else if (filter.type === 'stock' && productFilter.value) {
    productFilter.value.removeStockFilter()
  }
}

const clearAllFilters = () => {
  if (productFilter.value) {
    productFilter.value.clearAllFilters()
  }
  appliedFiltersState.value.filterPrice = [priceMin.value, priceMax.value]
  tempPrice.value = [priceMin.value, priceMax.value]
}

const appliedFiltersCount = computed(() => appliedFilters.value.length)
</script>

<template>
  <div class="category-section">
    <!-- <div class="category-section__top-actions">
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Товары нашего производства</Button
      >
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Полезное питание</Button
      >
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Без ГМО</Button
      >
    </div> -->
    <div class="category-section__inner">
      <div class="category-section__filter">
        <ProductFilter
          v-model="price"
          :min="priceMin"
          :max="priceMax"
          ref="productFilter"
          @apply:filters="updateAppliedFilters"
        />
      </div>
      <div
        :class="[
          appliedFiltersCount > 0 ? 'category-section__main' : 'category-section__main--no-filters',
          'main',
        ]"
      >
        <div class="main__top-filters">
          <Button
            v-for="filter in appliedFilters"
            :key="filter.id"
            backgroundColor="secondary"
            size="s"
            :right-icon="{
              type: 'close',
              width: 24,
              height: 24,
            }"
            @click="removeFilter(filter.id)"
            >{{ filter.title }}</Button
          >
          <Button
            v-if="appliedFiltersCount > 0"
            :right-icon="{
              type: 'close',
              width: 24,
              height: 24,
            }"
            backgroundColor="grayscale"
            size="s"
            @click="clearAllFilters"
            class="main__top-filters-clear-button"
            >Очистить фильтры</Button
          >
        </div>
        <div v-if="displayedProducts.length < 1" class="main__nothing">
          <Typography tag="span" size="l">Ничего не найдено :(</Typography>
        </div>

        <div class="main__cards">
          <ProductCard
            v-for="product in displayedProducts"
            :key="product.id"
            v-bind="product"
            @click="goToProductPage(product)"
            @add-to-cart="addToCart(product)"
            @toggle-favorite="onProductToggleFavorite"
          />
        </div>
        <div class="main__more">
          <Button
            v-if="visibleCount < (filteredProducts.length ?? 0)"
            backgroundColor="grayscale"
            size="m"
            class="main__more-button"
            @click="showMore"
          >
            Показать ещё
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  padding-block: 4px;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__top-actions {
    display: flex;
    gap: 24px;

    &-button {
      &:hover {
        background-color: var(--main-secondary);
        color: var(--main-on-secondary);
      }

      &:active {
        background-color: var(--pallete-success);
        color: var(--main-on-secondary);
      }
    }
  }

  &__inner {
    display: flex;
    gap: 40px;
  }

  &__filter {
    max-width: 272px;
    width: 100%;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 40px;
    flex: 1;

    &--no-filters {
      display: block;
    }
  }
}

.main {
  &__top-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__nothing {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-block: 40px;

    &-button {
      padding-block: 8px;
    }
  }
}
</style>

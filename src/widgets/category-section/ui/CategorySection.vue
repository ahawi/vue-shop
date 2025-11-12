<script lang="ts" setup>
import { Button } from '@/shared/ui'
import { ProductCard } from '@/entities/product'
import { mockProductSections } from '@/entities/product/mocks/mock-products'
import { ProductFilter } from '@/widgets/product-filter'
import { computed, ref } from 'vue'

interface FiltersPayload {
  filterPrice: [number, number]
  filterCategories: { id: string; title: string }[]
  inStock: boolean
  hasActiveFilters: boolean
}

const priceMin = 0
const priceMax = 200

const price = ref<[number, number]>([20, 150])
const productFilter = ref<InstanceType<typeof ProductFilter> | null>(null)

interface ActiveFilter {
  type: 'category' | 'price' | 'stock'
  id: string
  title: string
  value: any
}

const appliedFilters = ref<ActiveFilter[]>([])

const updateAppliedFilters = (filters: FiltersPayload) => {
  appliedFilters.value = []

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

  if (filters.filterPrice && (filters.filterPrice[0] !== 0 || filters.filterPrice[1] !== 200)) {
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
}

const appliedFiltersCount = computed(() => appliedFilters.value.length)
</script>

<template>
  <div class="category-section">
    <div class="category-section__top-actions">
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Товары нашего производства</Button
      >
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Полезное питание</Button
      >
      <Button backgroundColor="grayscale" size="s" class="category-section__top-actions-button"
        >Без ГМО</Button
      >
    </div>
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
      <div class="category-section__main main">
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
        <div class="main__cards">
          <ProductCard
            v-for="product in mockProductSections[0]?.products"
            :key="product.id"
            v-bind="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  }
}

.main {
  &__top-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
}

.button {
  padding-block: 4px;
}
</style>

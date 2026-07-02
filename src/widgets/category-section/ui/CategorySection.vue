<script lang="ts" setup>
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { ProductCard, type ProductProps } from '@/entities/product'
import { ProductFilter } from '@/widgets/product-filter'
import { computed, nextTick, ref, watch } from 'vue'

import { useRoute } from 'vue-router'
import { useToggleFavorite } from '@/features/toggle-favorite'
import { useCartStore } from '@/entities/cart/model/cart'
import type { FilterActive } from '@/features/filter/model/types'
import { useNavigate } from '@/shared/lib/useNavigate'
import { productApi } from '@/entities/product/api'

const PAGE_STEP = 6

const { toggleFavoriteItem } = useToggleFavorite()
const { addToCart } = useCartStore()
const { goToProduct } = useNavigate()

const route = useRoute()

const productFilter = ref<InstanceType<typeof ProductFilter> | null>(null)

const currentCategoryId = computed(() => (route.params.category as string) || '')

const categoryProducts = ref<ProductProps[]>([])

const filteredProducts = computed(
  () => productFilter.value?.filteredProducts ?? categoryProducts.value
)
const appliedFilters = computed(() => productFilter.value?.appliedFilters ?? [])

const visibleCount = ref(PAGE_STEP)

const displayedProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))

const showMore = () => {
  visibleCount.value = Math.min(visibleCount.value + PAGE_STEP, filteredProducts.value.length)
}

const resetFilterState = () => {
  productFilter.value?.resetFilterState()
}

const removeFilterButtons = (filter: FilterActive) => {
  productFilter.value?.removeFilterButtons(filter)
}

watch(
  currentCategoryId,
  async (category) => {
    categoryProducts.value = category ? ((await productApi.getList({ category })) ?? []) : []
    visibleCount.value = PAGE_STEP
    await nextTick()
    productFilter.value?.recalcRangeFromProducts()
  },
  { immediate: true }
)

const onApplyFilter = () => {
  visibleCount.value = PAGE_STEP
}
</script>

<template>
  <div class="category-section">
    <div class="category-section__inner">
      <div class="category-section__filter">
        <ProductFilter
          :products="categoryProducts"
          ref="productFilter"
          @apply:filters="onApplyFilter" />
      </div>
      <div
        :class="[
          appliedFilters.length ? 'category-section__main' : 'category-section__main--no-filters',
          'main'
        ]">
        <div class="main__top-filters">
          <Button
            v-for="filter in appliedFilters"
            :key="filter.id"
            backgroundColor="secondary"
            size="s"
            :right-icon="{
              type: 'close',
              width: 24,
              height: 24
            }"
            @click="removeFilterButtons(filter)"
            >{{ filter.title }}</Button
          >
          <Button
            v-if="appliedFilters.length"
            :right-icon="{
              type: 'close',
              width: 24,
              height: 24
            }"
            backgroundColor="grayscale"
            size="s"
            @click="resetFilterState"
            class="main__top-filters-clear-button"
            >Очистить фильтры</Button
          >
        </div>
        <div
          v-if="displayedProducts.length < 1"
          class="main__nothing">
          <Typography
            tag="span"
            size="l"
            >Ничего не найдено :(</Typography
          >
        </div>

        <div class="main__cards">
          <ProductCard
            v-for="product in displayedProducts"
            :key="product.id"
            v-bind="product"
            @click="goToProduct(product)"
            @add-to-cart="addToCart(product)"
            @toggle-favorite="toggleFavoriteItem" />
        </div>
        <div class="main__more">
          <Button
            v-if="visibleCount < filteredProducts.length"
            backgroundColor="grayscale"
            size="m"
            class="main__more-button"
            @click="showMore">
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

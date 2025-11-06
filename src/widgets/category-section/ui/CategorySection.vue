<script lang="ts" setup>
import { Button } from '@/shared/ui'
import { ProductCard } from '@/entities/product'
import { mockProductSections } from '@/entities/product/mocks/mock-products'
import { ProductFilter } from '@/widgets/product-filter'
import { ref } from 'vue'

const price = ref<[number, number]>([20, 150])
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
        <ProductFilter v-model="price" :min="0" :max="200" />
      </div>
      <div class="category-section__main main">
        <div class="main__top-filters">
          <Button backgroundColor="secondary" size="s">Фильтр 4</Button>
          <Button backgroundColor="secondary" size="s">Цена от 99 до 2599</Button>
          <Button backgroundColor="grayscale" size="s">Очистить фильтры</Button>
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
    gap: 24px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
}
</style>

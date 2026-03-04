<script lang="ts" setup>
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { Field } from '@/shared/ui/field'
import { Icon } from '@/shared/ui/icon'
import { toRef, type Ref } from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { useFilter } from '@/features/filter'
import type { ProductProps } from '@/entities/product'
import type { FilterActive, FiltersPayload } from '@/features/filter/model/types'

const props = defineProps<{
  products: ProductProps[]
}>()

const emits = defineEmits<{
  (e: 'apply:filters', payload: FiltersPayload): void
}>()

const {
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
  removeFilterButtons,
  resetFilterState,
  removePriceFilter,
  removeStockFilter,
  recalcRangeFromProducts
} = useFilter(toRef(props, 'products'))

const isCategorySelected = (id: string) =>
  draftFilterState.value.filterCategories.some((category) => category.id === id)

const clearRange = () => {
  removePriceFilter()
}

const onApplyFilters = () => {
  const payload = applyFilters()
  emits('apply:filters', payload)
}

defineExpose({
  filteredProducts,
  appliedFilters,
  price,
  min,
  max,

  removeCategoryById,
  removeAppliedCategoryById,
  removePriceFilter,
  removeFilterButtons,
  removeStockFilter,
  resetFilterState,
  recalcRangeFromProducts,
  applyFilters
})
</script>

<template>
  <div class="filter">
    <Typography
      tag="span"
      size="s"
      bold
      class="filter__title"
      >Фильтр</Typography
    >
    <div class="filter__price">
      <div class="filter__price-top">
        <Typography
          tag="span"
          size="s"
          class="filter__price-title"
          >Цена</Typography
        >
        <Button
          backgroundColor="grayscale"
          size="s"
          class="filter__clear-button"
          @click="clearRange"
          :disabled="appliedFilters.length === 0"
          >Очистить</Button
        >
      </div>
      <div class="filter__fields">
        <Field
          size="m"
          type="number"
          class="filter__field"
          :modelValue="price[0]"
          @update:modelValue="(value) => setPrice([Number(value), price[1]])"
          :min="min"
          :max="max" />
        <span></span>
        <Field
          size="m"
          type="number"
          class="filter__field"
          :modelValue="price[1]"
          @update:modelValue="(value) => setPrice([price[0], Number(value)])"
          :min="min"
          :max="max" />
      </div>
      <vue-slider
        v-model="price"
        :min="min"
        :max="max"
        :contained="true"
        :interval="0.01"
        :min-range="20"
        :dot-size="22"
        :dot-style="{
          backgroundColor: '#70C05B',
          border: '1px solid #FFFFFF',
          boxShadow: '2px 4px 8px 0px rgba(112, 192, 91, 0.2)'
        }"
        :height="5"
        :enable-cross="false"
        :process-style="{ backgroundColor: '#70C05B' }"
        :rail-style="{ backgroundColor: '#F3F2F1' }"
        :tooltip="'none'"
        range
        class="filter__range-slider" />
    </div>
    <ul class="filter__products">
      <li
        class="filter__product"
        v-for="category in categoriesOptions"
        :key="category.id"
        :class="{ 'filter__product--selected': isCategorySelected(category.id) }"
        @click="toggleCategory(category)">
        <Typography
          tag="span"
          size="s"
          >{{ category.title }}</Typography
        >
        <span
          v-if="isCategorySelected(category.id)"
          @click.stop="removeCategoryById(category.id)">
          <Icon
            type="close"
            :width="24"
            :height="24"></Icon>
        </span>
      </li>
    </ul>
    <div class="filter__in-stock">
      <label
        class="filter__in-stock-label"
        for="checkbox">
        <input
          type="checkbox"
          class="filter__in-stock-input"
          id="checkbox"
          @change="toggleInStock"
          :checked="appliedFilterState.filterInStock" />
        <Typography
          tag="span"
          size="s"
          class="filter__in-stock-inner"
          >В наличии</Typography
        ></label
      >
    </div>
    <Button
      backgroundColor="primary"
      size="m"
      class="filter__apply-button"
      @click="onApplyFilters"
      >Применить</Button
    >
  </div>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__title {
    padding: 10px;
    background-color: var(--grayscale-lightest);
    border-radius: 4px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 13px;

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      display: flex;
    }
  }

  &__clear-button {
    &:hover {
      background-color: var(--main-secondary);
      color: var(--main-on-secondary);
    }

    &:active {
      background-color: var(--pallete-success);
      color: var(--main-on-secondary);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--grayscale-lightest);
      color: var(--grayscale-hardest);

      &:hover {
        background-color: var(--grayscale-lightest);
        color: var(--grayscale-hardest);
      }

      &:active {
        background-color: var(--grayscale-lightest);
        color: var(--grayscale-hardest);
      }
    }
  }

  &__fields {
    display: flex;
    align-items: center;
    gap: 4.5px;

    span {
      width: 15px;
      border-radius: 50%;
      height: 1px;
      background-color: var(--main-on-surface);
    }
  }

  &__field {
    max-width: 124px;
    width: 100%;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__product {
    border: 1px solid transparent;
    cursor: pointer;

    &--selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--main-primary);
    }
  }

  &__in-stock {
    display: inline-block;

    &-label {
      cursor: pointer;
    }

    &-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      appearance: none;

      &:checked + .filter__in-stock-inner::before {
        background-color: var(--main-secondary);
      }

      &:checked + .filter__in-stock-inner::after {
        background-color: var(--main-on-secondary);
        left: 24px;
      }
    }

    &-inner {
      display: inline-block;
      position: relative;
      padding-left: 56px;
      user-select: none;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 45px;
        height: 24px;
        background-color: #f8f8f8;
        border-radius: 49px;
        border: 1px solid #e0e0e0;
        transition: background-color 0.2s;
      }

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        background-color: var(--main-on-secondary);
        border-radius: 50%;
        box-shadow:
          0px 2px 6px 0px rgba(0, 0, 0, 0.15),
          0px 1px 1px 0px rgba(0, 0, 0, 0.08),
          0px 0px 0px 0.5px rgba(0, 0, 0, 0.04);
        transition:
          background-color 0.2s,
          left 0.2s;
      }
    }
  }

  &__apply-button {
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
</style>

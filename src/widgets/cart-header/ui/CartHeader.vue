<script lang="ts" setup>
import { useCartStore } from '@/entities/cart/model/cart'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { storeToRefs } from 'pinia'

const { allProductsSelected, totalProducts, selectedProducts } = storeToRefs(useCartStore())
const { toggleAllSelectedProducts, removeAllSelectedProducts } = useCartStore()

const handleToggleSelectAll = () => {
  toggleAllSelectedProducts()
}

const handleDeleteSelected = () => {
  removeAllSelectedProducts()
}
</script>

<template>
  <div class="cart-header">
    <div class="cart-header__select-all">
      <Checkbox
        :value="allProductsSelected"
        @update:value="handleToggleSelectAll"
        :disabled="totalProducts === 0"
        >Выделить всё</Checkbox
      >
    </div>
    <Button
      decoration="none"
      background-color="primary"
      size="s"
      class="cart-header__delete-selected"
      @click="handleDeleteSelected"
      :disabled="selectedProducts.length === 0"
      >Удалить выбранное</Button
    >
  </div>
</template>

<style lang="scss" scoped>
.cart-header {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 10px;

  &__delete-selected {
    &:disabled {
      background-color: transparent;
      color: var(--grayscale-light);
    }
  }
}
</style>

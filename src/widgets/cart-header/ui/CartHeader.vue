<script lang="ts" setup>
import { useCartStore } from '@/app/stores/cart'
import { Button, Checkbox } from '@/shared/ui'
import { computed } from 'vue'

const cartStore = useCartStore()

const allSelected = computed(() => cartStore.allSelected)

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    cartStore.selectAll()
  } else {
    cartStore.unselectAll()
  }
}

const handleDeleteSelected = () => {
  cartStore.removeSelectedItems()
}
</script>

<template>
  <div class="cart-header">
    <div class="cart-header__select-all">
      <Checkbox
        :value="allSelected"
        @update:value="handleSelectAll"
        :disabled="cartStore.totalItems === 0"
        >Выделить всё</Checkbox
      >
    </div>
    <Button
      decoration="none"
      background-color="primary"
      size="s"
      class="cart-header__delete-selected"
      @click="handleDeleteSelected"
      :disabled="cartStore.selectedItemsCount === 0"
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

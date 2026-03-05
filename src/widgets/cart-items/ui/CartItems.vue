<script lang="ts" setup>
import { CartItem } from '@/entities/cart'
import { useCartStore } from '@/entities/cart/model/cart'
import { Typography } from '@/shared/ui/typography'
import { storeToRefs } from 'pinia'

const { products } = storeToRefs(useCartStore())
const { updateQuantity, toggleProductSelect } = useCartStore()

const updateItemQuantity = (itemId: string, quantity: number) => {
  updateQuantity(itemId, quantity)
}

const toggleItemSelect = (itemId: string) => {
  toggleProductSelect(itemId)
}
</script>

<template>
  <div class="cart-items">
    <template v-if="products.length">
      <CartItem
        v-for="item in products"
        :key="item.cartProductId"
        :item="item"
        @update-quantity="updateItemQuantity(item.cartProductId, $event)"
        @toggle-select="toggleItemSelect(item.cartProductId)" />
    </template>
    <template v-else>
      <Typography tag="h5">Упс! В корзине пока что ничего нет</Typography></template
    >
  </div>
</template>

<style lang="scss" scoped>
.cart-items {
  display: grid;
  gap: 24px;
  width: 100%;
}
</style>

<script lang="ts" setup>
import { CartItem } from '@/entities/cart'
import { useCartStore } from '@/entities/cart/model/cart'
import { computed } from 'vue'
import { Typography } from '@/shared/ui/typography'

const cartStore = useCartStore()

const items = computed(() => cartStore.items)

const updateItemQuantity = (itemId: string, quantity: number) => {
  cartStore.updateQuantity(itemId, quantity)
}

const toggleItemSelect = (itemId: string) => {
  cartStore.toggleItemSelect(itemId)
}
</script>

<template>
  <div class="cart-items">
    <CartItem
      v-if="items.length"
      v-for="item in items"
      :key="item.cartItemId"
      :item="item"
      @update-quantity="updateItemQuantity(item.cartItemId, $event)"
      @toggle-select="toggleItemSelect(item.cartItemId)" />

    <Typography
      v-else
      tag="h5"
      >Упс! В корзине пока что ничего нет</Typography
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

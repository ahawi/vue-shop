<script lang="ts" setup>
import { useCartStore } from '@/entities/cart/model/cart'
import { CartHeader } from '@/widgets/cart-header'
import { CartItems } from '@/widgets/cart-items'
import { storeToRefs } from 'pinia'

const { totalProducts } = storeToRefs(useCartStore())
</script>

<template>
  <div class="cart-step">
    <CartHeader v-if="totalProducts" />
    <CartItems />
  </div>
</template>

<style lang="scss" scoped>
.cart-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 876px;
  width: 100%;
}
</style>

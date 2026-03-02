<script lang="ts" setup>
import { CartHeader } from '@/widgets/cart-header'
import { CartItems } from '@/widgets/cart-items'
</script>

<template>
  <div class="cart-step">
    <CartHeader />
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

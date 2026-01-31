<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { CartHeader } from '@/widgets/cart-header'
import CartItems from '@/widgets/cart-items/ui/CartItems.vue'
</script>

<template>
  <Header />
  <main class="cart">
    <Breadcrumbs />
    <Typography tag="h1" size="xl" bold class="cart__title">Корзина</Typography>
    <div class="cart__main">
      <CartHeader />
      <CartItems />
    </div>
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.cart {
  max-width: 1208px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 80px;

  &__title {
    margin-bottom: 60px;
    margin-top: 24px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>

<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { CartHeader } from '@/widgets/cart-header'
import CartItems from '@/widgets/cart-items/ui/CartItems.vue'
import { useCartStore } from '@/app/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const totalItems = computed(() => {
  return cartStore.totalItems
})
</script>

<template>
  <Header />
  <main class="cart">
    <Breadcrumbs />
    <div class="cart__title">
      <Typography tag="h1" size="xl" bold>Корзина</Typography>
      <div v-if="cartStore.totalItems > 0" class="cart__badge">
        <Typography tag="span" size="s">{{ totalItems.toString() }}</Typography>
      </div>
    </div>
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
    position: relative;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__badge {
    position: absolute;
    top: 0px;
    left: 24%;
    color: var(--main-on-primary);
    background-color: var(--main-primary);
    line-height: 1;
    padding: 4px 8px;
    border-radius: 4px;
  }
}
</style>

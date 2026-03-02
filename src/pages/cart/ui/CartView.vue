<script lang="ts" setup>
import { Typography } from '@/shared/ui/typography'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { useCartStore } from '@/entities/cart/model/cart'
import { computed, ref, watch } from 'vue'
import { CartStep } from '@/widgets/cart-step'
import { DeliveryStep } from '@/widgets/delivery-step'
import { CartSummary } from '@/widgets/cart-summary'

const cartStore = useCartStore()

const totalItems = computed(() => {
  return cartStore.totalItems
})

const currentStep = ref(1)

const STEP_KEY = 'cart_current_step'

const savedStep = localStorage.getItem(STEP_KEY)
if (savedStep) {
  currentStep.value = Number(savedStep)
}

watch(currentStep, (step) => {
  localStorage.setItem(STEP_KEY, String(step))
})

const goToDelivery = () => {
  currentStep.value = 2
}

const deliveryStepRef = ref()

const submitDelivery = () => {
  console.log('submitDelivery вызван', deliveryStepRef.value)
  deliveryStepRef.value?.submit()
}
</script>

<template>
  <Header />
  <main class="cart">
    <Breadcrumbs />
    <div class="cart__title">
      <Typography
        tag="h1"
        size="xl"
        bold
        >{{ currentStep === 1 ? 'Корзина' : 'Доставка' }}</Typography
      >
      <div
        v-if="cartStore.totalItems > 0"
        class="cart__badge">
        <Typography
          tag="span"
          size="s"
          >{{ totalItems.toString() }}</Typography
        >
      </div>
    </div>

    <div class="cart__main">
      <CartStep v-if="currentStep === 1" />
      <DeliveryStep
        v-if="currentStep === 2"
        ref="deliveryStepRef" />
      <CartSummary
        class="cart__main-summary"
        @go-to-delivery="goToDelivery"
        @submit-delivery="submitDelivery"
        :current-step="currentStep" />
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
    display: inline-flex;
    align-items: start;
    gap: 12px;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--main-on-primary);
    background-color: var(--main-primary);
    line-height: 1;
    padding: 4px 8px;
    border-radius: 4px;
  }

  &__main {
    display: flex;
    justify-content: space-between;

    &-summary {
      max-width: 272px;
      width: 100%;
    }
  }
}
</style>

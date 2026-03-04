<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { getBoughtTogether } from '@/features/bought-together'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Section } from '@/shared/ui/section'
import { SwiperProducts } from '@/shared/ui/swiper-products'
import { useCartStore } from '@/entities/cart/model/cart'
import { useNavigate } from '@/shared/lib/useNavigate'

const route = useRoute()
const { addToCart } = useCartStore()
const { goToProduct } = useNavigate()

const currentProduct = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})
</script>

<template>
  <Section
    v-if="currentProduct"
    title="С этим товаром покупают"
    class="section">
    <SwiperProducts
      :products="getBoughtTogether(currentProduct)"
      :slides-per-view="4"
      :space-between="40"
      @click:product="goToProduct"
      @add-to-cart="addToCart" />
  </Section>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  margin-top: 120px;
}
</style>

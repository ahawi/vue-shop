<script lang="ts" setup>
import { useAddToCart } from '@/features/add-to-cart/useAddToCart'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { getBoughtTogether } from '@/shared/lib/utils/bought-together'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Section } from '@/shared/ui'
import SwiperProducts from '@/shared/ui/SwiperProducts.vue'
import type { ProductProps } from '@/entities/product'

const route = useRoute()
const router = useRouter()

const currentProduct = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const goToProductPage = (product: ProductProps) => {
  router.push(`/catalog/${product.categoryIds[0]}/${product.id}`)
}

const addToCart = useAddToCart()
</script>

<template>
  <Section v-if="currentProduct" title="С этим товаром покупают" class="section">
    <SwiperProducts
      :products="getBoughtTogether(currentProduct)"
      :slides-per-view="4"
      :space-between="40"
      @click:product="goToProductPage"
      @add-to-cart="addToCart"
    />
  </Section>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  margin-top: 120px;
}
</style>

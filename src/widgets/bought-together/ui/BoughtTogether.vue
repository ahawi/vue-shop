<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Section } from '@/shared/ui/section'
import { SwiperProducts } from '@/shared/ui/swiper-products'
import { useCartStore } from '@/entities/cart/model/cart'
import { useNavigate } from '@/shared/lib/useNavigate'
import type { ProductProps } from '@/entities/product'
import { productApi } from '@/entities/product/api'

const route = useRoute()
const { addToCart } = useCartStore()
const { goToProduct } = useNavigate()

const products = ref<ProductProps[]>([])

watch(
  () => route.params.id,
  async (id) => {
    products.value = (await productApi.getBoughtTogether(String(id))) ?? []
  },
  { immediate: true }
)
</script>

<template>
  <Section
    v-if="products.length"
    title="С этим товаром покупают"
    class="section">
    <SwiperProducts
      :products="products"
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

<script lang="ts" setup>
import { Section } from '@/shared/ui/section'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { computed } from 'vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { SwiperProducts } from '@/shared/ui/swiper-products'
import type { ProductProps } from '@/entities/product'
import { useCartStore } from '@/entities/cart/model/cart'
import { useNavigate } from '@/shared/lib/useNavigate'

const props = defineProps<{
  title: string
  linkTitle: string
  filterType: 'sale' | 'new' | 'buy-before' | 'none'
}>()

const { addToCart } = useCartStore()
const { goToProduct } = useNavigate()

const filteredType = computed(() => {
  let result: typeof mockProducts

  switch (props.filterType) {
    case 'sale':
      result = mockProducts.filter((product) => product.discount)
      break
    case 'new':
      result = mockProducts.filter((product) => product.rating < 5)
      break
    case 'buy-before':
      result = mockProducts.filter((product) => product.rating > 4.5)
      break
    default:
      result = mockProducts
  }

  return [...result].slice(0, 8)
})

const modules = [Navigation, Pagination, Scrollbar, A11y]
</script>

<template>
  <Section
    v-if="filteredType.length"
    :title="title"
    :link-title="linkTitle"
    class="section">
    <SwiperProducts
      :products="filteredType"
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
}
</style>

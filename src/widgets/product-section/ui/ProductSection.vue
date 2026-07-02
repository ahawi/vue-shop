<script lang="ts" setup>
import { Section } from '@/shared/ui/section'
import { ref, watch } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { SwiperProducts } from '@/shared/ui/swiper-products'
import { useCartStore } from '@/entities/cart/model/cart'
import { useNavigate } from '@/shared/lib/useNavigate'
import type { ProductProps } from '@/entities/product'
import { productApi } from '@/entities/product/api'

const props = defineProps<{
  title: string
  linkTitle: string
  filterType: 'sale' | 'new' | 'buy-before' | 'none'
}>()

const { addToCart } = useCartStore()
const { goToProduct } = useNavigate()

const products = ref<ProductProps[]>([])

watch(
  () => props.filterType,
  async (filterType) => {
    const list = await productApi.getList(
      filterType === 'none' ? undefined : { filter: filterType }
    )
    products.value = (list ?? []).slice(0, 8)
  },
  { immediate: true }
)
</script>

<template>
  <Section
    v-if="products.length"
    :title="title"
    :link-title="linkTitle"
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
}
</style>

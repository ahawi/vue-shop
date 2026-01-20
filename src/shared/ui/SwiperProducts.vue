<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { ProductCard, type ProductProps } from '@/entities/product'

const props = defineProps<{
  products: ProductProps[]
  swiperOptions?: {
    spaceBetween?: number
    slidesPerView?: number
    slidesPerGroup?: number
  }
}>()

const emit = defineEmits<{
  'click:product': [product: ProductProps]
  'add-to-cart': [product: ProductProps]
}>()

const modules = [Navigation, Pagination, Scrollbar, A11y]
</script>

<template>
  <Swiper
    :modules="modules"
    :space-between="swiperOptions?.spaceBetween"
    :slides-per-view="swiperOptions?.slidesPerView"
    :slides-per-group="swiperOptions?.slidesPerGroup"
    :pagination="{ clickable: true }"
    :centered-slides="false"
    class="products-swiper"
  >
    <SwiperSlide v-for="product in products" :key="product.id" class="product-slide">
      <ProductCard
        v-bind="product"
        @click="emit('click:product', product)"
        @add-to-cart="emit('add-to-cart', product)"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.products-swiper {
  width: 100%;
  padding-bottom: 40px;
}

.product-slide {
  height: auto;
  display: flex;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--main-primary);
}
</style>

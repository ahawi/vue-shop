<script lang="ts" setup>
import { Section } from '@/shared/ui'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { ProductCard } from '@/entities/product'
import { computed, watchEffect } from 'vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const props = defineProps<{
  title: string
  linkTitle: string
  filterType: 'sale' | 'new' | 'buy-before' | 'none'
}>()

const filteredType = computed(() => {
  let result: typeof mockProducts

  switch (props.filterType) {
    case 'sale':
      result = mockProducts.filter((product) => product.hasSaleBadge)
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

  return [...result].slice(0, 16)
})

const modules = [Navigation, Pagination, Scrollbar, A11y]
</script>

<template>
  <Section v-if="filteredType.length" :title="title" :link-title="linkTitle" class="section">
    <Swiper
      :modules="modules"
      :space-between="40"
      :slides-per-view="4"
      :slides-per-group="4"
      :speed="700"
      :pagination="{ clickable: true }"
      :centered-slides="false"
      class="products-swiper"
    >
      <SwiperSlide v-for="product in filteredType" :key="product.id" class="product-slide">
        <ProductCard v-bind="product" />
      </SwiperSlide>
    </Swiper>
  </Section>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
}

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

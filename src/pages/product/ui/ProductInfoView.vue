<script lang="ts" setup>
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Typography } from '@/shared/ui/typography'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ProductDetails } from '@/widgets/product-details'
import { BoughtTogether } from '@/widgets/bought-together'
import { ReviewsSection } from '@/widgets/reviews-section'
import { ProductSection } from '@/widgets/product-section'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})
</script>

<template>
  <Breadcrumbs />
  <Typography
    tag="h4"
    bold
    size="s"
    class="title"
    >{{ product?.title }}</Typography
  >
  <ProductDetails />
  <BoughtTogether />
  <ReviewsSection />
  <ProductSection
    title="Акции"
    link-title="Все акции"
    :filter-type="'sale'" />
</template>

<style lang="scss" scoped>
.title {
  margin-block: 24px 16px;
}
</style>

<script lang="ts" setup>
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Typography } from '@/shared/ui'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ProductDetails } from '@/widgets/product-details'
import { BoughtTogether } from '@/widgets/bought-together'
import { ReviewsSection, ReviewsStats } from '@/widgets/reviews-section'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})
</script>

<template>
  <Header />

  <main class="container">
    <Breadcrumbs />
    <Typography tag="h4" bold size="s" class="product__title">{{ product?.title }}</Typography>
    <ProductDetails />
    <BoughtTogether />
    <ReviewsSection />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.container {
  max-width: 1208px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 80px;
}

.product {
  &__title {
    margin-block: 24px 16px;
  }
}
</style>

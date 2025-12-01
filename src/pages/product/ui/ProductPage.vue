<script lang="ts" setup>
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProductGallery } from '@/widgets/product-gallery'
import { ProductInfo } from '@/widgets/product-info'
import { ProductSimilar } from '@/widgets/product-similar'
</script>

<template>
  <Header />

  <main class="container">
    <Breadcrumbs />
    <div class="product__main">
      <ProductGallery />
      <ProductInfo />
      <ProductSimilar />
    </div>
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

.product__main {
  display: flex;
  gap: 40px;
}
</style>

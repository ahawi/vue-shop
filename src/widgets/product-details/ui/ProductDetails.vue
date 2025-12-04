<script lang="ts" setup>
import { ProductGallery } from '@/widgets/product-gallery'
import { ProductInfo } from '@/widgets/product-info'
import { ProductSimilar } from '@/widgets/product-similar'
import { ProductMeta } from '@/widgets/product-meta'
</script>

<template>
  <div class="product-details">
    <ProductMeta />
    <div class="product-details__inner">
      <ProductGallery />
      <ProductInfo />
      <ProductSimilar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-details {
  &__inner {
    display: flex;
    gap: 40px;
  }
}
</style>

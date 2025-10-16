<script setup lang="ts">
import { Header } from '@/widgets/header'
import { ProductSections } from '@/widgets/product-sections'
import { PromoBar } from '@/widgets/promo-bar'
</script>

<template>
  <Header />
  <PromoBar />
  <main class="main">
    <ProductSections />
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-block: 80px;
}
</style>

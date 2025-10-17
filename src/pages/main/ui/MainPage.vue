<script setup lang="ts">
import { Header } from '@/widgets/header'
import { ProductSection } from '@/widgets/product-section'
import { PromoBar } from '@/widgets/promo-bar'
import { SpecialOffers } from '@/widgets/special-offers'
</script>

<template>
  <Header />
  <PromoBar />
  <main class="main">
    <ProductSection id="promotions" />
    <ProductSection id="newProducts" />
    <ProductSection id="buyBefore" />
    <SpecialOffers />
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-block: 80px;
}
</style>

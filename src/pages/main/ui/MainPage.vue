<script setup lang="ts">
import { ProductSection } from '@/widgets/product-section'
import { SpecialOffers } from '@/widgets/special-offers'
import { OurShopsSection } from '@/widgets/our-shops'
import { ArticlesSection } from '@/widgets/articles'
</script>

<template>
  <main class="content">
    <ProductSection
      title="Акции"
      link-title="Все акции"
      :filter-type="'sale'" />
    <ProductSection
      title="Новинки"
      link-title="Все новинки"
      :filter-type="'new'" />
    <ProductSection
      title="Покупали раньше"
      link-title="Все покупки"
      :filter-type="'buy-before'" />
    <SpecialOffers />
    <OurShopsSection />
    <ArticlesSection />
  </main>
</template>

<style lang="scss" scoped>
.content {
  margin-block: 80px;
}
</style>

<script setup lang="ts">
import { Header } from '@/widgets/header'
import { ProductSection } from '@/widgets/product-section'
import { PromoBar } from '@/widgets/promo-bar'
import { SpecialOffers } from '@/widgets/special-offers'
import { OurShopsSections } from '@/widgets/our-shops'
import { ArticlesSection } from '@/widgets/articles'
import { Footer } from '@/widgets/footer'
</script>

<template>
  <Header />
  <PromoBar />
  <main class="main">
    <ProductSection title="Акции" link-title="Все акции" :filter-type="'sale'" />
    <ProductSection title="Новинки" link-title="Все новинки" :filter-type="'new'" />
    <ProductSection title="Покупали раньше" link-title="Все покупки" :filter-type="'buy-before'" />
    <SpecialOffers />
    <OurShopsSections />
    <ArticlesSection />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-block: 80px;
}
</style>

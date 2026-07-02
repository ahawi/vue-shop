<script lang="ts" setup>
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Typography } from '@/shared/ui/typography'
import { ProductDetails } from '@/widgets/product-details'
import { BoughtTogether } from '@/widgets/bought-together'
import { ReviewsSection } from '@/widgets/reviews-section'
import { ProductSection } from '@/widgets/product-section'
import { useProvideProduct } from '@/entities/product/model/current-product'

const product = useProvideProduct()
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

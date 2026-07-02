<script lang="ts" setup>
import { Typography } from '@/shared/ui/typography'
import { CatalogSection } from '@/widgets/catalog-section'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
</script>

<template>
  <Breadcrumbs />
  <Typography
    tag="h1"
    size="xl"
    bold
    class="title"
    >Каталог</Typography
  >
  <CatalogSection />
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 60px;
  margin-top: 24px;
}
</style>

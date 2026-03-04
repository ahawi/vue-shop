<script lang="ts" setup>
import { Typography } from '@/shared/ui/typography'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { FavoriteSection } from '@/widgets/favorite-section'
</script>

<template>
  <Breadcrumbs />
  <Typography
    tag="h1"
    size="xl"
    bold
    class="title"
    >Избранное</Typography
  >
  <FavoriteSection />
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 60px;
  margin-top: 24px;
}
</style>

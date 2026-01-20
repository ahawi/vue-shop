<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { FavoriteSection } from '@/widgets/favorite-section'
</script>

<template>
  <Header />
  <main class="main">
    <Breadcrumbs />
    <Typography tag="h1" size="xl" bold class="main__title">Избранное</Typography>
    <FavoriteSection />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 80px;

  &__title {
    margin-bottom: 60px;
    margin-top: 24px;
  }
}
</style>

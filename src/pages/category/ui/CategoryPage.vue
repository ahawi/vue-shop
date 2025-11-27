<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { mockCategory } from '@/shared/lib/mocks/mock-products'
import { CategorySection } from '@/widgets/category-section'

const route = useRoute()

const currentCategory = computed(() => {
  const currentCategoryId = route.params.category as string
  return mockCategory.find((p) => p.id === currentCategoryId)
})

const categoryTitle = computed(() => currentCategory.value?.title || '')
</script>

<template>
  <Header />
  <main class="main">
    <Breadcrumbs />
    <Typography tag="h1" size="xl" bold class="main__title">{{ categoryTitle }}</Typography>
    <CategorySection />
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

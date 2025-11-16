<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { mockCategories, type Catalog } from '@/shared/lib/mocks/mock-categories'
import { CategorySection } from '@/widgets/category-section'

const route = useRoute()

const currentCategory = computed<Catalog | undefined>(() => {
  const currentCategorySlug = route.params.category as string
  return mockCategories.find((c) => c.slug === currentCategorySlug)
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

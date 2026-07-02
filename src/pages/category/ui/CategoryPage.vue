<script lang="ts" setup>
import { Typography } from '@/shared/ui/typography'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { CategorySection } from '@/widgets/category-section'
import type { Category } from '@/entities/category'
import { categoryApi } from '@/entities/category/api'

const route = useRoute()

const currentCategory = ref<Category | null>(null)

watch(
  () => route.params.category,
  async (category) => {
    currentCategory.value = await categoryApi.getById(String(category))
  },
  { immediate: true }
)

const categoryTitle = computed(() => currentCategory.value?.title || '')
</script>

<template>
  <Breadcrumbs />
  <Typography
    tag="h1"
    size="xl"
    bold
    class="title"
    >{{ categoryTitle }}</Typography
  >
  <CategorySection />
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 60px;
  margin-top: 24px;
}
</style>

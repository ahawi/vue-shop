<script lang="ts" setup>
import { CategoryCard, type Category } from '@/entities/category'
import { categoryApi } from '@/entities/category/api'
import { ref } from 'vue'

const categories = ref<Category[]>([])

const loadCategories = async () => {
  categories.value = (await categoryApi.getList()) ?? []
}

loadCategories()
</script>

<template>
  <div class="categories">
    <CategoryCard
      v-for="category in categories"
      :title="category.title"
      :image="category.image"
      :id="category.id"
      :key="category.id" />
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.categories > :nth-child(1) {
  grid-column: span 2;
}

.categories > :nth-child(10) {
  grid-column: span 2;
}

.categories > :nth-child(12) {
  grid-column: span 2;
}
</style>

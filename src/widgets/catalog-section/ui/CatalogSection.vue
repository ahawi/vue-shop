<script lang="ts" setup>
import { CategoryCard } from '@/entities/category'
import { mockCategory } from '@/shared/lib/mocks/mock-products'
</script>

<template>
  <div class="categories">
    <CategoryCard
      v-for="category in mockCategory"
      :title="category.title"
      :image="category.image"
      :id="category.id"
      :key="category.id"
    />
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
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

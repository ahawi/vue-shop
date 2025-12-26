<script lang="ts" setup>
import { Section } from '@/shared/ui'
import ReviewsStats from './ReviewsStats.vue'
import ReviewsList from './ReviewsList.vue'
</script>

<template>
  <Section title="Отзывы" class="reviews">
    <div class="reviews__details">
      <ReviewsStats />
      <ReviewsList />
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.reviews {
  &__details {
    display: flex;
    align-items: start;
    gap: 144px;
  }
}
</style>

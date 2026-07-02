<script lang="ts" setup>
import { StarRating } from '@/shared/ui/star-rating'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Typography } from '@/shared/ui/typography'
import { reviewApi, type ReviewStats } from '@/entities/review'
import type { ProductProps } from '@/entities/product'
import { productApi } from '@/entities/product/api'

const route = useRoute()

const emptyGrades: ReviewStats['grades'] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
const product = ref<ProductProps | null>(null)
const stats = ref<ReviewStats>({ average: 0, grades: { ...emptyGrades } })
const ratingNumbers = [5, 4, 3, 2, 1] as const

watch(
  () => route.params.id,
  async (id) => {
    product.value = await productApi.getById(String(id))
    stats.value = (await reviewApi.getStats(String(id))) ?? {
      average: 0,
      grades: { ...emptyGrades }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    v-if="product"
    class="review-stats">
    <div class="review-stats__top">
      <StarRating :rating="product.rating" />
      <Typography
        tag="span"
        bold
        size="m"
        >{{ stats.average }} из 5</Typography
      >
    </div>

    <div class="review-stats__grades-columns">
      <div class="review-stats__column">
        <div
          v-for="rating in ratingNumbers"
          :key="`num-${rating}`"
          class="review-stats__cell">
          <Typography
            tag="span"
            size="s"
            >{{ rating }}</Typography
          >
        </div>
      </div>

      <div class="review-stats__column">
        <div
          v-for="rating in ratingNumbers"
          :key="`stars-${rating}`"
          class="review-stats__cell">
          <div class="review-stats__stars">
            <StarRating :rating="rating" />
          </div>
        </div>
      </div>

      <div class="review-stats__column">
        <div
          v-for="rating in ratingNumbers"
          :key="`count-${rating}`"
          class="review-stats__cell">
          <Typography
            tag="span"
            size="s">
            {{ stats.grades[rating] }}
          </Typography>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.review-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: start;

  &__top {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__grades-columns {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;
  }

  &__column {
    display: flex;
    flex-direction: column;

    &:nth-child(even) {
      gap: 16px;
    }

    &:nth-child(odd) {
      gap: 8px;
    }
  }
}
</style>

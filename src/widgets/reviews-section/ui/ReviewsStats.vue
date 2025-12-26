<script lang="ts" setup>
import { StarRating } from '@/shared/ui'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Typography } from '@/shared/ui'
import { mockReviews } from '../mock/mock-reviews'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const getAllGrades = (productId: string) => {
  const productReviews = mockReviews.filter((review) => review.productId === productId)

  const result: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  productReviews.forEach((review) => {
    result[review.rating]++
  })

  return result
}

const getProductRating = (productId: string) => {
  const productReviews = mockReviews.filter((review) => review.productId === productId)

  if (productReviews.length === 0) return 0

  let sum = 0
  productReviews.forEach((review) => {
    sum += review.rating
  })

  return sum / productReviews.length
}

const grades = computed(() => {
  if (!product.value) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  }
  return getAllGrades(product.value.id)
})

const ratingNumbers = [5, 4, 3, 2, 1] as const
</script>

<template>
  <div v-if="product" class="review-stats">
    <div class="review-stats__top">
      <StarRating :rating="product.rating" />
      <Typography tag="span" bold size="m">{{ getProductRating(product.id) }} из 5</Typography>
    </div>

    <div class="review-stats__grades-columns">
      <div class="review-stats__column">
        <div v-for="rating in ratingNumbers" :key="`num-${rating}`" class="review-stats__cell">
          <Typography tag="span" size="s">{{ rating }}</Typography>
        </div>
      </div>

      <div class="review-stats__column">
        <div v-for="rating in ratingNumbers" :key="`stars-${rating}`" class="review-stats__cell">
          <div class="review-stats__stars">
            <StarRating :rating="rating" />
          </div>
        </div>
      </div>

      <div class="review-stats__column">
        <div v-for="rating in ratingNumbers" :key="`count-${rating}`" class="review-stats__cell">
          <Typography tag="span" size="s">
            {{ grades[rating] }}
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

<script lang="ts" setup>
import { Icon, StarRating } from '@/shared/ui'
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Typography } from '@/shared/ui'
import { mockReviews } from '../mock/mock-reviews'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const productReviews = computed(() => {
  return mockReviews.filter((review) => review.productId === product.value?.id)
})
</script>

<template>
  <div class="reviews-list" v-if="productReviews.length > 0">
    <div class="review" v-for="review in productReviews" :key="review.reviewId">
      <div class="review__user">
        <Icon type="review-user" :width="36" :height="36" />
        <Typography tag="span" size="m">{{ review.author }}</Typography>
      </div>
      <div class="review__rating-date">
        <StarRating :rating="review.rating" />
        <Typography tag="span" size="xs">{{ review.date }}</Typography>
      </div>
      <Typography tag="p" size="s">{{ review.message }}</Typography>
    </div>
  </div>
  <div v-else class="reviews-list"><Typography tag="span" size="l">На этот товар еще не оставили отзывы</Typography></div>
</template>

<style lang="scss" scoped>
.reviews-list {
  max-width: 688;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.review {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__user {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__rating-date {
    display: flex;
    gap: 16px;
    color: var(--grayscale-hard);
  }
}
</style>

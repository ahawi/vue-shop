<script lang="ts" setup>
import { Icon } from '@/shared/ui/icon'
import { StarRating } from '@/shared/ui/star-rating'
import { Typography } from '@/shared/ui/typography'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { reviewApi, type Review } from '@/entities/review'

const route = useRoute()

const reviews = ref<Review[]>([])

watch(
  () => route.params.id,
  async (id) => {
    reviews.value = (await reviewApi.getByProduct(String(id))) ?? []
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="reviews-list"
    v-if="reviews.length">
    <div
      class="review"
      v-for="review in reviews"
      :key="review.reviewId">
      <div class="review__user">
        <Icon
          type="review-user"
          :width="36"
          :height="36" />
        <Typography
          tag="span"
          size="m"
          >{{ review.author }}</Typography
        >
      </div>
      <div class="review__rating-date">
        <StarRating :rating="review.rating" />
        <Typography
          tag="span"
          size="xs"
          >{{ review.date }}</Typography
        >
      </div>
      <Typography
        tag="p"
        size="s"
        >{{ review.message }}</Typography
      >
    </div>
  </div>
  <div
    v-else
    class="reviews-list">
    <Typography
      tag="span"
      size="l"
      >На этот товар еще не оставили отзывы</Typography
    >
  </div>
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

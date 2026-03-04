<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { Button } from '@/shared/ui/button'
import { StarRating } from '@/shared/ui/star-rating'
import { Typography } from '@/shared/ui/typography'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToggleFavorite } from '@/features/toggle-favorite'
import { mockReviews } from '@/widgets/reviews-section/mock/mock-reviews'
import { reviewDeclension } from '@/shared/lib/word-declension'
import { ShareLink } from '@/features/share-link'

const route = useRoute()
const { toggleFavoriteItem, isItemFavorite } = useToggleFavorite()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const productReviews = computed(() => {
  return mockReviews.filter((review) => review.productId === product.value?.id)
})

const reviewsText = computed(() => {
  const count = productReviews.value.length
  return `${count} ${reviewDeclension(count)}`
})

const isProductFavorite = computed(() =>
  product.value?.id ? isItemFavorite(product.value.id) : false
)

const onToggleFavorite = () => {
  if (product.value) toggleFavoriteItem(product.value)
}
</script>

<template>
  <div class="product-meta">
    <Typography
      tag="span"
      size="xs"
      class="product-meta__art"
      >арт. 371431</Typography
    >
    <div class="product-meta__rating">
      <StarRating :rating="Number(product?.rating)" />
      <Typography
        tag="span"
        size="xs"
        >{{ reviewsText }}</Typography
      >
    </div>

    <ShareLink />

    <Button
      size="s"
      :leftIcon="{
        type: 'favorite',
        width: 24,
        height: 24,
        fill: 'none'
      }"
      :class="[
        'product-meta__favorite',
        { 'product-meta__favorite-icon--active': isProductFavorite }
      ]"
      @click="onToggleFavorite"
      >{{ isProductFavorite ? 'В избранном' : 'В избранное' }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.product-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;

  &__art {
    color: var(--main-on-surface);
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transition: all 0.3s;
      color: var(--main-secondary);
    }
  }

  &__share,
  &__favorite {
    color: var(--grayscale-hardest);
    padding: 4px 8px;

    &:hover {
      color: var(--main-secondary);
    }

    :deep(.button__text) {
      padding-inline: 6px;
    }
  }

  &__favorite {
    :deep(svg) {
      color: var(--main-on-surface);
      fill: none;
      transition: all 0.3s ease;
    }

    &-icon--active {
      :deep(svg) {
        color: #ed9ba4;
        fill: #ed9ba4;
        stroke: #ed9ba4;
        animation: pop 0.3s ease;
      }
    }
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>

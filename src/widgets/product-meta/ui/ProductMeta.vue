<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { Button, StarRating, Typography } from '@/shared/ui'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToggleFavorite } from '@/features/toggle-favorite/useToggleFavorite'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const { toggleFavorite, isFavorite } = useToggleFavorite()

const localIsFavorite = ref(false)

const isProductFavorite = computed(() => {
  if (!product.value) return false
  const favoriteStatus = isFavorite(product.value.id)
  localIsFavorite.value = favoriteStatus
  return favoriteStatus
})

const onProductToggleFavorite = () => {
  if (!product.value) return

  localIsFavorite.value = !localIsFavorite.value
  toggleFavorite(product.value)
}

const isCopied = ref(false)

const copyShareLink = async () => {
  try {
    const currentUrl = window.location.href
    await navigator.clipboard.writeText(currentUrl)

    isCopied.value = true

    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error(err)
  }
}


</script>

<template>
  <div class="product-meta">
    <Typography tag="span" size="xs" class="product-meta__art">арт. 371431</Typography>
    <div class="product-meta__rating">
      <StarRating :rating="Number(product?.rating)" />
      <Typography tag="span" size="xs">3 отзыва</Typography>
    </div>

    <Button
      size="s"
      :leftIcon="{ type: 'share', width: 24, height: 24, fill: 'none' }"
      class="product-meta__share"
      @click="copyShareLink"
      >{{ isCopied ? 'Скопировано!' : 'Поделиться' }}
    </Button>

    <Button
      size="s"
      :leftIcon="{
        type: 'favorite',
        width: 24,
        height: 24,
        fill: 'none',
      }"
      :class="[
        'product-meta__favorite',
        { 'product-meta__favorite-icon--active': isProductFavorite },
      ]"
      @click="onProductToggleFavorite"
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

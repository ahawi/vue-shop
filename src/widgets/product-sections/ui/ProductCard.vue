<script setup lang="ts">
import { Typography, Button, Icon, StarRating, Badge } from '@/shared/ui'
import type { Product } from '@/shared/lib/types'
import { useCartStore } from '@/app/stores/cart'
import { useFavoriteStore } from '@/app/stores/favorite'
import { computed } from 'vue'

const props = defineProps<Product>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const normalizePrice = () => {
  const priceWithDot = props.price.replace(',', '.')
  return parseFloat(priceWithDot)
}

const addToCart = () => {
  cartStore.addToCart({
    id: props.id,
    title: props.title,
    price: normalizePrice(),
    image: props.image,
  })
}

const isFavorite = computed(() => {
  return favoriteStore.isInFavorites(props.id)
})

const toggleFavorite = () => {
  favoriteStore.toggleFavorite(props)
}
</script>

<template>
  <div class="product-card">
    <div class="product-card__header">
      <Button
        :class="['product-card__favorite', { 'product-card__favorite--active': isFavorite }]"
        @click="toggleFavorite"
      >
        <Icon
          type="favorite"
          :width="24"
          :height="24"
          :fill="isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          :class="[
            'product-card__favorite-icon',
            { 'product-card__favorite-icon--active': isFavorite },
          ]"
        />
      </Button>
      <Badge v-if="props.hasSaleBadge" :title="props.badge" :is-visible="true" />
      <img :src="props.image" alt="" class="product-card__image" />
    </div>

    <div class="product-card__inner">
      <div class="product-card__prices">
        <div class="product-card__price">
          <Typography tag="span" bold size="m">{{ props.price }}</Typography>
          <div v-if="props.cardPrice">
            <Typography class="product-card__price-title" tag="span" size="xs">С картой</Typography>
          </div>
        </div>
        <div v-if="props.cardPrice" class="product-card__price">
          <Typography tag="span" size="s">{{ props.cardPrice }}₽</Typography>
          <Typography class="product-card__price-title" tag="span" size="xs">Обычная</Typography>
        </div>
      </div>
      <Typography tag="p" size="s">{{ props.title }}</Typography>
      <div class="product-card__rating">
        <StarRating :rating="props.rating" />
      </div>
      <Button
        class="product-card__button"
        background-color="secondary"
        decoration="outline"
        size="m"
        :disabled="false"
        @click="addToCart"
        >В корзину</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--main-surface);
  border-radius: 4px;
  width: 100%;
  box-shadow: var(--shadow-default-xs);
  max-width: 272px;
  transition: all 0.3s;

  &:hover {
    box-shadow: var(--shadow-primary-m);
    transition: all 0.3s;
  }
}

.product-card__button {
  &:hover {
    background-color: var(--main-primary);
  }
}

.product-card__header {
  position: relative;
}

.product-card__favorite {
  opacity: 0.5;
  background-color: var(--grayscale-lightest);
  padding: 4px;
  width: 32px;
  border-radius: 4px;
  margin: 8px;
  position: absolute;
  right: 0;

  &--active {
    background-color: transparent;
  }

  &-icon {
    color: var(--main-on-surface);
  }

  &:hover {
    background-color: transparent;
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

.product-card__favorite-icon {
  color: var(--main-on-surface);
  fill: none;
  transition: all 0.3s ease;
}

.product-card__favorite-icon--active {
  color: #ed1944;
  fill: #ed1944;
  stroke: #ed1944;
  animation: pop 0.3s ease;
}

.product-card__favorite-icon--active svg {
  fill: #ed1944;
}

.product-card__inner {
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
}

.product-card__prices {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card__price {
  display: flex;
  flex-direction: column;
}

.product-card__price-title {
  color: var(--grayscale-light);
}
</style>

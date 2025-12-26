<script setup lang="ts">
import { Typography, Button, Icon, StarRating, Badge } from '@/shared/ui'
import type { ProductProps } from '../model/types'
import { useToggleFavorite } from '@/features/toggle-favorite/useToggleFavorite'
import { computed } from 'vue'

const props = defineProps<ProductProps>()
const emit = defineEmits(['add-to-cart', 'toggle-favorite'])

const { toggleFavorite, isFavorite } = useToggleFavorite()

const isProductFavorite = computed(() => isFavorite(props.id))

const onAddToCart = (event: MouseEvent) => {
  event.stopPropagation()
  emit('add-to-cart', props)
}
const onToggleFavorite = (event: MouseEvent) => {
  event.stopPropagation()
  toggleFavorite(props)
}


</script>

<template>
  <div class="product-card">
    <div class="product-card__header">
      <Button
        :class="['product-card__favorite', { 'product-card__favorite--active': isProductFavorite }]"
        @click="onToggleFavorite"
      >
        <Icon
          type="favorite"
          :width="24"
          :height="24"
          :fill="isProductFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          :class="[
            'product-card__favorite-icon',
            { 'product-card__favorite-icon--active': isProductFavorite },
          ]"
        />
      </Button>
      <Badge v-if="hasSaleBadge" :title="badge" :is-visible="true" />
      <div class="product-card__image">
        <img :src="image" :alt="title" />
      </div>
    </div>

    <div class="product-card__inner">
      <div class="product-card__prices">
        <div class="product-card__price">
          <Typography tag="span" bold size="m">{{ price }}</Typography>
          <Typography v-if="cardPrice" class="product-card__price-title" tag="span" size="xs"
            >С картой</Typography
          >
        </div>
        <div v-if="cardPrice" class="product-card__price">
          <Typography tag="span" size="s">{{ cardPrice }}₽</Typography>
          <Typography class="product-card__price-title" tag="span" size="xs">Обычная</Typography>
        </div>
      </div>
      <Typography class="product-card__title" tag="p" size="s">{{ title }}</Typography>
      <div class="product-card__rating">
        <StarRating :rating="rating" />
      </div>
      <Button
        class="product-card__button"
        background-color="secondary"
        decoration="outline"
        size="m"
        :disabled="false"
        @click="onAddToCart"
        >В корзину</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--main-surface);
  border-radius: 4px;
  width: 100%;
  box-shadow: var(--shadow-default-xs);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-primary-m);
    transition: all 0.3s;
  }

  &__button {
    &:hover {
      background-color: var(--main-primary);
    }
  }

  &__header {
    position: relative;
  }

  &__favorite {
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
      fill: none;
      transition: all 0.3s ease;

      &--active {
        color: #ed1944;
        fill: #ed1944;
        stroke: #ed1944;
        animation: pop 0.3s ease;
      }

      &svg {
        fill: #ed1944;
      }
    }

    &:hover {
      background-color: transparent;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    cursor: pointer;
    flex: 1;
  }

  &__image {
    height: 160px;
    width: 100%;

    & > img {
      height: 100%;
      margin: 10px auto;
    }
  }

  &__prices {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    height: 40px;

    &-title {
      color: var(--grayscale-light);
    }
  }

  &__title {
    height: 100%;
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

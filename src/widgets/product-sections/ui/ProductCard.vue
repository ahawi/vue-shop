<script setup lang="ts">
import { Typography, Button, Icon, StarRating, Badge } from '@/shared/ui'
import type { Product } from '@/shared/lib/types'
import { useCartStore } from '@/app/stores/cart'

const props = defineProps<Product>()

const cartStore = useCartStore()

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
</script>

<template>
  <div class="product-card">
    <div class="product-card__header">
      <Button class="product-card__favorite">
        <Icon type="favorite" :width="24" :height="24" class="product-card__favorite-icon" />
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

  &-icon {
    color: var(--main-on-surface);
  }

  &:hover {
    background-color: transparent;
  }
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

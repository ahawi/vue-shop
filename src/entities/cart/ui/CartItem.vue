<script setup lang="ts">
import { Badge } from '@/shared/ui/badge'
import { Checkbox } from '@/shared/ui/checkbox'
import { Typography } from '@/shared/ui/typography'
import { type CartItem } from '@/entities/cart/model/cart'
import { useQuantitySelector } from '@/features/quantity-selector'
import { computed } from 'vue'
import { useNavigate } from '@/shared/lib/useNavigate'
import type { ProductProps } from '@/entities/product'
import { currencyFormatter } from '@/shared/lib/formats'

const { goToProduct } = useNavigate()

interface Props {
  item: CartItem
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update-quantity': [quantity: number]
  'toggle-select': [cartItemId: string]
  'remove-item': []
}>()

const goToProductPage = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  const isCheckbox = target.closest('.checkbox') || target.closest('.cart-item__checkbox')

  const isQuantitySelector = target.closest('.quantity-selector')

  if (isCheckbox || isQuantitySelector) return

  if (props.item.categoryId && props.item.productId) {
    goToProduct({
      id: props.item.productId,
      categoryIds: [props.item.categoryId]
    } as ProductProps)
  }
}

const totalPrice = computed(() => {
  const price = props.item.price ?? props.item.cardPrice
  return Number((price * props.item.quantity).toFixed(2))
})

const totalPriceWithoutCard = computed(() => {
  if (props.item.cardPrice) {
    return Number((props.item.cardPrice * props.item.quantity).toFixed(2))
  }

  return 0.0
})

const shouldShowWithoutCard = computed(() => {
  return props.item.cardPrice
})

const updateQuantity = (quantity: number) => {
  emit('update-quantity', quantity)
}

const toggleSelect = () => {
  emit('toggle-select', props.item.cartProductId)
}
</script>

<template>
  <div
    class="cart-item"
    :class="{ 'cart-item--out-of-stock': !item.inStock }"
    @click="goToProductPage">
    <div class="cart-item__content">
      <Checkbox
        :value="item.selected"
        :disabled="!item.inStock"
        @update:value="toggleSelect"
        class="cart-item__checkbox" />
      <img
        :src="item.image"
        alt=""
        class="cart-item__image" />
      <div class="cart-item__description">
        <Typography
          tag="p"
          size="s"
          >{{ item.title }}</Typography
        >
        <div>
          <div class="cart-item__prices">
            <div
              class="cart-item__price"
              v-if="item.cardPrice">
              <Typography
                tag="span"
                bold
                size="xs"
                >{{ currencyFormatter.format(item.cardPrice) }}</Typography
              >
              <Typography
                tag="span"
                size="xs"
                class="cart-item__price-text"
                >С картой</Typography
              >
            </div>
            <div class="cart-item__price">
              <Typography
                tag="span"
                size="xs"
                >{{ currencyFormatter.format(item.price) }}
              </Typography>
              <Typography
                class="cart-item__price-text"
                tag="span"
                size="xs"
                >Обычная</Typography
              >
            </div>
            <Typography
              tag="span"
              size="xs"
              >за шт</Typography
            >
            <Badge
              v-if="item.discount"
              :title="`-${item.discount}%`"
              :is-visible="true"
              class="cart-item__badge" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="cart-item__actions"
      v-if="item.inStock">
      <useQuantitySelector
        :value="item.quantity"
        :min="0"
        :max="10"
        @change="updateQuantity" />
      <div class="cart-item__total">
        <Typography
          tag="span"
          size="m"
          bold
          >{{ currencyFormatter.format(totalPriceWithoutCard) }}</Typography
        >
        <Typography
          tag="span"
          size="s"
          class="cart-item__total-before-discount"
          v-if="shouldShowWithoutCard"
          >{{ currencyFormatter.format(totalPrice) }}</Typography
        >
      </div>
    </div>

    <div
      v-else
      class="cart-item__out-of-stock">
      <Typography
        tag="span"
        size="xs">
        Нет в наличии
      </Typography>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  background-color: var(--main-surface);
  box-shadow: var(--shadow-default-xs);
  border-radius: 4px;
  display: flex;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 16px;
  width: 100%;

  &:hover {
    box-shadow: var(--shadow-primary-m);
  }

  &__content {
    display: flex;
    flex: 1;
    gap: 8px;
    align-items: center;
    position: relative;
  }

  &__checkbox {
    position: absolute;
    bottom: 90%;
  }

  &__image {
    width: auto;
    max-height: 60px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }

  &__prices {
    display: flex;
    align-items: start;
    gap: 8px;
  }

  &__price {
    display: flex;
    flex-direction: column;

    &-text {
      color: var(--grayscale-light);
    }
  }

  &__badge {
    position: relative;
    margin: 0;
  }

  &__actions {
    display: flex;
    max-width: 250px;
    width: 100%;
    justify-content: space-between;
  }

  &__total {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;

    &-before-discount {
      color: var(--grayscale-hard);
      text-decoration: line-through;
    }
  }

  &__out-of-stock {
    color: var(--main-on-surface);
  }
}
</style>

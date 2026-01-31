<script setup lang="ts">
import { Badge, Checkbox, Typography } from '@/shared/ui'
import type { CartItem } from '@/app/stores/cart'
import QuantitySelector from '@/features/quantity-selector/QuantitySelector.vue'
import { computed } from 'vue'
import router from '@/app/router'

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

  if (props.item.categoryId) {
    router.push(`/catalog/${props.item.categoryId}/${props.item.productId}`)
  }
}

const itemTotal = computed(() => {
  const price = props.item.cardPrice || props.item.price
  return (price * props.item.quantity).toFixed(2)
})

const updateQuantity = (quantity: number) => {
  emit('update-quantity', quantity)
}

const toggleSelect = () => {
  emit('toggle-select', props.item.cartItemId)
}
</script>

<template>
  <div
    class="cart-item"
    :class="{ 'cart-item--out-of-stock': !item.inStock }"
    @click="goToProductPage"
  >
    <div class="cart-item__content">
      <Checkbox
        :value="item.selected"
        :disabled="!item.inStock"
        @update:value="toggleSelect"
        class="cart-item__checkbox"
      />
      <img :src="item.image" alt="" class="cart-item__image" />
      <div class="cart-item__description">
        <Typography tag="p" size="s">{{ item.title }}</Typography>
        <div>
          <div class="cart-item__prices">
            <div class="cart-item__price">
              <Typography tag="span" bold size="xs">{{ item.price }} ₽</Typography>
              <Typography v-if="item.cardPrice" tag="span" size="xs" class="cart-item__price-text"
                >С картой</Typography
              >
            </div>
            <div v-if="item.cardPrice" class="cart-item__price">
              <Typography tag="span" size="xs">{{ item.cardPrice }} ₽</Typography>
              <Typography class="cart-item__price-text" tag="span" size="xs">Обычная</Typography>
            </div>
            <Typography tag="span" size="xs">за шт</Typography>
            <Badge
              v-if="item.discount"
              :title="`-${item.discount}%`"
              :is-visible="true"
              class="cart-item__badge"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="cart-item__actions" v-if="item.inStock">
      <QuantitySelector :value="item.quantity" :min="0" :max="10" @change="updateQuantity" />
      <Typography tag="span" size="m" bold class="cart-item__total">{{ itemTotal }} ₽</Typography>
    </div>

    <div v-else class="cart-item__out-of-stock">
      <Typography tag="span" size="xs"> Нет в наличии </Typography>
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

  &__out-of-stock {
    color: var(--main-on-surface);
  }
}
</style>

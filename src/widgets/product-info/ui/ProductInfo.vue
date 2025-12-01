<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Typography, Button, Icon } from '@/shared/ui'
import { useAddToCart } from '@/features/add-to-cart/useAddToCart'

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const addToCart = useAddToCart()

const handleAddToCart = () => {
  if (!product.value) return
  addToCart(product.value)
}
</script>

<template>
  <div class="product-info">
    <div class="product-info__prices">
      <div v-if="product?.cardPrice" class="product-info__price">
        <Typography tag="span" size="l">{{ product?.cardPrice }} ₽</Typography>
        <Typography class="product-info__price-title" tag="span" size="xs">Обычная цена</Typography>
      </div>
      <div class="product-info__price">
        <Typography tag="h3" bold size="m">{{ product?.price }} ₽</Typography>
        <Typography
          v-if="product?.cardPrice"
          class="product-info__price-title"
          tag="span"
          size="xs"
        >
          {{ product.cardPrice ? 'С картой Северяночки' : 'Обычная цена' }}
          <Icon
            v-if="product.cardPrice"
            type="info"
            :width="24"
            :height="24"
            class="product-info__price-title-icon"
          />
        </Typography>
      </div>
    </div>
    <div class="product-info__actions">
      <Button
        :left-icon="{ type: 'cart', width: 32, height: 32 }"
        size="l"
        background-color="primary"
        class="product-info__actions-button"
        @click="handleAddToCart"
        >В корзину</Button
      >
      <div class="product-info__actions-bonus">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.1883 6.66661H0.811961C0.343143 6.66661 -0.0396916 7.05823 0.0033005 7.52051C0.494639 13.0113 5.67826 17.3333 12.0001 17.3333C18.322 17.3333 23.5056 13.0133 23.997 7.52051C24.0379 7.05823 23.6571 6.66661 23.1883 6.66661Z"
            fill="#70C05B"
          />
        </svg>
        <Typography tag="span" size="xs"
          >Вы получаете <Typography tag="span" size="xs" bold>10 бонусов</Typography>
        </Typography>
      </div>

      <div class="product-info__actions-notify">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2778 3.3842C13.2821 2.21815 10.8173 2.19959 8.80431 3.33546C8.56381 3.47116 8.25884 3.38621 8.12313 3.14572C7.98743 2.90522 8.07238 2.60025 8.31288 2.46454C10.6356 1.15392 13.4796 1.17534 15.7823 2.52079C18.085 3.86623 19.5 6.3333 19.4986 9.00026L18.9986 9H19.4986V9.00026V13C19.4986 13.2761 19.2747 13.5 18.9986 13.5C18.7225 13.5 18.4986 13.2761 18.4986 13V9L18.4986 8.99975C18.4998 6.68838 17.2734 4.55026 15.2778 3.3842ZM6.00937 5.33572C6.25474 5.46239 6.35096 5.764 6.22429 6.00937C5.74707 6.93372 5.49869 7.95911 5.5 8.99937L5.5 9L5.5 14C5.5 14.9793 5.09777 15.8647 4.44949 16.5H17C17.2761 16.5 17.5 16.7239 17.5 17C17.5 17.2761 17.2761 17.5 17 17.5H2C1.72386 17.5 1.5 17.2761 1.5 17C1.5 16.7239 1.72386 16.5 2 16.5C3.38071 16.5 4.5 15.3807 4.5 14V9.00025M10.0191 20.5675C10.258 20.4289 10.5639 20.5103 10.7025 20.7491C10.9708 21.2117 11.4652 21.4965 12 21.4965C12.5348 21.4965 13.0292 21.2117 13.2975 20.7491C13.4361 20.5103 13.742 20.4289 13.9809 20.5675C14.2197 20.7061 14.3011 21.012 14.1625 21.2509C13.7153 22.0219 12.8913 22.4965 12 22.4965C11.1087 22.4965 10.2847 22.0219 9.8375 21.2509C9.69894 21.012 9.78025 20.7061 10.0191 20.5675Z"
            fill="#414141"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L23.3536 22.6464C23.5488 22.8417 23.5488 23.1583 23.3536 23.3536C23.1583 23.5488 22.8417 23.5488 22.6464 23.3536L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
            fill="#414141"
          />
        </svg>
        <Typography tag="span" size="xs">Уведомить о снижении цены</Typography>
      </div>
    </div>

    <table class="product-info__specs">
      <tr>
        <th>
          <Typography tag="span" size="xs">Бренд</Typography>
        </th>
        <td>
          <Typography tag="span" size="xs" bold>{{ product?.brand?.toUpperCase() }}</Typography>
        </td>
      </tr>
      <tr>
        <th>
          <Typography tag="span" size="xs">Страна производителя</Typography>
        </th>
        <td>
          <Typography tag="span" size="xs" bold>Россия</Typography>
        </td>
      </tr>
      <tr>
        <th>
          <Typography tag="span" size="xs">Упаковка</Typography>
        </th>
        <td>
          <Typography tag="span" size="xs" bold>180 г</Typography>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.product-info {
  max-width: 376px;
  width: 100%;

  &__prices {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__price {
    display: flex;
    flex-direction: column;

    &-title {
      color: var(--grayscale-light);
      display: flex;
      align-items: center;
      gap: 8px;

      &-icon {
        color: var(--main-on-surface);
      }
    }
  }

  &__actions {
    max-width: 376px;
    width: 100%;

    &-button {
      width: 100%;
      justify-content: space-between;
      padding: 11px 16px;

      :deep(.button__text) {
        flex: 1;
        font-weight: 300;
      }
    }

    &-bonus {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 19px;
      color: var(--main-secondary);
      padding: 4px 8px;
      margin-block: 8px;
    }

    &-notify {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      gap: 19px;
      color: var(--grayscale-hardest);
    }
  }

  &__specs {
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px;

    th {
      text-align: left;
      padding-inline: 8px;
    }

    td {
      color: var(--main-on-surface);
      text-align: left;
    }

    tr {
      &:nth-child(odd) {
        background-color: var(--grayscale-lightest);
      }
      :nth-child(even) {
        padding-block: 4px;
      }
    }
  }
}
</style>

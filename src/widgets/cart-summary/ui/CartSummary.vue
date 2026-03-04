<script lang="ts" setup>
import { useCartStore } from '@/entities/cart/model/cart'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { storeToRefs } from 'pinia'
import { ref, type Ref } from 'vue'

const {
  items,
  appliedBonus,
  userBonus,
  totalItems,
  subtotal,
  totalPrice,
  maxBonusApplicable
} = storeToRefs(useCartStore())

const useBonus: Ref<number> = ref(0)

const props = defineProps<{
  currentStep: number
}>()

const emit = defineEmits<{
  'go-to-delivery': []
  'submit-delivery': []
}>()

const handleClick = () => {
  if (props.currentStep === 1) {
    emit('go-to-delivery')
  } else {
    emit('submit-delivery')
  }
}
</script>

<template>
  <div
    class="cart-summary"
    v-if="items">
    <div class="cart-summary__bonus-spending">
      <label class="cart-summary__bonus-spending-label">
        <input
          type="checkbox"
          class="cart-summary__bonus-spending-input"
          v-model="useBonus"
          :disabled="maxBonusApplicable <= 0" />
        <Typography
          tag="span"
          size="s"
          class="cart-summary__bonus-spending-inner"
          >Списать {{ maxBonusApplicable.toFixed() }} ₽</Typography
        ></label
      >
      <Typography
        tag="p"
        size="s"
        class="cart-summary__text-gray"
        >На карте накоплено {{ userBonus }} ₽</Typography
      >
    </div>

    <div class="cart-summary__discounts">
      <div class="cart-summary__without-discounts">
        <Typography
          tag="p"
          size="s"
          class="cart-summary__text-gray"
          >{{ totalItems }}</Typography
        >
        <Typography
          tag="p"
          size="s"
          >{{ subtotal.toFixed(2) }} ₽</Typography
        >
      </div>
      <div class="cart-summary__with-discounts">
        <Typography
          tag="p"
          size="s"
          class="cart-summary__text-gray"
          >Скидка</Typography
        >
        <Typography
          tag="p"
          size="s"
          bold
          >{{ totalPrice }} ₽</Typography
        >
      </div>
    </div>

    <div class="cart-summary__total">
      <div class="cart-summary__total-price">
        <Typography
          tag="p"
          size="s"
          class="cart-summary__text-gray"
          >Итог</Typography
        >
        <Typography
          tag="p"
          size="l"
          bold
          >{{ totalPrice }} ₽</Typography
        >
      </div>

      <div
        class="cart-summary__total-bonus"
        v-if="Number(totalPrice) >= 1000">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.1883 6.66661H0.811961C0.343143 6.66661 -0.0396916 7.05823 0.0033005 7.52051C0.494639 13.0113 5.67826 17.3333 12.0001 17.3333C18.322 17.3333 23.5056 13.0133 23.997 7.52051C24.0379 7.05823 23.6571 6.66661 23.1883 6.66661Z"
            fill="#70C05B" />
        </svg>
        <Typography
          tag="span"
          size="xs"
          >Вы получаете
          <Typography
            tag="span"
            size="xs"
            bold
            >{{ appliedBonus }}</Typography
          >
        </Typography>
      </div>
    </div>

    <div class="cart-summary__order">
      <Typography
        tag="p"
        size="xs"
        class="cart-summary__order-notice"
        v-if="Number(totalPrice) < 1000"
        >Минимальная сумма заказа 1000р</Typography
      >
      <Button
        class="cart-summary__order-button"
        background-color="primary"
        size="l"
        :disabled="Number(totalPrice) < 1000"
        @click="handleClick"
        >Оформить заказ</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-summary {
  width: 100%;
  margin-top: 52px;
  max-width: 272px;

  &__bonus-spending,
  &__discounts {
    padding-bottom: 24px;
    border-bottom: 2px solid var(--grayscale-lightest);
    margin-bottom: 24px;
  }

  &__bonus-spending {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;

    &-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      appearance: none;

      &:checked + .cart-summary__bonus-spending-inner::before {
        background-color: var(--main-secondary);
      }

      &:checked + .cart-summary__bonus-spending-inner::after {
        background-color: var(--main-on-secondary);
        left: 24px;
      }
    }

    &-inner {
      display: inline-block;
      position: relative;
      padding-left: 56px;
      user-select: none;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 45px;
        height: 24px;
        background-color: #f8f8f8;
        border-radius: 49px;
        border: 1px solid #e0e0e0;
        transition: background-color 0.2s;
      }

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        background-color: var(--main-on-secondary);
        border-radius: 50%;
        box-shadow:
          0px 2px 6px 0px rgba(0, 0, 0, 0.15),
          0px 1px 1px 0px rgba(0, 0, 0, 0.08),
          0px 0px 0px 0.5px rgba(0, 0, 0, 0.04);
        transition:
          background-color 0.2s,
          left 0.2s;
      }
    }
  }

  &__discounts {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__without-discounts,
  &__with-discounts {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__with-discounts {
    &:last-child {
      color: var(--main-primary);
    }
  }

  &__total {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 24px;

    &-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    &-bonus {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-secondary);
      gap: 8px;
    }
  }

  &__order {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-notice {
      display: flex;
      justify-content: center;
      align-self: center;
      background-color: var(--pallete-error);
      color: var(--main-on-primary);
      padding: 3px 8px;
      border-radius: 4px;
      max-width: 215px;
    }

    &-button {
      background-color: var(--main-primary);
      color: var(--main-on-primary);

      &:hover {
        background-color: var(--primary-muted);
        color: var(--main-primary);
      }

      &:disabled {
        background-color: var(--primary-muted);
        color: var(--main-primary);
      }
    }
  }

  &__text-gray {
    color: var(--grayscale-hard);
  }
}
</style>

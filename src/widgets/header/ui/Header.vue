<script setup lang="ts">
import { useCartStore } from '@/app/stores/cart'
import { useFavoriteStore } from '@/app/stores/favorite'
import { LogoMouthColor, LogoTextColor, LogoVariant, IconColor } from '@/shared/lib/types'
import { Button, Logo, Field, Typography } from '@/shared/ui'
import { ref } from 'vue'

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const products = [
  { id: 'p1', title: 'Телефон' },
  { id: 'p2', title: 'Футболка' },
  { id: 'p3', title: 'Мяч' },
]

const categories = [
  { id: 'c1', title: 'Электроника' },
  { id: 'c2', title: 'Одежда' },
  { id: 'c3', title: 'Игрушки' },
]

const selectedCity = ref('')
</script>

<template>
  <header class="header">
    <div class="header__container">
      <a href="/" class="header__logo">
        <Logo
          :variant="LogoVariant.TEXT"
          :mouth-color="LogoMouthColor.ORANGE"
          :color="LogoTextColor.BLACK"
        />
      </a>
      <div class="header__actions">
        <Button
          :left-icon="{
            type: 'menu',
            textColor: IconColor.BLACK,
            width: 24,
            height: 24,
          }"
          background-color="secondary"
          decoration="outline"
          size="m"
          :disabled="false"
          class="header__actions-button"
          >Каталог</Button
        >

        <Field
          :right-icon="{
            type: 'search',
            textColor: IconColor.BLACK,
            width: 24,
            height: 24,
          }"
          :label="false"
          :disabled="false"
          type="select"
          placeholder="Найти товар"
          size="m"
          class="header__search"
          :options="products"
          :categories="categories"
          v-model="selectedCity"
        ></Field>
      </div>

      <div class="header__controls">
        <Button
          :top-icon="{
            type: 'favorite',
            textColor: IconColor.BLACK,
            fill: 'none',
            width: 24,
            height: 24,
          }"
          class="header__control"
        >
          <div v-if="favoriteStore.totalFavorites > 0" class="header__badge">
            <Typography tag="span" size="xs">{{
              favoriteStore.totalFavorites.toString()
            }}</Typography>
          </div>
          <Typography tag="p" size="xs">Избранное</Typography>
        </Button>
        <Button
          :top-icon="{
            type: 'order',
            textColor: IconColor.BLACK,
            width: 24,
            height: 24,
          }"
          class="header__control"
        >
          <Typography tag="p" size="xs">Заказы</Typography>
        </Button>
        <Button
          :top-icon="{
            type: 'cart',
            textColor: IconColor.BLACK,
            width: 24,
            height: 24,
          }"
          class="header__control"
          ><div v-if="cartStore.totalItems > 0" class="header__badge">
            <Typography tag="span" size="xs">{{ cartStore.totalItems.toString() }}</Typography>
          </div>
          <Typography tag="p" size="xs">Корзина</Typography>
        </Button>
      </div>

      <Button
        class="header__user"
        :left-icon="{ type: 'user' }"
        :right-icon="{
          type: 'arrow-down',
          textColor: IconColor.BLACK,
          width: 24,
          height: 24,
        }"
      >
        <Typography tag="span" size="s">Алексей</Typography></Button
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: var(--main-surface);
  box-shadow: var(--shadow-default-s);
  position: sticky;
  top: 0;
  left: 0;
  height: 72px;
  z-index: 2;

  &__container {
    max-width: 1208px;
    padding: 10px 15px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  &__logo {
    width: 152px;
    height: 32px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex: 1;

    &-button {
      height: 40px;
    }
  }

  &__user-actions {
    display: flex;
    align-items: center;
  }

  &__controls {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 24px;
  }

  &__search {
    flex: 1;
  }

  &__control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 65px;

    &:hover {
      color: var(--main-secondary);
    }
  }

  &__badge {
    position: absolute;
    top: 0;
    right: 3px;
    color: var(--main-on-primary);
    background-color: var(--main-primary);
    line-height: 1;
    padding-inline: 4px;
    border-radius: 4px;
  }

  &__user {
    padding: 0;

    :deep(.button__text) {
      padding-left: 0 !important;
    }

    &:hover {
      color: var(--main-secondary);
    }
  }
}
</style>

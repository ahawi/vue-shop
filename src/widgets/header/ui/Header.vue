<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/cart'
import { useFavoritesStore } from '@/features/favorite/model/favorite'
import { LogoMouthColor, LogoTextColor, LogoVariant, IconColor } from '@/shared/lib/types'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { Typography } from '@/shared/ui/typography'
import { HeaderSearch } from '@/features/search'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CATALOG_LINK } from '@/pages/catalog/config'
import { FAVORITES_LINK } from '@/pages/favorite'
import { ORDERS_LINK } from '@/pages/orders'
import { CART_LINK } from '@/pages/cart'
import { MAIN_LINK } from '@/shared/config'
import { storeToRefs } from 'pinia'

const { totalFavorites } = storeToRefs(useFavoritesStore())
const { totalProducts } = storeToRefs(useCartStore())

const route = useRoute()

const LINKS = {
  main: { to: MAIN_LINK, name: 'Главная' },
  catalog: { to: CATALOG_LINK, name: 'Каталог' },
  favorites: { to: FAVORITES_LINK, name: 'Избранное' },
  orders: { to: ORDERS_LINK, name: 'Заказы' },
  cart: { to: CART_LINK, name: 'Корзина' }
}

const isFavoritesPage = computed(() => route.name === 'favorites')
const isCartPage = computed(() => route.name === 'cart')
const isOrdersPage = computed(() => route.name === 'orders')
</script>

<template>
  <header class="header">
    <div class="header__container">
      <RouterLink :to="LINKS.main.to">
        <Logo
          class="header__logo"
          :variant="LogoVariant.TEXT"
          :mouth-color="LogoMouthColor.ORANGE"
          :color="LogoTextColor.BLACK" />
      </RouterLink>
      <div class="header__actions">
        <RouterLink :to="LINKS.catalog.to">
          <Button
            :left-icon="{
              type: 'menu',
              textColor: IconColor.BLACK,
              width: 24,
              height: 24
            }"
            background-color="secondary"
            decoration="outline"
            size="m"
            :disabled="false"
            class="header__actions-button"
            >{{ LINKS.catalog.name }}</Button
          ></RouterLink
        >

        <div class="header__search">
          <HeaderSearch
            :right-icon="{
              type: 'search',
              textColor: IconColor.BLACK,
              width: 24,
              height: 24
            }"
            placeholder="Найти товар"
            size="m" />
        </div>
      </div>

      <div class="header__controls">
        <RouterLink :to="LINKS.favorites.to">
          <Button
            :top-icon="{
              type: 'favorite',
              textColor: IconColor.BLACK,
              fill: 'none',
              width: 24,
              height: 24
            }"
            :class="['header__control', { 'header__control--active': isFavoritesPage }]">
            <div
              v-if="totalFavorites > 0"
              class="header__badge">
              <Typography
                tag="span"
                size="xs"
                >{{ totalFavorites.toString() }}</Typography
              >
            </div>
            <Typography
              tag="p"
              size="xs"
              >{{ LINKS.favorites.name }}</Typography
            >
          </Button></RouterLink
        >
        <RouterLink :to="LINKS.orders.to">
          <Button
            :top-icon="{
              type: 'order',
              textColor: IconColor.BLACK,
              width: 24,
              height: 24
            }"
            :class="['header__control', { 'header__control--active': isOrdersPage }]">
            <Typography
              tag="p"
              size="xs"
              >{{ LINKS.orders.name }}</Typography
            >
          </Button></RouterLink
        >
        <RouterLink :to="LINKS.cart.to">
          <Button
            :top-icon="{
              type: 'cart',
              textColor: IconColor.BLACK,
              width: 24,
              height: 24
            }"
            :class="['header__control', { 'header__control--active': isCartPage }]"
            ><div
              v-if="totalProducts"
              class="header__badge">
              <Typography
                tag="span"
                size="xs"
                >{{ totalProducts.toString() }}</Typography
              >
            </div>
            <Typography
              tag="p"
              size="xs"
              >{{ LINKS.cart.name }}</Typography
            >
          </Button></RouterLink
        >
      </div>

      <Button
        class="header__user"
        :left-icon="{ type: 'user' }"
        :right-icon="{
          type: 'arrow-down',
          textColor: IconColor.BLACK,
          width: 24,
          height: 24
        }">
        <Typography
          tag="span"
          size="s"
          >Алексей</Typography
        ></Button
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
  z-index: 10;

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

    &:not(.header__control--active):hover {
      color: var(--main-secondary);
    }

    &--active {
      color: var(--main-primary);

      &:hover {
        color: var(--main-primary);
      }
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

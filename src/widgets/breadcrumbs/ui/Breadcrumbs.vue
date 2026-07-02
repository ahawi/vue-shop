<script lang="ts" setup>
import { categoryApi } from '@/entities/category/api'
import { productApi } from '@/entities/product/api'
import { CART_ROUTE } from '@/pages/cart'
import { ORDERS_ROUTE } from '@/pages/orders'
import { Icon } from '@/shared/ui/icon'
import { Typography } from '@/shared/ui/typography'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Breadcrumb {
  to: string
  title: string
}

const route = useRoute()

const categoryTitle = ref('')
const productTitle = ref('')

watch(
  () => route.path,
  async () => {
    const [section, categoryId, productId] = route.path.split('/').slice(1)

    categoryTitle.value =
      section === 'catalog' && categoryId
        ? ((await categoryApi.getById(categoryId))?.title ?? '')
        : ''

    productTitle.value =
      section === 'catalog' && productId ? ((await productApi.getById(productId))?.title ?? '') : ''
  },
  { immediate: true }
)

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const pathArray = route.path.split('/')
  pathArray.shift()

  if (pathArray.length === 0) return []

  const crumbs: Breadcrumb[] = []

  crumbs.push({ to: '/', title: 'Главная' })

  if (pathArray[0] === 'catalog') {
    crumbs.push({ to: '/catalog', title: 'Каталог' })

    if (pathArray[1]) {
      crumbs.push({
        to: `/catalog/${pathArray[1]}`,
        title: categoryTitle.value || pathArray[1]
      })

      if (pathArray[2]) {
        crumbs.push({
          to: route.path,
          title: productTitle.value || pathArray[2]
        })
      }
    }
  } else if (pathArray[0] === 'favorites') {
    crumbs.push({ to: '/favorites', title: 'Избранное' })
  } else if (pathArray[0] === 'cart') {
    crumbs.push({ to: CART_ROUTE.path, title: 'Корзина' })
  } else {
    crumbs.push({ to: ORDERS_ROUTE.path, title: 'Заказы' })
  }

  return crumbs
})
</script>

<template>
  <nav
    v-if="breadcrumbs.length"
    class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
        v-for="(crumb, i) in breadcrumbs"
        :key="i"
        :class="[
          'breadcrumbs__item',
          { 'breadcrumbs__item--active': i === breadcrumbs.length - 1 }
        ]">
        <RouterLink
          v-if="i !== breadcrumbs.length - 1"
          :to="crumb.to">
          <Typography
            tag="span"
            size="xs"
            class="breadcrumbs__link"
            >{{ crumb.title }}</Typography
          >
        </RouterLink>

        <Typography
          tag="span"
          size="xs"
          v-else
          >{{ crumb.title }}</Typography
        >

        <span
          v-if="i !== breadcrumbs.length - 1"
          class="breadcrumbs__separator">
          <Icon
            type="arrow-right"
            :width="24"
            :height="24" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    display: flex;
    align-items: center;

    &--active {
      color: var(--grayscale-hard);
    }

    a,
    span {
      display: flex;
      align-items: center;
    }
  }

  &__link {
    transition: all 0.3s;

    &:hover {
      transition: all 0.3s;
      color: var(--main-secondary);
    }
  }

  &__separator {
    display: flex;
    align-items: center;
    margin-inline: 16px;
  }
}
</style>

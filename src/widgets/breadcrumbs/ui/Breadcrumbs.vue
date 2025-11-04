<script lang="ts" setup>
import { mockCategories } from '@/entities/catalog/mocks/mock-categories'
import { Icon } from '@/shared/ui'
import { Typography } from '@/shared/ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Breadcrumb {
  to: string
  title: string
}

const route = useRoute()

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const pathArray = route.path.split('/')
  pathArray.shift()

  if (pathArray.length === 0) return []

  const crumbs: Breadcrumb[] = []

  crumbs.push({ to: '/', title: 'Главная' })

  if (pathArray[0] === 'catalog') {
    crumbs.push({ to: '/catalog', title: 'Каталог' })

    if (pathArray[1]) {
      const category = mockCategories.find((c) => c.slug === pathArray[1])
      crumbs.push({
        to: `/catalog/${pathArray[1]}`,
        title: category?.title || pathArray[1],
      })
    }
  }

  return crumbs
})
</script>

<template>
  <nav v-if="breadcrumbs.length" class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
        v-for="(crumb, i) in breadcrumbs"
        :key="i"
        :class="[
          'breadcrumbs__item',
          { 'breadcrumbs__item--active': i === breadcrumbs.length - 1 },
        ]"
      >
        <RouterLink v-if="i !== breadcrumbs.length - 1" :to="crumb.to">
          <Typography tag="span" size="xs" class="breadcrumbs__link">{{ crumb.title }}</Typography>
        </RouterLink>

        <Typography tag="span" size="xs" v-else>{{ crumb.title }}</Typography>

        <span v-if="i !== breadcrumbs.length - 1" class="breadcrumbs__separator">
          <Icon type="arrow-right" :width="24" :height="24" />
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

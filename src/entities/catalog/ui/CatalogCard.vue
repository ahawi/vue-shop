<script lang="ts" setup>
import { Typography } from '@/shared/ui'
import type { Catalog } from '../mocks/mock-categories'
import { mockCategories } from '../mocks/mock-categories'

const props = defineProps<Catalog>()
</script>

<template>
  <RouterLink :to="`/catalog/${props.slug}`" class="card">
    <Typography tag="span" size="m" bold class="card__title">{{ props.title }}</Typography>
    <div class="card__gradient"></div>
    <img :src="image" alt="" class="card__image" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  &__gradient {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(112, 192, 91, 0) 0%, rgba(112, 192, 91, 1) 100%);
    transition: opacity 0.4s ease;
  }

  &:hover &__gradient {
    opacity: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 102, 51, 0) 0%, rgba(255, 102, 51, 1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  &__title {
    position: absolute;
    left: 0;
    bottom: 0;
    color: var(--main-on-secondary);
    padding: 10px;
    z-index: 2;
  }

  &__image {
    position: relative;
    border-radius: 4px;
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

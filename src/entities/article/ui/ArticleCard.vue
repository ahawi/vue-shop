<script lang="ts" setup>
import { Typography, Button } from '@/shared/ui'
import type { ArticleCardProps } from '../model/types';

const props = defineProps<ArticleCardProps>()
</script>

<template>
  <div class="article-card">
    <img class="article-card__image" :src="image" :alt="title" />
    <div class="article-card__text">
      <Typography tag="span" size="xs" class="article-card__date">{{ date }}</Typography>
      <Typography tag="h5" size="xs" bold>{{ title }}</Typography
      ><Typography tag="p" size="s" class="article-card__description">{{ description }}</Typography>
      <Button size="m" background-color="secondary" class="article-card__button">Подробнее</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-card {
  background-color: var(--main-surface);
  display: flex;
  flex-direction: column;
  width: 376px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-primary-m);
    transition: all 0.3s;
  }

  &__image {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  &__text {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__description {
    flex: 1;
  }

  &__date {
    color: var(--grayscale-hard);
  }

  &__button {
    background-color: var(--secondary-muted);
    color: var(--main-secondary);

    &:hover {
      background-color: var(--main-secondary);
      color: var(--main-on-secondary);
    }
  }
}
</style>

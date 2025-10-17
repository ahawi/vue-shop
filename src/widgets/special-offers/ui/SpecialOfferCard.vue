<script lang="ts" setup>
import { Typography } from '@/shared/ui'

export interface SpecialOffer {
  id: string
  title: string
  description: string
  image: string
  backgroundColor: string
  hasDecoration: boolean
  hasImageShadow: boolean
}

const props = defineProps<SpecialOffer>()
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    :class="[
      'special-offer__card',
      { 'special-offer__card--decoration': hasDecoration },
      backgroundColor === '#FCD5BA'
        ? 'special-offer__card--shadow-orange'
        : 'special-offer__card--shadow-green',
    ]"
  >
    <div class="special-offer__text">
      <Typography tag="h4" size="s" bold>{{ props.title }}</Typography>
      <Typography tag="p" size="s">{{ props.description }}</Typography>
    </div>
    <img class="special-offer__image" :src="props.image" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.special-offer {
  &__card {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: relative;
    width: 584px;
    padding-inline: 40px;
    transition: box-shadow 0.3s;
    cursor: pointer;
    gap: 15px;

    &:hover {
      box-shadow: 0px 8px 16px 0px rgba(202, 147, 96, 0.5);
      transition: box-shadow 0.3s;
    }
    &--shadow-orange:hover {
      box-shadow: var(--shadow-orange);
    }

    &--shadow-green:hover {
      box-shadow: var(--shadow-green);
    }

    &--decoration {
      background: url('../../../shared/assets/pattern.svg');
      background-position: 14px 8px;
      background-repeat: no-repeat;
    }
  }
  &__text {
    padding-block: 30px 44px;
  }

  &__image {
    border-radius: 12px;
  }
}
</style>

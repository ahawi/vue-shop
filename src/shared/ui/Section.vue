<script setup lang="ts">
import { IconColor } from '@/shared/lib/types'
import { Button, Typography } from '@/shared/ui'

export interface SectionProps {
  title: string
  linkTitle?: string
  display: 'grid' | 'flex'
}

const props = defineProps<SectionProps>()
</script>

<template>
  <div class="section">
    <div class="section__header">
      <Typography tag="h3" bold size="m">{{ props.title }}</Typography>
      <Button
        v-if="props.linkTitle"
        :rightIcon="{ type: 'arrow-left', textColor: IconColor.BLACK, width: 24, height: 24 }"
        :disabled="false"
        background-color="grayscale"
        decoration="none"
        class="section__header-button"
        >{{ props.linkTitle }}
      </Button>
    </div>
    <div :class="[props.display === 'grid' ? 'section__main-grid' : 'section__main-flex']">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  &:not(:first-child) {
    margin-top: 120px;
  }
}

.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section__header-button {
  &:hover {
    background-color: transparent;
    color: var(--main-secondary);
  }
}

.section__main {
  &-grid {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 40px;
  }
  &-flex {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import Typography from './Typography.vue'

interface BadgeProps {
  isVisible?: boolean
  title?: string
  positionLeft?: string
  positionRight?: string
  positionTop?: string
  positionBottom?: string
}

const props = defineProps<BadgeProps>()

const badgePosition = computed(() => ({
  left: props.positionLeft,
  right: props.positionRight,
  top: props.positionTop,
  bottom: props.positionBottom,
}))
</script>

<template>
  <div v-if="isVisible" class="badge" :style="badgePosition">
    <Typography tag="span" size="s">{{ title }}</Typography>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  border-radius: 4px;
  background-color: var(--main-primary);
  padding: 4px 8px;
  color: var(--main-on-primary);
  position: absolute;
  margin: 10px;
}

.position {
  &-top {
  }
}
</style>

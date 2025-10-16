<script setup lang="ts">
import Typography from './Typography.vue'

interface BadgeProps {
  isVisible?: boolean
  title?: string
}

const props = defineProps<BadgeProps>()
</script>

<template>
  <div v-if="props.isVisible" class="badge">
    <Typography tag="span" size="s">{{ props.title }}</Typography>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  border-radius: 4px;
  background-color: var(--main-primary);
  padding: 4px 8px;
  color: var(--main-on-primary);
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 10px;
}
</style>

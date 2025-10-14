<script lang="ts" setup>
import { computed, ref } from 'vue'
import Typography from './Typography.vue'
import Icon, { type IconProps } from './Icon.vue'

interface ButtonProps {
  icon?: IconProps
  backgroundColor?: 'primary' | 'secondary' | 'grayscale' | 'error'
  decoration?: 'default' | 'outline' | 'none'
  size?: 's' | 'm' | 'l'
  disabled: boolean
}

const props = defineProps<ButtonProps>()
const isHovered = ref(false)

const buttonTextSize = () => {
  switch (props.size) {
    case 'l':
      return 'l'
    case 'm':
      return 's'
    case 's':
      return 'xs'
    default:
      return 's'
  }
}
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'button',
      props.backgroundColor || '',
      props.size || '',
      props.disabled ? 'disabled' : '',
      isHovered === false
        ? props.decoration === 'default'
          ? 'outline'
          : 'default'
        : props.decoration || '',
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Icon v-if="props.icon?.position === 'left'" v-bind="props.icon" />
    <Typography tag="p" :size="buttonTextSize()" class="button__text"><slot></slot></Typography>
    <Icon v-if="props.icon?.position === 'right'" v-bind="props.icon" />
  </button>
</template>

<style lang="scss">
@use '@/app/styles/index.scss';
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 8px;
  border-radius: 4px;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  &.disabled {
    cursor: auto;
  }
}

.outline {
  border: 1px solid currentColor;
  background-color: transparent;
}

.button__text {
  padding-inline: 14px;
}

.secondary {
  background-color: var(--main-secondary);
  color: var(--main-on-secondary);

  &.outline {
    border-color: var(--main-secondary);
    color: var(--main-secondary);
    background-color: transparent;
  }

  &.none {
    color: var(--main-secondary);
    border: 1px solid transparent;
    background-color: transparent;
  }

  &.disabled {
    color: var(--main-secondary);
    background-color: var(--secondary-muted);
  }
}

.primary {
  background-color: var(--main-primary);
  color: var(--main-on-primary);

  &.outline {
    border-color: var(--main-primary);
    color: var(--main-primary);
    background-color: transparent;
  }

  &.none {
    color: var(--main-primary);
    border: 1px solid transparent;
    background-color: transparent;
  }

  &.disabled {
    color: var(--main-primary);
    background-color: var(--primary-muted);
  }
}

.grayscale {
  background-color: var(--grayscale-lightest);
  color: var(--grayscale-hardest);

  &.outline {
    border-color: var(--grayscale-hardest);
    color: var(--grayscale-hardest);
    background-color: transparent;
  }

  &.none {
    color: var(--grayscale-hardest);
    border: 1px solid transparent;
    background-color: transparent;
  }

  &.disabled {
    color: var(--grayscale-light);
    background-color: var(--main-surface);
  }
}

.error {
  background-color: var(--pallete-error);
  color: var(--pallete-on-error);

  &.outline {
    border-color: var(--pallete-error);
    color: var(--pallete-error);
    background-color: transparent;
  }

  &.none {
    border: 1px solid transparent;
    color: var(--pallete-error);
    background-color: transparent;
  }

  &.disabled {
    color: var(--pallete-error);
    background-color: var(--error-muted);
  }
}

.default {
  border: 1px solid transparent;
}
</style>

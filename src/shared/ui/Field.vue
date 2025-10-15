<script setup lang="ts">
import type { IconProps } from './Icon.vue'
import Icon from './Icon.vue'
import Typography from './Typography.vue'

interface FieldProps {
  size: 'm' | 'l'
  leftIcon?: IconProps
  rightIcon?: IconProps
  label?: boolean
  disabled?: boolean
  placeholder?: string
}

const props = defineProps<FieldProps>()
</script>

<template>
  <div class="field">
    <label v-if="props.label" for="input" class="field__label"
      ><Typography :size="props.size" tag="p"><slot></slot></Typography
    ></label>
    <Icon v-if="props.leftIcon" v-bind="props.leftIcon" class="field__icon" />
    <input
      :class="`size--${props.size}`"
      :placeholder="props.placeholder"
      type="text"
      class="field__input"
      id="input"
      :disabled="props.disabled"
      autocomplete="off"
    />
    <Icon v-if="props.rightIcon" v-bind="props.rightIcon" class="field__icon" />
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  position: relative;

  &__label {
    color: var(--grayscale-hard);
  }

  &__input {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid var(--main-secondary);
    border-radius: 4px;
    font-size: 16px;
    transition: box-shadow 0.3s;

    &::placeholder {
      color: var(--grayscale-hard);
      font-family: inherit;
    }

    &.size--m {
      height: 40px;

      &::placeholder {
        font-size: 16px;
      }
    }

    &.size--l {
      height: 60px;

      &::placeholder {
        font-size: 24px;
      }
    }

    &__icon {
      opacity: 1;
      transition: opacity 0.3s;
    }

    &:focus {
      outline: none;
      caret-color: var(--main-secondary);
      border-color: var(--main-secondary);
      box-shadow: var(--shadow-secondary-m);
      transition: box-shadow 0.3s;

      & + .field__icon {
        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    &:disabled {
      background: var(--grayscale-lightest);
      color: var(--grayscale-light);

      &::placeholder {
        color: var(--grayscale-light);
      }
    }
  }
}
</style>

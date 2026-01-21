<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IconProps } from './Icon.vue'
import Icon from './Icon.vue'
import Typography from './Typography.vue'

interface OptionProps {
  id: string
  title: string
  isCategory?: boolean
}

interface FieldProps {
  type?: 'text' | 'select' | 'number'
  size: 'm' | 'l'
  leftIcon?: IconProps
  rightIcon?: IconProps
  label?: boolean
  disabled?: boolean
  placeholder?: string
  options?: OptionProps[]
  categories?: OptionProps[]
  modelValue?: string | number
  min?: number
  max?: number
}

const props = defineProps<FieldProps>()
const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue || '')

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  inputValue.value = value
  emit('update:modelValue', value)
}

const handleNumberChange = (event: Event) => {
  if (props.type !== 'number') return

  const target = event.target as HTMLInputElement
  const value = Number(target.value)

  if (!isNaN(value)) {
    let constrainedVal = value
    const minValue = props.min !== undefined ? props.min : 0

    if (value < minValue) constrainedVal = minValue
    if (props.max !== undefined && value > props.max) constrainedVal = props.max

    if (constrainedVal !== value) {
      target.value = constrainedVal.toString()
      inputValue.value = constrainedVal
    }

    emit('update:modelValue', constrainedVal)
  }
}

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value !== undefined ? value : ''
  },
  { immediate: true },
)
</script>

<template>
  <div class="field">
    <label v-if="label" for="input" class="field__label"
      ><Typography :size="size" tag="p"><slot></slot></Typography
    ></label>
    <Icon v-if="leftIcon" v-bind="leftIcon" class="field__icon" />

    <input
      v-if="type === 'text'"
      :class="['field__input', `size--${size}`]"
      :placeholder="placeholder"
      type="text"
      id="input"
      :disabled="disabled"
      autocomplete="off"
    />

    <input
      v-if="type === 'number'"
      :class="['field__input', `size--${size}`]"
      :placeholder="placeholder"
      type="number"
      id="input"
      :disabled="disabled"
      autocomplete="off"
      :min="min"
      :max="max"
      v-model.number="inputValue"
      @change="handleNumberChange"
    />

    <Icon v-if="rightIcon" v-bind="rightIcon" class="field__icon" />
  </div>
</template>

<style lang="scss">
.field {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  height: 40px;

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
    appearance: none;
    cursor: pointer;

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

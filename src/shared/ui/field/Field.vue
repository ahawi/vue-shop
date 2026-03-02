<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { IconProps } from '../icon'
import { Icon } from '../icon'
import { Typography } from '../typography'

interface OptionProps {
  id: string
  title: string
}

interface FieldProps {
  type?: 'text' | 'select' | 'number' | 'tel'
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
  maxWidth?: number
}

const props = defineProps<FieldProps>()
const emit = defineEmits(['update:modelValue', 'open-change'])

const inputValue = ref(props.modelValue || '')
const isOpen = ref(false)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  if (props.type === 'tel') {
    value = value.replace(/[^\d]/g, '')

    if (value.startsWith('8')) {
      value = '7' + value.slice(1)
    }

    if (!value.startsWith('7')) {
      value = '7' + value
    }

    value = '+' + value.slice(0, 11)
  }

  inputValue.value = value
  emit('update:modelValue', value)
}

const handleCloseSelect = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.field__select-wrapper')) {
    isOpen.value = false
  }
}

const handleSelectClick = () => {
  if (!props.disabled && props.type === 'select') {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (option: OptionProps) => {
  inputValue.value = option.id
  emit('update:modelValue', option.id)
  isOpen.value = false
}

const selectedOptionTitle = computed(() => {
  if (!inputValue.value && props.placeholder) return props.placeholder || ''

  if (props.options && inputValue.value) {
    const selected = props.options.find((option) => option.id === inputValue.value)
    return selected ? selected.title : props.placeholder
  }
})

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value !== undefined ? value : ''
  },
  { immediate: true },
)

watch(isOpen, (value) => {
  emit('open-change', value)

  if (value) {
    document.addEventListener('click', handleCloseSelect)
  } else {
    document.removeEventListener('click', handleCloseSelect)
  }
})
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
      v-model="inputValue"
      @input="handleInput"
    />

    <input
      v-if="type === 'number' || type === 'tel'"
      :class="['field__input', `size--${size}`]"
      :placeholder="placeholder"
      :type="type"
      id="input"
      :disabled="disabled"
      autocomplete="off"
      :inputmode="type === 'tel' ? 'tel' : undefined"
      v-model="inputValue"
      @input="handleInput"
    />

    <div v-if="type === 'select'" class="field__select-wrapper">
      <div class="field__select" @click.stop="handleSelectClick">
        <input
          class="field__select-input"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="selectedOptionTitle"
          autocomplete="off"
          readonly
        />
      </div>

      <transition name="dropdown-fade">
        <ul v-if="isOpen" class="field__select-dropdown">
          <li
            v-for="option in options"
            :key="option.id"
            @click="selectOption(option)"
            class="field__select-dropdown-option"
          >
            {{ option.title }}
          </li>
        </ul></transition
      >
    </div>

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
  width: 100%;
  max-width: v-bind('maxWidth ? maxWidth + "px" : "100%"');

  &__label {
    color: var(--grayscale-hard);
  }

  &__input {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid var(--grayscale-light);
    border-radius: 4px;
    font-size: 16px;
    transition: box-shadow 0.3s;
    appearance: none;
    cursor: auto;

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
    &:hover {
      border-color: var(--main-secondary);
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

  &__select {
    position: relative;
    display: flex;
    align-items: center;

    &-input {
      width: 100%;
      height: 40px;
      padding: 8px 16px;
      border: 1px solid var(--grayscale-light);
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      transition: box-shadow 0.3s;
      background: var(--main-surface);
      cursor: auto;

      &:focus {
        border-color: var(--main-secondary);
        box-shadow: var(--shadow-secondary-m);
        transition: box-shadow 0.3s;
      }

      &:disabled {
        background: var(--grayscale-lightest);
        color: var(--grayscale-light);
      }
    }

    &-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--main-surface);
      border: 1px solid var(--main-secondary);
      border-radius: 8px;
      box-shadow: var(--shadow-default-m);
      z-index: 1000;
      max-height: 400px;
      overflow-y: auto;

      &-option {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        border-bottom: 1px solid var(--grayscale-lightest);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: var(--primary-muted);
          color: var(--main-primary);
        }
      }
    }
  }

  &__icon {
    pointer-events: none;
  }

  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: all 0.2s ease;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>

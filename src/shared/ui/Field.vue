<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

const search = ref('')
const inputValue = ref(props.modelValue || '')
const showDropdown = ref(false)
const selectedOption = ref<OptionProps | null>(null)

const filteredOptions = computed(() => {
  if (!search.value) return props.options || []

  const searchToLowerCase = search.value.toLowerCase()

  const matchedCategory = props.categories?.find((category) =>
    category.title.toLowerCase().includes(searchToLowerCase),
  )

  const matchedProducts =
    props.options?.filter((product) => product.title.toLowerCase().includes(searchToLowerCase)) ||
    []

  if (matchedCategory) {
    return [{ ...matchedCategory, isCategory: true }, ...matchedProducts]
  }

  return matchedProducts
})

const selectOption = (option: OptionProps) => {
  selectedOption.value = option
  search.value = option.title
  showDropdown.value = false
  emit('update:modelValue', option.id)
}

const handleCloseSelect = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.field')) showDropdown.value = false
}

const highlightMatch = (text: string) => {
  if (!search.value) return text
  const regex = new RegExp(`(${search.value.replace(/^Категория: /, '')})`, 'gi')
  return text.replace(regex, '<span class="field__select-options--bold">$1</span>')
}

const handleNumberInput = (value: number) => {
  const numValue = Number(value)
  if (isNaN(numValue)) return

  let constrainedVal = numValue
  const minValue = props.min !== undefined ? props.min : 0

  if (numValue < minValue) constrainedVal = minValue
  if (props.max !== undefined && numValue > props.max) constrainedVal = props.max

  if (constrainedVal !== numValue) {
    inputValue.value = constrainedVal
  } else {
    emit('update:modelValue', constrainedVal)
  }
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
      emit('update:modelValue', constrainedVal)
    }
  }
}

watch(showDropdown, (value) => {
  if (value) {
    document.addEventListener('click', handleCloseSelect)
  } else {
    document.removeEventListener('click', handleCloseSelect)
  }
})

watch(search, (val) => {
  if (props.type !== 'number') emit('update:modelValue', val)
})

watch(
  () => props.modelValue,
  (value) => {
    const type = props.type
    if (type === 'number') {
      inputValue.value = value !== undefined ? Number(value) : 0
    } else {
      inputValue.value = value !== undefined ? String(value) : ''
      search.value = value !== undefined ? String(value) : ''
    }
  },
  { immediate: true },
)

watch(inputValue, (value) => {
  const type = props.type
  if (type === 'number') {
    handleNumberInput(Number(value))
  } else {
    emit('update:modelValue', value)
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
      v-model="search"
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

    <div v-else>
      <input
        :class="`field__select size--${props.size}`"
        id="input"
        :disabled="disabled"
        v-model="search"
        @focus="showDropdown = true"
        autocomplete="off"
      />
      <transition name="dropdown-fade">
        <ul v-if="showDropdown" class="field__select-options">
          <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
            <Typography
              tag="span"
              size="s"
              :class="option.isCategory ? 'field__select-options--icon' : ''"
            >
              <span v-html="highlightMatch(option.title)"></span>
              <template v-if="option.isCategory">
                <Icon v-if="option.isCategory" type="menu" :width="24" :height="24" />
              </template>
            </Typography>
          </li>
          <li v-if="filteredOptions?.length === 0">Ничего не найдено</li>
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

  &__select {
    height: 40px;
    width: 100%;
    padding: 8px 16px;
    border: 1px solid var(--main-secondary);
    border-radius: 4px;
    font-size: 16px;
    transition: box-shadow 0.3s;
    appearance: none;
    cursor: pointer;

    &:focus {
      border-bottom: none;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      outline: none;
      caret-color: var(--main-secondary);
      border-color: var(--main-secondary);
      box-shadow: var(--shadow-secondary-m);
      transition: box-shadow 0.3s;
    }

    &-options {
      position: absolute;
      background-color: var(--main-surface);
      width: 100%;
      border: 1px solid var(--main-secondary);
      border-top: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px 16px 8px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: var(--shadow-secondary-m);
      transition: all 0.3s;

      &--bold {
        font-weight: 600;
      }

      &--icon {
        display: flex;
        gap: 16px;
      }
    }
  }
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
</style>

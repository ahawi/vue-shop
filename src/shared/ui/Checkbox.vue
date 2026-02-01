<script lang="ts" setup>
import { Typography } from '.'

interface CheckboxProps {
  size?: 's' | 'm' | 'l' | 'xl'
  disabled?: boolean
  value: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'l',
  disabled: false,
  value: false,
})

const emit = defineEmits<{
  'update:value': [value: boolean]
}>()

const handleChange = (event: Event) => {
  if (props.disabled) return

  const target = event.target as HTMLInputElement
  emit('update:value', target.checked)
}
</script>

<template>
  <div class="checkbox">
    <label class="checkbox__label" :size="size">
      <input
        :class="[
          'checkbox__input',
          `checkbox__input--${size}`,
          {
            'checkbox__input--disabled': disabled,
          },
        ]"
        type="checkbox"
        :disabled="disabled"
        :checked="value"
        @change="handleChange"
      />
      <Typography tag="p" size="xs"><slot></slot></Typography>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  &__label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--grayscale-hardest);
    user-select: none;
    cursor: pointer;
  }

  &__input {
    appearance: none;
    position: relative;
    background: var(--main-surface);
    border-radius: 4px;
    border: 1px solid var(--grayscale-lightest);
    cursor: pointer;
    transition: all 0.2s ease;

    &--disabled {
      background-color: var(--grayscale-lightest);
      border-color: var(--grayscale-light);
      cursor: auto;
    }

    &:checked {
      background: var(--main-secondary);

      &::after {
        content: '';
        position: absolute;
        display: block;
      }
    }

    &--xl {
      width: 32px;
      height: 32px;

      &:checked::after {
        background-image: url("data:image/svg+xml,%3Csvg width='17' height='12' viewBox='0 0 17 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.8536 0.146447C17.0488 0.341709 17.0488 0.658291 16.8536 0.853553L5.85355 11.8536C5.65829 12.0488 5.34171 12.0488 5.14645 11.8536L0.146447 6.85355C-0.0488155 6.65829 -0.0488155 6.34171 0.146447 6.14645C0.341709 5.95118 0.658291 5.95118 0.853553 6.14645L5.5 10.7929L16.1464 0.146447C16.3417 -0.0488155 16.6583 -0.0488155 16.8536 0.146447Z' fill='white'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        left: 7px;
        top: 9px;
        width: 17px;
        height: 12px;
      }
    }

    &--l {
      width: 24px;
      height: 24px;

      &:checked::after {
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.2357 0.0976311C11.3659 0.227806 11.3659 0.438861 11.2357 0.569036L3.90237 7.90237C3.77219 8.03254 3.56114 8.03254 3.43096 7.90237L0.0976311 4.56904C-0.0325437 4.43886 -0.0325437 4.22781 0.0976311 4.09763C0.227806 3.96746 0.438861 3.96746 0.569036 4.09763L3.66667 7.19526L10.7643 0.0976311C10.8945 -0.0325437 11.1055 -0.0325437 11.2357 0.0976311Z' fill='white'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        left: 5px;
        top: 7px;
        width: 12px;
        height: 18px;
      }
    }

    &--m {
      width: 20px;
      height: 20px;

      &:checked::after {
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.83124 0.0854272C9.94514 0.19933 9.94514 0.384003 9.83124 0.497906L3.41457 6.91457C3.30067 7.02848 3.116 7.02848 3.00209 6.91457L0.0854272 3.99791C-0.0284757 3.884 -0.0284757 3.69933 0.0854272 3.58543C0.19933 3.47152 0.384003 3.47152 0.497906 3.58543L3.20833 6.29585L9.41876 0.0854272C9.53266 -0.0284757 9.71734 -0.0284757 9.83124 0.0854272Z' fill='white'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        left: 5px;
        top: 5px;
        width: 9px;
        height: 7px;
      }
    }

    &--s {
      width: 16px;
      height: 16px;

      &:checked::after {
        background-image: url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.02231 0.0610194C7.10367 0.142379 7.10367 0.274288 7.02231 0.355647L2.43898 4.93898C2.35762 5.02034 2.22571 5.02034 2.14435 4.93898L0.0610194 2.85565C-0.0203398 2.77429 -0.0203398 2.64238 0.0610194 2.56102C0.142379 2.47966 0.274288 2.47966 0.355647 2.56102L2.29167 4.49704L6.72769 0.0610194C6.80905 -0.0203398 6.94095 -0.0203398 7.02231 0.0610194Z' fill='white'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        left: 4px;
        top: 4px;
        width: 7px;
        height: 5px;
      }
    }
  }
}
</style>

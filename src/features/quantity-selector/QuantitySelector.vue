<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

interface Props {
  value: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 10
})

const emit = defineEmits<{
  change: [value: number]
  'update:value': [value: number]
}>()

const internalValue = ref(props.value)

const increase = () => {
  const newValue = Math.min(props.max, internalValue.value + 1)
  updateValue(newValue)
}

const decrease = () => {
  const newValue = Math.max(props.min, internalValue.value - 1)

  updateValue(newValue)
}

const updateValue = (newValue: number) => {
  internalValue.value = newValue
  emit('change', newValue)
  emit('update:value', newValue)
}

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue
  }
)
</script>

<template>
  <div class="quantity-selector">
    <Button
      background-color="secondary"
      size="m"
      class="quantity-selector__button"
      @click="decrease"
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 12C4.5 11.7239 4.72386 11.5 5 11.5H19C19.2761 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.2761 12.5 19 12.5H5C4.72386 12.5 4.5 12.2761 4.5 12Z"
          fill="white" />
      </svg>
    </Button>
    <Typography
      tag="p"
      size="s"
      class="quantity-selector__total"
      >{{ internalValue }}</Typography
    >
    <Button
      background-color="secondary"
      size="m"
      class="quantity-selector__button"
      @click="increase"
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 4.5C12.2761 4.5 12.5 4.72386 12.5 5V19C12.5 19.2761 12.2761 19.5 12 19.5C11.7239 19.5 11.5 19.2761 11.5 19V5C11.5 4.72386 11.7239 4.5 12 4.5Z"
          fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 12C4.5 11.7239 4.72386 11.5 5 11.5H19C19.2761 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.2761 12.5 19 12.5H5C4.72386 12.5 4.5 12.2761 4.5 12Z"
          fill="white" />
      </svg>
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.quantity-selector {
  background-color: var(--main-secondary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 40px;
  max-width: 105px;
  width: 100%;

  &__total {
    color: var(--main-on-secondary);
    padding-inline: 1px;
  }

  &__button {
    height: 100%;
    padding: 0;

    &:deep(.button__text) {
      padding-inline: 8px;
    }

    svg {
      display: flex;
    }

    &:hover {
      background-color: var(--main-on-secondary);
      color: var(--main-secondary);
      border-color: var(--main-secondary);
      fill: var(--main-secondary);
      stroke: var(--main-secondary);
    }
  }
}
</style>

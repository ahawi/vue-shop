<script lang="ts" setup>
import { Button, Typography, Field } from '@/shared/ui'
import { computed, ref, watch } from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

interface RangeSliderProps {
  modelValue: [number, number]
  max: number
  min: number
}

const props = defineProps<RangeSliderProps>()
const emit = defineEmits(['update:modelValue'])

const range = computed({
  get: () => props.modelValue,
  set: (val: [number, number]) => {
    emit('update:modelValue', val)
  },
})

const minInput = ref(props.modelValue[0])
const maxInput = ref(props.modelValue[1])

watch(
  () => props.modelValue,
  (newVal) => {
    minInput.value = newVal[0]
    maxInput.value = newVal[1]
  },
  { immediate: true },
)

const updateMinValue = (value: number) => {
  const numVal = Number(value)
  if (isNaN(numVal)) return

  let constrainedMin = Math.max(props.min, Math.min(numVal, props.max))

  if (constrainedMin >= maxInput.value) {
    constrainedMin = maxInput.value - 1
  }

  if (constrainedMin !== props.modelValue[0]) {
    emit('update:modelValue', [constrainedMin, props.modelValue[1]])
  }
}

const updateMaxValue = (value: number) => {
  const numVal = Number(value)
  if (isNaN(numVal)) return

  let constrainedMax = Math.max(props.min, Math.min(numVal, props.max))

  if (constrainedMax <= minInput.value) {
    constrainedMax = minInput.value + 1
  }

  if (constrainedMax !== props.modelValue[1]) {
    emit('update:modelValue', [props.modelValue[0], constrainedMax])
  }
}

const clearRange = () => {
  emit('update:modelValue', [props.min, props.max])
}
</script>

<template>
  <div class="filter">
    <Typography tag="span" size="s" bold class="filter__title">Фильтр</Typography>
    <div class="filter__price">
      <div class="filter__price-top">
        <Typography tag="span" size="s" class="filter__price-title">Цена</Typography>
        <Button
          backgroundColor="grayscale"
          size="s"
          class="filter__clear-button"
          @click="clearRange"
          >Очистить</Button
        >
      </div>
      <div class="filter__fields">
        <Field
          size="m"
          type="number"
          placeholder="1"
          class="filter__field"
          :modelValue="minInput"
          @update:modelValue="updateMinValue"
          :min="min"
          :max="max"
        />
        <span></span>
        <Field
          size="m"
          type="number"
          placeholder="100"
          class="filter__field"
          :modelValue="maxInput"
          @update:modelValue="updateMaxValue"
          :min="min"
          :max="max"
        />
      </div>
      <vue-slider
        v-model="range"
        :min="min"
        :max="max"
        :contained="true"
        :dot-size="22"
        :dot-style="{
          backgroundColor: '#70C05B',
          border: '1px solid #FFFFFF',
          boxShadow: '2px 4px 8px 0px rgba(112, 192, 91, 0.2)',
        }"
        :height="5"
        :enable-cross="false"
        :process-style="{ backgroundColor: '#70C05B' }"
        :rail-style="{ backgroundColor: '#F3F2F1' }"
        :tooltip="'none'"
        :min-range="30"
        range
        class="filter__range-slider"
      />
    </div>
    <ul class="filter__products">
      <li class="filter__product">
        <Typography tag="span" size="s">Молоко</Typography>
      </li>
      <li class="filter__product">
        <Typography tag="span" size="s">Сливки</Typography>
      </li>
      <li class="filter__product">
        <Typography tag="span" size="s">Яйцо</Typography>
      </li>
    </ul>
    <div class="filter__in-stock">
      <label class="filter__in-stock-label" for="checkbox">
        <input type="checkbox" class="filter__in-stock-input" id="checkbox" />
        <Typography tag="span" size="s" class="filter__in-stock-inner">В наличии</Typography></label
      >
    </div>
    <Button backgroundColor="primary" size="m" class="filter__apply-button">Применить</Button>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__title {
    padding: 10px;
    background-color: var(--grayscale-lightest);
    border-radius: 4px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 13px;

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      display: flex;
    }
  }

  &__clear-button {
    &:hover {
      background-color: var(--main-secondary);
      color: var(--main-on-secondary);
    }

    &:active {
      background-color: var(--pallete-success);
      color: var(--main-on-secondary);
    }
  }

  &__fields {
    display: flex;
    align-items: center;
    gap: 4.5px;

    span {
      width: 15px;
      border-radius: 50%;
      height: 1px;
      background-color: var(--main-on-surface);
    }
  }

  &__field {
    max-width: 124px;
    width: 100%;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__in-stock {
    display: inline-block;

    &-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      appearance: none;

      &:checked + .filter__in-stock-inner::before {
        background-color: var(--main-secondary);
      }

      &:checked + .filter__in-stock-inner::after {
        background-color: var(--main-on-secondary);
        left: 24px;
      }
    }

    &-inner {
      display: inline-block;
      position: relative;
      padding-left: 56px;
      user-select: none;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 45px;
        height: 24px;
        background-color: #f8f8f8;
        border-radius: 49px;
        border: 1px solid #e0e0e0;
        transition: background-color 0.2s;
      }

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        background-color: var(--main-on-secondary);
        border-radius: 50%;
        box-shadow:
          0px 2px 6px 0px rgba(0, 0, 0, 0.15),
          0px 1px 1px 0px rgba(0, 0, 0, 0.08),
          0px 0px 0px 0.5px rgba(0, 0, 0, 0.04);
        transition:
          background-color 0.2s,
          left 0.2s;
      }
    }
  }

  &__apply-button {
    &:hover {
      background-color: var(--main-secondary);
      color: var(--main-on-secondary);
    }
    &:active {
      background-color: var(--pallete-success);
      color: var(--main-on-secondary);
    }
  }
}
</style>

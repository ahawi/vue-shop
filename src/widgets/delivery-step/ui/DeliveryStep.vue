<script lang="ts" setup>
import { IconColor } from '@/shared/lib/types'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Typography } from '@/shared/ui/typography'
import { Icon } from '@/shared/ui/icon'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'
import { computed, ref, reactive, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { isSameDay } from '../lib/date'
import { availableCity, timeSlots } from '../model/constants'

const isCitySelectOpen = ref(false)

const today = new Date()

const maxDate = computed(() => {
  const date = new Date()
  date.setDate(today.getDate() + 7)
  return date
})

const form = reactive({
  city: '',
  street: '',
  house: '',
  apartment: '',
  extra: '',
  deliveryDate: today as Date,
  timeSlot: '',
  phone: ''
})

const errors = reactive<Record<string, string>>({})

const validate = () => {
  errors.city = !form.city ? 'Выберите населённый пункт' : ''
  errors.street = !form.street
    ? 'Улица обязательна'
    : form.street.length < 2
      ? 'Минимум 2 символа'
      : ''

  errors.house = !form.house ? 'Укажите номер дома' : ''

  errors.phone = /^\+?\d{7,15}$/.test(form.phone) ? '' : 'Неверный формат телефона'

  errors.timeSlot = !form.timeSlot ? 'Выберите время' : ''

  return Object.values(errors).every((e) => !e)
}

const availableTimeSlots = computed(() => {
  const now = new Date()
  const currentHour = now.getHours()

  return timeSlots.map((slot) => {
    if (!slot.available) return { ...slot, available: false }

    if (!isSameDay(form.deliveryDate, now)) {
      return { ...slot, available: true }
    }

    return {
      ...slot,
      available: currentHour < slot.minTime
    }
  })
})

watch(availableTimeSlots, (newSlots) => {
  if (form.timeSlot) {
    const slot = newSlots.find((s) => s.id === form.timeSlot)
    if (!slot || !slot.available) form.timeSlot = ''
  }
})

const STORAGE_KEY = 'delivery-form'

const saveDraft = useDebounceFn(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
}, 400)

watch(form, saveDraft, { deep: true })

const saved = localStorage.getItem(STORAGE_KEY)

if (saved) {
  try {
    const parsed = JSON.parse(saved)
    Object.assign(form, parsed)

    if (parsed.deliveryDate) {
      form.deliveryDate = new Date(parsed.deliveryDate)
    }
  } catch (e) {
    console.error('Ошибка загрузки формы:', e)
  }
}

const submit = () => {
  if (!validate()) {
    return
  }

  localStorage.removeItem(STORAGE_KEY)

  Object.assign(form, {
    city: '',
    street: '',
    house: '',
    apartment: '',
    extra: '',
    deliveryDate: today,
    timeSlot: '',
    phone: ''
  })
}

defineExpose({ submit })
</script>

<template>
  <div class="delivery-step">
    <form
      class="delivery-step__form"
      @submit.prevent="submit">
      <section class="delivery-step__section">
        <Typography
          tag="h3"
          size="m"
          bold>
          Куда
        </Typography>

        <div class="delivery-step__fields">
          <div class="delivery-step__field">
            <label class="delivery-step__label"> Населенный пункт </label>

            <Field
              type="select"
              size="m"
              :max-width="205"
              :options="availableCity"
              placeholder="Город"
              v-model="form.city"
              :class="{ 'is-open': isCitySelectOpen }"
              @open-change="isCitySelectOpen = $event"
              :right-icon="{
                type: 'arrow-down',
                textColor: IconColor.BLACK,
                width: 24,
                height: 24
              }" />
          </div>

          <div class="delivery-step__field">
            <label class="delivery-step__label">Улица</label>
            <Field
              type="text"
              size="m"
              :max-width="283"
              v-model="form.street"
              placeholder="Пушкина" />
          </div>

          <div class="delivery-step__field">
            <label class="delivery-step__label">Дом</label>
            <Field
              type="text"
              size="m"
              :max-width="53"
              v-model="form.house"
              placeholder="10" />
          </div>

          <div class="delivery-step__field">
            <label class="delivery-step__label">Квартира</label>
            <Field
              type="text"
              size="m"
              :max-width="74"
              v-model="form.apartment"
              placeholder="12" />
          </div>

          <div class="delivery-step__field">
            <label class="delivery-step__label">Дополнительно</label>
            <Field
              type="text"
              size="m"
              :max-width="120"
              v-model="form.extra"
              placeholder="0" />
          </div>
        </div>
      </section>

      <section class="delivery-step__section">
        <Typography
          tag="h3"
          size="m"
          bold>
          Когда
        </Typography>

        <div class="delivery-step__fields">
          <div class="delivery-step__field">
            <label class="delivery-step__label">Дата</label>

            <VueDatePicker
              v-model="form.deliveryDate"
              :min-date="today"
              :max-date="maxDate"
              :time-config="{ enableTimePicker: false }"
              :disabled-week-days="[0]"
              :formats="{ input: 'dd.MM.yyyy', preview: 'dd.MM.yyyy' }"
              :locale="ru"
              hide-month-year-select
              focus-start-date
              :action-row="{ selectBtnLabel: 'Выбрать', cancelBtnLabel: 'Отмена' }">
              <Icon
                type="arrow-down"
                :width="24"
                :height="24" />
            </VueDatePicker>
          </div>

          <div class="delivery-step__field">
            <label class="delivery-step__label">Время</label>

            <div class="delivery-step__time-buttons">
              <Button
                v-for="slot in availableTimeSlots"
                :key="slot.id"
                :disabled="!slot.available"
                :class="[
                  'delivery-step__time-button',
                  {
                    'is-active': form.timeSlot === slot.id,
                    'is-disabled': !slot.available
                  }
                ]"
                @click="form.timeSlot = slot.id">
                {{ slot.label }}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section class="delivery-step__section">
        <Typography
          tag="h3"
          size="m"
          bold>
          Вход
        </Typography>

        <div class="delivery-step__fields">
          <div class="delivery-step__field">
            <Field
              type="tel"
              size="m"
              :max-width="168"
              v-model="form.phone"
              placeholder="+7" />
          </div>

          <div class="delivery-step__field">
            <Button
              size="s"
              background-color="primary"
              decoration="default"
              class="delivery-step__code-button">
              Получить код
            </Button>
          </div>

          <div class="delivery-step__field">
            <Button
              size="s"
              background-color="secondary"
              decoration="none"
              class="delivery-step__code-button">
              Войти по почте
            </Button>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<style lang="scss">
.delivery-step {
  display: flex;
  gap: 40px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__fields {
    margin-top: 24px;
    display: flex;
    gap: 40px;
  }

  &__label {
    font-size: 18px;
    color: var(--grayscale-hard);
  }

  &__field {
    cursor: auto;

    &:deep(.field__icon) {
      transition: transform 0.2s ease;
    }

    &.is-open {
      &:deep(.field__icon) {
        transform: rotate(-180deg);
      }
    }
  }

  &__time {
    &-buttons {
      display: flex;
      gap: 8px;
    }

    &-button {
      background-color: var(--grayscale-lightest);

      &:not(.is-disabled):hover {
        background-color: var(--main-on-secondary);
        border-color: var(--main-secondary);
      }

      &.is-active {
        background-color: var(--main-secondary);
        border-color: var(--main-secondary);
        color: var(--main-on-secondary);

        &:hover {
          color: var(--grayscale-hardest);
        }
      }

      &.is-disabled {
        background-color: var(--main-surface);
        color: var(--grayscale-light);
      }
    }
  }

  &__code-button {
    height: 100%;
    padding-inline: 30px;
  }
}

.dp__theme_light {
  --dp-font-family: 'Rubik', sans-serif;
  --dp-primary-color: var(--main-primary);
  --dp-border-color-focus: var(--main-secondary);
  --dp-border-color: var(--grayscale-light);
  --dp-menu-border-color: var(--main-secondary);
  --dp-border-color-hover: var(--main-secondary);
}

.dp__input {
  transition: box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: var(--main-secondary);
    box-shadow: var(--shadow-secondary-m);
    transition: box-shadow 0.3s;
  }

  &_wrap {
    max-width: 155px;
  }
}

.dp--menu-wrapper {
  z-index: 9;
}
</style>

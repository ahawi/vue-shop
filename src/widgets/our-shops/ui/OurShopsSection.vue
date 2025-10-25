<script setup lang="ts">
import { Button, Section } from '@/shared/ui'
import YandexMap from './YandexMap.vue'
import { mockYandexMap } from '../lib/mock-coordinates'
import { computed, ref } from 'vue'

const currentCityId = ref(mockYandexMap[0]?.id)

const toggleCityId = (id: string) => {
  currentCityId.value = id
}

const currentCity = computed(() => mockYandexMap.find((city) => city.id === currentCityId.value))
</script>

<template>
  <Section display="flex" title="Наши магазины" class="contacts">
    <div class="contacts__inner">
      <div class="contacts__buttons">
        <Button
          :class="['contacts__button', { active: currentCityId === cityName.id }]"
          v-for="cityName in mockYandexMap"
          :key="cityName.id"
          background-color="grayscale"
          decoration="default"
          size="s"
          @click="toggleCityId(cityName.id)"
          >{{ cityName.title }}</Button
        >
      </div>

      <YandexMap
        v-if="currentCity"
        :coordinates="currentCity?.coordinates"
        :title="currentCity?.title"
      ></YandexMap>
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.contacts {
  display: flex !important;
  flex-direction: column;

  &__buttons {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }

  &__button {
    &.active {
      background-color: var(--main-secondary);
      border-color: transparent;
      color: var(--main-on-secondary);
    }
    &:hover {
      background-color: var(--main-secondary);
      border-color: transparent;
      color: var(--main-on-secondary);
    }
  }
}
</style>

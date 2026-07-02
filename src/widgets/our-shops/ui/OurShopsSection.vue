<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Section } from '@/shared/ui/section'
import { customYandexMap } from '@/shared/ui/custom-yandex-map'
import { computed, ref } from 'vue'
import { shopApi, type Shop } from '@/entities/shop'

const shops = ref<Shop[]>([])
const currentShopId = ref<string>()

const loadShops = async () => {
  shops.value = (await shopApi.getList()) ?? []
  currentShopId.value = shops.value[0]?.id
}

loadShops()

const currentShop = computed(() => shops.value.find((shop) => shop.id === currentShopId.value))

const toggleShopId = (id: string) => {
  currentShopId.value = id
}
</script>

<template>
  <Section
    display="flex"
    title="Наши магазины"
    class="contacts">
    <div class="contacts__inner">
      <div class="contacts__buttons">
        <Button
          :class="['contacts__button', { active: currentShopId === cityName.id }]"
          v-for="cityName in shops"
          :key="cityName.id"
          background-color="grayscale"
          decoration="default"
          size="s"
          @click="toggleShopId(cityName.id)"
          >{{ cityName.title }}</Button
        >
      </div>

      <customYandexMap
        v-if="currentShop"
        :coordinates="currentShop?.coordinates"
        :title="currentShop?.title"></customYandexMap>
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

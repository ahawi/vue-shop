<script setup lang="ts">
import { shallowRef } from 'vue'
import type { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker
} from 'vue-yandex-maps'
import type { YandexMapCoordinates } from '@/shared/model/yandex-map'

const map = shallowRef<null | YMap>(null)

const props = defineProps<Omit<YandexMapCoordinates, 'id'>>()
</script>

<template>
  <YandexMap
    v-model="map"
    :settings="{
      location: {
        center: coordinates,
        zoom: 15
      }
    }"
    width="100%"
    height="400px">
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapDefaultMarker
      :settings="{
        coordinates: coordinates,
        title: title
      }" />
  </YandexMap>
</template>

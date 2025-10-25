<script setup lang="ts">
import { shallowRef } from 'vue'
import type { YMap } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
} from 'vue-yandex-maps'

const map = shallowRef<null | YMap>(null)

interface YandexMapProps {
  coordinates: [number, number]
  title: string
}

const props = defineProps<YandexMapProps>()
</script>

<template>
  <YandexMap
    v-model="map"
    :settings="{
      location: {
        center: coordinates,
        zoom: 15,
      },
    }"
    width="100%"
    height="400px"
  >
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapDefaultMarker
      :settings="{
        coordinates: coordinates,
        title: title,
      }"
    />
  </YandexMap>
</template>

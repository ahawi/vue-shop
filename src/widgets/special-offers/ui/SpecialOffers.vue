<script lang="ts" setup>
import { mockSpecialOffers } from '../lib/mock-offers'
import SpecialOfferCard, { type SpecialOffer } from './SpecialOfferCard.vue'
import { Section } from '@/shared/ui'

export interface SpecialOffers {
  title: string
  offers: SpecialOffer[]
}
</script>

<template>
  <Section display="grid" title="Специальные предложения" class="special-offers">
    <SpecialOfferCard
      v-for="offer in mockSpecialOffers"
      :key="offer.id"
      :id="offer.id"
      :title="offer.title"
      :description="offer.description"
      :image="offer.image"
      :background-color="offer.backgroundColor"
      :has-decoration="offer.hasDecoration"
      :has-image-shadow="offer.hasImageShadow"
    />
  </Section>
</template>

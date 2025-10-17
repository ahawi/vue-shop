<script lang="ts" setup>
import { Section } from '@/widgets/section'
import { mockProductSections } from '../lib/mock-products'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  id: string
}>()

const section = mockProductSections.find((section) => section.id === props.id)
</script>

<template>
  <Section v-if="section" :title="section.title" :link-title="section.linkTitle">
    <ProductCard v-for="product in section?.products" :key="product.id" v-bind="product" />
  </Section>
</template>

<script lang="ts" setup>
import { mockProductSections } from '../lib/mock-products'
import ProductSection from './ProductSection.vue'
</script>

<template>
  <ProductSection
    v-for="section in mockProductSections"
    :key="section.id"
    :id="section.id"
    :title="section.title"
    :link-title="section.linkTitle"
    :products="section.products"
  />
</template>

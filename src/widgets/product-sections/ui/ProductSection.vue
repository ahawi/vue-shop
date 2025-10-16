<script setup lang="ts">
import { IconColor, type Product } from '@/shared/lib/types'
import { Button, Typography } from '@/shared/ui'
import ProductCard from './ProductCard.vue'
import type { ProductSection } from '@/shared/lib/types/product'

const props = defineProps<ProductSection>()
</script>

<template>
  <div class="section">
    <div class="section__header">
      <Typography tag="h3" bold size="m">{{ props.title }}</Typography>
      <Button
        :rightIcon="{ type: 'arrow-left', textColor: IconColor.BLACK, width: 24, height: 24 }"
        :disabled="false"
        >{{ props.linkTitle }}
      </Button>
    </div>
    <div class="section__main">
      <ProductCard v-for="product in props.products" :key="product.id" v-bind="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section__main {
  display: grid;
  grid-template-columns: repeat(4, auto);
}
</style>

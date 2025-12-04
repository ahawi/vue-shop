<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { Typography } from '@/shared/ui'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentProduct = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})

const similarProducts = computed(() => {
  const currentProductCategoryId = currentProduct.value?.categoryIds?.[1]

  return mockProducts
    .filter(
      (product) =>
        product.id !== currentProduct.value?.id &&
        product.categoryIds &&
        product.categoryIds[1] === currentProductCategoryId,
    )
    .slice(0, 4)
})
</script>

<template>
  <div class="product-similar">
    <Typography tag="span" size="s" class="product-similar__title">Похожие</Typography>
    <div class="product-similar__cards">
      <div
        class="product-similar__card"
        v-for="product in similarProducts"
        :key="product.id"
        @click="$router.push(`/catalog/${product.categoryIds[0]}/${product.id}`)"
      >
        <img :src="product.image" :alt="product.title" class="product-similar__card-image" />
        <Typography tag="span" bold size="m" class="product-similar__card-price">{{
          product.price
        }}</Typography>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-similar {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    color: var(--grayscale-hardest);
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__card {
    width: 168px;
    height: 104px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-default-xs);
    cursor: pointer;
    border: 1px solid transparent;
    transition: border 0.3s;
    border-radius: 4px;

    &:hover {
      transition: border 0.3s;
      border: 1px solid var(--main-primary);
    }

    &-image {
      height: 57px;
      align-self: center;
    }

    &-price {
      padding: 10px;
    }
  }
}
</style>

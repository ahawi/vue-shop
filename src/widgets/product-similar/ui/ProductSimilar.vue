<script lang="ts" setup>
import type { ProductProps } from '@/entities/product'
import { productApi } from '@/entities/product/api'
import { useNavigate } from '@/shared/lib/useNavigate'
import { Typography } from '@/shared/ui/typography'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { goToProduct } = useNavigate()

const similarProducts = ref<ProductProps[]>([])

watch(
  () => route.params.id,
  async (id) => {
    similarProducts.value = (await productApi.getSimilar(String(id))) ?? []
  },
  { immediate: true }
)
</script>

<template>
  <div class="product-similar">
    <Typography
      tag="span"
      size="s"
      class="product-similar__title"
      >Похожие</Typography
    >
    <div class="product-similar__cards">
      <div
        class="product-similar__card"
        v-for="product in similarProducts"
        :key="product.id"
        @click="goToProduct(product)">
        <img
          :src="product.image"
          :alt="product.title"
          class="product-similar__card-image" />
        <Typography
          tag="span"
          bold
          size="m"
          class="product-similar__card-price"
          >{{ product.cardPrice ? product.cardPrice : product.price }}</Typography
        >
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
      padding-top: 10px;
    }

    &-price {
      padding: 10px;
    }
  }
}
</style>

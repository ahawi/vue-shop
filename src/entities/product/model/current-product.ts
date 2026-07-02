import { inject, provide, ref, watch, type InjectionKey, type Ref } from 'vue'
import type { ProductProps } from './types'
import { useRoute } from 'vue-router'
import { productApi } from '../api'

const ProductKey: InjectionKey<Ref<ProductProps | null>> = Symbol('current-product')

export const useProvideProduct = () => {
  const route = useRoute()

  const product = ref<ProductProps | null>(null)

  watch(
    () => route.params.id,
    async (id) => {
      product.value = await productApi.getById(String(id))
    },
    { immediate: true }
  )

  provide(ProductKey, product)
  return product
}

export const useProduct = () => {
  const product = inject(ProductKey)
  if (!product) throw new Error('useProduct must be used within a product page')
  return product
}

import { useCartStore } from '@/app/stores/cart'
import type { ProductProps } from '@/entities/product/model/types'

export const useAddToCart = () => {
  const cartStore = useCartStore()

  const addToCart = (product: ProductProps) => {
    const normalizePrice = () => {
      const priceWithDot = product.price.replace(',', '.')
      return parseFloat(priceWithDot)
    }

    cartStore.addToCart({
      id: product.id,
      title: product.title,
      price: normalizePrice(),
      image: product.image,
    })
  }

  return addToCart
}

import { useCartStore } from '@/app/stores/cart'
import type { ProductProps } from '@/entities/product/model/types'

export const useAddToCart = () => {
  const cartStore = useCartStore()

  const normalizePrice = (price: string) => {
    const priceWithDot = price.replace(',', '.')
    return parseFloat(priceWithDot) || 0
  }

  const normalizeDiscount = (discount: string) => {
    if (!discount) return

    const discountValue = discount.replace(/[^0-9]/g, '')
    return discountValue ? Number(discountValue) : undefined
  }

  const addToCart = (product: ProductProps) => {
    cartStore.addToCart(product)
  }

  return addToCart
}

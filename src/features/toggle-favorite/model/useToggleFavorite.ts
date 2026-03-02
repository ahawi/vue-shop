import { useFavoritesStore } from '@/features/favorite/model/favorite'
import type { ProductProps } from '@/entities/product/model/types'

export const useToggleFavorite = () => {
  const { toggleFavorite, isFavorite } = useFavoritesStore()

  const toggleFavoriteItem = (product: ProductProps) => {
    if (!product) {
      return
    }
    toggleFavorite(product.id)
  }

  const isItemFavorite = (productId: string) => {
    return isFavorite(productId)
  }

  return { toggleFavoriteItem, isItemFavorite }
}

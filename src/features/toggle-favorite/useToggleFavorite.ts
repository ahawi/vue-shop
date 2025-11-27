import { useFavoriteStore } from '@/app/stores/favorite'
import type { ProductProps } from '@/entities/product/model/types'

export const useToggleFavorite = () => {
  const favoriteStore = useFavoriteStore()

  const toggleFavorite = (product: ProductProps) => {
    if (!product) {
      return
    }
    favoriteStore.toggleFavorite(product)
  }

  const isFavorite = (productId: string) => {
    return favoriteStore.isInFavorites(productId)
  }

  return { toggleFavorite, isFavorite }
}

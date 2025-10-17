import type { Product } from '@/shared/lib/types'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    totalFavorites: (state) => state.items.length,
    isInFavorites: (state) => (productId: string) => {
      return state.items.some((item) => item.id === productId)
    },
  },

  actions: {
    addToFavorite(product: Product) {
      if (!this.isInFavorites(product.id)) {
        this.items.push(product)
      }
    },
    removeFromFavorite(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    toggleFavorite(product: Product) {
      if (this.isInFavorites(product.id)) {
        this.removeFromFavorite(product.id)
      } else {
        this.addToFavorite(product)
      }
    },
    clearFavorites() {
      this.items = []
    },
  },
})

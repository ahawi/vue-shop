import type { ProductProps } from "@/entities/product"
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    items: [] as ProductProps[],
  }),

  getters: {
    totalFavorites: (state) => state.items.length,
    isInFavorites: (state) => (productId: string) => {
      return state.items.some((item) => item.id === productId)
    },
  },

  actions: {
    addToFavorite(product: ProductProps) {
      if (!this.isInFavorites(product.id)) {
        this.items.push(product)
      }
    },
    removeFromFavorite(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    toggleFavorite(product: ProductProps) {
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

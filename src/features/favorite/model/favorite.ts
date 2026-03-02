import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, type Ref } from 'vue'

interface FavoritesStore {
  itemIds: Ref<string[]>
  totalFavorites: Ref<number>
  isFavorite: (productId: string) => boolean
  addToFavorites: (product: string) => void
  removeFromFavorites: (productId: string) => void
  toggleFavorite: (product: string) => void
  resetFavorites: () => void
}

export const useFavoritesStore = defineStore('useFavoritesStore', (): FavoritesStore => {
  const itemIds = useStorage<string[]>('user-favorites', [], localStorage, {
    serializer: {
      read(raw) {
        return raw ? JSON.parse(raw) : null
      },
      write(value) {
        return value ? JSON.stringify(value) : ''
      }
    }
  })

  const totalFavorites: FavoritesStore['totalFavorites'] = computed(() => itemIds.value.length)

  const isFavorite: FavoritesStore['isFavorite'] = (productId: string) =>
    itemIds.value.includes(productId)

  const addToFavorites: FavoritesStore['addToFavorites'] = (productId: string) => {
    if (!isFavorite(productId)) {
      itemIds.value.push(productId)
    }
  }

  const removeFromFavorites: FavoritesStore['removeFromFavorites'] = (productId: string) => {
    itemIds.value = itemIds.value.filter((id) => id !== productId)
  }

  const toggleFavorite: FavoritesStore['toggleFavorite'] = (productId: string) => {
    if (isFavorite(productId)) removeFromFavorites(productId)
    else addToFavorites(productId)
  }

  const resetFavorites: FavoritesStore['resetFavorites'] = () => {
    itemIds.value = []
  }

  return {
    itemIds,
    totalFavorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    resetFavorites
  }
})

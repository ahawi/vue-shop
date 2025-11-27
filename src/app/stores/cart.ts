import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const productInCart = this.items.find((item) => item.id === product.id)

      if (productInCart) {
        productInCart.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart() {
      this.items = []
    },
  },

  persist: true,
})

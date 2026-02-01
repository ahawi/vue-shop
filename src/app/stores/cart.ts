import type { ProductProps } from '@/entities/product'
import { defineStore } from 'pinia'

export interface CartItem {
  cartItemId: string
  productId: string
  title: string
  price: number
  discount?: number
  quantity: number
  cardPrice?: number
  image?: string
  selected: boolean
  inStock: boolean
  categoryId?: string
}

export interface CartState {
  items: CartItem[]
  appliedBonus: number
  userBonus: number
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    appliedBonus: 0,
    userBonus: 200,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    selectedItems: (state) => state.items.filter((item) => item.selected),
    selectedItemsCount: (state) => state.items.filter((item) => item.selected).length,

    originalSubtotal(): number {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    subtotalWithCard(): number {
      return this.items.reduce((sum, item) => {
        const price = item.cardPrice ?? item.price
        return sum + price * item.quantity
      }, 0)
    },

    cardDiscount(): number {
      return this.originalSubtotal - this.subtotalWithCard
    },

    totalPrice(): string {
      const subtotalWithCard = this.subtotalWithCard
      return Math.max(0, subtotalWithCard - this.appliedBonus).toFixed(2)
    },

    bonusEarned(): number {
      const amountForBonus = this.subtotalWithCard - this.appliedBonus
      return Math.floor(amountForBonus / 50)
    },

    allSelected: (state) => {
      const availableItems = state.items.filter((item) => item.inStock)
      return availableItems.length > 0 && availableItems.every((item) => item.selected)
    },

    hasOutOfStock: (state) => {
      return state.items.some((item) => !item.inStock)
    },

    isMinOrderReached(): boolean {
      return this.subtotalWithCard >= 1000
    },

    maxBonusApplicable(): number {
      const maxFromOrder = this.subtotalWithCard / 2
      return Math.min(maxFromOrder, this.userBonus)
    },
  },

  actions: {
    addToCart(product: ProductProps) {
      const existingItem = this.items.find((item) => item.productId === product.id)

      if (existingItem) {
        if (existingItem.inStock) {
          existingItem.quantity += 1
        }
      } else {
        const normalizePrice = (price: string) => {
          const priceWithDot = price.replace(',', '.')
          return parseFloat(priceWithDot) || 0
        }

        const normalizeDiscount = (discount?: string) => {
          if (!discount) return

          const discountValue = discount.replace(/[^0-9]/g, '')
          return discountValue ? Number(discountValue) : undefined
        }

        const cartItem: CartItem = {
          cartItemId: `cart_${crypto.randomUUID()}`,
          productId: product.id,
          title: product.title,
          price: normalizePrice(product.price),
          discount: product.discount ? normalizeDiscount(product.discount) : undefined,
          quantity: 1,
          selected: false,
          cardPrice: product.cardPrice ? normalizePrice(product.cardPrice) : undefined,
          image: product.image,
          inStock: product.inStock,
          categoryId: product.categoryIds[0],
        }

        this.items.push(cartItem)
      }
    },

    removeFromCart(cartItemId: string) {
      this.items = this.items.filter((item) => item.cartItemId !== cartItemId)
    },

    updateQuantity(cartItemId: string, quantity: number) {
      const item = this.items.find((item) => item.cartItemId === cartItemId)

      if (item) {
        if (quantity > 10) {
          quantity = 10
        }

        if (quantity <= 0) {
          this.removeFromCart(cartItemId)
        }

        item.quantity = quantity
      }
    },

    toggleItemSelect(cartItemId: string) {
      const item = this.items.find((item) => item.cartItemId === cartItemId)
      if (item && item.inStock) {
        item.selected = !item.selected
      }
    },

    selectAll() {
      this.items.forEach((item) => {
        if (item.inStock) {
          item.selected = true
        }
      })
    },

    unselectAll() {
      this.items.forEach((item) => {
        if (item.inStock) {
          item.selected = false
        }
      })
    },

    toggleSelectAll() {
      const allSelected = this.allSelected

      if (allSelected) {
        this.unselectAll()
      } else {
        this.selectAll()
      }
    },

    removeSelectedItems() {
      this.items = this.items.filter((item) => !item.selected)
    },

    clearCart() {
      this.items = []
      this.appliedBonus = 0
    },

    applyBonus(amount: number) {
      this.appliedBonus = Math.min(amount, this.maxBonusApplicable)
    },

    applyAllBonus() {
      this.appliedBonus = this.maxBonusApplicable
    },

    removeBonus() {
      this.appliedBonus = 0
    },
  },

  persist: true,
})

import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { ProductProps } from '@/entities/product'

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

interface CartStore {
  items: Ref<CartItem[]>
  appliedBonus: Ref<number>
  userBonus: Ref<number>
  totalItems: Ref<number>
  selectedItems: Ref<CartItem[]>
  subtotal: Ref<number>
  totalPrice: Ref<string>
  maxBonusApplicable: Ref<number>
  addToCart: (product: ProductProps) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  toggleItemSelect: (cartItemId: string) => void
  clearCart: () => void

  applyBonus: (amount: number) => void
  removeBonus: () => void
  setUserBonus: (amount: number) => void
}

export const useCartStore = defineStore('cart', (): CartStore => {
  const items = useStorage<CartItem[]>('cart-items', [], localStorage)

  const appliedBonus = useStorage<number>('cart-applied-bonus', 0, localStorage)

  const userBonus = ref<number>(0)

  const totalItems: CartStore['totalItems'] = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const selectedItems: CartStore['selectedItems'] = computed(() =>
    items.value.filter((item) => item.selected)
  )

  const subtotal: CartStore['subtotal'] = computed(() =>
    selectedItems.value.reduce((sum, item) => {
      const price = item.cardPrice ?? item.price
      return sum + price * item.quantity
    }, 0)
  )

  const maxBonusApplicable: CartStore['maxBonusApplicable'] = computed(() => {
    const halfOrder = subtotal.value / 2
    return Math.min(halfOrder, userBonus.value)
  })

  const totalPrice: CartStore['totalPrice'] = computed(() =>
    Math.max(0, subtotal.value - appliedBonus.value).toFixed(2)
  )

  function normalizePrice(price: string) {
    return parseFloat(price.replace(',', '.')) || 0
  }

  const addToCart: CartStore['addToCart'] = (product) => {
    const existing = items.value.find((i) => i.productId === product.id)

    if (existing) {
      existing.quantity += 1
      return
    }

    const newItem: CartItem = {
      cartItemId: `cart_${crypto.randomUUID()}`,
      productId: product.id,
      title: product.title,
      price: normalizePrice(product.price),
      quantity: 1,
      selected: true,
      cardPrice: product.cardPrice ? normalizePrice(product.cardPrice) : undefined,
      image: product.image,
      inStock: product.inStock,
      categoryId: product.categoryIds?.[0]
    }

    items.value.push(newItem)
  }

  const removeFromCart: CartStore['removeFromCart'] = (cartItemId) => {
    items.value = items.value.filter((i) => i.cartItemId !== cartItemId)
  }

  const updateQuantity: CartStore['updateQuantity'] = (cartItemId, quantity) => {
    const item = items.value.find((i) => i.cartItemId === cartItemId)
    if (!item) return

    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }

    if (quantity > 10) quantity = 10

    item.quantity = quantity
  }

  const toggleItemSelect: CartStore['toggleItemSelect'] = (cartItemId) => {
    const item = items.value.find((i) => i.cartItemId === cartItemId)
    if (item && item.inStock) {
      item.selected = !item.selected
    }
  }

  const clearCart: CartStore['clearCart'] = () => {
    items.value = []
    appliedBonus.value = 0
  }

  const applyBonus: CartStore['applyBonus'] = (amount) => {
    appliedBonus.value = Math.min(amount, maxBonusApplicable.value)
  }

  const removeBonus: CartStore['removeBonus'] = () => {
    appliedBonus.value = 0
  }

  const setUserBonus: CartStore['setUserBonus'] = (amount) => {
    userBonus.value = amount
  }

  return {
    items,
    appliedBonus,
    userBonus,
    totalItems,
    selectedItems,
    subtotal,
    totalPrice,
    maxBonusApplicable,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelect,
    clearCart,
    applyBonus,
    removeBonus,
    setUserBonus
  }
})

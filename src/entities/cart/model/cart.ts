import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { ProductProps } from '@/entities/product'

export interface CartItem {
  cartProductId: string
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
  products: Ref<CartItem[]>
  appliedBonus: Ref<number>
  userBonus: Ref<number>
  totalProducts: Ref<number>
  selectedProducts: Ref<CartItem[]>
  subtotal: Ref<number>
  totalPrice: Ref<string>
  maxBonusApplicable: Ref<number>
  allProductsSelected: Ref<boolean>

  addToCart: (product: ProductProps) => void
  removeFromCart: (cartProductId: string) => void
  updateQuantity: (cartProductId: string, quantity: number) => void
  toggleProductSelect: (cartProductId: string) => void
  clearCart: () => void

  applyBonus: (amount: number) => void
  removeBonus: () => void
  setUserBonus: (amount: number) => void
  selectAllProducts: (selected: boolean) => void
  toggleAllSelectedProducts: () => void
  removeAllSelectedProducts: () => void
}

export const useCartStore = defineStore('cart', (): CartStore => {
  const products = useStorage<CartItem[]>('cart-products', [], localStorage)
  const appliedBonus = useStorage<number>('cart-applied-bonus', 0, localStorage)

  const userBonus = ref<number>(0)

  const totalProducts: CartStore['totalProducts'] = computed(() =>
    products.value.reduce((sum, product) => sum + product.quantity, 0)
  )

  const selectedProducts: CartStore['selectedProducts'] = computed(() =>
    products.value.filter((product) => product.selected)
  )

  const subtotal: CartStore['subtotal'] = computed(() =>
    selectedProducts.value.reduce((sum, product) => {
      const price = product.cardPrice ?? product.price
      return sum + price * product.quantity
    }, 0)
  )

  const maxBonusApplicable: CartStore['maxBonusApplicable'] = computed(() => {
    const halfOrder = subtotal.value / 2
    return Math.min(halfOrder, userBonus.value)
  })

  const totalPrice: CartStore['totalPrice'] = computed(() =>
    Math.max(0, subtotal.value - appliedBonus.value).toFixed(2)
  )

  const allProductsSelected: CartStore['allProductsSelected'] = computed(
    () => products.value.length > 0 && products.value.every((product) => product.selected)
  )

  function normalizePrice(price: string) {
    return parseFloat(price.replace(',', '.')) || 0
  }

  const addToCart: CartStore['addToCart'] = (product) => {
    const existing = products.value.find((item) => item.productId === product.id)

    if (existing) {
      existing.quantity += 1
      return
    }

    const newItem: CartItem = {
      cartProductId: `cart_${crypto.randomUUID()}`,
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

    products.value.push(newItem)
  }

  const removeFromCart: CartStore['removeFromCart'] = (cartProductId) => {
    products.value = products.value.filter((product) => product.cartProductId !== cartProductId)
  }

  const updateQuantity: CartStore['updateQuantity'] = (cartProductId, quantity) => {
    const product = products.value.find((product) => product.cartProductId === cartProductId)
    if (!product) return

    if (quantity <= 0) {
      removeFromCart(cartProductId)
      return
    }

    if (quantity > 10) quantity = 10

    product.quantity = quantity
  }

  const toggleProductSelect: CartStore['toggleProductSelect'] = (cartProductId) => {
    const product = products.value.find((product) => product.cartProductId === cartProductId)
    if (product && product.inStock) {
      product.selected = !product.selected
    }
  }

  const clearCart: CartStore['clearCart'] = () => {
    products.value = []
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

  const selectAllProducts: CartStore['selectAllProducts'] = (selected: boolean) => {
    products.value.forEach((products) => {
      products.selected = selected
    })
  }

  const toggleAllSelectedProducts: CartStore['toggleAllSelectedProducts'] = () => {
    const allProductsSelected = products.value.every((product) => product.selected)

    selectAllProducts(!allProductsSelected)
  }

  const removeAllSelectedProducts: CartStore['removeAllSelectedProducts'] = () => {
    products.value = products.value.filter((product) => !product.selected)

    if (appliedBonus.value > maxBonusApplicable.value) {
      appliedBonus.value = maxBonusApplicable.value
    }
  }

  return {
    products,
    appliedBonus,
    userBonus,
    totalProducts,
    selectedProducts,
    subtotal,
    totalPrice,
    maxBonusApplicable,
    allProductsSelected,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleProductSelect,
    clearCart,
    applyBonus,
    removeBonus,
    setUserBonus,
    selectAllProducts,
    toggleAllSelectedProducts,
    removeAllSelectedProducts
  }
})

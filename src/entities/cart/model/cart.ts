import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useStorage } from '@vueuse/core'

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
  useBonus: Ref<boolean>
  userBonus: Ref<number>
  totalProducts: Ref<number>
  selectedProducts: Ref<CartItem[]>
  subtotal: Ref<number>
  totalDiscount: Ref<number>
  totalPrice: Ref<number>
  appliedBonus: Ref<number>
  maxBonusApplicable: Ref<number>
  allProductsSelected: Ref<boolean>

  addToCart: (product: CartItem) => void
  removeFromCart: (cartProductId: string) => void
  updateQuantity: (cartProductId: string, quantity: number) => void
  toggleProductSelect: (cartProductId: string) => void
  clearCart: () => void

  setUserBonus: (amount: number) => void
  selectAllProducts: (selected: boolean) => void
  toggleAllSelectedProducts: () => void
  removeAllSelectedProducts: () => void
}

export const useCartStore = defineStore('cart', (): CartStore => {
  const products = useStorage<CartItem[]>('cart-products', [], localStorage)
  const useBonus = useStorage<boolean>('cart-use-bonus', false, localStorage)

  const userBonus = ref<number>(300)

  const totalProducts: CartStore['totalProducts'] = computed(() =>
    products.value.reduce((sum, product) => sum + product.quantity, 0)
  )

  const selectedProducts: CartStore['selectedProducts'] = computed(() =>
    products.value.filter((product) => product.selected)
  )

  const subtotal: CartStore['subtotal'] = computed(() => {
    return selectedProducts.value.reduce((sum, product) => {
      return sum + product.price * product.quantity
    }, 0)
  })

  const totalDiscount: CartStore['totalDiscount'] = computed(() =>
    selectedProducts.value.reduce((sum, product) => {
      if (!product.cardPrice) return sum
      return sum + (product.cardPrice - product.price) * product.quantity
    }, 0)
  )

  const maxBonusApplicable: CartStore['maxBonusApplicable'] = computed(() => {
    const halfOrder = (subtotal.value - totalDiscount.value) / 2
    return Math.min(halfOrder, userBonus.value)
  })

  const totalPrice: CartStore['totalPrice'] = computed(() =>
    Math.max(0, subtotal.value - appliedBonus.value)
  )

  const appliedBonus: CartStore['appliedBonus'] = computed(() => {
    if (!useBonus.value) return 0
    return maxBonusApplicable.value
  })

  const allProductsSelected: CartStore['allProductsSelected'] = computed(
    () => products.value.length > 0 && products.value.every((product) => product.selected)
  )

  const addToCart: CartStore['addToCart'] = (product) => {
    const existing = products.value.find((item) => item.productId === product.productId)

    if (existing) {
      existing.quantity += 1
      return
    }

    const newItem: CartItem = {
      cartProductId: `cart_${crypto.randomUUID()}`,
      productId: product.productId,
      title: product.title,
      price: product.price,
      quantity: 1,
      selected: true,
      cardPrice: product.cardPrice ? product.cardPrice : undefined,
      image: product.image,
      inStock: product.inStock,
      categoryId: product.categoryId
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
  }

  return {
    products,
    appliedBonus,
    useBonus,
    userBonus,
    totalProducts,
    selectedProducts,
    subtotal,
    totalDiscount,
    totalPrice,
    maxBonusApplicable,
    allProductsSelected,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleProductSelect,
    clearCart,
    setUserBonus,
    selectAllProducts,
    toggleAllSelectedProducts,
    removeAllSelectedProducts
  }
})

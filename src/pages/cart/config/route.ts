import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

const CART_ROUTE_NAME = 'cart'

export const CART_LINK = {
  name: CART_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const CART_ROUTE = {
  path: '/cart',
  name: CART_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

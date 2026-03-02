import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const PRODUCT_ROUTE_NAME = 'product'

export const PRODUCT_LINK = {
  name: PRODUCT_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const PRODUCT_ROUTE = {
  path: '/catalog/:category/:id',
  name: PRODUCT_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const ORDERS_ROUTE_NAME = 'orders'

export const ORDERS_LINK = {
  name: ORDERS_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const ORDERS_ROUTE = {
  path: '/orders',
  name: ORDERS_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const FAVORITES_ROUTE_NAME = 'favorites'

export const FAVORITES_LINK = {
  name: FAVORITES_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const FAVORITES_ROUTE = {
  path: '/favorites',
  name: FAVORITES_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

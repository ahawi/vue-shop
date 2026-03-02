import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const CATEGORY_ROUTE_NAME = 'category'

export const CATEGORY_LINK = {
  name: CATEGORY_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const CATEGORY_ROUTE = {
  path: '/catalog/:category',
  name: CATEGORY_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

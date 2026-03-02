import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const CATALOG_ROUTE_NAME = 'catalog'

export const CATALOG_LINK = {
  name: CATALOG_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const CATALOG_ROUTE = {
  path: '/catalog',
  name: CATALOG_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw

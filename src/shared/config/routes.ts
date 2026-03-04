import type { RouteLocationRaw } from 'vue-router'

const MAIN_ROUTE_NAME = '/'

export const MAIN_LINK = {
  name: MAIN_ROUTE_NAME
} as const satisfies RouteLocationRaw

const LOGIN_LINK_NAME = 'login'

export const LOGIN_LINK = {
  name: LOGIN_LINK_NAME
} as const satisfies RouteLocationRaw

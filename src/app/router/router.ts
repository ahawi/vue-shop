import { createRouter, createWebHistory } from 'vue-router'
import { MAIN_ROUTE } from '@/pages/main'
import { MAIN_LINK } from '@/shared/config'
import { CATALOG_ROUTE } from '@/pages/catalog/config'
import { CATEGORY_ROUTE } from '@/pages/category'
import { FAVORITES_ROUTE } from '@/pages/favorite'
import { ORDERS_ROUTE } from '@/pages/orders'
import { PRODUCT_ROUTE } from '@/pages/product'
import { CART_ROUTE } from '@/pages/cart'
import { Layout } from '../layout'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', redirect: MAIN_LINK },
        MAIN_ROUTE,
        CATALOG_ROUTE,
        CATEGORY_ROUTE,
        PRODUCT_ROUTE,
        FAVORITES_ROUTE,
        ORDERS_ROUTE,
        CART_ROUTE,
        { path: '/:catchAll(.*)', redirect: { name: MAIN_LINK.name, params: {} } }
      ]
    }
  ]
})

export default router

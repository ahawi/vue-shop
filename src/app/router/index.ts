import { createRouter, createWebHistory } from 'vue-router'
import { MainPage } from '@/pages/main'
import { CatalogPage } from '@/pages/catalog'
import { ROUTES_PATHS } from '../config/routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'main',
      component: MainPage,
    },
    {
      path: ROUTES_PATHS.CATALOG,
      name: 'catalog',
      component: CatalogPage,
    },
  ],
})

export default router

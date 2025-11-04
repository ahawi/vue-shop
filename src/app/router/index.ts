import { createRouter, createWebHistory } from 'vue-router'
import { MainPage } from '@/pages/main'
import { CatalogPage } from '@/pages/catalog'
import { ROUTES_PATHS } from '../config/routes'
import { CategoryPage } from '@/pages/category'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'main',
      component: MainPage,
      meta: { title: 'Главная' },
    },
    {
      path: ROUTES_PATHS.CATALOG,
      name: 'catalog',
      component: CatalogPage,
      meta: { title: 'Каталог' },
    },
    {
      path: ROUTES_PATHS.CATEGORY,
      name: 'category',
      component: CategoryPage,
      meta: { title: '' },
    },
  ],
})

export default router

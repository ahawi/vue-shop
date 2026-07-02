import { http } from '@/shared/api'
import type { ProductProps } from '../model/types'

export const productApi = {
  getList: (params?: {
    category?: string
    search?: string
    filter?: 'sale' | 'new' | 'buy-before'
    ids?: string
  }) => http.fetchData<ProductProps[]>({ url: '/products', method: 'GET', params }),

  getById: (id: string) => http.fetchData<ProductProps>({ url: `/products/${id}`, method: 'GET' }),

  getSimilar: (id: string) =>
    http.fetchData<ProductProps[]>({ url: `/products/${id}/similar`, method: 'GET' }),

  getBoughtTogether: (id: string) =>
    http.fetchData<ProductProps[]>({ url: `/products/${id}/bought-together`, method: 'GET' })
}

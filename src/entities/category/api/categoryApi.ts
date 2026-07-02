import { http } from '@/shared/api'
import type { Category } from '../model/types'

export const categoryApi = {
  getList: () => http.fetchData<Category[]>({ url: '/categories', method: 'GET' }),

  getById: (id: string) => http.fetchData<Category>({ url: `/categories/${id}`, method: 'GET' })
}

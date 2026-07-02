import { http } from '@/shared/api'
import type { Shop } from '../model/types'

export const shopApi = {
  getList: () => http.fetchData<Shop[]>({ url: '/shops', method: 'GET' })
}

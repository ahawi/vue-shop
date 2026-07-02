import { http } from '@/shared/api'
import type { SearchOption } from '../model/types'

export const searchApi = {
  search: (query: string) =>
    http.fetchData<SearchOption[]>({ url: '/search', method: 'GET', params: { q: query } })
}

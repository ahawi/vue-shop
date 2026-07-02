import { http } from '@/shared/api'
import type { ArticleCardProps } from '../model/types'

export const articleApi = {
  getList: () => http.fetchData<ArticleCardProps[]>({ url: '/articles', method: 'GET' }),

  getById: (id: string) =>
    http.fetchData<ArticleCardProps>({ url: `/articles/${id}`, method: 'GET' })
}

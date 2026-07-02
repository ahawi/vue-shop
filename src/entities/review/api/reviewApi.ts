import { http } from '@/shared/api'
import type { Review, ReviewStats } from '../model/types'

export const reviewApi = {
  getByProduct: (productId: string) =>
    http.fetchData<Review[]>({ url: `/products/${productId}/reviews`, method: 'GET' }),

  getStats: (productId: string) =>
    http.fetchData<ReviewStats>({ url: `/products/${productId}/reviews/stats`, method: 'GET' })
}

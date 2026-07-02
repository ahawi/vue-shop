import { http, HttpResponse } from 'msw'
import { mockReviews } from './mock-reviews'

export const reviewHandlers = [
  http.get('/products/:id/reviews/stats', ({ params }) => {
    const reviews = mockReviews.filter((review) => review.productId === params.id)

    const grades: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach((review) => grades[review.rating]++)

    const average = reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

    return HttpResponse.json({ average, grades })
  }),

  http.get('/products/:id/reviews', ({ params }) =>
    HttpResponse.json(mockReviews.filter((review) => review.productId === params.id))
  )
]

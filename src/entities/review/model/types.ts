export interface Review {
  reviewId: string
  productId: string
  author: string
  message: string
  date: string
  rating: 1 | 2 | 3 | 4 | 5
}

export interface ReviewStats {
  average: number
  grades: Record<1 | 2 | 3 | 4 | 5, number>
}

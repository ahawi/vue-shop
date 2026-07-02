import { mockCategory } from './mock-categories'
import { HttpResponse, http, passthrough } from 'msw'

export const categoryHandlers = [
  http.get('/categories', () => HttpResponse.json(mockCategory)),
  http.get('/categories/:id', ({ params }) => {
    const category = mockCategory.find((item) => item.id === params.id)
    return category ? HttpResponse.json(category) : passthrough()
  })
]

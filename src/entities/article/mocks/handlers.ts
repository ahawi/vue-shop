import { HttpResponse, http } from 'msw'
import { mockArticles } from './mock-articles'

export const articleHandlers = [
  http.get('/articles', () => HttpResponse.json(mockArticles)),
  http.get('/articles/:id', ({ params }) => {
    const article = mockArticles.find((item) => item.id === params.id)
    return article ? HttpResponse.json(article) : new HttpResponse(null, { status: 404 })
  })
]

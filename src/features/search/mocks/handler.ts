import { mockCategory } from '@/entities/category/mocks/mock-categories'
import { mockProducts } from '@/entities/product/mocks/mock-products'
import { http, HttpResponse } from 'msw'

export const searchHandlers = [
  http.get('/search', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q')?.toLowerCase()
    if (!query) return HttpResponse.json([])

    const products = mockProducts
      .filter((product) => product.title.toLowerCase().includes(query))
      .map((product) => ({
        id: product.id,
        title: product.title,
        type: 'product' as const,
        path: `catalog/${product.categoryIds[0]}/${product.id}`
      }))

    const categories = mockCategory
      .filter((category) => category.title.toLowerCase().includes(query))
      .map((category) => ({
        id: category.id,
        title: category.title,
        type: 'category' as const,
        path: `/catalog/${category.id}`
      }))

    return HttpResponse.json([...products, ...categories].slice(0, 10))
  })
]

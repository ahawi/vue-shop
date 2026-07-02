import { http, HttpResponse } from 'msw'
import { mockProducts } from '@/entities/product/mocks/mock-products'
import { boughtWithCategories } from './bought-together'

export const productHandlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')?.toLowerCase().trim()

    let result = mockProducts

    if (category) {
      result = result.filter((product) => product.categoryIds.includes(category))
    }

    if (search) {
      result = result.filter((product) => product.title.toLowerCase().includes(search))
    }

    const filter = url.searchParams.get('filter')

    if (filter === 'sale') result = result.filter((product) => product.discount)
    if (filter === 'new') result = result.filter((product) => product.rating < 5)
    if (filter === 'buy-before') result = result.filter((product) => product.rating > 4.5)

    const ids = url.searchParams.get('ids')

    if (ids) {
      const idList = ids.split(',')
      result = result.filter((product) => idList.includes(product.id))
    }

    return HttpResponse.json(result)
  }),

  http.get('/products/:id/similar', ({ params }) => {
    const current = mockProducts.find((product) => product.id === params.id)
    if (!current) return HttpResponse.json([])

    const subCategoryId = current.categoryIds?.[1]
    const similar = mockProducts
      .filter((product) => product.id !== current.id && product.categoryIds?.[1] === subCategoryId)
      .slice(0, 4)

    return HttpResponse.json(similar)
  }),

  http.get('/products/:id/bought-together', ({ params }) => {
    const current = mockProducts.find((product) => product.id === params.id)
    if (!current) return HttpResponse.json([])

    const currentCategory = current.categoryIds[1]
    const categoryData = boughtWithCategories.find(
      (category) => category.currentCategoryId === currentCategory
    )
    if (!categoryData) return HttpResponse.json([])

    const result = mockProducts
      .filter(
        (item) =>
          item.categoryIds[1] &&
          item.categoryIds[1] !== currentCategory &&
          categoryData.boughtWithCategoryIds.includes(item.categoryIds[1])
      )
      .slice(0, 5)

    return HttpResponse.json(result)
  }),

  http.get('/products/:id', ({ params }) => {
    const product = mockProducts.find((item) => item.id === params.id)
    return product ? HttpResponse.json(product) : new HttpResponse(null, { status: 404 })
  })
]

import { router } from '@/app/router'
import type { ProductProps } from '@/entities/product'

export const useNavigate = () => {
  const productRouteByIds = (categoryId: string, productId: string) => ({
    name: 'product',
    params: { category: categoryId, id: productId }
  })

  const productRouteFromProduct = (product: ProductProps) =>
    productRouteByIds(product.categoryIds?.[0] ?? 'unknown', product.id)

  const goToProduct = (product: ProductProps) => {
    router.push(productRouteFromProduct(product))
  }

  return { goToProduct }
}

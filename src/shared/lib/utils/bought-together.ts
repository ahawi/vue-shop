import type { ProductProps } from '@/entities/product'
import { mockProducts } from '../mocks/mock-products'

interface BoughtWithCategory {
  currentCategoryId: string
  boughtWithCategoryIds: string[]
}

export const boughtWithCategories: BoughtWithCategory[] = [
  {
    currentCategoryId: 'milk',
    boughtWithCategoryIds: ['cookie', 'bread', 'bun', 'chocolate', 'tea'],
  },
  {
    currentCategoryId: 'egg',
    boughtWithCategoryIds: ['bread', 'sausage', 'sausages', 'beef'],
  },
  {
    currentCategoryId: 'cream',
    boughtWithCategoryIds: ['bread', 'bun', 'dessert'],
  },
  {
    currentCategoryId: 'cottage-cheese',
    boughtWithCategoryIds: ['bread', 'bun', 'dessert'],
  },
  {
    currentCategoryId: 'yoghurt',
    boughtWithCategoryIds: ['cookie', 'bun', 'dessert', 'juice'],
  },
  {
    currentCategoryId: 'dessert',
    boughtWithCategoryIds: ['tea', 'juice', 'milk', 'cookie'],
  },
  {
    currentCategoryId: 'bread',
    boughtWithCategoryIds: ['milk', 'sausage', 'cottage-cheese', 'egg', 'beef'],
  },
  {
    currentCategoryId: 'pizza',
    boughtWithCategoryIds: ['soda', 'water', 'juice', 'dessert'],
  },
  {
    currentCategoryId: 'bun',
    boughtWithCategoryIds: ['milk', 'tea', 'yoghurt', 'juice', 'cookie'],
  },
  {
    currentCategoryId: 'sausage',
    boughtWithCategoryIds: ['bread', 'egg', 'juice', 'water'],
  },
  {
    currentCategoryId: 'sausages',
    boughtWithCategoryIds: ['bread', 'egg', 'juice', 'water'],
  },
  {
    currentCategoryId: 'barbecue',
    boughtWithCategoryIds: ['bread', 'soda', 'water', 'juice'],
  },
  {
    currentCategoryId: 'poultry-meat',
    boughtWithCategoryIds: ['bread', 'egg', 'water', 'juice'],
  },
  {
    currentCategoryId: 'beef',
    boughtWithCategoryIds: ['bread', 'egg', 'water', 'juice'],
  },
  {
    currentCategoryId: 'chocolate',
    boughtWithCategoryIds: ['tea', 'milk', 'cookie', 'juice'],
  },
  {
    currentCategoryId: 'cookie',
    boughtWithCategoryIds: ['milk', 'tea', 'juice', 'yoghurt', 'chocolate'],
  },
  {
    currentCategoryId: 'juice',
    boughtWithCategoryIds: ['cookie', 'bun', 'dessert', 'bread', 'yoghurt'],
  },
  {
    currentCategoryId: 'water',
    boughtWithCategoryIds: ['pizza', 'barbecue', 'beef', 'poultry-meat'],
  },
  {
    currentCategoryId: 'soda',
    boughtWithCategoryIds: ['pizza', 'barbecue', 'cookie', 'chocolate'],
  },
  {
    currentCategoryId: 'tea',
    boughtWithCategoryIds: ['cookie', 'chocolate', 'dessert', 'bun', 'milk'],
  },
]

export const getBoughtTogether = (product: ProductProps) => {
  const allProducts = mockProducts
  const currentCategory = product.categoryIds[1]

  const categoryData = boughtWithCategories.find(
    (category) => currentCategory === category.currentCategoryId,
  )

  if (!categoryData) return []

  const result = allProducts
    .filter((item) => {
      if (currentCategory === item.categoryIds[1]) return

      if (!item.categoryIds[1]) return

      return categoryData.boughtWithCategoryIds.includes(item.categoryIds[1])
    })
    .slice(0, 5)

  return result
}

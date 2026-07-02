import { productHandlers } from '@/entities/product/mocks'
import { categoryHandlers } from '@/entities/category/mocks'
import { offerHandlers } from '@/entities/offer/mocks'
import { articleHandlers } from '@/entities/article/mocks'
import { reviewHandlers } from '@/entities/review/mocks'
import { searchHandlers } from '@/features/search/mocks'
import { shopHandlers } from '@/entities/shop/mocks'

export const handlers = [
  ...productHandlers,
  ...categoryHandlers,
  ...offerHandlers,
  ...articleHandlers,
  ...reviewHandlers,
  ...searchHandlers,
  ...shopHandlers
]

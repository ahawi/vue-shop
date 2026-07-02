import { http } from '@/shared/api'
import type { SpecialOfferProps } from '../model/types'

export const offerApi = {
  getList: () => http.fetchData<SpecialOfferProps[]>({ url: '/offers', method: 'GET' }),

  getById: (id: string) =>
    http.fetchData<SpecialOfferProps>({ url: `/offers/${id}`, method: 'GET' })
}

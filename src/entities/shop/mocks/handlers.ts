import { http, HttpResponse } from 'msw'
import { mockShops } from './mock-shop'

export const shopHandlers = [http.get('/shops', () => HttpResponse.json(mockShops))]

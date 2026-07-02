import { http, HttpResponse } from 'msw'
import { mockSpecialOffers } from './mock-offers'

export const offerHandlers = [
  http.get('/offers', () => HttpResponse.json(mockSpecialOffers)),
  http.get('/offers/:id', ({ params }) => {
    const offer = mockSpecialOffers.find((offer) => offer.id === params.id)
    return offer ? HttpResponse.json(offer) : new HttpResponse(null, { status: 404 })
  })
]

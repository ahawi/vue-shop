import type { SpecialOffer } from '../ui/SpecialOfferCard.vue'

export const mockSpecialOffers: SpecialOffer[] = [
  {
    id: '1',
    title: 'Оформите карту «Северяночка»',
    description: 'И получайте бонусы при покупке в магазинах и на сайте',
    image: '/images/offer-card.png',
    backgroundColor: '#FCD5BA',
    hasDecoration: false,
    hasImageShadow: true,
  },
  {
    id: '2',
    title: 'Попробуйте новинку месяца',
    description: 'Скидки на все товары нового ассортимента',
    image: '/images/cart.png',
    backgroundColor: '#E5FFDE',
    hasDecoration: true,
    hasImageShadow: false,
  },
]

export interface Catalog {
  id: string
  title: string
  image: string
  slug: string
}

export const mockCategories: Catalog[] = [
  {
    id: '1',
    slug: 'milk-cheese-egg',
    title: 'Молоко, сыр, яйцо',
    image: '/categories/category_1.png',
  },
  {
    id: '2',
    slug: 'bread',
    title: 'Хлеб',
    image: '/categories/category_2.png',
  },
  {
    id: '3',
    slug: 'fruits-vegetables',
    title: 'Фрукты и овощи',
    image: '/categories/category_3.png',
  },
  {
    id: '4',
    slug: 'frozen-food',
    title: 'Замороженные продукты',
    image: '/categories/category_4.png',
  },
  { id: '5', slug: 'frozen-food', title: 'drinks', image: '/categories/category_5.png' },
  {
    id: '6',
    slug: 'сonfectionery-products',
    title: 'Кондитерские изделия',
    image: '/categories/category_6.png',
  },
  {
    id: '7',
    slug: 'tea-coffee',
    title: 'Чай, кофе',
    image: '/categories/category_7.png',
  },
  { id: '8', slug: 'groceries', title: 'Бакалея', image: '/categories/category_8.png' },
  {
    id: '9',
    slug: 'healthy-eating',
    title: 'Здоровое питание',
    image: '/categories/category_9.png',
  },
  { id: '10', slug: 'pet-supplies', title: 'Зоотовары', image: '/categories/category_10.png' },
  { id: '11', slug: 'baby-food', title: 'Детское питание', image: '/categories/category_11.png' },
  {
    id: '12',
    slug: 'meat-poultry-sausage',
    title: 'Мясо, птица, колбаса',
    image: '/categories/category_12.png',
  },
  {
    id: '13',
    slug: 'non-food-products',
    title: 'Непродовольственные товары',
    image: '/categories/category_13.png',
  },
]

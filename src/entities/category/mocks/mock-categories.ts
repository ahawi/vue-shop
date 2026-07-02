import type { Category } from '../model/types'

export const mockCategory: Category[] = [
  {
    id: 'milk-cheese-egg',
    title: 'Молоко, сыр, яйца',
    image: '/categories/milk-cheese-egg.png',
    categories: [
      { id: 'milk', title: 'Молоко' },
      { id: 'egg', title: 'Яйца' },
      { id: 'cream', title: 'Сливки' },
      { id: 'cottage-cheese', title: 'Творог' },
      { id: 'yoghurt', title: 'Йогурты' },
      { id: 'dessert', title: 'Десерты' }
    ]
  },
  {
    id: 'bakery',
    title: 'Выпечка',
    image: '/categories/bakery.png',
    categories: [
      { id: 'bread', title: 'Хлеб' },
      { id: 'pizza', title: 'Пицца' },
      { id: 'bun', title: 'Булочки' }
    ]
  },
  {
    id: 'meat-poultry-sausage',
    title: 'Мясные изделия',
    image: '/categories/meat-poultry-sausage.png',
    categories: [
      { id: 'sausage', title: 'Колбаса' },
      { id: 'sausages', title: 'Сосиски' },
      { id: 'barbecue', title: 'Шашлык' },
      { id: 'poultry-meat', title: 'Мясо птицы' },
      { id: 'beef', title: 'Говядина' }
    ]
  },
  {
    id: 'sweets',
    title: 'Сладости',
    image: '/categories/sweets.png',
    categories: [
      { id: 'chocolate', title: 'Шоколад' },
      { id: 'cookie', title: 'Печенье' }
    ]
  },
  {
    id: 'drinks',
    image: '/categories/drinks.png',
    title: 'Напитки',
    categories: [
      { id: 'juice', title: 'Соки' },
      { id: 'water', title: 'Вода' },
      { id: 'soda', title: 'Газировка' },
      { id: 'tea', title: 'Чай' }
    ]
  }
]

import type { ProductProps } from '@/entities/product'

export interface InnerCategory {
  id: string
  title: string
}

export interface CategoryFilter {
  id: string
  title: string
  categories?: InnerCategory[]
}

export interface CategoryProduct extends ProductProps {
  categoryIds: string[]
  inStock: boolean
}

export const mockCategoryFilters: CategoryFilter[] = [
  {
    id: 'milk-cheese-egg',
    title: 'Молоко, сыр, яйца',
    categories: [
      { id: 'milk', title: 'Молоко' },
      { id: 'egg', title: 'Яйца' },
      { id: 'cream', title: 'Сливки' },
    ],
  },
  {
    id: 'bakery',
    title: 'Выпечка',
    categories: [
      { id: 'bread', title: 'Хлеб' },
      { id: 'bun', title: 'Булочки' },
      { id: 'cake', title: 'Торты' },
      { id: 'pie', title: 'Пироги' },
    ],
  },
  {
    id: 'meat-poultry-sausage',
    title: 'Мясные изделия',
    categories: [
      { id: 'sausage', title: 'Колбасы' },
      { id: 'sausages', title: 'Сосиски' },
      { id: 'ham', title: 'Ветчина' },
      { id: 'bacon', title: 'Бекон' },
    ],
  },
  {
    id: 'сonfectionery-products',
    title: 'Сладости',
    categories: [
      { id: 'chocolate', title: 'Шоколад' },
      { id: 'candy', title: 'Конфеты' },
      { id: 'cookie', title: 'Печенье' },
      { id: 'jam', title: 'Варенье' },
    ],
  },
  {
    id: 'tea-coffee',
    title: 'Напитки',
    categories: [
      { id: 'juice', title: 'Соки' },
      { id: 'water', title: 'Вода' },
      { id: 'soda', title: 'Газировка' },
      { id: 'tea', title: 'Чай' },
      { id: 'coffee', title: 'Кофе' },
    ],
  },
]

export const mockCategoryProducts: CategoryProduct[] = [
  {
    id: '1',
    title: 'Г/Ц Блинчики с мясом вес, Россия',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 2,
    hasCardPrice: true,
    isFavorite: true,
    hasSaleBadge: true,
    image: `/products/product-1.png`,
    inStock: true,
    categoryIds: ['milk-cheese-egg'],
  },
  {
    id: '2',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 3,
    hasCardPrice: true,
    isFavorite: false,
    hasSaleBadge: true,
    image: `/products/product-2.png`,
    inStock: false,
    categoryIds: ['milk-cheese-egg'],
  },
  {
    id: '3',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 5,
    hasCardPrice: true,
    isFavorite: false,
    hasSaleBadge: true,
    image: `/products/product-3.png`,
    categoryIds: ['bakery'],
    inStock: true,
  },
  {
    id: '4',
    title: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 4.1,
    hasCardPrice: true,
    isFavorite: false,
    hasSaleBadge: true,
    image: `/products/product-4.png`,
    categoryIds: ['meat-poultry-sausage'],
    inStock: true,
  },
  {
    id: '5',
    title: 'Г/Ц Блинчики с мясом вес, Россия',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 2,
    hasCardPrice: true,
    isFavorite: true,
    hasSaleBadge: true,
    image: `/products/product-1.png`,
    categoryIds: ['сonfectionery-products'],
    inStock: false,
  },
  {
    id: '6',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 3,
    hasCardPrice: true,
    isFavorite: false,
    hasSaleBadge: true,
    image: `/products/product-2.png`,
    categoryIds: ['tea-coffee'],
    inStock: true,
  },
  {
    id: '7',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...',
    price: '44,50',
    cardPrice: '50,50',
    badge: '-50%',
    rating: 5,
    hasCardPrice: true,
    isFavorite: false,
    hasSaleBadge: true,
    image: `/products/product-3.png`,
    categoryIds: ['tea-coffee'],
    inStock: true,
  },
]

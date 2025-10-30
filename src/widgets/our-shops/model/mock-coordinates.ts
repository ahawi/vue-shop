interface YandexMapCoordinates {
  id: string
  coordinates: [number, number]
  title: string
}

export const mockYandexMap: YandexMapCoordinates[] = [
  {
    id: '1',
    coordinates: [53.417914, 65.325869],
    title: 'п. Щельяюр',
  },
  {
    id: '2',
    coordinates: [53.204025, 65.298894],
    title: 'д. Вертеп',
  },
  {
    id: '3',
    coordinates: [53.285251, 65.294898],
    title: 'с. Краснобор',
  },
  {
    id: '4',
    coordinates: [53.359892, 65.277609],
    title: 'д. Диюр',
  },
]

export const currencyFormatter = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB'
})

export const deliveryFormatter = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

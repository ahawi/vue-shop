export const normalizePrice = (price: string) => {
  return parseFloat(price.replace(',', '.')) || 0
}

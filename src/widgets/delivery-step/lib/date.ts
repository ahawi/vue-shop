export const isSameDay = (firstDay: Date | undefined, secondDay: Date) => {
  return (
    firstDay?.getFullYear() === secondDay.getFullYear() &&
    firstDay.getMonth() === secondDay.getMonth() &&
    firstDay.getDate() === secondDay.getDate()
  )
}

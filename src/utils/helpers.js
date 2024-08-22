import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { persianNumbers, arabicNumbers, iPhoneNumbers } from '@/constants/const'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertPersianNumberToEnglish(number) {
  Array.from(Array(10).keys()).forEach((_, i) => {
    const numbers = [persianNumbers[i], arabicNumbers[i], iPhoneNumbers[i]]
    const regexp = new RegExp(numbers.join('|'), 'g')
    number = number.replace(regexp, i)
  })
  return number
}

export function convertEnglishNumberToPersian(number) {
  return String(number).replace(
    /\d/g,
    (digit) => persianNumbers[parseInt(digit)],
  )
}

export function getDaysOfWeek(days) {
  return days.map((day) => (day === 0 ? 6 : day - 1))
}

import * as dayjs from 'dayjs'
import 'dayjs/locale/ja'

import { isDate } from './types'

export type DateIf = Date | string | number

export const getDate = (val?: any): Date => {
  if (isDate(val)) {
    return val
  }
  return val ? new Date(val) : new Date()
}

export const getNowDetail = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  return {
    now,
    year,
    month,
    date
  }
}

export const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export type DiffType = 'millisecond' | 'second' | 'minute' | 'hour'
export const getDiff = (later: DateIf, early: DateIf, type: DiffType) => dayjs(getDate(later)).diff(dayjs(getDate(early)), type)

dayjs.locale('ja')
export const getFormat = (date: DateIf, form: string = DEFAULT_FORMAT) => dayjs(getDate(date)).format(form)

export const getMidnightTime = (date: DateIf) => getDate(getFormat(date, 'YYYY-MM-DD 00:00:00'))
export const getMEndOfDateTime = (date: DateIf) => getDate(getFormat(date, 'YYYY-MM-DD 23:59:59'))

export const isSame = (date: DateIf, target: DateIf) => dayjs(getDate(date)).isSame(getDate(target))
export const isAfter = (date: DateIf, target: DateIf) => dayjs(getDate(date)).isAfter(getDate(target))
export const isBefore = (date: DateIf, target: DateIf) => dayjs(getDate(date)).isBefore(getDate(target))
export const add = (date: DateIf, value: number, unit: dayjs.OpUnitType) =>  dayjs(getDate(date)).add(value, unit)
export const unix = (date: DateIf) =>  dayjs(getDate(date)).unix()

export const getDaysOfMonth = (date: DateIf) => dayjs(getDate(date)).daysInMonth()

type Type = 'year' | 'month' | 'date'
export const getDateOfDate = (type: Type, date: DateIf): number => {
  const d = dayjs(getDate(date))
  switch (type) {
    case 'year':
      return d.year()
    case 'month':
      return d.month()
    case 'date':
      return d.date()
    default:
      return 0
  }
}

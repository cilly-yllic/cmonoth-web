import { extract, update } from '~utils/converters/extract'
import { isArray, isObject, isDate, isTimestamp, isNumberAllowString, isNumber } from '~utils/types'
import { getDate, isAfter, isBefore, getFormat } from '~utils/date'

type Key = string | number

export type ArrayMap<T> = {
  [key in Key]: T
}
//
// export const getTargetMap = <T extends { [key: string]: any }>(list: T[], target: string): Map<T> =>
//   list.reduce((acc, current) => {
//     acc[current[target]] = current
//     return acc
//   }, {} as Map<T>)

// export type Map<T> = {
//   [key in Key]: T
// }

// export const getUnique = (list: (string | number)[]) =>  [...new Set(list)]
export const getUnique = <T extends string | number>(list: T[]): T[] =>  [...new Set(list)]

export type MapType<T> = Map<string | number, T>
export const getTargetMap = <T extends { [key: string]: any }>(list: T[], target: string): MapType<T> =>
  list.reduce((acc: MapType<T>, current) => {
    acc.set(current[target], current)
    return acc
  }, new Map())

export type Chunk<T> = T[][]
export const chunk = <T = any>(list: T[], size: number): Chunk<T> =>
  list.reduce((acc, _, i, self) => (i % size ? acc : [...acc, self.slice(i, i + size)]), [] as T[][])

type Sort = 'DESC' | 'ASC'
type Type = '' | 'date'
type Result = 1 | -1

const getSortValue = (sort: Sort, val: Result): Result =>
  (sort === 'ASC' ? val : val * -1) as Result

const convertValue = (val: any) => {
  if (isTimestamp(val)) {
    // return val.toDate()
    return getDate(val.seconds * 1000)
  }
  if (isNumberAllowString(val)) {
    return Number(val)
  }
  return val
}

const compare = (_a: any, _b: any, key: string, sort: Sort): Result => {
  const a = convertValue(extract(_a, key))
  const b = convertValue(extract(_b, key))
  console.log('compare', a)
  if (isObject(a) || isObject(b)) {
    return 1
  }
  if (isDate(a) || isDate(b)) {
    if (sort === 'DESC') {
      return isAfter(a, b) ? -1 : 1
    }
    return isBefore(a, b) ? -1 : 1
  }
  return getSortValue(sort, a > b ? 1 : -1)
}

export const getSort = <T = any>(
  list: T[],
  key = '',
  sort: Sort = 'DESC',
): T[] => {
  if (!isArray(list)) {
    return list
  }
  const isObjectList = list.every(v => isObject(v))
  if (isObjectList && !key) {
    return list
  }
  if (!isObjectList && !!key) {
    return list
  }
  return [...list].sort((a, b) => compare(a, b, key, sort))
}

export interface MultiSortKey {
  key: string
  order: Sort
}

export const getMultiSort = <T = any>(
  list: T[],
  keys: MultiSortKey[]
): T[] => {
  if (!isArray(list)) {
    return list
  }
  return [...list].sort((a, b) => {
    return keys.reduce((acc, key) => {
      if (acc !== 0) {
        return acc
      }
      return compare(a, b, key.key, key.order)
    }, 0)
  })
}

const getValue = (val: any) => {
  let str = val
  if (isTimestamp(str)) {
    // str = str.toDate()
    str = getDate(str.seconds * 1000)
  }
  if (isNumber(str)) {
    return `${str}`
  }
  if (isDate(str)) {
    return getFormat(str, 'YYYY-MM-DD')
  }
  return val
}

export const getGroup = <T = any>(list: T[], keys: string[]) => {
  return JSON.parse(JSON.stringify(list)).reduce((acc: any, current: T) => {
    const valuesStr = keys.reduce((str: string[], key: string) => {
      // return `${str}.${getValue(extract(current, key))}`
      return str.concat(getValue(extract(current, key)))
    }, []).join('.')
    const data = extract(acc, valuesStr, [])
    data.push(current)
    update(acc, valuesStr, data)
    return acc
  }, {})
}

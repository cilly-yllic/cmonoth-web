import { isString, isNumber, isBoolean } from '../types'

// const validate = (text: string): RegExpMatchArray | null =>
//   text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)

export const camelCase = (text: string) =>
  `${text.charAt(0).toLowerCase()}${text.slice(1)}`.replace(/[-_](.)/g, (match, group1) => group1.toUpperCase())

export const snakeCase = (text: string) => camelCase(text).replace(/[A-Z]/g, (s) => `_${s.charAt(0).toLowerCase()}`)
// export const snakeCase = (text: string) => {
//   const match = validate(text)
//   return match ? match.map(x => x.toLowerCase()).join('_') : ''
// }

export const kebabCase = (text: string): string => camelCase(text).replace(/[A-Z]/g, (s) => `-${s.charAt(0).toLowerCase()}`)
// export const kebabCase = (text: string): string => {
//   const match = validate(text)
//   return match ? match.map(x => x.toLowerCase()).join('-') : ''
// }

export const pascalCase = (text: string) => {
  const camel = camelCase(text)
  return `${camel.charAt(0).toUpperCase()}${camel.slice(1)}`
}

export const hexdec = (stringText: string): number => {
  return parseInt(stringText.replace(/[^a-f0-9]/gi, ''), 16)
}

export const zeroFill = (value: number | string, count: number = 2): string => {
  let zeros = ''
  for (let i = 1; i <= count; i++) {
    zeros += '0'
  }
  let numbers = value
  if (typeof value === 'string') {
    numbers = value.replace(/[^-^0-9^\.]/g, '')
  }
  return (zeros + numbers).slice(-count)
}

export const getOnlyNumber = (value: string) => value.replace(/[^0-9]/g, '')

export const toString = (data: object | string | number | boolean | any[]): string => {
  if (isString(data) || isNumber(data) || isBoolean(data)) {
    return `${data}`
  }
  return JSON.stringify(data)
}

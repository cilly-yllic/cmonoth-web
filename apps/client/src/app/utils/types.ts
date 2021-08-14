export const getValueType = (value: any): string => Object.prototype.toString.call(value).slice(8, -1)

const onlyNumberReg = new RegExp(/^[0-9０-９]+$/)
const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
) // fragment locator

// export const isNumber = (value): boolean => getValueType(value) === 'Number'
export const isNumber = (value: any): boolean => getValueType(value) === 'Number' && !Number.isNaN(value)
export const isBoolean = (value: any): boolean => getValueType(value) === 'Boolean'
export const isString = (value: any): boolean => getValueType(value) === 'String'
// export const isArray = (value): boolean => getValueType(value) === 'Array'
export const isArray = (value: any): boolean => Array.isArray(value)
export const isObject = (value: any): boolean => getValueType(value) === 'Object'
export const isDate = (value: any): boolean => getValueType(value) === 'Date'
export const isUrlString = (value: string): boolean => urlPattern.test(value)
export const isOnlyNumbers = (name: string) => onlyNumberReg.test(name)
export const isNumberAllowString = (value: any) => {
  if (isNumber(value)) {
    return value - value === 0
  }
  if (isString(value) && value.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value)
  }
  return false
}

export const isTimestamp = (value: any) => {
  return isObject(value) && 'seconds' in value && 'nanoseconds' in value && isNumber(value?.seconds) && isNumber(value?.nanoseconds)
}

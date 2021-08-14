export type Data = { [key: string]: any } | undefined | null
export const extract = (
  data: Data,
  keys: string,
  dummy: any = undefined
): any => {
  if (!keys.length) {
    return dummy
  }
  if (data === undefined || data === null) {
    return dummy
  }
  return keys.split('.').reduce(
    (acc: { break: boolean, data: any }, key) => {
      if (acc.break) {
        return acc
      }
      if (!acc.data || !acc.data.hasOwnProperty(key)) {
        acc.data = dummy
        acc.break = true
        return acc
      }
      acc.data = acc.data[key]
      return acc
    },
    { break: false, data: { ...data } }
  ).data
}

export const update = (
  data: Data,
  keys: string,
  value: any,
  // dummy: any = {}
): any => {
  if (!keys.length) {
    return
  }
  if (data === undefined || data === null) {
    return
  }
  const split = keys.split('.')
  split.reduce(
    (acc: { break: boolean, data: any }, key: string, index: number) => {
      if (acc.break) {
        return acc
      }
      // if (!acc.data || !acc.data.hasOwnProperty(key)) {
      //   acc.break = true
      //   return acc
      // }
      if (!acc.data.hasOwnProperty(key) && split.length !== index + 1) {
        acc.data[key] = {}
      }
      if (split.length === index + 1) {
        acc.data[key] = value
      }
      acc.data = acc.data[key]
      return acc
    },
    { break: false, data }
  )
}

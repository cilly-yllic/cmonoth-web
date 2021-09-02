import cookies from 'js-cookie'
import { Client } from '../types/db/clients'
import { isBefore, add } from './date'
import { getUnique } from './converters/array'

// const KEYS = ['redirectUrl', 'al-group-keys']
// type Key = typeof KEYS[number]

export const KEYS = {
  redirectUrl: 0,
  alClientKeys: 1,
}

type KeysKeys = keyof typeof KEYS
export type KeysValues = typeof KEYS[KeysKeys]

const getKeyStr = (keyValue: KeysValues): KeysKeys => {
  const one = Object.entries(KEYS).find(([_, value]) => keyValue === value) as [KeysKeys, KeysValues] | undefined
  if (!one) {
    throw Error('there is no algolia keys')
  }
  return one[0]
}

const getCookieKey = (key: KeysValues) => `app-${getKeyStr(key)}`
export const getClientIdsKey = (clientIds: Client['id'][]) => getUnique(clientIds).sort().join('-')

export const get = (key: KeysValues) => cookies.get(getCookieKey(key))
export const set = (key: KeysValues, value: any, options?: cookies.CookieAttributes) =>
  cookies.set(getCookieKey(key), typeof value !== 'string' ? JSON.stringify(value) : value, options)
export const remove = (key: KeysValues) => cookies.remove(getCookieKey(key))

export const getClientsAlgoliaKey = (clientIds: Client['id'][]): { key: string | null; refresh: boolean } => {
  const clients = JSON.parse(get(KEYS.alClientKeys) || '{}')
  const uniqueIdsKey = getClientIdsKey(clientIds)
  const apiKey = uniqueIdsKey in clients ? clients[uniqueIdsKey] : null
  if (apiKey === null) {
    return {
      key: null,
      refresh: false,
    }
  }
  if (isBefore(new Date(), apiKey.validUntil * 1000)) {
    return {
      key: apiKey.key,
      refresh: false,
    }
  }
  if (isBefore(add(new Date(), 10, 'minutes').toDate(), apiKey.validUntil * 1000)) {
    return {
      key: apiKey.key,
      refresh: true,
    }
  } else {
    return {
      key: null,
      refresh: false,
    }
  }
}

interface Value {
  key: string
  validUntil: number
}

export const setAlgoliaKey = (cookieKey: KeysValues, objKey: string, value: Value, options?: cookies.CookieAttributes) => {
  const clients = JSON.parse(get(cookieKey) || '{}')
  clients[objKey] = value
  set(KEYS.alClientKeys, clients, options)
}

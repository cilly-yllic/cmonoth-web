import { Create, Get } from './common'
import { User } from './client/users'

export const COLLECTION_NAME = 'reservedClientNames'

export interface Base {
  uid: User['id']
}

export interface CreateReservedClientName extends Base, Create {}

export interface ReservedClientName extends Base, Get {
  name: string
}

export type ReservedClientNames = ReservedClientName[]

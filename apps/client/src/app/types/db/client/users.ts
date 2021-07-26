import { Update, Get, Create } from '../common'
import { Language } from '../../languages'
import { Auth } from '../../auth'
import { Client } from '../clients'

export interface Base extends Client {
  displayName: string
  email: string
  region: string
  language: Language
  selfIntroduction: string
  photoUrl: string
}

export interface CreateUser extends Base, Create {}

export interface User extends Base, Get {
  id: Auth['uid']
}

export interface AllowUpdateUser {
  displayName?: string
  email?: string
  region?: string
  language?: Language
  selfIntroduction?: string
  photoUrl?: string
}

export interface UpdateUser extends AllowUpdateUser, Update {}

export type Users = User[]

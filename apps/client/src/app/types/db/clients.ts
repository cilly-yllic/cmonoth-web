// import { Update } from '~types/common'
import { Auth } from '../auth'
// import { TimeStamp } from '~utils/firebase/firestore'

export const COLLECTION_NAME = 'clients'

export enum Types {
  user = 'user',
  organization = 'org',
}

export type Type = Types.user | Types.organization

export interface Client {
  id: Auth['uid']
  type: Type
  name: string

  // // --- user
  // displayName?: string
  // email?: string
  // region?: string
  // language?: Language
  // self_introduction?: string
  // is_admin?: boolean
  //
  // // --- organization
  // subdomain?: string
  // created_user_id?: User['uid']
  // domain_whitelist?: string // xx,xx,xx,...
  // ip_whitelist?: string // ipv6,ipv6,...
  // is_invite_only?: boolean
  // icon_path?: string

  [key: string]: any
}

// export interface AllowUpdateClient {
//   email?: string
//   displayName?: string
//   region?: string
//   language?: Language
//   selfIntroduction?: string
//   photoUrl?: string
//   // updatedAt?: string | TimeStamp
// }
//
// export interface UpdateClient extends AllowUpdateClient, Update {}

export type Clients = Client[]

import { Update, Get, Create } from '../common'
import { Client } from '../clients'
import { User } from './users'

export interface Base extends Client{
  subdomain: string
  createdUserId: User['id']
  domainWhitelist: string // xx,xx,xx,...
  ipWhitelist: string // ipv6,ipv6,...
  isInviteOnly: boolean
  iconPath: string
}

export interface CreateOrganization extends Base, Create {}

export interface Organization extends Base, Get {
  id: string
}

export interface AllowUpdateOrganization {
  subdomain?: string
  createdUserId?: User['id']
  domainWhitelist?: string // xx,xx,xx,...
  ipWhitelist?: string // ipv6,ipv6,...
  isInviteOnly?: boolean
  iconPath?: string
}

export interface UpdateOrganization extends AllowUpdateOrganization, Update {}

export type Organizations = Organization[]

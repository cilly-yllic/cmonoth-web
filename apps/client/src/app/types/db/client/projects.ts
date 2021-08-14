import { Create, Update, Get } from '~types/db/common'
import { User } from '~types/db/client/users'

export const COLLECTION_NAME = 'projects'

interface Base {
  createdUserId: User['id']
  name: string
  color: string
  iconPath: string
  description: string
  isOpen: boolean
  slackUrl: string
  restriction: string
}

export interface CreateProject extends Base, Create {
}

export interface Project extends Base, Get {
  id: string
}

export interface AllowUpdateProject {
  name?: string
  color?: string
  iconPath?: string
  description?: string
  isOpen?: boolean
  slackUrl?: string
  restriction?: string
}

export interface UpdateProject extends AllowUpdateProject, Update {}

export type Projects = Project[]


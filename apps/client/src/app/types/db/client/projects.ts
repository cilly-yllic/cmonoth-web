import { Create, Update, Get, Timestamp, FieldValue } from '~types/db/common'
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

export interface AllowCreateProject extends Base {
  updatedTaskAt: FieldValue | Date | null
}
export interface CreateProject extends AllowCreateProject, Create {
}

export interface Project extends Base, Get {
  id: string
  updatedTaskAt: Timestamp | null
}

export interface AllowUpdateProject {
  name?: string
  color?: string
  iconPath?: string
  description?: string
  isOpen?: boolean
  slackUrl?: string
  restriction?: string
  updatedTaskAt?: FieldValue | Date | null
}

export interface UpdateProject extends AllowUpdateProject, Update {}

export type Projects = Project[]


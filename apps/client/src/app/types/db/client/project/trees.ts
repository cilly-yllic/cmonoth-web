import { Create, Update, Get, Timestamp, FieldValue } from '~types/db/common'
import { User } from '~types/db/client/users'
import { Project } from '~types/db/client/projects'

export const COLLECTION_NAME = 'trees'

interface Base {
  createdUserId: User['id']
  name: string
  description: string
  isOpen: boolean
}

export interface AllowCreateTree extends Base {
  updatedTaskAt: FieldValue | Date | null
}

export interface CreateTree extends AllowCreateTree, Create {
}

export interface Tree extends Base, Get {
  id: string
  projectId: Project['id']
  updatedTaskAt: Timestamp | null
}

export interface AllowUpdateTree {
  name?: string
  description?: string
  isOpen?: boolean
  updatedTaskAt?: FieldValue | Date | null
}

export interface UpdateTree extends AllowUpdateTree, Update {}

export type Trees = Tree[]

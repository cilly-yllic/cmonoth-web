import { Create, Update, Get } from '~types/db/common'
import { User } from '~types/db/client/users'
import { Project } from '~types/db/client/projects'

export const COLLECTION_NAME = 'trees'

interface Base {
  createdUserId: User['id']
  name: string
  description: string
  isOpen: boolean
}

export interface CreateTree extends Base, Create {
}

export interface Tree extends Base, Get {
  id: string
  projectId: Project['id']
}

export interface AllowUpdateTree {
  name?: string
  description?: string
  isOpen?: boolean
}

export interface UpdateTree extends AllowUpdateTree, Update {}

export type Trees = Tree[]

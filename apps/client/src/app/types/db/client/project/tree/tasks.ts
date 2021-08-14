import { Create, Update, Get, Timestamp } from '~types/db/common'
import { User } from '~types/db/client/users'
import { Label } from '~types/db/client/labels'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'

export const COLLECTION_NAME = 'tasks'

// --- tasks
interface Base {
  createdUserId: User['id']
  name: string
  description: string
  deadline: string | null
  progressStatus: string
  isOpen: boolean
  assignUsers: User['id'][]
  labels: Label['id'][]
}

export interface CreateTask extends Base, Create {}

export interface Task extends Base, Get {
  id: string
  projectId: Project['id']
  treeId: Tree['id']
}

export interface AllowUpdateTask {
  name?: string
  description?: string
  deadline?: Timestamp | null
  progressStatus?: string
  isOpen?: boolean
  assignUsers?: User['id'][]
  labels?: Label['id'][]
}

export interface UpdateTask extends AllowUpdateTask, Update {}

// --- structure
interface StructureBase {
  json: string
}

export interface CreateOrUpdateStructure extends StructureBase {
  createdAt?: Create['createdAt']
  updatedAt?: Update['updatedAt']
}

export interface Structure extends StructureBase, Get {
  id: string
  json: string
}

export interface AllowUpdateStructure {
  json?: string
}

export interface UpdateStructure extends AllowUpdateStructure, Update {}


// --- tasks
export type Tasks = [...Task[], Structure]

import { Task } from '~types/db/client/project/tree/tasks'

export interface StructureRowTask {
  id: Task['id']
  children: Task['id'][]
}

export type StructureRow = StructureRowTask[]

export type Structure = StructureRow[]

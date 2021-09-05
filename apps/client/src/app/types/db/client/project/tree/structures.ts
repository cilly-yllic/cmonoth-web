import { Task } from '~types/db/client/project/tree/tasks'

export interface StructureRowTask {
  num: Task['incrementNum']
  children: Task['incrementNum'][]
}

export type StructureRow = StructureRowTask[]

export type Structure = StructureRow[]

import { Create, Get, Update } from '../common'

export const COLLECTION_NAME = 'collaborators'

export type Status = 'requested' | 'accepted'

export interface Base {
  status: Status
}

export interface CreateCollaborator extends Base, Create {}

export interface Collaborator extends Base, Get {
  id: string
}

export interface AllowUpdateCollaborator {
  status?: Status
}

export interface UpdateCollaborator extends AllowUpdateCollaborator, Update {}

export type Collaborators = Collaborator[]

import { Create, Update, Get } from '~types/db/common'
import { User } from '~types/db/client/users'

export const COLLECTION_NAME = 'comments'
export type Type = 'comment' | 'log'

interface Base {
  postedUserId: User['id']
  type: Type
  text: string
}

export interface AllowCreateComment extends Base {}
export interface CreateComment extends AllowCreateComment, Create {}

export interface Comment extends Base, Get {
  id: string
}

export interface AllowUpdateComment {
  text?: string
}

export interface UpdateComment extends AllowUpdateComment, Update {}

export type Comments = Comment[]

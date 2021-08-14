import { Create, Update, Get } from '~types/db/common'

interface Base {
  value: string
  color: string
  description: string
}

export interface CreateLabel extends Base, Create {
}

export interface Label extends Base, Get {
  id: string
}

export interface AllowUpdateLabel {
  value?: string
  color?: string
  description?: string
}

export interface UpdateLabel extends AllowUpdateLabel, Update {}

export type Labels = Label[]

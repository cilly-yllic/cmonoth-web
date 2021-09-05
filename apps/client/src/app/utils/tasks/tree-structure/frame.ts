import { Structure } from '~types/db/client/project/tree/structures'
import { getFrameHeight, getFrameWidth } from './config'

export interface Frame {
  top: number
  left: number
  width: number
  height: number
}

export const get = (rows: Structure, ratio: number = 1) => {
  const maxCount = rows.reduce((acc, current) => {
    const count = current.length
    return acc < count ? count : acc
  }, 0)
  const width = getFrameWidth(maxCount, ratio)
  const height = getFrameHeight(rows.length, ratio)
  return {
    top: 0,
    left: 0,
    width,
    height,
  }
}

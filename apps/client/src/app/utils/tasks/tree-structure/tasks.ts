import { Task } from '~types/db/client/project/tree/tasks'
import { StructureRowTask, Structure } from '~types/db/client/project/tree/structures'
import { TASKS } from '~configs'
import { FIRST_ROW_TASK_CARD_TOP, EACH_TASK_CARD_WITH_MARGIN_HEIGHT, getFrameWidth } from './config'
import { MapType } from '~utils/converters/array'
import { Position } from './interface'

export interface TaskPosition extends Task, Position {
  children: StructureRowTask['children']
}

export interface CreateTaskAreaPosition extends Position {
  parent: TaskPosition
  child: TaskPosition | null
}

export type TaskPositions = TaskPosition[]

const getTop = (current: number, ratio: number) =>
  (current === 0 ? FIRST_ROW_TASK_CARD_TOP : current + EACH_TASK_CARD_WITH_MARGIN_HEIGHT) * ratio

export const get = (taskGroup: MapType<Task>, rows: Structure, ratio: number = 1): TaskPositions => {
  let top = 0
  const tasks: TaskPositions = []
  const maxCount = rows.reduce((acc, current) => {
    const count = current.length
    return acc < count ? count : acc
  }, 0)
  const width = getFrameWidth(maxCount, ratio)
  rows.forEach((row) => {
    top = getTop(top, ratio)
    const eachWidth = width / row.length
    row.forEach(({ num, children }, i) => {
      const left = eachWidth * (i + 0.5)
      const task = taskGroup.get(num) as Task
      tasks.push({
        ...task,
        top,
        left,
        width: TASKS.TREE_STRUCTURE.CARD.WIDTH * ratio,
        height: TASKS.TREE_STRUCTURE.CARD.HEIGHT * ratio,
        children,
      })
    })
  })
  return tasks
}

export const getCreateTaskAreaPosition = (parent: TaskPosition, child?: TaskPosition | null, ratio: number = 1): CreateTaskAreaPosition => {
  if (child) {
    return {
      parent,
      child,
      top: (parent.top + child.top) / 2,
      left: (parent.left + child.left) / 2,
      width: TASKS.TREE_STRUCTURE.CARD.WIDTH * ratio,
      height: TASKS.TREE_STRUCTURE.CARD.HEIGHT * ratio,
    }
  } else {
    return {
      parent,
      child: null,
      top: parent.top + TASKS.TREE_STRUCTURE.CARD.HEIGHT + TASKS.TREE_STRUCTURE.MARGIN.ROW / 2,
      left: parent.left + TASKS.TREE_STRUCTURE.CARD.WIDTH / 2,
      width: TASKS.TREE_STRUCTURE.CARD.WIDTH * ratio,
      height: TASKS.TREE_STRUCTURE.CARD.HEIGHT * ratio,
    }
  }
}

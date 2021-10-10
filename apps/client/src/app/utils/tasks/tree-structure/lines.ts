import { TASKS } from '~configs'
import { TaskPosition, CreateTaskAreaPosition } from './tasks'
import { Position } from './interface'

interface XY {
  X: number
  Y: number
}

export interface LineIf {
  stroke: string
  M: XY
  C: {
    second: XY
    middle: XY
    end: XY
  }
  d: string
}

export interface Line extends LineIf {
  parentTask: TaskPosition
  childTask: TaskPosition | null
}

const LINE = (): LineIf => ({
  stroke: TASKS.TREE_STRUCTURE.STROKES.DEFAULT,
  M: { X: 50, Y: 0 },
  C: {
    second: { X: 50, Y: 13 },
    middle: { X: 50, Y: 26 },
    end: { X: 50, Y: 40 },
  },
  d: '',
})

const D = (line: LineIf): void => {
  const m = `M${line.M.X} ${line.M.Y}`
  const c = `C${line.C.second.X} ${line.C.second.Y} ${line.C.middle.X} ${line.C.middle.Y} ${line.C.end.X} ${line.C.end.Y}`
  line.d = `${m} ${c}`
}

const C = (line: LineIf): void => {
  const CSecondXRate = 1 / 11
  const CMiddleXRate = 10 / 11

  const CSecondYRate = 6 / 11
  const CMiddleYRate = 6 / 11

  const diffX = line.M.X - line.C.end.X
  const diffY = line.M.Y - line.C.end.Y

  if (line.M.X > line.C.end.X) {
    line.C.second.X = line.M.X - Math.abs(diffX) * CSecondXRate
    line.C.middle.X = line.M.X - Math.abs(diffX) * CMiddleXRate
  } else {
    line.C.second.X = line.M.X + Math.abs(diffX) * CSecondXRate
    line.C.middle.X = line.M.X + Math.abs(diffX) * CMiddleXRate
  }

  line.C.second.Y = line.M.Y + Math.abs(diffY) * CSecondYRate

  line.C.middle.Y = line.M.Y + Math.abs(diffY) * CMiddleYRate
}

const geStartAndEnd = <T extends Position = Position>(parentTask: T, childTask: T, line: LineIf): LineIf => {
  line.M.X = parentTask.left + parentTask.width / 2
  line.M.Y = parentTask.top + parentTask.height

  line.C.end.X = childTask.left + childTask.width / 2
  line.C.end.Y = childTask.top
  return line
}

export const get = (parentTask: TaskPosition, childTask: TaskPosition): Line => {
  const line = geStartAndEnd(parentTask, childTask, LINE())
  C(line)
  D(line)
  return {
    ...line,
    parentTask,
    childTask,
  }
}

export interface MiddlePoint extends Line {
  top: number
  left: number
}

export const getLineMiddlePoint = <T extends Line>(line: T): MiddlePoint => {
  return {
    ...line,
    top: (line.C.second.Y + line.C.middle.Y) / 2 - 20,
    left: (line.C.second.X + line.C.middle.X) / 2 - 20,
  }
}

export const getNewLine = (parentTask: TaskPosition, childTask: Position): Line => {
  const line = geStartAndEnd(parentTask, childTask, LINE())
  C(line)
  D(line)
  return {
    ...line,
    parentTask,
    childTask: null,
  }
}

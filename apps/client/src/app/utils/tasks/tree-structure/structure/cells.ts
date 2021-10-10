import { Cells } from './interface'

export const isParent = (cell: Cells.Cell, num: Cells.Cell.Num) => cell.children.includes(num)

export const getDepth = (cells: Cells.Cell.Info[]) => {
  return cells.reduce((acc: number, cell) => {
    return cell.row > acc ? cell.row : acc
  }, 0) + 1
}


type Data = {
  num: Cells.Cell.Num
}

export const getUnique = <T extends Data>(list: T[]) => {
  return list.filter((cell, i, self) => self.findIndex((s) => s.num === cell.num) === i)
}

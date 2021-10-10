import { Columns, Parent } from './interface'
import { isParent } from './cells'

// export const getAllNums = (columns: Columns) => {
//   return columns.map((cell) => cell.num)
// }

export const getAllCells = (row: Parent['row'], columns: Columns): Columns.Column.Cell.Info[] => {
  return columns.map(
    (cell, column) => ({
      row,
      column,
      cell,
      num: cell.num
    })
  )
}

export const getParentsByNum = (row: Parent['row'], columns: Columns, num: Columns.Column.Cell.Num) => {
  return columns.reduce((acc: Parent[], cell, column) => {
    if (isParent(cell, num)) {
      acc.push({
        row,
        column,
        cell,
        num: cell.num
      })
    }
    return acc
  }, [])
}

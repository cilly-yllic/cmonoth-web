import { Rows, Child, Index, Cells } from './interface'

export const putChildren = (rows: Rows, row: Index, column: Index, num: Cells.Cell.Num) => {
  rows[row][column].children.push(num)
}

export const remove = (rows: Rows, num: Child['num']) => {
  rows.forEach((row) => {
    row.forEach((column) => {
      const index = column.children.findIndex((n) => n === num)
      if (index === -1) {
        return
      }
      column.children.splice(index, 1)
    })
  })
  return rows
}

export const removeFromParent = (rows: Rows, parentNum: Rows.Row.Column.Cell.Num, num: Child['num']) => {
  rows.forEach((row) => {
    row.forEach((column) => {
      if (column.num !== parentNum) {
        return
      }
      const index = column.children.findIndex((n) => n === num)
      if (index === -1) {
        return
      }
      column.children.splice(index, 1)
    })
  })
  return rows
}

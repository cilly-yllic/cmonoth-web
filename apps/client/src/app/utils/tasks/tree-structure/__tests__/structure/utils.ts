import { Rows, Cells } from '../../structure/interface'

export const sort = (rows: Rows) => {
  return rows.map(
    (columns) => columns.map((cell) => ({
      ...cell,
      children: cell.children.sort((a: number, b: number) => a - b)
    }))
  )
}

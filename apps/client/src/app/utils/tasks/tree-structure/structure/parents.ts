import { Rows, Parent } from './interface'
import { remove as removeFromChildren } from './children'
import { getPositionByNum } from './rows'

// export const remove = (rows: Rows, num: Parent['num']) => {
//   removeFromChildren(rows, num)
//   const indexes = getPositionByNum(rows, num)
//   if (indexes.row !== null && indexes.column !== null) {
//     rows[indexes.row].splice(indexes.column, 1)
//   }
//   return rows
// }

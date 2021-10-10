import { Rows, Parent, Child, Index, Cells } from './interface'
import { getParentsByNum as getColumnsParentsByNum, getAllCells as getAllColumnCells } from './columns'
import { remove as removeFromChildren, putChildren } from './children'
import { getDepth, getUnique as getUniqueCells } from './cells'
import { getDeepCopy } from '~utils/copy'
import { getUnique } from '~utils/converters/array'

export const getAllCells = (rows: Rows) => {
  return rows.reduce((acc: Cells.Cell.Info[], row, i) => {
    return acc.concat(getAllColumnCells(i, row))
  }, [])
}

export const getParentsByNum = (rows: Rows, num: Rows.Row.Column.Cell.Num) => {
  return rows.reduce((acc: Parent[], columns, row) => {
    return acc.concat(getColumnsParentsByNum(row, columns, num))
  }, [])
}

export const getAncestors = (rows: Rows, nums: Rows.Row.Column.Cell.Num[], stack: Parent[] = []): Parent[] => {
  const parents = nums.reduce((acc: Parent[], num) => {
    return getUniqueCells(acc.concat(getParentsByNum(rows, num)))
  }, [])
  stack = getUniqueCells(stack.concat(parents))
  if (parents.length) {
    return getAncestors(rows, parents.map((parent) => parent.num), stack)
  }
  return stack
}

// export const isAlreadyBelongsToParent = (rows: Rows, num: Cells.Cell.Num, parentNum: Cells.Cell.Num) => {
//   const ancestors = getAncestors(rows, [num])
//   return ancestors.some((ancestor) => ancestor.num === parentNum)
// }

export const getCellsByNums = (currentRows: Rows, afterRows: Rows, row: Rows.Row.Column.Cell.Info['row'], columns: Rows.Row.Columns, nums: Rows.Row.Column.Cell.Num[], parents: Parent[]) => {
  return columns.reduce((acc: Child[], cell, column) => {
    if (nums.some((num) => num === cell.num)) {
      const afterParents = getParentsByNum(afterRows, cell.num)
      const ancestors = getAncestors(currentRows, afterParents.map((parent) => parent.num))
      const nextParent = parents.filter((parent) => ancestors.every((ancestor) => parent.num !== ancestor.num))
      const depth = getDepth(getUniqueCells(nextParent.concat(afterParents)))
      acc.push({
        row,
        column,
        depth,
        num: cell.num,
        cell,
        parents: nextParent
      })
    }
    return acc
  }, [])
}

const getCellsByRows = (currentRows: Rows, afterRows: Rows, nums: Rows.Row.Column.Cell.Num[], parents: Parent[]) => {
  return currentRows.reduce((acc: Child[], columns: Rows.Row.Columns, row) => {
    return acc.concat(getCellsByNums(currentRows, afterRows, row, columns, nums, parents))
  }, [])
}

const getChildrenNums = (rows: Rows, num: Rows.Row.Column.Cell.Num) => {
  return rows.reduce((acc: Rows.Row.Column.Cell.Num[], columns: Rows.Row.Columns, row) => {
    const column = columns.find((cell) => cell.num === num)
    if (!column) {
      return acc
    }
    return acc.concat(column.children)
  }, [])
}

export const getChildrenOfNum = (rows: Rows, num: Rows.Row.Column.Cell.Num, parents: Parent[], isRemove = true) => {
  const childNums = getChildrenNums(rows, num)
  return getCellsByRows(rows, isRemove ? remove(getDeepCopy<Rows>(rows), num) : rows, childNums, parents)
}

export const getGrandchildren = (rows: Rows, nums: Rows.Row.Column.Cell.Num[], stack: Rows.Row.Column.Cell.Num[] = []): Rows.Row.Column.Cell.Num[] => {
  const childNums = nums.reduce((acc: Rows.Row.Column.Cell.Num[], num) => {
    return getUnique(acc.concat(getChildrenNums(rows, num)))
  }, [])
  stack = getUnique(stack.concat(childNums))
  if (childNums.length) {
    return getGrandchildren(rows, childNums, stack)
  }
  return stack
}

export const getPositionByNum = (rows: Rows, taskNum: Rows.Row.Column.Cell.Num) =>
  rows.reduce(
    (acc: Rows.Row.Column.Cell.Position, current, row) => {
      const column = current.findIndex((column) => column.num === taskNum)
      if (column !== -1) {
        return { row, column }
      }
      return acc
    }, { row: null, column: null })

export const remove = (rows: Rows, num: Parent['num']) => {
  removeFromChildren(rows, num)
  const indexes = getPositionByNum(rows, num)
  if (indexes.row !== null && indexes.column !== null) {
    rows[indexes.row].splice(indexes.column, 1)
  }
  return rows
}

const removeAndGetColumn = (rows: Rows, num: Rows.Row.Column.Cell.Num) => {
  const indices = getPositionByNum(rows, num)
  if (indices.row === null || indices.column === null) {
    return null
  }
  const column = rows[indices.row][indices.column]
  rows[indices.row].splice(indices.column, 1)
  return column
}

export const move = (rows: Rows, children: Child[]) => {
  children.forEach((child) => {
    const indexes = getPositionByNum(rows, child.num)
    if (indexes.row !== null && indexes.column !== null) {
      rows[indexes.row].splice(indexes.column, 1)
    }
    if (!(child.depth in rows)) {
      rows[child.depth] = []
    }
    rows[child.depth].push(child.cell)
  })
}

export const moveToNextRow = (rows: Rows, parentNum: Parent['num'], num: Rows.Row.Column.Cell.Num) => {
  const column = removeAndGetColumn(rows, num)
  addChild(rows, parentNum, num)
  column?.children.forEach((n) => {
    moveToNextRow(rows, num, n)
  })
}

export const putChildrenToParents = (rows: Rows, children: Child[]) => {
  children.forEach((child) => {
    child.parents.forEach((parent) => {
      putChildren(rows, parent.row, parent.column, child.num)
    })
  })
}

const getUpdatedRowIndices = (rows: Rows, indices: Rows.Row.Column.Cell.Position): Rows.Row.Column.Cell.Position => {
  if (indices.row === null || indices.column === null) {
    return { row: null, column: null }
  }
  // 所属タスクの次のindex以降にchild設定されたタスクが存在しているか
  const childColumn = rows[indices.row].find((column, i) => {
    if (i <= (indices.column as number)) {
      return
    }
    return column.children.length >= 1
  })
  const taskRow = indices.row + 1
  let taskColumn = rows[taskRow] ? rows[taskRow].length : 0 // default
  if (childColumn) {
    const indexes = getPositionByNum(rows, childColumn.children[0])
    if (indexes.column !== null) {
      taskColumn = indexes.column
    }
  }
  return { row: taskRow, column: taskColumn }
}

export const removeNumFromChildren = (rows: Rows, num: Rows.Row.Column.Cell.Num, removeNum: Rows.Row.Column.Cell.Num) => {
  const indices = getPositionByNum(rows, num)
  if (indices.row === null || indices.column === null) {
    return rows
  }
  const removeNumIndex = rows[indices.row][indices.column].children.findIndex((n) => n === removeNum)
  if (removeNumIndex === -1) {
    return rows
  }
  rows[indices.row][indices.column].children.splice(removeNumIndex, 1)
  return rows
}

export const addChild = (rows: Rows, parentNum: Rows.Row.Column.Cell.Num, newNum: Rows.Row.Column.Cell.Num) => {
  const indices = getPositionByNum(rows, parentNum)
  if (indices.row === null || indices.column === null) {
    return rows
  }
  const { row, column } = getUpdatedRowIndices(rows, indices)
  if (row === null || column === null) {
    return rows
  }
  rows[indices.row][indices.column].children.push(newNum)
  if (!rows[row]) {
    rows[row] = []
  }
  rows[row].splice(column, 0, { num: newNum, children: [] })
  return rows
}

import { Rows, Cells, Child } from './interface'
import { getUnique } from '~utils/converters/array'
import {
  getParentsByNum, getChildrenOfNum, remove as removeFromParents, move as moveRow, putChildrenToParents,
  moveToNextRow, addChild, removeNumFromChildren,
  getAllCells, getGrandchildren, getAncestors
} from './rows'
import { removeFromParent, putChildren } from './children'

// TODO 改善
export const removeNum = (rows: Rows, nums: Cells.Cell.Num[], isNested = false): Rows => {
  let childrenStack: Child[] = []
  nums.forEach((num) => {
    const parents = getParentsByNum(rows, num) // *2
    const children = getChildrenOfNum(rows, num, parents, !isNested) // *3 *4
    if (!isNested) {
      removeFromParents(rows, num)
    }
    putChildrenToParents(rows, children)
    moveRow(rows, children.filter((child) => child.row !== child.depth))
    childrenStack = childrenStack.concat(children)
  })
  if (childrenStack.length) {
    return removeNum(rows, getUnique(childrenStack.map((child) => child.num)), true)
  }
  return rows
}

export const addMiddle = (rows: Rows, parentNum: Cells.Cell.Num, newNum: Cells.Cell.Num, childNum?: Cells.Cell.Num) => {
  if (childNum) {
    removeNumFromChildren(rows, parentNum, childNum)
  }
  addChild(rows, parentNum, newNum)
  if (childNum) {
    moveToNextRow(rows, newNum, childNum)
  }
  return rows
}

export const cutRelation = (rows: Rows, num: Cells.Cell.Num, parentNum: Cells.Cell.Num) => {
  const parents = getParentsByNum(rows, num)
  if (parents.length <= 1) {
   throw new Error('at least two parent')
  }
  return removeFromParent(rows, parentNum, num)
}


export const addParent = (rows: Rows, num: Cells.Cell.Num, parentNum: Cells.Cell.Num) => {
  const allCells = getAllCells(rows)
  const parents = getParentsByNum(rows, num)
  const targetParent = allCells.find((cell) => cell.num === parentNum)
  if (targetParent) {
    putChildren(rows, targetParent.row, targetParent.column, num)
  }
  parents.forEach((parent) => {
    const parentAncestors = getAncestors(rows, [parent.num])
    if (parentAncestors.some((parentAncestor) => parentAncestor.num === parentNum)) {
      removeFromParent(rows, parent.num, num)
    }
    const parentGrandchildNums = getGrandchildren(rows, [parent.num])
    if (parentGrandchildNums.some((parentGrandchildNum) => parentGrandchildNum === parentNum)) {
      removeFromParent(rows, parent.num, num)
    }
  })
  // removeNum(rows, [parentNum], true)
  const grandchildren = getGrandchildren(rows, [num])
  const ancestors = getAncestors(rows, [num])
  grandchildren.forEach((grandchild) => {
    const removeChildParents = getParentsByNum(rows, grandchild).filter((childParent) => {
      if (childParent.num === num) {
        return false
      }
      return ancestors.some((ancestor) => ancestor.num === childParent.num)
    })
    removeChildParents.forEach((removeChildParent) => {
      removeFromParent(rows, removeChildParent.num, grandchild)
    })
  })
  return removeNum(rows, [parentNum], true)
}

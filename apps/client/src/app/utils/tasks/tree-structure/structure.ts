import { Task } from '~types/db/client/project/tree/tasks'
import { Structure } from '~types/db/client/project/tree/structures'

interface RowColumnIndex {
  rowIndex: number | null
  columnIndex: number | null
}

// TODO method名決め直し

const findTaskNumIndexesFromStructure = (structure: Structure, num: Task['incrementNum']) =>
  structure.reduce(
    (acc, current, rowIndex) => {
      const columnIndex = current.findIndex((column) => column.num === num)
      if (columnIndex !== -1) {
        return { rowIndex, columnIndex }
      }
      return acc
    },
    { rowIndex: null, columnIndex: null } as RowColumnIndex
  )

const getUpdateStructureIndexes = (structure: Structure, rowIndex: number | null, columnIndex: number | null) => {
  if (rowIndex === null || columnIndex === null) {
    return { rowIndex: null, columnIndex: null }
  }
  // 所属タスクの次のindex以降にchild設定されたタスクが存在しているか
  const hasChildColumn = structure[rowIndex].find((column, i) => {
    if (i <= columnIndex) {
      return
    }
    return column.children.length >= 1
  })
  const addTaskRowIndex = rowIndex + 1
  let addTaskColumnIndex = structure[addTaskRowIndex] ? structure[addTaskRowIndex].length : 0 // default
  if (hasChildColumn) {
    const nextTaskNumOfAddTask = hasChildColumn.children[0]
    const indexes = findTaskNumIndexesFromStructure(structure, nextTaskNumOfAddTask)
    if (indexes.columnIndex !== null) {
      addTaskColumnIndex = indexes.columnIndex
    }
  }
  return { rowIndex: addTaskRowIndex, columnIndex: addTaskColumnIndex }
}

const addChild = (structure: Structure, parentTaskNum: Task['incrementNum'], newTaskNum: Task['incrementNum']) => {
  const indexes = findTaskNumIndexesFromStructure(structure, parentTaskNum)
  if (indexes.rowIndex === null || indexes.columnIndex === null) {
    return structure
  }
  const { rowIndex, columnIndex } = getUpdateStructureIndexes(structure, indexes.rowIndex, indexes.columnIndex)
  if (rowIndex === null || columnIndex === null) {
    return structure
  }
  structure[indexes.rowIndex][indexes.columnIndex].children.push(newTaskNum)
  if (!structure[rowIndex]) {
    structure[rowIndex] = []
  }
  structure[rowIndex].splice(columnIndex, 0, { num: newTaskNum, children: [] })
  return structure
}

const removeTaskNumFromTargetTaskChildren = (structure: Structure, targetTaskNum: Task['incrementNum'], removeTaskNum: Task['incrementNum']) => {
  const { rowIndex, columnIndex } = findTaskNumIndexesFromStructure(structure, targetTaskNum)
  if (rowIndex === null || columnIndex === null) {
    return structure
  }
  const removeTaskNumIndex = structure[rowIndex][columnIndex].children.findIndex((num) => num === removeTaskNum)
  if (removeTaskNumIndex === -1) {
    return structure
  }
  structure[rowIndex][columnIndex].children.splice(removeTaskNumIndex, 1)
  return structure
}

const removeAnfGetData = (structure: Structure, taskNum: Task['incrementNum']) => {
  const { rowIndex, columnIndex } = findTaskNumIndexesFromStructure(structure, taskNum)
  if (rowIndex === null || columnIndex === null) {
    return null
  }
  const column = structure[rowIndex][columnIndex]
  structure[rowIndex].splice(columnIndex, 1)
  return column
}

const moveToNextRow = (structure: Structure, parentTaskNum: Task['incrementNum'], taskNum: Task['incrementNum']) => {
  const column = removeAnfGetData(structure, taskNum)
  addChild(structure, parentTaskNum, taskNum)
  column?.children.forEach((num) => {
    moveToNextRow(structure, taskNum, num)
  })
}

const removeFromChildren = (structure: Structure, taskNum: Task['incrementNum']) => {
  structure.forEach((row) => {
    row.forEach((column) => {
      const index = column.children.findIndex((num) => num === taskNum)
      if (index === -1) {
        return
      }
      column.children.splice(index, 1)
    })
  })
}

export const addMiddle = (structure: Structure, parentTaskNum: Task['incrementNum'], newTaskNum: Task['incrementNum'], childTaskNum?: Task['incrementNum']) => {
  if (childTaskNum) {
    removeTaskNumFromTargetTaskChildren(structure, parentTaskNum, childTaskNum)
  }
  addChild(structure, parentTaskNum, newTaskNum)
  if (childTaskNum) {
    moveToNextRow(structure, newTaskNum, childTaskNum)
  }
  return structure
}

export const remove = (structure: Structure, taskNum: Task['incrementNum']) => {
  removeFromChildren(structure, taskNum)
  const indexes = findTaskNumIndexesFromStructure(structure, taskNum)
  if (indexes.rowIndex === null || indexes.columnIndex === null) {
    return structure
  }
  structure[indexes.rowIndex].splice(indexes.columnIndex, 1)
  return structure
}

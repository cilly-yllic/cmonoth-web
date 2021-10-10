import { StructureRowTask } from '~types/db/client/project/tree/structures'

type Cell = StructureRowTask
export type Cells = Cell[]
type Column = Cell
export type Columns = Column[]
type Row =  Columns
export type Rows = Row[]

export type Index = number

export declare namespace Cells {
  type Cell = StructureRowTask
  namespace Cell {
    type Num = Cell['num']
    type Children = Cell['children']
    interface Info {
      row: Index
      column: Index
      num: Cell['num']
      cell: Cell
    }
    interface Position {
      row: Index | null
      column: Index | null
    }
  }
}

export type Parent = Cells.Cell.Info
export interface Child extends Cells.Cell.Info {
  depth: Index
  parents: Cells.Cell.Info[]
}

export declare namespace Columns {
  type Column = Cell
  namespace Column {
    type Cells = Cell[]
    type Cell = StructureRowTask
    namespace Cell {
      type Num = Cell['num']
      type Children = Cell['children']
      interface Info {
        row: Index
        column: Index
        num: Cell['num']
        cell: Cell
      }
      interface Position {
        row: Index | null
        column: Index | null
      }
    }
  }
}

export declare namespace Rows {
  type Row = Column[]
  namespace Row {
    type Columns = Column[]
    type Column = Cell
    namespace Column {
      type Cells = Cell[]
      type Cell = StructureRowTask
      namespace Cell {
        type Num = Cell['num']
        type Children = Cell['children']
        interface Info {
          row: Index
          column: Index
          num: Cell['num']
          cell: Cell
        }
        interface Position {
          row: Index | null
          column: Index | null
        }
      }
    }
  }
}

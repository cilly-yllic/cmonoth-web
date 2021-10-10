import { getGrandchildren } from '../../structure/rows'
import { Rows, Cells } from '../../structure/interface'

describe('Format: object', () => {
  const rows: Rows = [
    [
      { num: 1, children: [2, 3] } //
    ],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6] } //
    ],
    [
      { num: 4, children: [7, 8] },
      { num: 5, children: [8, 9] },
      { num: 6, children: [9, 10] }
    ],
    [
      { num: 7, children: [11,12] },
      { num: 8, children: [12,13] },
      { num: 9, children: [13,14] },
      { num: 10, children: [14,15] }
    ],
    [
      { num: 11, children: [] },
      { num: 12, children: [] },
      { num: 13, children: [] },
      { num: 14, children: [] },
      { num: 15, children: [] },
    ]
  ]
  const expects: Cells.Cell.Num[] = [5,6,8,9,10,12,13,14,15]
  it('should be equal', () => {
    expect(JSON.stringify(getGrandchildren(rows, [3]))).toBe(JSON.stringify(expects))
  })
})

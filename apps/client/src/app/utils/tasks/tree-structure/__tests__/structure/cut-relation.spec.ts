import { cutRelation } from '../../structure'
import { Structure, StructureRow, StructureRowTask } from '../../../../../types/db/client/project/tree/structures'

describe('Format: object', () => {
  const structure: Structure = [
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
  const expects: Structure = [
    [
      { num: 1, children: [2, 3] } //
    ],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6] } //
    ],
    [
      { num: 4, children: [7, 8] },
      { num: 5, children: [9] },
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
  it('should be equal', () => {
    // expect(JSON.stringify(expects)).toBe(JSON.stringify(cutRelation(structure, 5, 8)))
    expect(JSON.stringify(cutRelation(structure, 8, 5))).toBe(JSON.stringify(expects))
  })
})

describe('Format: object', () => {
  const structure: Structure = [
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
  it('should be equal', () => {
    expect(() => cutRelation(structure, 11, 7)).toThrow()
  })
})

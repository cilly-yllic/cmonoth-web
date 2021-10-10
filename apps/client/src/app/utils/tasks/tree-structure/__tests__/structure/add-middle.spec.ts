import { addMiddle } from '../../structure'
import { Structure } from '../../../../../types/db/client/project/tree/structures'

describe('Format: object', () => {
  const structure: Structure = [
    [{ num: 1, children: [2, 3] }],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6] },
    ],
    [
      { num: 4, children: [7] },
      { num: 5, children: [7] },
      { num: 6, children: [7] },
    ],
    [{ num: 7, children: [] }],
  ]
  const expects = [
    [{ num: 1, children: [2, 3] }],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6, 8] },
    ],
    [
      { num: 4, children: [7] },
      { num: 5, children: [7] },
      { num: 6, children: [7] },
      { num: 8, children: [] },
    ],
    [{ num: 7, children: [] }],
  ]
  it('should be equal', () => {
    // expect(JSON.stringify(expects)).toBe(JSON.stringify(addMiddle(structure, 3, 8)))
    expect(JSON.stringify(addMiddle(structure, 3, 8))).toBe(JSON.stringify(expects))
  })
})

describe('Format: object', () => {
  const structure: Structure = [
    [{ num: 1, children: [2, 3] }],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6] },
    ],
    [
      { num: 4, children: [7] },
      { num: 5, children: [7] },
      { num: 6, children: [7] },
    ],
    [{ num: 7, children: [] }],
  ]
  const expects: Structure = [
    [{ num: 1, children: [2, 3] }],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [6, 8] },
    ],
    [
      { num: 4, children: [7] },
      { num: 6, children: [7] },
      { num: 8, children: [5] },
    ],
    [{ num: 5, children: [7] }],
    [{ num: 7, children: [] }],
  ]
  it('should be equal', () => {
    // expect(JSON.stringify(expects)).toBe(JSON.stringify(addMiddle(structure, 3, 8, 5)))
    expect(JSON.stringify(addMiddle(structure, 3, 8, 5))).toBe(JSON.stringify(expects))
  })
})

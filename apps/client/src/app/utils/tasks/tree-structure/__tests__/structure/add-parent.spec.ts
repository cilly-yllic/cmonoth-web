import { getGrandchildren } from '../../structure/rows'
import { Rows, Cells } from '../../structure/interface'
import { addParent } from '../../structure';
import { sort } from './utils';

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
      { num: 7, children: [11, 12] },
      { num: 8, children: [12, 13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] }
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 12, children: [17, 18] },
      { num: 13, children: [18, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 17, children: [] },
      { num: 18, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
    ]
  ]
  const expects: Rows = [
    [
      { num: 1, children: [2, 3] } //
    ],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6, 12] } //
    ],
    [
      { num: 4, children: [7, 8] },
      { num: 5, children: [8, 9] },
      { num: 6, children: [9, 10] }
    ],
    [
      { num: 7, children: [11, 12] },
      { num: 8, children: [13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] }
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 12, children: [17, 18] },
      { num: 13, children: [18, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 17, children: [] },
      { num: 18, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
    ]
  ]
  it('should be equal', () => {
    expect(JSON.stringify(sort(addParent(rows, 12, 3)))).toBe(JSON.stringify(expects))
  })
})

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
      { num: 7, children: [11, 12] },
      { num: 8, children: [12, 13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] }
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 12, children: [17, 18] },
      { num: 13, children: [18, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 17, children: [] },
      { num: 18, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
    ]
  ]
  const expects: Rows = [
    [
      { num: 1, children: [2, 3] } //
    ],
    [
      { num: 2, children: [4, 5] },
      { num: 3, children: [5, 6] } //
    ],
    [
      { num: 4, children: [7, 8, 12] },
      { num: 5, children: [8, 9] },
      { num: 6, children: [9, 10] }
    ],
    [
      { num: 7, children: [11] },
      { num: 8, children: [13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] },
      { num: 12, children: [17, 18] },
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 13, children: [18, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 17, children: [] },
      { num: 18, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
    ]
  ]
  it('should be equal', () => {
    expect(JSON.stringify(sort(addParent(rows, 12, 4)))).toBe(JSON.stringify(expects))
  })
})

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
      { num: 7, children: [11, 12] },
      { num: 8, children: [12, 13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] }
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 12, children: [17, 18] },
      { num: 13, children: [18, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 17, children: [] },
      { num: 18, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
    ]
  ]
  const expects: Rows = [
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
      { num: 7, children: [11, 12] },
      { num: 8, children: [13] },
      { num: 9, children: [13, 14] },
      { num: 10, children: [14, 15] }
    ],
    [
      { num: 11, children: [16, 17] },
      { num: 13, children: [12, 19] },
      { num: 14, children: [19, 20] },
      { num: 15, children: [20, 21] },
    ],
    [
      { num: 16, children: [] },
      { num: 19, children: [] },
      { num: 20, children: [] },
      { num: 21, children: [] },
      { num: 12, children: [17, 18] },
    ],
    [
      { num: 17, children: [] },
      { num: 18, children: [] },
    ]
  ]
  it('should be equal', () => {
    // console.log(sort(addParent(rows, 12, 13)))
    expect(JSON.stringify(sort(addParent(rows, 12, 13)))).toBe(JSON.stringify(expects))
  })
})

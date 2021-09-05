import { addMiddle } from '../structure'

describe('Format: object', () => {
  const structure = [
    [{ id: '1', children: ['2', '3'] }],
    [
      { id: '2', children: ['4', '5'] },
      { id: '3', children: ['5', '6'] },
    ],
    [
      { id: '4', children: ['7'] },
      { id: '5', children: ['7'] },
      { id: '6', children: ['7'] },
    ],
    [{ id: '7', children: [] }],
  ]
  const expects = [
    [{ id: '1', children: ['2', '3'] }],
    [
      { id: '2', children: ['4', '5'] },
      { id: '3', children: ['5', '6', '8'] },
    ],
    [
      { id: '4', children: ['7'] },
      { id: '5', children: ['7'] },
      { id: '6', children: ['7'] },
      { id: '8', children: [] },
    ],
    [{ id: '7', children: [] }],
  ]
  it('should be equal', () => {
    expect(JSON.stringify(expects)).toBe(JSON.stringify(addMiddle(structure, '3', '8')))
  })
})

describe('Format: object', () => {
  const structure = [
    [{ id: '1', children: ['2', '3'] }],
    [
      { id: '2', children: ['4', '5'] },
      { id: '3', children: ['5', '6'] },
    ],
    [
      { id: '4', children: ['7'] },
      { id: '5', children: ['7'] },
      { id: '6', children: ['7'] },
    ],
    [{ id: '7', children: [] }],
  ]
  const expects = [
    [{ id: '1', children: ['2', '3'] }],
    [
      { id: '2', children: ['4', '5'] },
      { id: '3', children: ['6', '8'] },
    ],
    [
      { id: '4', children: ['7'] },
      { id: '6', children: ['7'] },
      { id: '8', children: ['5'] },
    ],
    [{ id: '5', children: ['7'] }],
    [{ id: '7', children: [] }],
  ]
  it('should be equal', () => {
    expect(JSON.stringify(expects)).toBe(JSON.stringify(addMiddle(structure, '3', '8', '5')))
  })
})

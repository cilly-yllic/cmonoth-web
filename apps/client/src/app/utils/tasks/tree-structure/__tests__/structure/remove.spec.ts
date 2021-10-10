import { removeNum } from '../../structure'
import { Structure, StructureRow, StructureRowTask } from '../../../../../types/db/client/project/tree/structures'

describe('Format: object', () => {
  /**
   * *1) rowとcolumnを（番号も一応）
   * 削除番号の親(情報*1)取得 (*2s
   * 削除番号に所属する番号の取得(ここで存在すべきrowの位置も再計算(*op)（後述）) (*3s
   * *3sをループする（ループ内での対象を (*3'
   * *3'の親や祖先を全て洗い出す (*4s
   * *4sと*2sを比較し、*2sに存在し*4sにない物を洗い出す　(*5s
   * *5sのchildrenに*3を追加
   * *opの情報と現在の位置に差がある場合に、現在の情報を削除し、本来あるべき位置にそのままの情報を追加する
   */
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
      { num: 7, children: [] },
      { num: 8, children: [] },
      { num: 9, children: [] },
      { num: 10, children: [] }
    ]
  ]
  const expects: Structure = [
    [
      { num: 1, children: [2, 6] }
    ],
    [
      { num: 2, children: [4, 5] },
      { num: 6, children: [9, 10] }
    ],
    [
      { num: 4, children: [7, 8] },
      { num: 5, children: [8, 9] },
      { num: 10, children: [] }
    ],
    [
      { num: 7, children: [] },
      { num: 8, children: [] },
      { num: 9, children: [] },
    ]
  ]
  it('should be equal', () => {
    // expect(JSON.stringify(expects)).toBe(JSON.stringify(removeNum(structure, [3])))
    expect(JSON.stringify(removeNum(structure, [3]))).toBe(JSON.stringify(expects))
  })
})

describe('Format: object', () => {
  /**
   * *1) rowとcolumnを（番号も一応）
   * 削除番号の親(情報*1)取得 (*2s
   * 削除番号に所属する番号の取得(ここで存在すべきrowの位置も再計算(*op)（後述）) (*3s
   * *3sをループする（ループ内での対象を (*3'
   * *3'の親や祖先を全て洗い出す (*4s
   * *4sと*2sを比較し、*2sに存在し*4sにない物を洗い出す　(*5s
   * *5sのchildrenに*3を追加
   * *opの情報と現在の位置に差がある場合に、現在の情報を削除し、本来あるべき位置にそのままの情報を追加する
   */
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
      { num: 2, children: [4, 9] },
      // { num: 3, children: [8, 6] }
      { num: 3, children: [6, 8] }
    ],
    [
      { num: 4, children: [7, 8] },
      // { num: 5, children: [8, 9] },
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
    // expect(JSON.stringify(expects)).toBe(JSON.stringify(removeNum(structure, [5])))
    expect(JSON.stringify(removeNum(structure, [5]))).toBe(JSON.stringify(expects))
  })
})

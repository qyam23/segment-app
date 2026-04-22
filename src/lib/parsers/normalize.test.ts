import { describe, expect, it } from 'vitest'
import { normalizeWorkbook27Row, normalizeWorkbook92Row } from '@/lib/parsers/normalize.ts'

describe('normalize workbook rows', () => {
  it('normalizes workbook 27 KB rows', () => {
    const row = normalizeWorkbook27Row({ Order: 2, Description: 'KB 45/5/25 RH', Type: 'KB', Blocks: 5, Pitch: 45, Length: 25, Angle: 'RH', 'Length 2': 55, 'Barrel 2': 2 }, '27 maxx line 1 rus.xlsx', 1)
    expect(row.family).toBe('KB')
    expect(row.blocks).toBe(5)
    expect(row.staggerAngleDeg).toBe(45)
    expect(row.zEndMm).toBe(55)
  })

  it('normalizes workbook 92 conveying rows', () => {
    const row = normalizeWorkbook92Row({ ord: 1, item: '2P 48/24 LH', type: '2P', pitch: 48, mm: 24, degree: 'LH', 't. mm': 24, Barrel: 1 }, '92-3 56D 24-V5.xlsx', 0)
    expect(row.family).toBe('2P')
    expect(row.pitchMm).toBe(48)
    expect(row.handedness).toBe('LH')
  })
})

import { describe, expect, it } from 'vitest'
import { withContiguousPlacement } from '@/lib/math/assembly.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

describe('withContiguousPlacement', () => {
  it('keeps segments flush with no axial gaps', () => {
    const result = withContiguousPlacement<SegmentRecord>([
      { id: 'a', sourceFile: 'sample.xlsx', family: 'GFA', displayName: 'A', lengthMm: 30 },
      { id: 'b', sourceFile: 'sample.xlsx', family: 'KB', displayName: 'B', lengthMm: 20 },
    ])
    expect(result[0].zStartMm).toBe(0)
    expect(result[0].zEndMm).toBe(30)
    expect(result[1].zStartMm).toBe(30)
    expect(result[1].zEndMm).toBe(50)
  })
})

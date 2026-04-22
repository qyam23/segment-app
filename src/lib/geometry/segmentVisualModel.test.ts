import { describe, expect, it } from 'vitest'
import { getKbDiscRotationDeg, getSegmentVisualSpec } from '@/lib/geometry/segmentVisualModel.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

describe('getSegmentVisualSpec', () => {
  it('keeps GFF visually more open than GFA', () => {
    const gfa = getSegmentVisualSpec(makeSegment({ family: 'GFA', pitchMm: 60, lengthMm: 30 }))
    const gff = getSegmentVisualSpec(makeSegment({ family: 'GFF', pitchMm: 60, lengthMm: 30 }))
    expect(gfa.outerDiameterMm).toBe(gff.outerDiameterMm)
    expect(gff.rootDiameterMm).toBeLessThan(gfa.rootDiameterMm)
    expect(gff.channelDepthMm).toBeGreaterThan(gfa.channelDepthMm)
  })

  it('captures KB disc thickness and stagger progression', () => {
    const kb = makeSegment({ family: 'KB', lengthMm: 24, blocks: 4, staggerAngleDeg: 45, handedness: 'RH' })
    const spec = getSegmentVisualSpec(kb)
    expect(spec.mode).toBe('kneading')
    expect(spec.discThicknessMm).toBe(6)
    expect(getKbDiscRotationDeg(kb, 3)).toBe(135)
  })
})

function makeSegment(overrides: Partial<SegmentRecord>): SegmentRecord {
  return { id: 'segment', sourceFile: 'sample.xlsx', family: 'GFA', displayName: 'segment', lengthMm: 24, ...overrides }
}

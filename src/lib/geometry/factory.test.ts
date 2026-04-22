import { describe, expect, it } from 'vitest'
import { getGeometryBuilderKey } from '@/lib/geometry/factory.ts'

describe('getGeometryBuilderKey', () => {
  it('routes each family to a distinct visual generator key', () => {
    expect(getGeometryBuilderKey({ id: 'kb', sourceFile: 'sample.xlsx', family: 'KB', displayName: 'KB', lengthMm: 25 })).toBe('kneading-block')
    expect(getGeometryBuilderKey({ id: 'gfa', sourceFile: 'sample.xlsx', family: 'GFA', displayName: 'GFA', lengthMm: 30 })).toBe('standard-two-flight')
    expect(getGeometryBuilderKey({ id: 'gff', sourceFile: 'sample.xlsx', family: 'GFF', displayName: 'GFF', lengthMm: 30 })).toBe('open-two-flight')
    expect(getGeometryBuilderKey({ id: 'gfm', sourceFile: 'sample.xlsx', family: 'GFM', displayName: 'GFM', lengthMm: 30 })).toBe('dense-three-flight')
  })
})

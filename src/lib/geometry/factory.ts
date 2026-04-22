import type { SegmentRecord } from '@/lib/types/segments.ts'

export function getGeometryBuilderKey(segment: SegmentRecord) {
  if (segment.family === 'KB') return 'kneading-block'
  if (segment.family === 'GFA' || segment.family === '2P') return 'standard-two-flight'
  if (segment.family === 'GFF') return 'open-two-flight'
  if (segment.family === 'GFM') return 'dense-three-flight'
  return 'placeholder-solid'
}

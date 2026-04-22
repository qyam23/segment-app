import { getSegmentVisualSpec } from '@/lib/geometry/segmentVisualModel.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

const familyColors: Record<string, string> = {
  GFA: '#d28b44',
  GFF: '#72b7c7',
  KB: '#e2d1ab',
  '2P': '#9fc15d',
  GFM: '#d86f62',
}

export function SegmentPreview({ segment }: { segment: SegmentRecord }) {
  const spec = getSegmentVisualSpec(segment)
  const accent = familyColors[segment.family] ?? '#9ca8b1'
  const gradientId = `${segment.id.replace(/[^a-z0-9_-]/gi, '-')}-preview`
  if (spec.mode === 'kneading') {
    return (
      <svg className="segment-preview-svg" viewBox="0 0 180 78" aria-hidden="true">
        <rect x="0" y="0" width="180" height="78" rx="16" fill={`url(#${gradientId})`} />
        {Array.from({ length: spec.blocks }, (_, index) => {
          const x = 14 + index * ((152 - spec.blocks * 2) / spec.blocks)
          const rotation = spec.isNeutral ? (index % 2 === 0 ? 0 : 90) : index * spec.staggerAngleDeg
          return (
            <g key={index} transform={`translate(${x} 39) rotate(${rotation})`}>
              <path d="M -10 -14 C -1 -22 10 -20 14 -6 C 16 4 9 16 -4 18 C -14 18 -18 8 -16 -1 C -16 -8 -13 -11 -10 -14 Z" fill={accent} />
            </g>
          )
        })}
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(23, 40, 48, 0.95)" />
            <stop offset="100%" stopColor="rgba(7, 18, 24, 0.96)" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
  const stripeSpacing = Math.max(12, Math.min(28, spec.pitchMm / 2.2))
  const stripeCount = Math.max(5, Math.ceil(180 / stripeSpacing) + 2)
  return (
    <svg className="segment-preview-svg" viewBox="0 0 180 78" aria-hidden="true">
      <rect x="0" y="0" width="180" height="78" rx="16" fill={`url(#${gradientId})`} />
      <path d="M 18 39 C 24 17 48 12 90 18 C 132 12 156 17 162 39 C 156 61 132 66 90 60 C 48 66 24 61 18 39 Z" fill="rgba(20, 41, 52, 0.94)" />
      {Array.from({ length: stripeCount }, (_, index) => {
        const x = -18 + index * stripeSpacing
        const x2 = x + spec.helixDirection * 26
        return <path key={index} d={`M ${x} 60 C ${x + 8} 47 ${x + 12} 31 ${x2} 18`} stroke={accent} strokeWidth={spec.flightWidthMm > 8 ? 5.8 : 4.1} strokeLinecap="round" fill="none" />
      })}
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(20, 41, 52, 0.96)" />
          <stop offset="100%" stopColor="rgba(7, 18, 24, 0.96)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

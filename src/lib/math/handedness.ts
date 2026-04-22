import type { Handedness } from '@/lib/types/segments.ts'

export function parseHandedness(value: unknown): Handedness | null {
  if (value == null) return null
  const normalized = String(value).trim().toUpperCase()
  if (!normalized) return null
  if (normalized.includes('RE')) return 'REVERSE'
  if (normalized.includes('LH') || normalized.includes('LEFT')) return 'LH'
  if (normalized === 'N' || normalized.includes('NEUTRAL') || normalized === '90') return 'NEUTRAL'
  if (normalized === 'RH' || normalized.startsWith('R') || normalized.includes('RIGHT')) return 'RH'
  return null
}

export function handednessToDirection(handedness?: Handedness | null): 1 | -1 {
  return handedness === 'LH' || handedness === 'REVERSE' ? -1 : 1
}

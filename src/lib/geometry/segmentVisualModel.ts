import { handednessToDirection } from '@/lib/math/handedness.ts'
import { machineDefaults } from '@/lib/math/machineDefaults.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

export type SegmentVisualSpec = {
  family: string
  mode: 'conveying' | 'kneading' | 'placeholder'
  outerDiameterMm: number
  rootDiameterMm: number
  bodyMajorDiameterMm: number
  bodyMinorDiameterMm: number
  centerDistanceMm: number
  channelDepthMm: number
  flightCount: number
  pitchMm: number
  helixDirection: 1 | -1
  flightRadiusMm: number
  flightThicknessMm: number
  flightWidthMm: number
  landInsetMm: number
  lobeCount: number
  lengthMm: number
  blocks: number
  discThicknessMm: number
  staggerAngleDeg: number
  boreDiameterMm: number
  isNeutral: boolean
}

export function getSegmentVisualSpec(segment: SegmentRecord): SegmentVisualSpec {
  const outerDiameterMm = machineDefaults.outerDiameterMm
  const rootDiameterMm = segment.family === 'GFF' ? machineDefaults.rootDiameterMm * 0.84 : machineDefaults.rootDiameterMm
  const channelDepthMm = (outerDiameterMm - rootDiameterMm) / 2
  const flightCount = segment.family === 'GFM' ? 3 : segment.family === 'KB' ? 0 : 2
  const pitchMm = Math.max(segment.pitchMm ?? segment.lengthMm / Math.max(flightCount || 1, 1), 8)
  const helixDirection = handednessToDirection(segment.handedness)
  const blocks = Math.max(segment.blocks ?? 1, 1)
  const isNeutral = segment.handedness === 'NEUTRAL' || Math.abs(segment.staggerAngleDeg ?? 0) === 90
  return {
    family: segment.family,
    mode: segment.family === 'KB' ? 'kneading' : flightCount > 0 ? 'conveying' : 'placeholder',
    outerDiameterMm,
    rootDiameterMm,
    bodyMajorDiameterMm: segment.family === 'GFF' ? outerDiameterMm - channelDepthMm * 0.8 : outerDiameterMm - channelDepthMm * 0.62,
    bodyMinorDiameterMm: segment.family === 'GFF' ? rootDiameterMm + channelDepthMm * 0.34 : rootDiameterMm + channelDepthMm * 0.58,
    centerDistanceMm: machineDefaults.centerDistanceMm,
    channelDepthMm,
    flightCount,
    pitchMm,
    helixDirection,
    flightRadiusMm: outerDiameterMm * 0.42,
    flightThicknessMm: segment.family === 'GFF' ? outerDiameterMm * 0.07 : outerDiameterMm * 0.08,
    flightWidthMm: segment.family === 'GFF' ? outerDiameterMm * 0.13 : outerDiameterMm * 0.145,
    landInsetMm: segment.family === 'GFF' ? outerDiameterMm * 0.1 : outerDiameterMm * 0.075,
    lobeCount: flightCount <= 1 ? 1 : 2,
    lengthMm: segment.lengthMm,
    blocks,
    discThicknessMm: segment.lengthMm / blocks,
    staggerAngleDeg: isNeutral ? 0 : Math.abs(segment.staggerAngleDeg ?? 45) * helixDirection,
    boreDiameterMm: machineDefaults.boreDiameterMm,
    isNeutral,
  }
}

export function getLobedProfileSpec(segment: SegmentRecord) {
  const spec = getSegmentVisualSpec(segment)
  return {
    majorRadiusMm: spec.bodyMajorDiameterMm / 2,
    minorRadiusMm: spec.bodyMinorDiameterMm / 2,
    lobeCount: spec.lobeCount,
  }
}

export function getKbDiscRotationDeg(segment: SegmentRecord, discIndex: number) {
  const spec = getSegmentVisualSpec(segment)
  if (spec.mode !== 'kneading') return 0
  return discIndex * spec.staggerAngleDeg
}

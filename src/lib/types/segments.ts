export type Handedness = 'RH' | 'LH' | 'REVERSE' | 'NEUTRAL'

export type SegmentRecord = {
  id: string
  sourceFile: string
  sourceSheet?: string
  order?: number
  family: string
  displayName: string
  pitchMm?: number | null
  lengthMm: number
  blocks?: number | null
  staggerAngleDeg?: number | null
  handedness?: Handedness | null
  barrel?: number | null
  zStartMm?: number | null
  zEndMm?: number | null
  sourceDescription?: string | null
  rawAngle?: string | number | null
}

export type AssemblyItem = SegmentRecord & { instanceId: string }

export type ExampleConfiguration = {
  id: string
  label: string
  sourceFile: string
  segmentIds: string[]
}

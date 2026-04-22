import { withContiguousPlacement } from '@/lib/math/assembly.ts'
import { parseHandedness } from '@/lib/math/handedness.ts'
import { segmentRecordSchema } from '@/lib/parsers/schema.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

type RawWorkbookRow = Record<string, string | number | null | undefined>

function asNumber(value: unknown) {
  if (value == null || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function asString(value: unknown) {
  if (value == null) return null
  const parsed = String(value).trim()
  return parsed || null
}

export function normalizeWorkbook27Row(row: RawWorkbookRow, sourceFile: string, index: number): SegmentRecord {
  const family = asString(row.Type) ?? 'UNKNOWN'
  const description = asString(row.Description) ?? `${family} ${index + 1}`
  const pitch = asNumber(row.Pitch)
  const angle = row.Angle ?? null
  return segmentRecordSchema.parse({
    id: `${sourceFile}-${index + 1}-${family}`.replace(/\s+/g, '-').toLowerCase(),
    sourceFile,
    order: asNumber(row.Order) ?? index + 1,
    family,
    displayName: description,
    pitchMm: family === 'KB' ? null : pitch,
    lengthMm: asNumber(row.Length) ?? asNumber(row['Length 2']) ?? 0,
    blocks: asNumber(row.Blocks),
    staggerAngleDeg: family === 'KB' ? pitch ?? asNumber(angle) : asNumber(angle),
    handedness: parseHandedness(angle),
    barrel: asNumber(row['Barrel 2']) ?? asNumber(row.D),
    zEndMm: asNumber(row['Length 2']),
    sourceDescription: description,
    rawAngle: angle,
  })
}

export function normalizeWorkbook92Row(row: RawWorkbookRow, sourceFile: string, index: number): SegmentRecord {
  const family = asString(row.type) ?? 'UNKNOWN'
  const description = asString(row.item) ?? `${family} ${index + 1}`
  const degree = row.degree ?? null
  const pitch = asNumber(row.pitch)
  return segmentRecordSchema.parse({
    id: `${sourceFile}-${index + 1}-${family}`.replace(/\s+/g, '-').toLowerCase(),
    sourceFile,
    order: asNumber(row.ord) ?? index + 1,
    family,
    displayName: description,
    pitchMm: family === 'KB' ? null : pitch,
    lengthMm: asNumber(row.mm) ?? 0,
    blocks: asNumber(row['Kb#']),
    staggerAngleDeg: family === 'KB' ? pitch ?? asNumber(degree) : asNumber(degree),
    handedness: parseHandedness(degree),
    barrel: asNumber(row.Barrel),
    zEndMm: asNumber(row['t. mm']),
    sourceDescription: description,
    rawAngle: degree,
  })
}

export function normalizeRowsForWorkbook(rows: RawWorkbookRow[], sourceFile: string, grammar: '27-maxx' | '92-3') {
  const normalized = rows.map((row, index) =>
    grammar === '27-maxx' ? normalizeWorkbook27Row(row, sourceFile, index) : normalizeWorkbook92Row(row, sourceFile, index),
  )
  return withContiguousPlacement(normalized)
}

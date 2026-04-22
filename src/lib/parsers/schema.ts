import { z } from 'zod'

export const segmentRecordSchema = z.object({
  id: z.string(),
  sourceFile: z.string(),
  sourceSheet: z.string().optional(),
  order: z.number().optional(),
  family: z.string(),
  displayName: z.string(),
  pitchMm: z.number().nullable().optional(),
  lengthMm: z.number(),
  blocks: z.number().nullable().optional(),
  staggerAngleDeg: z.number().nullable().optional(),
  handedness: z.enum(['RH', 'LH', 'REVERSE', 'NEUTRAL']).nullable().optional(),
  barrel: z.number().nullable().optional(),
  zStartMm: z.number().nullable().optional(),
  zEndMm: z.number().nullable().optional(),
  sourceDescription: z.string().nullable().optional(),
  rawAngle: z.union([z.string(), z.number()]).nullable().optional(),
})

export const exampleConfigurationSchema = z.object({
  id: z.string(),
  label: z.string(),
  sourceFile: z.string(),
  segmentIds: z.array(z.string()),
})

import rawExamples from '../../../data/catalog/example-configurations.json'
import rawSegments from '../../../data/catalog/segments.json'
import { exampleConfigurationSchema, segmentRecordSchema } from '@/lib/parsers/schema.ts'

export const segments = rawSegments.map((segment) => segmentRecordSchema.parse(segment))
export const exampleConfigurations = rawExamples.map((example) => exampleConfigurationSchema.parse(example))
export const families = Array.from(new Set(segments.map((segment) => segment.family))).sort()

import { describe, expect, it } from 'vitest'
import { parseHandedness } from '@/lib/math/handedness.ts'

describe('parseHandedness', () => {
  it('parses common handedness markers', () => {
    expect(parseHandedness('RE')).toBe('REVERSE')
    expect(parseHandedness('LH')).toBe('LH')
    expect(parseHandedness('N')).toBe('NEUTRAL')
    expect(parseHandedness('RH')).toBe('RH')
  })
})

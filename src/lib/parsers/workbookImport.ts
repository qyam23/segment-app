import * as XLSX from 'xlsx'
import { normalizeRowsForWorkbook } from '@/lib/parsers/normalize.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

export function inferWorkbookGrammar(fileName: string): '27-maxx' | '92-3' {
  return fileName.includes('27 maxx') ? '27-maxx' : '92-3'
}

export function parseWorkbookFile(file: ArrayBuffer, fileName: string): SegmentRecord[] {
  const workbook = XLSX.read(file, { type: 'array' })
  const grammar = inferWorkbookGrammar(fileName)
  const normalized: SegmentRecord[] = []
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json<Record<string, string | number | null>>(worksheet, { defval: null })
    normalized.push(...normalizeRowsForWorkbook(rows, fileName, grammar).map((row) => ({ ...row, sourceSheet: sheetName })))
  }
  return normalized
}

import type { AssemblyItem, SegmentRecord } from '@/lib/types/segments.ts'

export function withContiguousPlacement<T extends SegmentRecord>(records: T[]): T[] {
  let cursor = 0
  return records.map((record) => {
    const zStartMm = record.zEndMm != null ? record.zEndMm - record.lengthMm : (record.zStartMm ?? cursor)
    const zEndMm = record.zEndMm ?? zStartMm + record.lengthMm
    cursor = zEndMm
    return { ...record, zStartMm, zEndMm }
  }) as T[]
}

export function appendSegment(items: AssemblyItem[], segment: SegmentRecord): AssemblyItem[] {
  return [...items, { ...segment, instanceId: `${segment.id}-${items.length + 1}` }]
}

export function duplicateAssemblyItem(items: AssemblyItem[], instanceId: string): AssemblyItem[] {
  const index = items.findIndex((item) => item.instanceId === instanceId)
  if (index === -1) return items
  const clone = { ...items[index], instanceId: `${items[index].id}-${items.length + 1}` }
  return [...items.slice(0, index + 1), clone, ...items.slice(index + 1)]
}

export function moveAssemblyItem(items: AssemblyItem[], instanceId: string, direction: -1 | 1): AssemblyItem[] {
  const index = items.findIndex((item) => item.instanceId === instanceId)
  const target = index + direction
  if (index === -1 || target < 0 || target >= items.length) return items
  const next = [...items]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

export function removeAssemblyItem(items: AssemblyItem[], instanceId: string) {
  return items.filter((item) => item.instanceId !== instanceId)
}

export function totalAssemblyLength(items: SegmentRecord[]) {
  return items.reduce((sum, item) => sum + item.lengthMm, 0)
}

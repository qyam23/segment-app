import { startTransition } from 'react'
import { create } from 'zustand'
import { exampleConfigurations, segments } from '@/lib/data/catalog.ts'
import { appendSegment, duplicateAssemblyItem, moveAssemblyItem, removeAssemblyItem, totalAssemblyLength } from '@/lib/math/assembly.ts'
import type { AssemblyItem, SegmentRecord } from '@/lib/types/segments.ts'

type StoreState = {
  sequence: AssemblyItem[]
  familyFilter: string
  search: string
  selectedInstanceId: string | null
  isPlaying: boolean
  animationSpeed: number
  resetVersion: number
  gridVisible: boolean
  axesVisible: boolean
  append: (segment: SegmentRecord) => void
  remove: (instanceId: string) => void
  duplicate: (instanceId: string) => void
  move: (instanceId: string, direction: -1 | 1) => void
  clear: () => void
  loadExample: (configurationId: string) => void
  select: (instanceId: string | null) => void
  setFamilyFilter: (family: string) => void
  setSearch: (value: string) => void
  setPlaying: (value: boolean) => void
  resetViewer: () => void
  setAnimationSpeed: (value: number) => void
  toggleGrid: () => void
  toggleAxes: () => void
}

const initialSequence = exampleConfigurations[0]?.segmentIds.map((id, index) => {
  const segment = segments.find((candidate) => candidate.id === id)
  return segment ? { ...segment, instanceId: `${segment.id}-${index + 1}` } : null
}).filter((value): value is AssemblyItem => value !== null) ?? []

export const useSegmentStore = create<StoreState>((set) => ({
  sequence: initialSequence,
  familyFilter: 'ALL',
  search: '',
  selectedInstanceId: initialSequence[0]?.instanceId ?? null,
  isPlaying: false,
  animationSpeed: 0.8,
  resetVersion: 0,
  gridVisible: true,
  axesVisible: true,
  append: (segment) => startTransition(() => set((state) => {
    const sequence = appendSegment(state.sequence, segment)
    return { sequence, selectedInstanceId: sequence.at(-1)?.instanceId ?? null }
  })),
  remove: (instanceId) => set((state) => ({ sequence: removeAssemblyItem(state.sequence, instanceId), selectedInstanceId: state.selectedInstanceId === instanceId ? null : state.selectedInstanceId })),
  duplicate: (instanceId) => set((state) => ({ sequence: duplicateAssemblyItem(state.sequence, instanceId) })),
  move: (instanceId, direction) => set((state) => ({ sequence: moveAssemblyItem(state.sequence, instanceId, direction) })),
  clear: () => set({ sequence: [], selectedInstanceId: null, isPlaying: false }),
  loadExample: (configurationId) => set(() => {
    const example = exampleConfigurations.find((candidate) => candidate.id === configurationId)
    const sequence = example?.segmentIds.map((id, index) => {
      const segment = segments.find((candidate) => candidate.id === id)
      return segment ? { ...segment, instanceId: `${segment.id}-${index + 1}` } : null
    }).filter((value): value is AssemblyItem => value !== null) ?? []
    return { sequence, selectedInstanceId: sequence[0]?.instanceId ?? null, isPlaying: false }
  }),
  select: (instanceId) => set({ selectedInstanceId: instanceId }),
  setFamilyFilter: (family) => set({ familyFilter: family }),
  setSearch: (value) => set({ search: value }),
  setPlaying: (value) => set({ isPlaying: value }),
  resetViewer: () => set((state) => ({ isPlaying: false, resetVersion: state.resetVersion + 1 })),
  setAnimationSpeed: (value) => set({ animationSpeed: value }),
  toggleGrid: () => set((state) => ({ gridVisible: !state.gridVisible })),
  toggleAxes: () => set((state) => ({ axesVisible: !state.axesVisible })),
}))

export const selectAssemblyLength = (state: StoreState) => totalAssemblyLength(state.sequence)

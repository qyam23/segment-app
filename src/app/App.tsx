import { useDeferredValue, useMemo } from 'react'
import { AssemblyPanel } from '@/features/assembly/AssemblyPanel.tsx'
import { CatalogPanel } from '@/features/catalog/CatalogPanel.tsx'
import { ViewerPanel } from '@/features/viewer/ViewerPanel.tsx'
import { families, segments } from '@/lib/data/catalog.ts'
import { useSegmentStore } from '@/state/useSegmentStore.ts'
import './app.css'

export function App() {
  const search = useSegmentStore((state) => state.search)
  const familyFilter = useSegmentStore((state) => state.familyFilter)
  const deferredSearch = useDeferredValue(search)

  const filteredSegments = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()
    return segments.filter((segment) => {
      const familyMatches = familyFilter === 'ALL' || segment.family === familyFilter
      const queryMatches =
        query.length === 0 ||
        segment.displayName.toLowerCase().includes(query) ||
        segment.family.toLowerCase().includes(query) ||
        (segment.sourceDescription ?? '').toLowerCase().includes(query)

      return familyMatches && queryMatches
    })
  }, [deferredSearch, familyFilter])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Local Screw Segment Builder</p>
          <h1>Twin-Screw Segment Configuration Assembly</h1>
        </div>
        <div className="header-metrics">
          <Metric label="Catalog segments" value={segments.length} />
          <Metric label="Families" value={families.length} />
        </div>
      </header>
      <main className="app-layout">
        <CatalogPanel segments={filteredSegments} families={families} />
        <ViewerPanel />
        <AssemblyPanel />
      </main>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

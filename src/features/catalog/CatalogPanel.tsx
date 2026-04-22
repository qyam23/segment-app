import { SegmentPreview } from '@/components/SegmentPreview.tsx'
import { getSegmentVisualSpec } from '@/lib/geometry/segmentVisualModel.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'
import { formatAngle, formatMillimeters } from '@/lib/utils/format.ts'
import { useSegmentStore } from '@/state/useSegmentStore.ts'

export function CatalogPanel({ segments, families }: { segments: SegmentRecord[]; families: string[] }) {
  const familyFilter = useSegmentStore((state) => state.familyFilter)
  const search = useSegmentStore((state) => state.search)
  const setFamilyFilter = useSegmentStore((state) => state.setFamilyFilter)
  const setSearch = useSegmentStore((state) => state.setSearch)
  const append = useSegmentStore((state) => state.append)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Catalog</h2>
          <p>Search normalized segment records and append them in full axial contact.</p>
        </div>
      </div>
      <div className="catalog-body stack">
        <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by family, name, or source description" />
        <select className="select" value={familyFilter} onChange={(event) => setFamilyFilter(event.target.value)}>
          <option value="ALL">All families</option>
          {families.map((family) => <option key={family} value={family}>{family}</option>)}
        </select>
        <div className="catalog-grid">
          {segments.map((segment) => {
            const spec = getSegmentVisualSpec(segment)
            return (
              <article className="segment-card" key={segment.id}>
                <div className="segment-preview"><SegmentPreview segment={segment} /></div>
                <div className="stack">
                  <div>
                    <h3>{segment.displayName}</h3>
                    <div className="chip-row">
                      <span className="chip">{segment.family}</span>
                      <span className="chip">{formatMillimeters(segment.lengthMm)}</span>
                      {segment.pitchMm != null ? <span className="chip">Pitch {segment.pitchMm}</span> : null}
                      {segment.staggerAngleDeg != null ? <span className="chip">Angle {formatAngle(segment.staggerAngleDeg)}</span> : null}
                      <span className="chip">{spec.mode === 'kneading' ? (spec.isNeutral ? 'Neutral stack' : spec.helixDirection > 0 ? 'Forward stack' : 'Reverse stack') : spec.helixDirection > 0 ? 'RH helix' : 'LH helix'}</span>
                      <span className="chip">{spec.flightCount || spec.blocks} stages</span>
                    </div>
                  </div>
                  <div className="status-line">{segment.sourceFile}</div>
                  <button className="button" onClick={() => append(segment)}>Add to assembly</button>
                </div>
              </article>
            )
          })}
          {segments.length === 0 ? <div className="empty-state">No segments match the current filters.</div> : null}
        </div>
      </div>
    </section>
  )
}

import { exampleConfigurations } from '@/lib/data/catalog.ts'
import { formatMillimeters } from '@/lib/utils/format.ts'
import { selectAssemblyLength, useSegmentStore } from '@/state/useSegmentStore.ts'

export function AssemblyPanel() {
  const sequence = useSegmentStore((state) => state.sequence)
  const selectedInstanceId = useSegmentStore((state) => state.selectedInstanceId)
  const remove = useSegmentStore((state) => state.remove)
  const duplicate = useSegmentStore((state) => state.duplicate)
  const move = useSegmentStore((state) => state.move)
  const clear = useSegmentStore((state) => state.clear)
  const select = useSegmentStore((state) => state.select)
  const loadExample = useSegmentStore((state) => state.loadExample)
  const totalLength = useSegmentStore(selectAssemblyLength)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Assembly Sequence</h2>
          <p>{sequence.length} segments, total length {formatMillimeters(totalLength)}</p>
        </div>
        <button className="button is-danger" onClick={clear}>Clear</button>
      </div>
      <div className="assembly-body stack">
        <div className="stack">
          <label className="status-line" htmlFor="example-config">Load example configuration</label>
          <select id="example-config" className="select" defaultValue={exampleConfigurations[0]?.id} onChange={(event) => loadExample(event.target.value)}>
            {exampleConfigurations.map((example) => <option key={example.id} value={example.id}>{example.label}</option>)}
          </select>
        </div>
        <div className="sequence-list">
          {sequence.map((segment, index) => (
            <article className={`sequence-item${selectedInstanceId === segment.instanceId ? ' is-selected' : ''}`} key={segment.instanceId} onClick={() => select(segment.instanceId)}>
              <header>
                <div>
                  <h4>{index + 1}. {segment.displayName}</h4>
                  <p>{segment.family} · {formatMillimeters(segment.lengthMm)}</p>
                </div>
                <span className="chip">{segment.handedness ?? 'RH'}</span>
              </header>
              <div className="chip-row">
                {segment.pitchMm != null ? <span className="chip">Pitch {segment.pitchMm}</span> : null}
                {segment.staggerAngleDeg != null ? <span className="chip">Angle {segment.staggerAngleDeg}</span> : null}
                {segment.blocks != null ? <span className="chip">Blocks {segment.blocks}</span> : null}
                {segment.barrel != null ? <span className="chip">Barrel {segment.barrel}</span> : null}
              </div>
              <div className="sequence-actions">
                <button className="button" onClick={() => move(segment.instanceId, -1)}>Up</button>
                <button className="button" onClick={() => move(segment.instanceId, 1)}>Down</button>
                <button className="button" onClick={() => duplicate(segment.instanceId)}>Duplicate</button>
                <button className="button is-danger" onClick={() => remove(segment.instanceId)}>Delete</button>
              </div>
            </article>
          ))}
          {sequence.length === 0 ? <div className="empty-state">Select segments from the catalog to build a screw assembly.</div> : null}
        </div>
      </div>
    </section>
  )
}

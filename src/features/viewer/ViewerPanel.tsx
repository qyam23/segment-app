import { Canvas } from '@react-three/fiber'
import { AssemblyScene } from '@/features/viewer/AssemblyScene.tsx'
import { formatMillimeters } from '@/lib/utils/format.ts'
import { selectAssemblyLength, useSegmentStore } from '@/state/useSegmentStore.ts'

export function ViewerPanel() {
  const sequence = useSegmentStore((state) => state.sequence)
  const selectedInstanceId = useSegmentStore((state) => state.selectedInstanceId)
  const isPlaying = useSegmentStore((state) => state.isPlaying)
  const animationSpeed = useSegmentStore((state) => state.animationSpeed)
  const resetVersion = useSegmentStore((state) => state.resetVersion)
  const setAnimationSpeed = useSegmentStore((state) => state.setAnimationSpeed)
  const setPlaying = useSegmentStore((state) => state.setPlaying)
  const resetViewer = useSegmentStore((state) => state.resetViewer)
  const toggleGrid = useSegmentStore((state) => state.toggleGrid)
  const toggleAxes = useSegmentStore((state) => state.toggleAxes)
  const gridVisible = useSegmentStore((state) => state.gridVisible)
  const axesVisible = useSegmentStore((state) => state.axesVisible)
  const totalLength = useSegmentStore(selectAssemblyLength)

  return (
    <section className="panel viewer-shell">
      <div className="panel-header">
        <div>
          <h2>3D Viewer</h2>
          <p>Contiguous shaft assembly with animated rotation playback.</p>
        </div>
        <div className="toolbar">
          <button className={`button${isPlaying ? ' is-active' : ''}`} onClick={() => setPlaying(true)}>Play</button>
          <button className="button" onClick={() => setPlaying(false)}>Pause</button>
          <button className="button" onClick={resetViewer}>Reset</button>
          <button className="button" onClick={toggleGrid}>{gridVisible ? 'Hide grid' : 'Show grid'}</button>
          <button className="button" onClick={toggleAxes}>{axesVisible ? 'Hide axes' : 'Show axes'}</button>
        </div>
      </div>
      <div className="canvas-wrap">
        <Canvas camera={{ position: [120, 90, 180], fov: 38 }}>
          <AssemblyScene sequence={sequence} selectedInstanceId={selectedInstanceId} isPlaying={isPlaying} animationSpeed={animationSpeed} resetVersion={resetVersion} gridVisible={gridVisible} axesVisible={axesVisible} />
        </Canvas>
      </div>
      <div className="viewer-footer">
        <div className="viewer-stats">
          <span>Total length {formatMillimeters(totalLength)}</span>
          <span>Selected {selectedInstanceId ?? 'none'}</span>
          <span>{sequence.length} placed segments</span>
          <span>Companion axis ghosted at 50 mm center distance</span>
        </div>
        <label className="slider-row">
          Animation speed
          <input type="range" min="0.2" max="2.4" step="0.1" value={animationSpeed} onChange={(event) => setAnimationSpeed(Number(event.target.value))} />
        </label>
      </div>
    </section>
  )
}

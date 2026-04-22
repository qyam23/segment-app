import { Grid, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { Group } from 'three'
import { SegmentMesh } from '@/lib/geometry/SegmentMesh.tsx'
import { totalAssemblyLength, withContiguousPlacement } from '@/lib/math/assembly.ts'
import { machineDefaults } from '@/lib/math/machineDefaults.ts'
import type { AssemblyItem } from '@/lib/types/segments.ts'

export function AssemblyScene(props: {
  sequence: AssemblyItem[]
  selectedInstanceId: string | null
  isPlaying: boolean
  animationSpeed: number
  resetVersion: number
  gridVisible: boolean
  axesVisible: boolean
}) {
  const { sequence, selectedInstanceId, isPlaying, animationSpeed, resetVersion, gridVisible, axesVisible } = props
  const animatedGroupRef = useRef<Group>(null)
  const placed = useMemo(() => withContiguousPlacement(sequence), [sequence])
  const totalLength = totalAssemblyLength(sequence)

  useFrame((_, delta) => {
    if (!isPlaying || !animatedGroupRef.current) return
    animatedGroupRef.current.rotation.x += delta * animationSpeed
  })

  useEffect(() => {
    if (animatedGroupRef.current) animatedGroupRef.current.rotation.set(0, 0, 0)
  }, [resetVersion])

  return (
    <>
      <color attach="background" args={['#061017']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[220, 180, 120]} intensity={1.35} />
      <directionalLight position={[-120, -60, -80]} intensity={0.35} />
      {gridVisible ? <Grid args={[420, 180]} cellColor="#29444d" sectionColor="#466570" fadeDistance={260} /> : null}
      {axesVisible ? <axesHelper args={[100]} /> : null}
      <mesh position={[0, -machineDefaults.centerDistanceMm, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.2, 2.2, Math.max(totalLength + 80, 120), 24]} />
        <meshStandardMaterial color="#31515d" transparent opacity={0.28} />
      </mesh>
      <group ref={animatedGroupRef}>
        {placed.map((segment) => {
          const centerX = (segment.zStartMm ?? 0) + segment.lengthMm / 2 - totalLength / 2
          return <group key={segment.instanceId} position={[centerX, 0, 0]}><SegmentMesh segment={segment} selected={segment.instanceId === selectedInstanceId} /></group>
        })}
      </group>
      <OrbitControls makeDefault minDistance={120} maxDistance={900} />
    </>
  )
}

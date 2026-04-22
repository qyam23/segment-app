import { useMemo } from 'react'
import { CatmullRomCurve3, Color, Shape, Vector2, Vector3 } from 'three'
import { getKbDiscRotationDeg, getLobedProfileSpec, getSegmentVisualSpec } from '@/lib/geometry/segmentVisualModel.ts'
import type { SegmentRecord } from '@/lib/types/segments.ts'

type SegmentMeshProps = {
  segment: SegmentRecord
  selected?: boolean
}

const familyColors: Record<string, string> = {
  GFA: '#d28b44',
  GFF: '#72b7c7',
  KB: '#d9d2c2',
  '2P': '#9fc15d',
  GFM: '#d86f62',
}

export function SegmentMesh({ segment, selected = false }: SegmentMeshProps) {
  const spec = getSegmentVisualSpec(segment)
  const profileShape = useMemo(() => createLobedProfileShape(segment), [segment])
  const helicalCurves = useMemo(() => createHelicalCurves(spec), [spec])
  const color = new Color(familyColors[segment.family] ?? '#9ca8b1')

  if (spec.mode === 'kneading') {
    return (
      <group>
        {Array.from({ length: spec.blocks }, (_, index) => {
          const x = -spec.lengthMm / 2 + spec.discThicknessMm * (index + 0.5)
          const discRotationRad = (getKbDiscRotationDeg(segment, index) * Math.PI) / 180
          return (
            <group key={`${segment.id}-${index}`} position={[x, 0, 0]} rotation={[discRotationRad, 0, 0]}>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <extrudeGeometry args={[profileShape, { steps: 1, bevelEnabled: false, depth: spec.discThicknessMm * 0.94 }]} />
                <meshStandardMaterial color={color} roughness={0.42} emissive={selected ? '#ffc15c' : '#000000'} emissiveIntensity={selected ? 0.46 : 0} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[spec.boreDiameterMm / 2, spec.boreDiameterMm / 2, spec.discThicknessMm * 1.06, 28]} />
                <meshStandardMaterial color="#0d1f28" />
              </mesh>
            </group>
          )
        })}
      </group>
    )
  }

  return (
    <group>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <extrudeGeometry args={[profileShape, { steps: 1, bevelEnabled: false, depth: spec.lengthMm }]} />
        <meshStandardMaterial color="#17303d" roughness={0.56} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[spec.rootDiameterMm / 2, spec.rootDiameterMm / 2, spec.lengthMm, 28]} />
        <meshStandardMaterial color="#10242f" />
      </mesh>
      {helicalCurves.map((curve, flightIndex) => (
        <mesh key={`${segment.id}-flight-${flightIndex}`}>
          <tubeGeometry args={[curve, 88, spec.flightThicknessMm / 2, 18, false]} />
          <meshStandardMaterial color={color} roughness={0.34} emissive={selected ? '#ffc15c' : '#000000'} emissiveIntensity={selected ? 0.62 : 0} />
        </mesh>
      ))}
    </group>
  )
}

function createLobedProfileShape(segment: SegmentRecord) {
  const profile = getLobedProfileSpec(segment)
  const shape = new Shape()
  const points: Vector2[] = []
  for (let index = 0; index <= 80; index += 1) {
    const t = index / 80
    const angle = t * Math.PI * 2
    const radius = profile.minorRadiusMm + (profile.majorRadiusMm - profile.minorRadiusMm) * (0.5 + 0.5 * Math.cos(profile.lobeCount * angle))
    points.push(new Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.88))
  }
  shape.moveTo(points[0].x, points[0].y)
  for (const point of points.slice(1)) shape.lineTo(point.x, point.y)
  shape.closePath()
  return shape
}

function createHelicalCurves(spec: ReturnType<typeof getSegmentVisualSpec>) {
  if (spec.mode !== 'conveying') return []
  return Array.from({ length: spec.flightCount }, (_, flightIndex) => {
    const offset = (Math.PI * 2 * flightIndex) / spec.flightCount
    return createHelixCurve(spec.lengthMm, spec.flightRadiusMm, spec.pitchMm, spec.helixDirection, offset)
  })
}

function createHelixCurve(lengthMm: number, radiusMm: number, pitchMm: number, direction: number, offset = 0) {
  const turns = Math.max(lengthMm / pitchMm, 0.35)
  const points = Array.from({ length: 101 }, (_, index) => {
    const t = index / 100
    const angle = direction * turns * Math.PI * 2 * t + offset
    const x = -lengthMm / 2 + t * lengthMm
    return new Vector3(x, Math.cos(angle) * radiusMm, Math.sin(angle) * radiusMm * 0.92)
  })
  return new CatmullRomCurve3(points)
}

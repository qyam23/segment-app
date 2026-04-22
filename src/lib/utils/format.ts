export function formatMillimeters(value: number) {
  return `${value.toFixed(1)} mm`
}

export function formatAngle(value?: number | null) {
  return value == null ? 'n/a' : `${value.toFixed(0)} deg`
}

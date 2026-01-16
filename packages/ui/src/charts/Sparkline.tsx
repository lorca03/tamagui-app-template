'use client'

import { useId, useMemo } from 'react'
import { useTheme } from 'tamagui'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import type { ChartPoint } from './LineAreaChart'

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

function buildPath(points: ChartPoint[], width: number, height: number, padding: number) {
  if (points.length < 2) return ''
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const w = Math.max(1, width - padding * 2)
  const h = Math.max(1, height - padding * 2)
  const sx = (x: number) => padding + ((x - minX) / Math.max(1e-9, maxX - minX)) * w
  const sy = (y: number) => padding + (1 - (y - minY) / Math.max(1e-9, maxY - minY)) * h

  return points
    .map((p, i) => {
      const x = clamp(sx(p.x), 0, width)
      const y = clamp(sy(p.y), 0, height)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export function Sparkline({
  data,
  width,
  height,
  padding = 2,
  color,
  withArea = true,
}: {
  data: ChartPoint[]
  width: number
  height: number
  padding?: number
  color?: string
  withArea?: boolean
}) {
  const theme = useTheme()
  const gradientId = useId()

  const stroke = useMemo(() => {
    return color || ((theme.blue9?.val as string) || '#3b82f6')
  }, [color, theme.blue9?.val])

  const d = useMemo(() => buildPath(data, width, height, padding), [data, width, height, padding])
  if (!d) return null

  const areaPath = withArea
    ? `${d} L ${(width - padding).toFixed(2)} ${(height - padding).toFixed(
        2
      )} L ${padding.toFixed(2)} ${(height - padding).toFixed(2)} Z`
    : ''

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={stroke} stopOpacity={0.18} />
          <Stop offset="1" stopColor={stroke} stopOpacity={0.02} />
        </LinearGradient>
      </Defs>
      {withArea ? <Path d={areaPath} fill={`url(#${gradientId})`} /> : null}
      <Path d={d} fill="none" stroke={stroke} strokeWidth={2} />
    </Svg>
  )
}


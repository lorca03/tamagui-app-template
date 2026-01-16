'use client'

import { useId, useMemo } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'tamagui'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

export type ChartPoint = { x: number; y: number }

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

function buildLinePath({
  points,
  width,
  height,
  padding,
}: {
  points: ChartPoint[]
  width: number
  height: number
  padding: number
}) {
  if (points.length < 2) return ''

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const w = Math.max(1, width - padding * 2)
  const h = Math.max(1, height - padding * 2)

  const scaleX = (x: number) => padding + ((x - minX) / Math.max(1e-9, maxX - minX)) * w
  const scaleY = (y: number) => padding + (1 - (y - minY) / Math.max(1e-9, maxY - minY)) * h

  const d = points
    .map((p, i) => {
      const x = clamp(scaleX(p.x), 0, width)
      const y = clamp(scaleY(p.y), 0, height)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return { d, minX, maxX, minY, maxY, scaleX, scaleY }
}

export function LineAreaChart({
  data,
  width,
  height,
  padding = 6,
  strokeWidth = 2,
  withArea = true,
  animateOnMount = true,
  animationDurationMs = 900,
}: {
  data: ChartPoint[]
  width: number
  height: number
  padding?: number
  strokeWidth?: number
  withArea?: boolean
  animateOnMount?: boolean
  animationDurationMs?: number
}) {
  const theme = useTheme()
  const gradientId = useId()

  const colors = useMemo(() => {
    const stroke = (theme.blue9?.val as string) || '#3b82f6'
    // En dark, blue2 puede ser muy oscuro; usamos una versión con alpha vía stops.
    return { stroke }
  }, [theme.blue9?.val])

  const computed = useMemo(() => {
    return buildLinePath({ points: data, width, height, padding })
  }, [data, width, height, padding])

  if (!computed || !computed.d) {
    return null
  }

  const linePath = computed.d
  const areaPath = withArea
    ? `${linePath} L ${(width - padding).toFixed(2)} ${(height - padding).toFixed(
        2
      )} L ${padding.toFixed(2)} ${(height - padding).toFixed(2)} Z`
    : ''

  const dashArray = 1200
  const shouldAnimate = Platform.OS === 'web' && animateOnMount
  const animationName = `tmg_line_${gradientId}`

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.stroke} stopOpacity={0.22} />
          <Stop offset="1" stopColor={colors.stroke} stopOpacity={0.02} />
        </LinearGradient>
      </Defs>

      {withArea ? <Path d={areaPath} fill={`url(#${gradientId})`} /> : null}
      {shouldAnimate ? (
        // @ts-expect-error - react-native-svg en web soporta style con @keyframes
        <>
          {/* @ts-expect-error: style injection para web */}
          <style>{`
            @keyframes ${animationName} {
              from { stroke-dashoffset: ${dashArray}; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
          <Path
            d={linePath}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            // @ts-expect-error
            strokeDasharray={dashArray}
            // @ts-expect-error
            strokeDashoffset={dashArray}
            // @ts-expect-error
            style={{
              animation: `${animationName} ${animationDurationMs}ms ease-out 1`,
            }}
          />
        </>
      ) : (
        <Path d={linePath} fill="none" stroke={colors.stroke} strokeWidth={strokeWidth} />
      )}
    </Svg>
  )
}

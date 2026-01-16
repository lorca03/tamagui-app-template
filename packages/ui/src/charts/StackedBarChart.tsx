'use client'

import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'tamagui'
import Svg, { Rect } from 'react-native-svg'

export type StackedSeriesKey = string
export type StackedBarDatum = {
  label: string
  values: Record<StackedSeriesKey, number>
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export function StackedBarChart({
  data,
  keys,
  width,
  height,
  padding = 12,
  animateOnMount = true,
  animationDurationMs = 900,
}: {
  data: StackedBarDatum[]
  keys: StackedSeriesKey[]
  width: number
  height: number
  padding?: number
  animateOnMount?: boolean
  animationDurationMs?: number
}) {
  const theme = useTheme()
  const palette = useMemo(() => {
    const b = (theme.blue9?.val as string) || '#3b82f6'
    const b2 = (theme.blue8?.val as string) || '#2563eb'
    const b3 = (theme.blue7?.val as string) || '#1d4ed8'
    const b4 = (theme.blue6?.val as string) || '#1e40af'
    return [b4, b3, b2, b]
  }, [theme.blue6?.val, theme.blue7?.val, theme.blue8?.val, theme.blue9?.val])

  const totals = data.map((d) => keys.reduce((acc, k) => acc + (d.values[k] || 0), 0))
  const max = Math.max(1e-9, ...totals)

  const innerW = Math.max(1, width - padding * 2)
  const innerH = Math.max(1, height - padding * 2)
  const gap = 14
  const barW = Math.max(14, (innerW - gap * (data.length - 1)) / data.length)

  const shouldAnimate = Platform.OS === 'web' && animateOnMount
  const animationName = `tmg_stacked_${width}_${height}`

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      // @ts-expect-error
      style={
        shouldAnimate
          ? {
              animation: `${animationName} ${animationDurationMs}ms ease-out 1`,
              transformOrigin: 'center',
            }
          : undefined
      }
    >
      {shouldAnimate ? (
        // @ts-expect-error - style injection en web
        <style>{`
          @keyframes ${animationName} {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0px); }
          }
        `}</style>
      ) : null}
      {data.map((d, i) => {
        const x = padding + i * (barW + gap)
        const total = totals[i] || 1e-9
        let yCursor = padding + innerH
        return keys.map((k, idx) => {
          const v = d.values[k] || 0
          const h = clamp((v / max) * innerH, 0, innerH)
          yCursor -= h
          return (
            <Rect
              key={`${d.label}-${k}`}
              x={x}
              y={yCursor}
              width={barW}
              height={h}
              rx={10}
              ry={10}
              fill={palette[idx % palette.length]}
              opacity={0.9}
            />
          )
        })
      })}
    </Svg>
  )
}


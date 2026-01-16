'use client'

import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'tamagui'
import Svg, { G, Line, Rect, Text } from '@tamagui/react-native-svg'

export type BarChartDatum = { label: string; value: number; color?: string }

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const formatTick = (n: number, max: number) => {
  const absMax = Math.abs(max)
  if (absMax >= 100) return String(Math.round(n))
  if (absMax >= 10) return String(Math.round(n * 10) / 10)
  return String(Math.round(n * 100) / 100)
}

export function BarChartComponent({
  data,
  width,
  height,
  padding = 12,
  yAxisLabelWidth = 34,
  plotLeftPadding = 12,
  barWidth,
  barGap = 14,
  barRadius = 6,
  showGrid = true,
  gridLines = 4,
  showXAxis = true,
  xAxisLabelHeight = 30,
  animateOnMount = true,
  animationDurationMs = 900,
}: {
  data: BarChartDatum[]
  width: number
  height: number
  padding?: number
  yAxisLabelWidth?: number
  plotLeftPadding?: number
  barWidth?: number
  barGap?: number
  barRadius?: number
  showGrid?: boolean
  gridLines?: number
  showXAxis?: boolean
  xAxisLabelHeight?: number
  animateOnMount?: boolean
  animationDurationMs?: number
}) {
  const theme = useTheme()
  const defaultFill = useMemo(() => (theme.blue9?.val as string) || '#3b82f6', [theme.blue9?.val])
  const gridStroke = useMemo(
    () => (theme.borderColor?.val as string) || (theme.gray6?.val as string) || 'rgba(0,0,0,0.12)',
    [theme.borderColor?.val, theme.gray6?.val]
  )
  const labelFill = useMemo(
    () => (theme.color?.val as string) || (theme.gray11?.val as string) || 'rgba(0,0,0,0.7)',
    [theme.color?.val, theme.gray11?.val]
  )

  const max = Math.max(1e-9, ...data.map((d) => d.value))
  const plotW = Math.max(1, width - padding * 2 - yAxisLabelWidth - plotLeftPadding)
  const plotH = Math.max(1, height - padding * 2 - (showXAxis ? xAxisLabelHeight : 0))

  const gap = Math.max(6, barGap)
  const computedBarW = Math.max(
    6,
    (plotW - gap * Math.max(0, data.length - 1)) / Math.max(1, data.length)
  )

  const bw = clamp(barWidth ?? computedBarW, 6, computedBarW)
  const totalW = bw * data.length + gap * Math.max(0, data.length - 1)
  const plotX0 = padding + yAxisLabelWidth + plotLeftPadding + Math.max(0, (plotW - totalW) / 2)
  const plotY0 = padding
  const plotYBottom = padding + plotH

  const shouldAnimate = Platform.OS === 'web' && animateOnMount
  const animationName = `tmg_bar_${width}_${height}`
  const delayPerBarMs = Math.max(
    40,
    Math.floor(animationDurationMs / Math.max(1, data.length * 1.5))
  )
  const barAnimDurationMs = Math.max(
    240,
    animationDurationMs - delayPerBarMs * Math.max(0, data.length - 1)
  )
  const ticks = clamp(gridLines, 2, 8)

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {shouldAnimate ? (
        <style>{`
          @keyframes ${animationName} {
            from { opacity: 0; transform: scaleY(0.08); }
            to { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      ) : null}

      {showGrid
        ? Array.from({ length: ticks + 1 }).map((_, idx) => {
            const t = idx / ticks
            const y = plotYBottom - t * plotH
            const value = t * max
            return (
              <G key={`grid_${idx}`}>
                <Line
                  x1={padding + yAxisLabelWidth + plotLeftPadding}
                  y1={y}
                  x2={padding + yAxisLabelWidth + plotLeftPadding + plotW}
                  y2={y}
                  stroke={gridStroke}
                  strokeWidth={1.5}
                  opacity={idx === 0 ? 0.55 : 0.35}
                />
                <Text
                  x={padding + yAxisLabelWidth - 6}
                  y={y + 4}
                  fill={labelFill}
                  fontSize={12}
                  fontWeight="700"
                  textAnchor="end"
                  opacity={0.75}
                >
                  {formatTick(value, max)}
                </Text>
              </G>
            )
          })
        : null}

      {data.map((d, i) => {
        const h = clamp((d.value / max) * plotH, 2, plotH)
        const x = plotX0 + i * (bw + gap)
        const y = plotY0 + (plotH - h)
        const fill = d.color || defaultFill
        const originX = x + bw / 2
        const originY = plotYBottom

        return (
          <G key={d.label}>
            <Rect
              x={x}
              y={y}
              width={bw}
              height={h}
              rx={barRadius}
              ry={barRadius}
              fill={fill}
              opacity={0.92}
              style={
                shouldAnimate
                  ? {
                      transformOrigin: `${originX}px ${originY}px`,
                      transformBox: 'fill-box',
                      animation: `${animationName} ${barAnimDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        i * delayPerBarMs
                      }ms 1 both`,
                    }
                  : undefined
              }
            />

            {showXAxis ? (
              <G>
                <Rect
                  x={x + bw / 2 - 3}
                  y={plotYBottom + 10}
                  width={6}
                  height={6}
                  rx={3}
                  ry={3}
                  fill={fill}
                  opacity={0.95}
                />
                <Text
                  x={x + bw / 2}
                  y={plotYBottom + 26}
                  fill={labelFill}
                  fontSize={11}
                  fontWeight="700"
                  textAnchor="middle"
                  opacity={0.9}
                >
                  {d.label}
                </Text>
              </G>
            ) : null}
          </G>
        )
      })}
    </Svg>
  )
}

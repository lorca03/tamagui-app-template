'use client'

import { useId, useMemo, useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'tamagui'
import Svg, { Circle, G } from '@tamagui/react-native-svg'

export type DonutSlice = {
  label: string
  value: number
  color?: string
}

export function DonutChart({
  size,
  thickness = 18,
  data,
  animateOnMount = true,
  animationDurationMs = 900,
}: {
  size: number
  thickness?: number
  data: DonutSlice[]
  animateOnMount?: boolean
  animationDurationMs?: number
}) {
  const theme = useTheme()
  const id = useId()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Valores por defecto para evitar mismatch durante hidratación
  const defaultPalette = ['#3b82f6', '#2563eb', '#1d4ed8', '#64748b']
  const defaultBorderColor = '#e2e8f0'

  const palette = useMemo(() => {
    if (!mounted) return defaultPalette
    const b9 = (theme.blue9?.val as string) || '#3b82f6'
    const b8 = (theme.blue8?.val as string) || '#2563eb'
    const b7 = (theme.blue7?.val as string) || '#1d4ed8'
    const g = (theme.gray10?.val as string) || '#64748b'
    return [b9, b8, b7, g]
  }, [mounted, theme.blue7?.val, theme.blue8?.val, theme.blue9?.val, theme.gray10?.val])

  const borderColor = useMemo(() => {
    if (!mounted) return defaultBorderColor
    return (theme.borderColor?.val as string) || defaultBorderColor
  }, [mounted, theme.borderColor?.val])

  const total = data.reduce((acc, s) => acc + s.value, 0) || 1
  const radius = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const c = 2 * Math.PI * radius

  const slices = useMemo(() => {
    let offset = 0
    return data.map((s, idx) => {
      const fraction = s.value / total
      const dash = fraction * c
      const gap = c - dash
      const stroke = s.color || palette[idx % palette.length]
      const dashArray = `${dash} ${gap}`
      const dashOffset = -offset
      offset += dash
      return { stroke, dashArray, dashOffset }
    })
  }, [data, total, c, palette])

  const shouldAnimate = Platform.OS === 'web' && animateOnMount
  const animationName = `tmg_donut_${id}`

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      suppressHydrationWarning
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
        <style>{`
          @keyframes ${animationName} {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      ) : null}

      <G transform={`rotate(-90 ${cx} ${cy})`}>
        {/* background ring */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={borderColor}
          strokeWidth={thickness}
          fill="transparent"
        />
        {slices.map((s, idx) => (
          <Circle
            key={idx}
            cx={cx}
            cy={cy}
            r={radius}
            stroke={s.stroke}
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={s.dashArray}
            strokeDashoffset={s.dashOffset}
          />
        ))}
      </G>
    </Svg>
  )
}


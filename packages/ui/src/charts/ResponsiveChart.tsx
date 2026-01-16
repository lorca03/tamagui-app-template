'use client'

import { useCallback, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { YStack } from 'tamagui'

export function ResponsiveChart({
  height,
  children,
}: {
  height: number
  children: (width: number) => React.ReactNode
}) {
  const [width, setWidth] = useState(0)

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width)
    if (w > 0) setWidth(w)
  }, [])

  return (
    <YStack width="100%" height={height} onLayout={onLayout} alignItems="center" justifyContent="center">
      {width > 0 ? children(width) : null}
    </YStack>
  )
}


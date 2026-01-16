'use client'

import { YStack } from 'tamagui'

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack
      flex={1}
      bg="$background"
    >
      {children}
    </YStack>
  )
}

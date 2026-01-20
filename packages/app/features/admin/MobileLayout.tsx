import { YStack, ScrollView } from 'tamagui'

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1} backgroundColor="$background" showsVerticalScrollIndicator={false}>
        <YStack p="$4" flex={1} width="100%">
          {children}
        </YStack>
      </ScrollView>
    </YStack>
  )
}

'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button, Dialog, XStack, YStack, Paragraph, ScrollView } from 'tamagui'
import { X } from '@tamagui/lucide-icons'

export type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  maxWidth?: number | string
  showCloseButton?: boolean
}

export function Modal({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 700,
  showCloseButton = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog modal open={open && mounted} onOpenChange={onOpenChange}>
      {mounted && (
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.75}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          bg="$accent0"
          zIndex={99_999}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          maxWidth={typeof maxWidth === 'number' ? maxWidth : undefined}
          width="90%"
          height="85%"
          maxHeight="90vh"
          padding="$6"
          backgroundColor="$background"
          borderColor="$borderColor"
          zIndex={100_000}
          alignSelf="center"
          overflow="hidden"
        >
          <YStack gap="$6" height="100%" $sm={{ gap: '$3' }}>
            <XStack 
              justifyContent="space-between" 
              alignItems="flex-start" 
              marginBottom="$2"
              flexShrink={0}
              $sm={{ marginBottom: '$1' }}
            >
              <YStack flex={1} gap="$1">
                <Dialog.Title fontWeight="800" size="$7" color="$color">
                  {title}
                </Dialog.Title>
                {subtitle && (
                  <Paragraph size="$4" color="$colorFocus" fontWeight="400">
                    {subtitle}
                  </Paragraph>
                )}
              </YStack>
              {showCloseButton && (
                <Dialog.Close asChild>
                  <Button
                    size="$3"
                    circular
                    icon={X}
                    onPress={handleClose}
                    backgroundColor="transparent"
                    hoverStyle={{ backgroundColor: '$backgroundHover' }}
                    marginLeft="$2"
                  />
                </Dialog.Close>
              )}
            </XStack>

            <ScrollView 
              flex={1}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>

            {footer && (
              <XStack 
                marginTop="$4" 
                paddingTop="$4" 
                borderTopWidth={1} 
                borderTopColor="$borderColor" 
                justifyContent="flex-end"
                flexShrink={0}
                $sm={{
                  marginTop: '$3',
                  paddingTop: '$3',
                }}
              >
                {footer}
              </XStack>
            )}
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
      )}
    </Dialog>
  )
}

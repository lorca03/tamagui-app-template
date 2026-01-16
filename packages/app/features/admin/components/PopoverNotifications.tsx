'use client'

import { Button, H3, Paragraph, Popover, Separator, XStack, YStack } from 'tamagui'
import { Bell, X } from '@tamagui/lucide-icons'

type Notification = {
  id: string
  userName: string
  message: string
  timeAgo: string
  avatar: string
  status: 'online' | 'offline'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    userName: 'Terry Franci',
    message: 'requests permission to change Project - Nganter App',
    timeAgo: '5 min ago',
    avatar: 'TF',
    status: 'online',
  },
  {
    id: '2',
    userName: 'Alena Franci',
    message: 'requests permission to change Project - Nganter App',
    timeAgo: '8 min ago',
    avatar: 'AF',
    status: 'online',
  },
  {
    id: '3',
    userName: 'Jocelyn Kenter',
    message: 'requests permission to change Project - Nganter App',
    timeAgo: '15 min ago',
    avatar: 'JK',
    status: 'online',
  },
  {
    id: '4',
    userName: 'Brandon Philips',
    message: 'requests permission to change Project - Nganter App',
    timeAgo: '1 hr ago',
    avatar: 'BP',
    status: 'offline',
  },
]

export function PopoverNotifications() {
  return (
    <YStack position="relative">
      <Popover size="$5" allowFlip placement="bottom-end" offset={8}>
        <Popover.Trigger>
          <Button
            size="$4"
            circular
            variant="outlined"
            icon={Bell}
            borderColor="$borderColor"
            alignItems="center"
            justifyContent="center"
            hoverStyle={{
              backgroundColor: '$backgroundHover',
              borderColor: '$borderColorHover',
            }}
          />
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          borderRadius="$4"
          shadowColor="$color"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.1}
          shadowRadius={12}
          padding={0}
          width={380}
          maxHeight={500}
          enterStyle={{ opacity: 0, scale: 0.95, y: -10 }}
          exitStyle={{ opacity: 0, scale: 0.95, y: -10 }}
          animation="quick"
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

          <YStack>
            {/* Header */}
            <XStack
              alignItems="center"
              justifyContent="space-between"
              padding="$4"
              borderBottomWidth={1}
              borderBottomColor="$borderColor"
            >
              <H3 size="$6" fontWeight="700" color="$color">
                Notification
              </H3>
              <Popover.Close>
                <Button
                  size="$3"
                  circular
                  icon={X}
                  backgroundColor="transparent"
                  borderWidth={0}
                  hoverStyle={{
                    backgroundColor: '$backgroundHover',
                  }}
                />
              </Popover.Close>
            </XStack>

            {/* Notifications List */}
            <Popover.ScrollView maxHeight={400}>
              <YStack padding="$2">
                {mockNotifications.map((notification, index) => (
                  <YStack key={notification.id}>
                    <XStack
                      padding="$3"
                      gap="$3"
                      hoverStyle={{
                        backgroundColor: '$backgroundHover',
                      }}
                      borderRadius="$3"
                      cursor="pointer"
                      alignItems="flex-start"
                    >
                      {/* Avatar con indicador de estado */}
                      <YStack
                        position="relative"
                        alignItems="center"
                        justifyContent="center"
                        width={48}
                        height={48}
                      >
                        <YStack
                          width={48}
                          height={48}
                          borderRadius="$4"
                          backgroundColor="$blue9"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Paragraph color="white" fontWeight="600" size="$4">
                            {notification.avatar}
                          </Paragraph>
                        </YStack>
                        {/* Punto verde/rojo alineado con el borde inferior derecho del avatar */}
                        <YStack
                          position="absolute"
                          bottom={-1}
                          right={-1}
                          width={14}
                          height={14}
                          borderRadius={7}
                          backgroundColor={notification.status === 'online' ? '$green9' : '$red9'}
                          borderWidth={2.5}
                          borderColor="$background"
                        />
                      </YStack>

                      {/* Content */}
                      <YStack flex={1} gap="$1.5" paddingTop="$0.5">
                        <XStack flexWrap="wrap" gap="$1" alignItems="flex-start">
                          <Paragraph size="$4" color="$color" fontWeight="600" lineHeight="$1">
                            {notification.userName}
                          </Paragraph>
                          <Paragraph size="$4" color="$color" fontWeight="500" lineHeight="$1">
                            {notification.message}
                          </Paragraph>
                        </XStack>
                        <XStack gap="$2" alignItems="center" marginTop="$0.5">
                          <Paragraph size="$2" color="$colorFocus" fontWeight="500">
                            Project
                          </Paragraph>
                          <Paragraph size="$2" color="$colorFocus">
                            •
                          </Paragraph>
                          <Paragraph size="$2" color="$colorFocus" fontWeight="500">
                            {notification.timeAgo}
                          </Paragraph>
                        </XStack>
                      </YStack>
                    </XStack>
                    {index < mockNotifications.length - 1 && <Separator marginVertical="$1" />}
                  </YStack>
                ))}
              </YStack>
            </Popover.ScrollView>

            {/* Footer con botón */}
            <XStack
              padding="$4"
              borderTopWidth={1}
              borderTopColor="$borderColor"
              backgroundColor="$background"
            >
              <Button
                flex={1}
                backgroundColor="$blue9"
                color="white"
                fontWeight="600"
                borderRadius="$3"
                height={44}
                hoverStyle={{
                  backgroundColor: '$blue10',
                }}
                pressStyle={{
                  scale: 0.98,
                }}
                animation="quick"
              >
                View All Notifications
              </Button>
            </XStack>
          </YStack>
        </Popover.Content>
      </Popover>
      <YStack
        position="absolute"
        top={-1}
        right={-1}
        width={10}
        height={10}
        borderRadius={5}
        backgroundColor="$red9"
        borderWidth={2}
        borderColor="$background"
        pointerEvents="none"
      />
    </YStack>
  )
}

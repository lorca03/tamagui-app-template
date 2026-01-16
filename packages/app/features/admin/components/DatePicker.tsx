'use client'

import React, { useState } from 'react'
import { Button, Input, Paragraph, Popover, XStack, YStack, Sheet, Adapt, isWeb } from 'tamagui'
import { Calendar, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

function getMonthMeta(date: Date) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const first = new Date(y, m, 1)
  const last = new Date(y, m + 1, 0)
  const startWeekday = first.getDay()
  const daysInMonth = last.getDate()
  return { y, m, startWeekday, daysInMonth }
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function DatePicker(props: { value: Date; onChange: (d: Date) => void; placeholder?: string }) {
  const { value, onChange, placeholder = 'Selecciona una fecha' } = props
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1))

  const { y, m, startWeekday, daysInMonth } = getMonthMeta(cursor)
  const monthLabel = cursor.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  const cells: Array<{ key: string; date?: Date }> = []
  for (let i = 0; i < startWeekday; i++) cells.push({ key: `p-${i}` })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ key: `d-${d}`, date: new Date(y, m, d) })
  while (cells.length % 7 !== 0) cells.push({ key: `t-${cells.length}` })

  const weekdays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleDateSelect = (date: Date) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} size="$5" allowFlip>
      <Adapt when="sm" platform="touch">
        <Sheet native modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.Handle />
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            bg="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Popover.Trigger asChild>
        <XStack
          alignItems="center"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          backgroundColor="$background"
          paddingHorizontal="$4"
          gap="$2"
          height={44}
          cursor="pointer"
          hoverStyle={{
            borderColor: '$borderColorHover',
            backgroundColor: '$backgroundHover',
          }}
          onPress={() => setOpen(true)}
        >
          <Input
            flex={1}
            value={formatDate(value)}
            placeholder={placeholder}
            readOnly
            unstyled
            borderWidth={0}
            backgroundColor="transparent"
            fontSize="$4"
            height="100%"
            pointerEvents="none"
          />
          <Calendar size={18} color="$colorFocus" />
        </XStack>
      </Popover.Trigger>

      <Popover.Content
        padding="$4"
        borderRadius="$5"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevationAndroid={8}
        minWidth={isWeb ? 300 : undefined}
        width={isWeb ? undefined : '100%'}
      >
        <YStack gap="$4">
          {/* Header con navegación */}
          <XStack alignItems="center" justifyContent="space-between">
            <Button
              unstyled
              padding="$2"
              circular
              icon={ChevronLeft}
              color="$color"
              hoverStyle={{ backgroundColor: '$color3' }}
              onPress={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            />
            <Paragraph fontWeight="700" fontSize="$5" color="$color" textTransform="capitalize">
              {monthLabel}
            </Paragraph>
            <Button
              unstyled
              padding="$2"
              circular
              icon={ChevronRight}
              color="$color"
              hoverStyle={{ backgroundColor: '$color3' }}
              onPress={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            />
          </XStack>

          {/* Días de la semana */}
          <XStack flexWrap="wrap" justifyContent="space-between" rowGap="$2">
            {weekdays.map((w) => (
              <YStack key={w} width="14%" alignItems="center">
                <Paragraph size="$2" opacity={0.7} color="$color" fontWeight="600">
                  {w}
                </Paragraph>
              </YStack>
            ))}
          </XStack>

          {/* Grid de días */}
          <XStack flexWrap="wrap" justifyContent="space-between" rowGap="$2">
            {cells.map((c) => {
              if (!c.date) {
                return <YStack key={c.key} width="14%" height={36} />
              }
              const selected = isSameDay(value, c.date)
              const isToday = isSameDay(new Date(), c.date)
              return (
                <Button
                  key={c.key}
                  unstyled
                  width="14%"
                  height={36}
                  padding={0}
                  borderRadius="$3"
                  onPress={() => handleDateSelect(c.date!)}
                  backgroundColor={selected ? '$color10' : isToday ? '$color4' : 'transparent'}
                  hoverStyle={{ backgroundColor: selected ? '$color10' : '$color3' }}
                  pressStyle={{ scale: 0.95 }}
                >
                  <Paragraph
                    color={selected ? '$color12' : '$color'}
                    fontWeight={selected ? '700' : isToday ? '600' : '500'}
                    fontSize="$3"
                  >
                    {c.date.getDate()}
                  </Paragraph>
                </Button>
              )
            })}
          </XStack>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}

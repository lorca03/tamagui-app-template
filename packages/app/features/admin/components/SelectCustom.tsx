'use client'

import React, { useMemo } from 'react'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet, YStack, getFontSize, Label } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import type { FontSizeTokens, SelectProps } from 'tamagui'

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
  { name: 'Starfruit' },
  { name: 'Blueberry' },
  { name: 'Raspberry' },
  { name: 'Strawberry' },
  { name: 'Mango' },
  { name: 'Pineapple' },
  { name: 'Lime' },
  { name: 'Lemon' },
  { name: 'Coconut' },
  { name: 'Guava' },
  { name: 'Papaya' },
  { name: 'Orange' },
  { name: 'Grape' },
  { name: 'Jackfruit' },
  { name: 'Durian' },
] as const

type SelectValue = Lowercase<(typeof items)[number]['name']>

const getItemLabel = (value: string) => items.find((item) => item.name.toLowerCase() === value)?.name

export type SelectCustomProps = Omit<SelectProps<SelectValue>, 'value' | 'onValueChange'> & {
  id: string
  placeholder?: string
  label?: string
}

export function SelectCustom({ placeholder = 'Selecciona...', label, ...props }: SelectCustomProps) {
  const [val, setVal] = React.useState<SelectValue>('apple')

  return (
    <YStack gap="$2" flex={1}>
      {label && (
        <Label htmlFor={props.id} fontSize="$4" fontWeight="500">
          {label}
        </Label>
      )}
      <Select
        value={val}
        onValueChange={(next) => setVal(next as SelectValue)}
        disablePreventBodyScroll
        {...props}
        renderValue={getItemLabel}
      >
        <Select.Trigger id={props.id} maxWidth={220} width="100%" iconAfter={ChevronDown}>
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet native modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
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

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton items="center" justify="center" position="relative" width="100%" height="$3">
          <YStack z={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={['$background', 'transparent']} rounded="$4" />
        </Select.ScrollUpButton>

        <Select.Viewport minW={200}>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {useMemo(
              () =>
                items.map((item, i) => (
                  <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )),
              []
            )}
          </Select.Group>

          <YStack
            position="absolute"
            r={0}
            t={0}
            b={0}
            items="center"
            justify="center"
            width={'$4'}
            pointerEvents="none"
          >
            <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
          </YStack>
        </Select.Viewport>

        <Select.ScrollDownButton items="center" justify="center" position="relative" width="100%" height="$3">
          <YStack z={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={['transparent', '$background']} rounded="$4" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
    </YStack>
  )
}


'use client'

import React from 'react'
import { Input, Paragraph, XStack, YStack } from 'tamagui'

export type FieldInputProps = {
  label: string
  hint?: string
  icon?: React.ReactNode
  maxWidth?: number
  containerProps?: React.ComponentProps<typeof YStack>
  inputProps?: React.ComponentProps<typeof Input>
}

export function FieldInput(props: FieldInputProps) {
  const { label, hint, icon, maxWidth = 320, containerProps, inputProps } = props

  return (
    <YStack gap="$2" {...containerProps}>
      <Paragraph size="$4" fontWeight="600" color="$color">
        {label}
      </Paragraph>

      {!!hint && (
        <Paragraph size="$3" color="$colorFocus">
          {hint}
        </Paragraph>
      )}

      <XStack
        maxWidth={maxWidth}
        width="100%"
        alignItems="center"
        gap="$3"
        paddingHorizontal="$3"
        height={44}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        className=''
      >
        {icon ? <YStack>{icon}</YStack> : null}
        <Input unstyled flex={1} {...inputProps} />
      </XStack>
    </YStack>
  )
}


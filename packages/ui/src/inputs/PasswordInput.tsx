import { Input, XStack, YStack, Label, Paragraph, Button } from 'tamagui'
import type { InputProps } from 'tamagui'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

export type PasswordInputProps = Omit<InputProps, 'secureTextEntry'> & {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  showToggle?: boolean
}

export function PasswordInput({
  label,
  error,
  helperText,
  leftIcon,
  showToggle = true,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const disabled = Boolean(props.disabled)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <YStack gap="$2" flex={1}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <XStack
        alignItems="center"
        borderWidth={1}
        borderColor={error ? '$red10' : '$borderColor'}
        borderRadius="$5"
        backgroundColor="$background"
        paddingHorizontal="$4"
        gap="$2"
        height={52}
        focusStyle={{
          borderColor: error ? '$red10' : '$blue10',
        }}
        hoverStyle={{
          borderColor: error ? '$red10' : '$borderColorHover',
          backgroundColor: '$backgroundHover',
        }}
        opacity={disabled ? 0.6 : 1}
      >
        {leftIcon && (
          <XStack alignItems="center" justifyContent="center">
            {leftIcon}
          </XStack>
        )}
        <Input
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          focusStyle={{
            borderWidth: 0,
          }}
          fontSize="$5"
          height="100%"
          placeholderTextColor="$placeholderColor"
          secureTextEntry={!isVisible}
          {...props}
        />
        {showToggle && (
          <Button
            unstyled
            onPress={toggleVisibility}
            padding="$2"
            pressStyle={{
              opacity: 0.7,
            }}
            disabled={disabled}
            cursor="pointer"
          >
            {isVisible ? (
              <EyeOff size={20} color="$colorFocus" />
            ) : (
              <Eye size={20} color="$colorFocus" />
            )}
          </Button>
        )}
      </XStack>
      {error && (
        <Paragraph size="$2" color="$red10">
          {error}
        </Paragraph>
      )}
      {helperText && !error && (
        <Paragraph size="$2" theme="alt2">
          {helperText}
        </Paragraph>
      )}
    </YStack>
  )
}

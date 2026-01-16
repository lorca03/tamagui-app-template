import { Input, XStack, YStack, Label, Paragraph } from 'tamagui'
import type { InputProps } from 'tamagui'
import type { ReactNode } from 'react'

export type TextInputProps = InputProps & {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function TextInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  ...props
}: TextInputProps) {
  const disabled = Boolean(props.disabled)
  return (
    <YStack
      gap="$2"
      flex={1}
    >
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
          <XStack
            alignItems="center"
            justifyContent="center"
          >
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
          {...props}
        />
        {rightIcon && (
          <XStack
            alignItems="center"
            justifyContent="center"
          >
            {rightIcon}
          </XStack>
        )}
      </XStack>
      {error && (
        <Paragraph
          size="$2"
          color="$red10"
        >
          {error}
        </Paragraph>
      )}
      {helperText && !error && (
        <Paragraph
          size="$2"
          theme="alt2"
        >
          {helperText}
        </Paragraph>
      )}
    </YStack>
  )
}

import { Button, YStack, Label, Paragraph, Sheet, XStack } from 'tamagui'
import { ChevronDown, X } from '@tamagui/lucide-icons'
import { useState } from 'react'

export type MultiSelectOption = {
  value: string | number
  label: string
  disabled?: boolean
}

export type MultiSelectInputProps = {
  label?: string
  placeholder?: string
  options: MultiSelectOption[]
  value?: (string | number)[]
  onChange?: (value: (string | number)[]) => void
  error?: string
  helperText?: string
  disabled?: boolean
}

export function MultiSelectInput({
  label,
  placeholder = 'Seleccionar...',
  options,
  value = [],
  onChange,
  error,
  helperText,
  disabled = false,
}: MultiSelectInputProps) {
  const [open, setOpen] = useState(false)

  const toggleOption = (optionValue: string | number) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onChange?.(newValue)
  }

  const removeOption = (optionValue: string | number) => {
    const newValue = value.filter((v) => v !== optionValue)
    onChange?.(newValue)
  }

  const selectedOptions = options.filter((opt) => value.includes(opt.value))

  return (
    <YStack
      gap="$2"
      flex={1}
    >
      {label && <Label>{label}</Label>}
      <Button
        disabled={disabled}
        onPress={() => setOpen(true)}
        justifyContent="space-between"
        borderWidth={1}
        borderColor={error ? '$red10' : '$borderColor'}
        backgroundColor="$background"
        iconAfter={ChevronDown}
        fontWeight="500"
        height={52}
        borderRadius="$5"
        paddingHorizontal="$4"
        hoverStyle={{
          borderColor: error ? '$red10' : '$borderColorHover',
          backgroundColor: '$backgroundHover',
        }}
        opacity={disabled ? 0.6 : 1}
      >
        {selectedOptions.length > 0
          ? `${selectedOptions.length} seleccionado${selectedOptions.length > 1 ? 's' : ''}`
          : placeholder}
      </Button>

      {selectedOptions.length > 0 && (
        <XStack
          gap="$2"
          flexWrap="wrap"
          mt="$2"
        >
          {selectedOptions.map((option) => (
            <Button
              key={option.value}
              size="$3"
              onPress={() => removeOption(option.value)}
              iconAfter={X}
              backgroundColor="$blue2"
              borderColor="$blue6"
              borderWidth={1}
              borderRadius="$5"
              paddingHorizontal="$3"
              paddingVertical="$2"
              pressStyle={{ opacity: 0.7 }}
            >
              <Paragraph
                size="$3"
                color="$blue11"
              >
                {option.label}
              </Paragraph>
            </Button>
          ))}
        </XStack>
      )}

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$4"
          gap="$3"
        >
          <YStack gap="$2">
            {options.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <Button
                  key={option.value}
                  disabled={option.disabled}
                  onPress={() => toggleOption(option.value)}
                  justifyContent="space-between"
                  variant="outlined"
                  borderColor={isSelected ? '$blue10' : '$borderColor'}
                  backgroundColor={isSelected ? '$blue2' : '$background'}
                  borderRadius="$5"
                  height={48}
                  paddingHorizontal="$4"
                >
                  <Paragraph>{option.label}</Paragraph>
                  {isSelected && <Paragraph color="$blue10">✓</Paragraph>}
                </Button>
              )
            })}
          </YStack>
        </Sheet.Frame>
      </Sheet>

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

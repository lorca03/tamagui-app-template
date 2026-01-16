import { Button, YStack, Label, Paragraph, Sheet, XStack } from 'tamagui'
import { ChevronDown, Check } from '@tamagui/lucide-icons'
import { useState } from 'react'

export type SelectOption = {
  value: string | number
  label: string
  disabled?: boolean
}

export type SelectInputProps = {
  label?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  error?: string
  helperText?: string
  disabled?: boolean
}

export function SelectInput({
  label,
  placeholder = 'Seleccionar...',
  options,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((opt) => opt.value === value)

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
        {selectedOption ? selectedOption.label : placeholder}
      </Button>
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
            {options.map((option) => (
              <Button
                key={option.value}
                disabled={option.disabled}
                onPress={() => {
                  onChange?.(option.value)
                  setOpen(false)
                }}
                justifyContent="space-between"
                variant={value === option.value ? 'outlined' : 'outlined'}
                borderColor={value === option.value ? '$blue10' : '$borderColor'}
                borderRadius="$5"
                height={48}
                paddingHorizontal="$4"
              >
                <Paragraph>{option.label}</Paragraph>
                {value === option.value && (
                  <Check
                    size={18}
                    color="$blue10"
                  />
                )}
              </Button>
            ))}
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

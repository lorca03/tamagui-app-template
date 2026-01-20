import {
  Button,
  YStack,
  Label,
  Paragraph,
  Popover,
  XStack,
  Input,
  ScrollView,
  Image,
  Circle,
  Sheet,
  Adapt,
  isWeb,
} from 'tamagui'
import { ChevronDown, Check, Search, X } from '@tamagui/lucide-icons'
import { useState, useMemo, useRef, useEffect, ReactNode } from 'react'
import { Platform } from 'react-native'

export type SelectWithFilterOption = {
  value: string | number
  label: string
  disabled?: boolean
  icon?: ReactNode | string // Puede ser un componente React o una URL de imagen
  iconSize?: number
}

export type SelectWithFilterProps = {
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  options: SelectWithFilterOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  error?: string
  helperText?: string
  disabled?: boolean
}

export function SelectWithFilter({
  label,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  options,
  value: controlledValue,
  onChange,
  error,
  helperText,
  disabled = false,
}: SelectWithFilterProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [internalValue, setInternalValue] = useState<string | number | undefined>(undefined)
  const searchInputRef = useRef<any>(null)

  // Usar valor controlado si existe, sino usar el interno
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options
    const searchLower = search.toLowerCase().trim()
    return options.filter((option) => option.label.toLowerCase().includes(searchLower))
  }, [options, search])

  const selectedOption = options.find((opt) => opt.value === value)

  // Auto-focus en el input de búsqueda cuando se abre el popover
  useEffect(() => {
    if (open && searchInputRef.current) {
      // Pequeño delay para asegurar que el popover esté completamente renderizado
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleOpenChange = (isOpen: boolean) => {
    if (disabled && isOpen) return
    setOpen(isOpen)
    if (!isOpen) {
      setSearch('')
    }
  }

  const handleSelect = (optionValue: string | number) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue)
    }
    onChange?.(optionValue)
    setOpen(false)
    setSearch('')
  }

  const clearSearch = () => {
    setSearch('')
    searchInputRef.current?.focus()
  }

  return (
    <YStack gap="$2" flex={1}>
      {label && (
        <Label htmlFor="select-trigger" fontSize="$4" fontWeight="500">
          {label}
        </Label>
      )}
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
        size="$5"
        allowFlip
        placement="bottom-start"
        offset={4}
      >
        <Popover.Trigger asChild disabled={disabled}>
          <XStack
            id="select-trigger"
            alignItems="center"
            justifyContent="space-between"
            borderWidth={1}
            borderColor={error ? '$red10' : '$borderColor'}
            backgroundColor="$background"
            borderRadius="$5"
            paddingHorizontal="$4"
            gap="$2"
            height={52}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            hoverStyle={{
              borderColor: error ? '$red10' : '$borderColorHover',
              backgroundColor: '$backgroundHover',
            }}
            pressStyle={{
              scale: 0.98,
            }}
            opacity={disabled ? 0.6 : 1}
            pointerEvents={disabled ? 'none' : 'auto'}
          >
            <XStack alignItems="center" gap="$2" flex={1}>
              {selectedOption?.icon && (
                <Circle
                  size={20}
                  overflow="hidden"
                  backgroundColor="$background"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
                  {typeof selectedOption.icon === 'string' ? (
                    <Image
                      {...(Platform.OS === 'web'
                        ? { src: selectedOption.icon }
                        : { source: { uri: selectedOption.icon } })}
                      width={20}
                      height={20}
                      borderRadius={10}
                    />
                  ) : (
                    selectedOption.icon
                  )}
                </Circle>
              )}
              <Paragraph
                flex={1}
                textAlign="left"
                color={selectedOption ? '$color' : '$placeholderColor'}
                numberOfLines={1}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </Paragraph>
            </XStack>
            <ChevronDown size={18} color="$colorFocus" />
          </XStack>
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          borderRadius="$5"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.1}
          shadowRadius={12}
          padding="$4"
          gap="$3"
          maxHeight={isWeb ? 400 : '80%'}
          minWidth={isWeb ? 320 : undefined}
          width={isWeb ? undefined : '100%'}
          elevationAndroid={8}
          opacity={1}
          position="relative"
          enterStyle={{ opacity: 1, scale: 1, y: 0 }}
          exitStyle={{ opacity: 0, scale: 0.95, y: -10 }}
          animation="quick"
          pointerEvents="auto"
          style={{
            opacity: 1,
            display: 'flex',
            visibility: 'visible',
          }}
        >
          {isWeb && <Popover.Arrow borderWidth={1} borderColor="$borderColor" />}
          <XStack
            alignItems="center"
            borderWidth={1}
            borderColor={search ? '$blue10' : '$borderColor'}
            borderRadius="$5"
            paddingHorizontal="$3"
            gap="$2"
            backgroundColor="$background"
            height={48}
            focusStyle={{
              borderColor: '$blue10',
            }}
            hoverStyle={{
              borderColor: search ? '$blue10' : '$borderColorHover',
            }}
          >
            <Search size={18} color="$colorFocus" />
            <Input
              ref={searchInputRef}
              flex={1}
              borderWidth={0}
              backgroundColor="transparent"
              placeholder={searchPlaceholder}
              value={search}
              onChangeText={setSearch}
              fontSize="$4"
              unstyled
            />
            {search.length > 0 && (
              <Button
                size="$2"
                circular
                onPress={clearSearch}
                backgroundColor="transparent"
                pressStyle={{
                  backgroundColor: '$backgroundPress',
                }}
                padding="$1"
              >
                <X size={14} color="$colorFocus" />
              </Button>
            )}
          </XStack>

          <ScrollView maxHeight={isWeb ? 300 : undefined} showsVerticalScrollIndicator={false}>
            <YStack gap="$2" width="100%">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Button
                    key={option.value}
                    disabled={option.disabled}
                    onPress={() => handleSelect(option.value)}
                    justifyContent="space-between"
                    borderWidth={1}
                    borderColor={value === option.value ? '$blue10' : '$borderColor'}
                    backgroundColor={value === option.value ? '$blue2' : '$background'}
                    borderRadius="$4"
                    height={48}
                    paddingHorizontal="$4"
                    width="100%"
                    hoverStyle={{
                      borderColor: value === option.value ? '$blue10' : '$borderColorHover',
                      backgroundColor: value === option.value ? '$blue3' : '$backgroundHover',
                    }}
                    pressStyle={{
                      scale: 0.98,
                    }}
                    opacity={option.disabled ? 0.5 : 1}
                  >
                    <XStack alignItems="center" gap="$3" flex={1}>
                      {option.icon && (
                        <Circle
                          size={option.iconSize || 24}
                          overflow="hidden"
                          backgroundColor="$background"
                          borderWidth={1}
                          borderColor="$borderColor"
                        >
                          {typeof option.icon === 'string' ? (
                            <Image
                              {...(Platform.OS === 'web'
                                ? { src: option.icon }
                                : { source: { uri: option.icon } })}
                              width={option.iconSize || 24}
                              height={option.iconSize || 24}
                              borderRadius={option.iconSize ? option.iconSize / 2 : 12}
                            />
                          ) : (
                            option.icon
                          )}
                        </Circle>
                      )}
                      <Paragraph
                        flex={1}
                        textAlign="left"
                        color={option.disabled ? '$colorFocus' : '$color'}
                        opacity={option.disabled ? 0.5 : 1}
                      >
                        {option.label}
                      </Paragraph>
                    </XStack>
                    {value === option.value && <Check size={18} color="$blue10" />}
                  </Button>
                ))
              ) : (
                <YStack alignItems="center" justifyContent="center" paddingVertical="$6" gap="$2">
                  <Paragraph textAlign="center" fontSize="$4" color="$colorFocus">
                    No se encontraron resultados
                  </Paragraph>
                  {search.trim() && (
                    <Paragraph textAlign="center" fontSize="$3" color="$colorFocus" opacity={0.7}>
                      Intenta con otro término de búsqueda
                    </Paragraph>
                  )}
                </YStack>
              )}
            </YStack>
          </ScrollView>
        </Popover.Content>
      </Popover>
      {error && (
        <Paragraph size="$2" color="$red10" marginTop="$-1">
          {error}
        </Paragraph>
      )}
      {helperText && !error && (
        <Paragraph size="$2" color="$colorFocus" opacity={0.7} marginTop="$-1">
          {helperText}
        </Paragraph>
      )}
    </YStack>
  )
}

import { useState, useMemo, useRef, useEffect } from 'react'
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
  isWeb,
} from 'tamagui'
import { ChevronDown, Check, Search, X } from '@tamagui/lucide-icons'
import type { InputProps } from 'tamagui'

// Lista de países con prefijos telefónicos comunes
const COUNTRIES = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: 'https://flagcdn.com/w20/mx.png' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: 'https://flagcdn.com/w20/es.png' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: 'https://flagcdn.com/w20/ar.png' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: 'https://flagcdn.com/w20/co.png' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: 'https://flagcdn.com/w20/cl.png' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: 'https://flagcdn.com/w20/pe.png' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: 'https://flagcdn.com/w20/br.png' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w20/de.png' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: 'https://flagcdn.com/w20/it.png' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w20/au.png' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: 'https://flagcdn.com/w20/cn.png' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'https://flagcdn.com/w20/jp.png' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://flagcdn.com/w20/in.png' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: 'https://flagcdn.com/w20/ru.png' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: 'https://flagcdn.com/w20/kr.png' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: 'https://flagcdn.com/w20/pt.png' },
]

export type PhoneInputProps = Omit<InputProps, 'value' | 'onChangeText'> & {
  label?: string
  error?: string
  helperText?: string
  value?: string
  onChangeText?: (text: string) => void
  defaultCountry?: string // Código de país por defecto (ej: 'US', 'MX')
}

// Función para detectar el país desde un número de teléfono con prefijo
const detectCountryFromPhone = (phone: string): string | null => {
  if (!phone || !phone.startsWith('+')) return null
  
  // Ordenar países por longitud de dialCode (más largos primero) para coincidencias precisas
  const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
  
  for (const country of sortedCountries) {
    if (phone.startsWith(country.dialCode)) {
      return country.code
    }
  }
  return null
}

// Función para extraer el número sin el prefijo
const extractPhoneNumber = (phone: string, dialCode: string): string => {
  if (!phone) return ''
  if (phone.startsWith(dialCode)) {
    return phone.slice(dialCode.length).trim()
  }
  // Si no tiene prefijo, devolver el valor tal cual (sin caracteres no numéricos excepto espacios)
  return phone.replace(/[^\d\s]/g, '')
}

export function PhoneInput({
  label,
  error,
  helperText,
  value = '',
  onChangeText,
  defaultCountry = 'US',
  ...props
}: PhoneInputProps) {
  // Detectar país inicial desde el valor si viene con prefijo
  const initialCountry = detectCountryFromPhone(value) || defaultCountry
  const initialPhone = value ? extractPhoneNumber(value, COUNTRIES.find(c => c.code === initialCountry)?.dialCode || '+1') : ''
  
  const [countryCode, setCountryCode] = useState<string>(initialCountry)
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhone)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<any>(null)

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0]

  // Sincronizar el valor externo con el estado interno
  useEffect(() => {
    if (value) {
      const detectedCountry = detectCountryFromPhone(value) || countryCode
      const extractedNumber = extractPhoneNumber(value, COUNTRIES.find(c => c.code === detectedCountry)?.dialCode || '+1')
      setCountryCode(detectedCountry)
      setPhoneNumber(extractedNumber)
    } else {
      setPhoneNumber('')
    }
  }, [value, countryCode])

  // Auto-focus en el input de búsqueda cuando se abre el popover
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRIES
    const searchLower = search.toLowerCase().trim()
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.dialCode.includes(search) ||
        country.code.toLowerCase().includes(searchLower)
    )
  }, [search])

  const handlePhoneChange = (text: string) => {
    // Solo permitir números y espacios
    const cleaned = text.replace(/[^\d\s]/g, '')
    setPhoneNumber(cleaned)
    // Combinar prefijo con número y devolver el valor completo
    const fullPhone = cleaned ? `${selectedCountry.dialCode} ${cleaned}`.trim() : ''
    onChangeText?.(fullPhone)
  }

  const handleCountrySelect = (code: string) => {
    setCountryCode(code)
    setOpen(false)
    setSearch('')
    // Actualizar el valor completo cuando cambia el país
    const newCountry = COUNTRIES.find(c => c.code === code) || COUNTRIES[0]
    const fullPhone = phoneNumber ? `${newCountry.dialCode} ${phoneNumber}`.trim() : ''
    onChangeText?.(fullPhone)
  }

  const clearSearch = () => {
    setSearch('')
    searchInputRef.current?.focus()
  }

  const disabled = Boolean(props.disabled)

  return (
    <YStack gap="$2" flex={1} width="100%" minWidth={0}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <XStack
        alignItems="center"
        borderWidth={1}
        borderColor={error ? '$red10' : '$borderColor'}
        borderRadius="$5"
        backgroundColor="$background"
        paddingHorizontal="$3"
        gap="$1.5"
        height={52}
        width="100%"
        minWidth={0}
        maxWidth="100%"
        focusStyle={{
          borderColor: error ? '$red10' : '$blue10',
        }}
        hoverStyle={{
          borderColor: error ? '$red10' : '$borderColorHover',
          backgroundColor: '$backgroundHover',
        }}
        opacity={disabled ? 0.6 : 1}
      >
        {/* Selector de país */}
        <Popover
          open={open}
          onOpenChange={setOpen}
          size="$5"
          allowFlip
          placement="bottom-start"
          offset={4}
        >
          <Popover.Trigger asChild disabled={disabled}>
            <XStack
              alignItems="center"
              gap="$1"
              paddingRight="$1.5"
              borderRightWidth={1}
              borderRightColor="$borderColor"
              cursor="pointer"
              flexShrink={0}
              maxWidth={90}
              hoverStyle={{
                opacity: 0.7,
              }}
              pressStyle={{
                scale: 0.95,
              }}
            >
              <Circle
                size={16}
                overflow="hidden"
                backgroundColor="$background"
                borderWidth={1}
                borderColor="$borderColor"
                flexShrink={0}
              >
                <Image
                  {...(isWeb
                    ? { src: selectedCountry.flag }
                    : { source: { uri: selectedCountry.flag } })}
                  width={16}
                  height={16}
                  borderRadius={8}
                />
              </Circle>
              <Paragraph fontSize="$2" color="$color" fontWeight="500" numberOfLines={1} ellipsizeMode="tail">
                {selectedCountry.dialCode}
              </Paragraph>
              <ChevronDown size={10} color="$colorFocus" flexShrink={0} />
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
            maxHeight={400}
            minWidth={280}
            elevationAndroid={8}
            enterStyle={{ opacity: 1, scale: 1, y: 0 }}
            exitStyle={{ opacity: 0, scale: 0.95, y: -10 }}
            animation="quick"
          >
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
                placeholder="Buscar país..."
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

            <ScrollView maxHeight={300} showsVerticalScrollIndicator={false}>
              <YStack gap="$2" width="100%">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <Button
                      key={country.code}
                      onPress={() => handleCountrySelect(country.code)}
                      justifyContent="space-between"
                      borderWidth={1}
                      borderColor={countryCode === country.code ? '$blue10' : '$borderColor'}
                      backgroundColor={countryCode === country.code ? '$blue2' : '$background'}
                      borderRadius="$4"
                      height={48}
                      paddingHorizontal="$4"
                      width="100%"
                      hoverStyle={{
                        borderColor: countryCode === country.code ? '$blue10' : '$borderColorHover',
                        backgroundColor: countryCode === country.code ? '$blue3' : '$backgroundHover',
                      }}
                      pressStyle={{
                        scale: 0.98,
                      }}
                    >
                      <XStack alignItems="center" gap="$3" flex={1}>
                        <Circle
                          size={24}
                          overflow="hidden"
                          backgroundColor="$background"
                          borderWidth={1}
                          borderColor="$borderColor"
                        >
                          <Image
                            {...(isWeb
                              ? { src: country.flag }
                              : { source: { uri: country.flag } })}
                            width={24}
                            height={24}
                            borderRadius={12}
                          />
                        </Circle>
                        <Paragraph flex={1} textAlign="left" color="$color">
                          {country.name}
                        </Paragraph>
                        <Paragraph fontSize="$3" color="$colorFocus">
                          {country.dialCode}
                        </Paragraph>
                      </XStack>
                      {countryCode === country.code && <Check size={18} color="$blue10" />}
                    </Button>
                  ))
                ) : (
                  <YStack alignItems="center" justifyContent="center" paddingVertical="$6" gap="$2">
                    <Paragraph textAlign="center" fontSize="$4" color="$colorFocus">
                      No se encontraron resultados
                    </Paragraph>
                  </YStack>
                )}
              </YStack>
            </ScrollView>
          </Popover.Content>
        </Popover>

        {/* Input de teléfono */}
        <Input
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          focusStyle={{
            borderWidth: 0,
          }}
          fontSize="$4"
          height="100%"
          placeholderTextColor="$placeholderColor"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          minWidth={0}
          flexShrink={1}
          {...props}
        />
      </XStack>
      {error && (
        <Paragraph size="$2" color="$red10">
          {error}
        </Paragraph>
      )}
      {helperText && !error && (
        <Paragraph
          size="$2"
          color="$colorFocus"
          opacity={0.7}
        >
          {helperText}
        </Paragraph>
      )}
    </YStack>
  )
}

'use client'

import { Card, H1, Paragraph, Separator, Slider, Switch, TextArea, XStack, YStack } from 'tamagui'
import { Mail, Search, Lock } from '@tamagui/lucide-icons'
import React, { useState } from 'react'

import { DatePicker } from './components/DatePicker'
import { FieldInput } from './components/FieldInput'
import { SelectCustom } from './components/SelectCustom'
import { PasswordInput, FileInput, SelectWithFilter } from '@my/ui'

export const AdminComponentsScreen = () => {
  const [textValue, setTextValue] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [sliderValue, setSliderValue] = useState([35])
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | number | undefined>(undefined)

  return (
    <YStack flex={1} gap="$6">
      <YStack gap="$2">
        <H1 size="$10" fontWeight="800" color="$color" letterSpacing={-1}>
          Componentes
        </H1>
        <Paragraph size="$5" color="$colorFocus">
          Ejemplos usando componentes nativos de Tamagui (en columnas y con tamaños más compactos)
        </Paragraph>
      </YStack>

      <Separator />

      <YStack gap="$4" $sm={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* Inputs */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
          className='bg-red-500'
        >
          <YStack gap="$4">
            <H1 size="$7">Inputs</H1>
            <YStack gap="$4">
              <FieldInput
                label="Input básico (compacto)"
                inputProps={{
                  value: textValue,
                  onChangeText: setTextValue,
                  placeholder: 'Escribe algo...',
                }}
              />

              <FieldInput
                label="Email"
                icon={<Mail size={18} color="$colorFocus" />}
                inputProps={{
                  value: email,
                  onChangeText: setEmail,
                  placeholder: 'tu@email.com',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                }}
              />

              <PasswordInput
                label="Contraseña"
                leftIcon={<Lock size={18} color="$colorFocus" />}
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña..."
              />

              <YStack gap="$2">
                <Paragraph size="$4" fontWeight="600" color="$color">
                  TextArea (compacta)
                </Paragraph>
                <TextArea
                  maxWidth={320}
                  width="100%"
                  placeholder="Escribe una descripción..."
                  minHeight={96}
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$4"
                  backgroundColor="$background"
                />
              </YStack>
            </YStack>
          </YStack>
        </Card>

        {/* File Input */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
        >
          <YStack gap="$4">
            <H1 size="$7">File Input</H1>
            <YStack gap="$4">
              <FileInput
                label="Subir archivo único"
                accept="image/*,.pdf,.doc,.docx"
                multiple={false}
                value={selectedFiles}
                onChange={setSelectedFiles}
                helperText="Selecciona un archivo (imágenes, PDF, Word)"
                maxSize={5}
              />
              <FileInput
                label="Subir múltiples archivos"
                accept="image/*"
                multiple={true}
                helperText="Puedes seleccionar varios archivos a la vez"
                maxSize={10}
              />
            </YStack>
          </YStack>
        </Card>

        {/* Select */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
        >
          <YStack gap="$4">
            <H1 size="$7">Selects</H1>
            <YStack gap="$4" $sm={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <SelectCustom
                id="select-demo-custom"
                placeholder="Selecciona..."
                label="Select custom"
              />
              <SelectWithFilter
                label="Select con buscador"
                placeholder="Seleccionar país..."
                searchPlaceholder="Buscar país..."
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={[
                  {
                    value: 'af',
                    label: 'Afghanistan',
                    icon: 'https://flagcdn.com/w20/af.png',
                  },
                  {
                    value: 'ax',
                    label: 'Aland Islands',
                    icon: 'https://flagcdn.com/w20/ax.png',
                  },
                  {
                    value: 'al',
                    label: 'Albania',
                    icon: 'https://flagcdn.com/w20/al.png',
                  },
                  {
                    value: 'dz',
                    label: 'Algeria',
                    icon: 'https://flagcdn.com/w20/dz.png',
                  },
                  {
                    value: 'as',
                    label: 'American Samoa',
                    icon: 'https://flagcdn.com/w20/as.png',
                  },
                  {
                    value: 'ad',
                    label: 'Andorra',
                    icon: 'https://flagcdn.com/w20/ad.png',
                  },
                  {
                    value: 'ao',
                    label: 'Angola',
                    icon: 'https://flagcdn.com/w20/ao.png',
                  },
                  {
                    value: 'ar',
                    label: 'Argentina',
                    icon: 'https://flagcdn.com/w20/ar.png',
                  },
                  {
                    value: 'au',
                    label: 'Australia',
                    icon: 'https://flagcdn.com/w20/au.png',
                  },
                  {
                    value: 'at',
                    label: 'Austria',
                    icon: 'https://flagcdn.com/w20/at.png',
                  },
                  {
                    value: 'be',
                    label: 'Belgium',
                    icon: 'https://flagcdn.com/w20/be.png',
                  },
                  {
                    value: 'br',
                    label: 'Brazil',
                    icon: 'https://flagcdn.com/w20/br.png',
                  },
                  {
                    value: 'ca',
                    label: 'Canada',
                    icon: 'https://flagcdn.com/w20/ca.png',
                  },
                  {
                    value: 'cl',
                    label: 'Chile',
                    icon: 'https://flagcdn.com/w20/cl.png',
                  },
                  {
                    value: 'cn',
                    label: 'China',
                    icon: 'https://flagcdn.com/w20/cn.png',
                  },
                  {
                    value: 'co',
                    label: 'Colombia',
                    icon: 'https://flagcdn.com/w20/co.png',
                  },
                  {
                    value: 'es',
                    label: 'Spain',
                    icon: 'https://flagcdn.com/w20/es.png',
                  },
                  {
                    value: 'us',
                    label: 'United States',
                    icon: 'https://flagcdn.com/w20/us.png',
                  },
                  {
                    value: 'mx',
                    label: 'Mexico',
                    icon: 'https://flagcdn.com/w20/mx.png',
                  },
                  {
                    value: 'fr',
                    label: 'France',
                    icon: 'https://flagcdn.com/w20/fr.png',
                  },
                ]}
              />
            </YStack>
          </YStack>
        </Card>

        {/* Slider */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
        >
          <YStack gap="$4">
            <H1 size="$7">Slider</H1>
            <Paragraph size="$3" color="$colorFocus">
              Valor: {sliderValue[0]}
            </Paragraph>
            <Slider size="$4" value={sliderValue} onValueChange={setSliderValue} max={100} step={1}>
              <Slider.Track backgroundColor="$borderColor">
                <Slider.TrackActive backgroundColor="$color10" />
              </Slider.Track>
              <Slider.Thumb index={0} circular size="$2.5" backgroundColor="$color10" />
            </Slider>
          </YStack>
        </Card>

        {/* Date Picker */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
        >
          <YStack gap="$4">
            <H1 size="$7">Date Picker</H1>
            <Paragraph size="$3" color="$colorFocus">
              Selecciona una fecha usando el input
            </Paragraph>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Selecciona una fecha"
            />
            <Paragraph size="$2" color="$colorFocus" opacity={0.7}>
              Fecha seleccionada:{' '}
              {selectedDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Paragraph>
          </YStack>
        </Card>

        {/* Switch */}
        <Card
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          $sm={{ width: '48%' }}
          $lg={{ width: '31%' }}
        >
          <YStack gap="$4">
            <H1 size="$7">Switch</H1>
            <YStack
              gap="$3"
              $sm={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <YStack gap="$1" flexShrink={1}>
                <Paragraph size="$4" fontWeight="600" color="$color">
                  Habilitar notificaciones
                </Paragraph>
                <Paragraph size="$3" color="$colorFocus">
                  Ejemplo de estado on/off con componente nativo
                </Paragraph>
              </YStack>
              <Switch checked={enabled} onCheckedChange={setEnabled}>
                <Switch.Thumb animation="quick" />
              </Switch>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  )
}

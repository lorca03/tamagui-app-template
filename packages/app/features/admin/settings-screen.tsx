'use client'

import { Button, Card, H1, H2, Input, Paragraph, Separator, XStack, YStack } from 'tamagui'
import { Save, Bell, Shield, Globe, Palette } from '@tamagui/lucide-icons'

export const AdminSettingsScreen = () => {
  return (
    <YStack flex={1} gap="$6">
      <YStack gap="$2">
        <H1 size="$10" fontWeight="800" color="$color" letterSpacing={-1}>
          Configuración
        </H1>
        <Paragraph size="$5" color="$colorFocus" fontWeight="500">
          Administra la configuración general del sistema
        </Paragraph>
      </YStack>

      <XStack gap="$4" flexWrap="wrap" $sm={{ flexDirection: 'column' }}>
        {/* General Settings */}
        <Card
          flex={1}
          minWidth={400}
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          shadowColor="$color"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <YStack gap="$5">
            <XStack gap="$3" alignItems="center">
              <YStack
                width={48}
                height={48}
                borderRadius="$4"
                backgroundColor="$blue2"
                alignItems="center"
                justifyContent="center"
              >
                <Globe size={24} color="$blue9" />
              </YStack>
              <YStack gap="$1">
                <H2 size="$8" fontWeight="700" color="$color">
                  Configuración General
                </H2>
                <Paragraph size="$4" color="$colorFocus">
                  Ajustes básicos del sistema
                </Paragraph>
              </YStack>
            </XStack>

            <Separator />

            <YStack gap="$4">
              <YStack gap="$2">
                <Paragraph size="$4" fontWeight="600" color="$color">
                  Nombre de la Aplicación
                </Paragraph>
                <Input
                  placeholder="Mi Aplicación"
                  size="$4"
                  borderColor="$borderColor"
                  backgroundColor="$background"
                />
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$4" fontWeight="600" color="$color">
                  Descripción
                </Paragraph>
                <Input
                  placeholder="Descripción de la aplicación"
                  borderWidth={1}
                  borderColor="$borderColor"
                  backgroundColor="$background"
                  multiline
                  numberOfLines={3}
                />
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$4" fontWeight="600" color="$color">
                  URL Base
                </Paragraph>
                <Input
                  placeholder="https://ejemplo.com"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$4"
                  padding="$3"
                  backgroundColor="$background"
                />
              </YStack>
            </YStack>

            <Button
              size="$4"
              icon={Save}
              backgroundColor="$blue9"
              color="white"
              fontWeight="600"
              hoverStyle={{
                backgroundColor: '$blue10',
              }}
            >
              Guardar Cambios
            </Button>
          </YStack>
        </Card>

        {/* Notifications */}
        <Card
          flex={1}
          minWidth={400}
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          shadowColor="$color"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <YStack gap="$5">
            <XStack gap="$3" alignItems="center">
              <YStack
                width={48}
                height={48}
                borderRadius="$4"
                backgroundColor="$orange2"
                alignItems="center"
                justifyContent="center"
              >
                <Bell size={24} color="$orange9" />
              </YStack>
              <YStack gap="$1">
                <H2 size="$8" fontWeight="700" color="$color">
                  Notificaciones
                </H2>
                <Paragraph size="$4" color="$colorFocus">
                  Configura las notificaciones del sistema
                </Paragraph>
              </YStack>
            </XStack>

            <Separator />

            <YStack gap="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap="$1" flex={1}>
                  <Paragraph size="$4" fontWeight="600" color="$color">
                    Notificaciones por Email
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Recibe notificaciones importantes por correo
                  </Paragraph>
                </YStack>
                <Button size="$3" variant="outlined" borderColor="$borderColor">
                  Activar
                </Button>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap="$1" flex={1}>
                  <Paragraph size="$4" fontWeight="600" color="$color">
                    Notificaciones Push
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Notificaciones en tiempo real
                  </Paragraph>
                </YStack>
                <Button size="$3" variant="outlined" borderColor="$borderColor">
                  Activar
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </Card>

        {/* Security */}
        <Card
          flex={1}
          minWidth={400}
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          shadowColor="$color"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <YStack gap="$5">
            <XStack gap="$3" alignItems="center">
              <YStack
                width={48}
                height={48}
                borderRadius="$4"
                backgroundColor="$red2"
                alignItems="center"
                justifyContent="center"
              >
                <Shield size={24} color="$red9" />
              </YStack>
              <YStack gap="$1">
                <H2 size="$8" fontWeight="700" color="$color">
                  Seguridad
                </H2>
                <Paragraph size="$4" color="$colorFocus">
                  Configuración de seguridad y privacidad
                </Paragraph>
              </YStack>
            </XStack>

            <Separator />

            <YStack gap="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap="$1" flex={1}>
                  <Paragraph size="$4" fontWeight="600" color="$color">
                    Autenticación de Dos Factores
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Añade una capa extra de seguridad
                  </Paragraph>
                </YStack>
                <Button size="$3" variant="outlined" borderColor="$borderColor">
                  Configurar
                </Button>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap="$1" flex={1}>
                  <Paragraph size="$4" fontWeight="600" color="$color">
                    Cambiar Contraseña
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Actualiza tu contraseña regularmente
                  </Paragraph>
                </YStack>
                <Button size="$3" variant="outlined" borderColor="$borderColor">
                  Cambiar
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </Card>

        {/* Appearance */}
        <Card
          flex={1}
          minWidth={400}
          padding="$6"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          shadowColor="$color"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <YStack gap="$5">
            <XStack gap="$3" alignItems="center">
              <YStack
                width={48}
                height={48}
                borderRadius="$4"
                backgroundColor="$blue2"
                alignItems="center"
                justifyContent="center"
              >
                <Palette size={24} color="$blue9" />
              </YStack>
              <YStack gap="$1">
                <H2 size="$8" fontWeight="700" color="$color">
                  Apariencia
                </H2>
                <Paragraph size="$4" color="$colorFocus">
                  Personaliza el tema y los colores
                </Paragraph>
              </YStack>
            </XStack>

            <Separator />

            <YStack gap="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap="$1" flex={1}>
                  <Paragraph size="$4" fontWeight="600" color="$color">
                    Tema Oscuro
                  </Paragraph>
                  <Paragraph size="$3" color="$colorFocus">
                    Cambia entre tema claro y oscuro
                  </Paragraph>
                </YStack>
                <Button size="$3" variant="outlined" borderColor="$borderColor">
                  Activar
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </Card>
      </XStack>
    </YStack>
  )
}

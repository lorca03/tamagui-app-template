'use client'

import { useState } from 'react'
import { Button, Card, H1, H2, Paragraph, Separator, XStack, YStack, Avatar, isWeb } from 'tamagui'
import { Pencil, Facebook, Twitter, Linkedin, Instagram } from '@tamagui/lucide-icons'
import { ProfileEditModal, type ProfileData } from '@my/ui/src/ProfileEditModal'

// Tipo para Linking de expo-linking (sin importarlo)
type LinkingType = {
  canOpenURL: (url: string) => Promise<boolean>
  openURL: (url: string) => Promise<void>
}

type AddressData = {
  country: string
  cityState: string
  postalCode: string
  taxId: string
}

const initialProfileData: ProfileData = {
  firstName: 'Musharof',
  lastName: 'Chowdhury',
  email: 'randomuser@pimjo.com',
  phone: '+09 363 398 46',
  facebook: 'https://www.facebook.com/PimjoHQ',
  twitter: 'https://x.com/PimjoHQ',
  linkedin: 'https://www.linkedin.com/company/pimjo',
  instagram: 'https://instagram.com/PimjoHQ',
}

const initialAddressData: AddressData = {
  country: 'United States',
  cityState: 'Phoenix, Arizona, United States.',
  postalCode: 'ERT 2489',
  taxId: 'AS4568384',
}

type AdminProfileScreenProps = {
  linking?: LinkingType | null
}

export const AdminProfileScreen = ({ linking }: AdminProfileScreenProps = {}) => {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)
  const [addressData, setAddressData] = useState<AddressData>(initialAddressData)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSaveProfile = (data: ProfileData) => {
    setProfileData(data)
  }

  const handleOpenUrl = async (url: string) => {
    if (isWeb) {
      window.open(url, '_blank')
    } else if (linking) {
      const supported = await linking.canOpenURL(url)
      if (supported) {
        await linking.openURL(url)
      }
    }
  }

  return (
    <YStack flex={1} gap="$6">
      <YStack gap="$2">
        <H1 size="$10" fontWeight="800" color="$color" letterSpacing={-1}>
          Perfil
        </H1>
        <Paragraph size="$5" color="$colorFocus" fontWeight="500">
          Administra tu información personal y configuración
        </Paragraph>
      </YStack>

      {/* Profile Header Card */}
      <Card
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
        <XStack
          gap="$5"
          alignItems="center"
          flexWrap="wrap"
          $sm={{ flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {/* Profile Picture */}
          <Avatar circular size="$10" backgroundColor="$blue9">
            <Avatar.Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
              }}
            />
            <Avatar.Fallback backgroundColor="$blue9">
              <Paragraph color="white" fontWeight="700" size="$6">
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </Paragraph>
            </Avatar.Fallback>
          </Avatar>

          {/* Name and Info */}
          <YStack flex={1} gap="$2" minWidth={200}>
            <H2 size="$9" fontWeight="700" color="$color">
              {profileData.firstName} {profileData.lastName}
            </H2>
            <XStack gap="$3" alignItems="center" flexWrap="wrap">
              <Paragraph size="$4" color="$colorFocus" fontWeight="500">
                Team Manager
              </Paragraph>
              <Paragraph size="$4" color="$colorFocus">
                |
              </Paragraph>
              <Paragraph size="$4" color="$colorFocus" fontWeight="500">
                Arizona, United States
              </Paragraph>
            </XStack>
          </YStack>

          {/* Social Icons */}
          <XStack gap="$3" alignItems="center">
            {profileData.facebook && (
              <Button
                size="$3"
                circular
                icon={Facebook}
                backgroundColor="transparent"
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                onPress={() => handleOpenUrl(profileData.facebook!)}
              />
            )}
            {profileData.twitter && (
              <Button
                size="$3"
                circular
                icon={Twitter}
                backgroundColor="transparent"
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                onPress={() => handleOpenUrl(profileData.twitter!)}
              />
            )}
            {profileData.linkedin && (
              <Button
                size="$3"
                circular
                icon={Linkedin}
                backgroundColor="transparent"
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                onPress={() => handleOpenUrl(profileData.linkedin!)}
              />
            )}
            {profileData.instagram && (
              <Button
                size="$3"
                circular
                icon={Instagram}
                backgroundColor="transparent"
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                onPress={() => handleOpenUrl(profileData.instagram!)}
              />
            )}
            <Button
              size="$4"
              icon={Pencil}
              variant="outlined"
              borderColor="$borderColor"
              backgroundColor="$background"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$borderColorHover',
              }}
              onPress={() => setModalOpen(true)}
            >
              <Paragraph color="$color" fontWeight="600">
                Editar
              </Paragraph>
            </Button>
          </XStack>
        </XStack>
      </Card>

      {/* Personal Information Card */}
      <Card
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
          <XStack justifyContent="space-between" alignItems="center">
            <H2 size="$8" fontWeight="700" color="$color">
              Información Personal
            </H2>
            <Button
              size="$4"
              icon={Pencil}
              variant="outlined"
              borderColor="$borderColor"
              backgroundColor="$background"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$borderColorHover',
              }}
              onPress={() => setModalOpen(true)}
            >
              <Paragraph color="$color" fontWeight="600">
                Editar
              </Paragraph>
            </Button>
          </XStack>

          <Separator />

          <XStack gap="$6" $sm={{ flexDirection: 'column', gap: '$4' }}>
            {/* Columna Izquierda */}
            <YStack flex={1} gap="$4">
              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Nombre
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {profileData.firstName}
                </Paragraph>
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Correo Electrónico
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {profileData.email}
                </Paragraph>
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Bio
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  Team Manager
                </Paragraph>
              </YStack>
            </YStack>

            {/* Columna Derecha */}
            <YStack flex={1} gap="$4">
              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Apellido
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {profileData.lastName}
                </Paragraph>
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Teléfono
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {profileData.phone}
                </Paragraph>
              </YStack>
            </YStack>
          </XStack>
        </YStack>
      </Card>

      {/* Address Card */}
      <Card
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
          <XStack justifyContent="space-between" alignItems="center">
            <H2 size="$8" fontWeight="700" color="$color">
              Dirección
            </H2>
            <Button
              size="$4"
              icon={Pencil}
              variant="outlined"
              borderColor="$borderColor"
              backgroundColor="$background"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$borderColorHover',
              }}
            >
              <Paragraph color="$color" fontWeight="600">
                Editar
              </Paragraph>
            </Button>
          </XStack>

          <Separator />

          <XStack gap="$6" $sm={{ flexDirection: 'column', gap: '$4' }}>
            {/* Columna Izquierda */}
            <YStack flex={1} gap="$4">
              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  País
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {addressData.country}
                </Paragraph>
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Código Postal
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {addressData.postalCode}
                </Paragraph>
              </YStack>
            </YStack>

            {/* Columna Derecha */}
            <YStack flex={1} gap="$4">
              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  Ciudad/Estado
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {addressData.cityState}
                </Paragraph>
              </YStack>

              <YStack gap="$2">
                <Paragraph size="$3" color="$colorFocus" fontWeight="600">
                  TAX ID
                </Paragraph>
                <Paragraph size="$5" color="$color" fontWeight="500">
                  {addressData.taxId}
                </Paragraph>
              </YStack>
            </YStack>
          </XStack>
        </YStack>
      </Card>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={profileData}
        onSave={handleSaveProfile}
      />
    </YStack>
  )
}

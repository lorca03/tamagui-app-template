'use client'

import { useState } from 'react'
import { Button, XStack, YStack, Paragraph, Separator, isWeb } from 'tamagui'
import { Mail } from '@tamagui/lucide-icons'
import { TextInput } from './inputs/TextInput'
import { PhoneInput } from './inputs/PhoneInput'
import { Modal } from './Modal'

export type ProfileData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export type ProfileEditModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: ProfileData
  onSave?: (data: ProfileData) => void
}

export function ProfileEditModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileData>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    }
  )

  const handleClose = () => {
    // Resetear al cerrar si no se guardó
    if (initialData) {
      setFormData(initialData)
    }
    onOpenChange(false)
  }

  const handleSave = () => {
    onSave?.(formData)
    onOpenChange(false)
  }

  const footer = (
    <XStack gap="$3" justifyContent="flex-end">
      <Button
        size="$4"
        variant="outlined"
        onPress={handleClose}
        borderColor="$borderColor"
        backgroundColor="$background"
        hoverStyle={{
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        }}
      >
        <Paragraph color="$color">Close</Paragraph>
      </Button>
      <Button
        size="$4"
        onPress={handleSave}
        backgroundColor="$blue9"
        color="white"
        fontWeight="600"
        hoverStyle={{
          backgroundColor: '$blue10',
        }}
      >
        Save Changes
      </Button>
    </XStack>
  )

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Personal Information"
      subtitle="Update your details to keep your profile up-to-date."
      footer={footer}
      maxWidth={700}
    >
      <YStack 
        gap="$6"
      >
        {/* Social Links Section */}
        <YStack 
          gap="$4"
        >
          <Paragraph fontWeight="700" size="$5" color="$color">
            Social Links
          </Paragraph>
          <Separator />
          {isWeb ? (
            <XStack gap="$4" flexWrap="wrap">
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="Facebook"
                  placeholder="https://www.facebook.com/..."
                  value={formData.facebook || ''}
                  onChangeText={(text) => setFormData({ ...formData, facebook: text })}
                />
              </YStack>
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="X.com"
                  placeholder="https://x.com/..."
                  value={formData.twitter || ''}
                  onChangeText={(text) => setFormData({ ...formData, twitter: text })}
                />
              </YStack>
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="Linkedin"
                  placeholder="https://www.linkedin.com/..."
                  value={formData.linkedin || ''}
                  onChangeText={(text) => setFormData({ ...formData, linkedin: text })}
                />
              </YStack>
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="Instagram"
                  placeholder="https://instagram.com/..."
                  value={formData.instagram || ''}
                  onChangeText={(text) => setFormData({ ...formData, instagram: text })}
                />
              </YStack>
            </XStack>
          ) : (
            <YStack 
              gap="$3"
            >
              <TextInput
                label="Facebook"
                placeholder="https://www.facebook.com/..."
                value={formData.facebook || ''}
                onChangeText={(text) => setFormData({ ...formData, facebook: text })}
              />
              <TextInput
                label="X.com"
                placeholder="https://x.com/..."
                value={formData.twitter || ''}
                onChangeText={(text) => setFormData({ ...formData, twitter: text })}
              />
              <TextInput
                label="Linkedin"
                placeholder="https://www.linkedin.com/..."
                value={formData.linkedin || ''}
                onChangeText={(text) => setFormData({ ...formData, linkedin: text })}
              />
              <TextInput
                label="Instagram"
                placeholder="https://instagram.com/..."
                value={formData.instagram || ''}
                onChangeText={(text) => setFormData({ ...formData, instagram: text })}
              />
            </YStack>
          )}
        </YStack>

        {/* Personal Information Section */}
        <YStack 
          gap="$4"
          $sm={{
            gap: '$3',
          }}
        >
          <Paragraph fontWeight="700" size="$5" color="$color">
            Personal Information
          </Paragraph>
          <Separator />
          {isWeb ? (
            <XStack gap="$4" flexWrap="wrap">
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                />
              </YStack>
              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="Last Name"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                />
              </YStack>
              <XStack gap="$4" flexWrap="wrap">

              <YStack flex={1} minWidth={250}>
                <TextInput
                  label="Email Address"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Mail size={20} color="$colorFocus" />}
                />
              </YStack>
              <YStack flex={1} minWidth={250}>
                <PhoneInput
                  label="Phone"
                  placeholder="000 000 00"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                />
              </YStack>
              </XStack>
            </XStack>
          ) : (
            <YStack 
              gap="$3"
              $sm={{
                gap: '$2',
              }}
            >
              <TextInput
                label="First Name"
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
              <TextInput
                label="Email Address"
                placeholder="email@example.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={20} color="$colorFocus" />}
              />
              <PhoneInput
                label="Phone"
                placeholder="000 000 00"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
              />
            </YStack>
          )}
        </YStack>
      </YStack>
    </Modal>
  )
}

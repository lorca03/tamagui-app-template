import { Button, XStack, YStack, Label, Paragraph } from 'tamagui'
import { Upload, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'

export type FileInputProps = {
  label?: string
  accept?: string
  multiple?: boolean
  error?: string
  helperText?: string
  value?: File[]
  onChange?: (files: File[]) => void
  maxSize?: number // in MB
}

// Tipo para representar archivos en React Native
type NativeFile = {
  name: string
  size: number
  uri: string
  mimeType?: string
}

export function FileInput({
  label,
  accept,
  multiple = false,
  error,
  helperText,
  value,
  onChange,
  maxSize,
}: FileInputProps) {
  const [internalFiles, setInternalFiles] = useState<NativeFile[]>([])
  
  // Convertir value (File[]) a formato nativo si existe
  const files = value !== undefined ? (value as unknown as NativeFile[]) : internalFiles
  const isControlled = value !== undefined

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: accept || '*/*',
        multiple,
        copyToCacheDirectory: true,
      })

      if (result.canceled) {
        return
      }

      const selectedFiles = result.assets.map((asset) => ({
        name: asset.name || 'archivo',
        size: asset.size || 0,
        uri: asset.uri,
        mimeType: asset.mimeType,
      }))

      // Validar tamaño máximo si se especifica
      if (maxSize) {
        const validFiles = selectedFiles.filter((file) => file.size <= maxSize * 1024 * 1024)
        if (validFiles.length !== selectedFiles.length) {
          // En móvil podrías usar un toast o alert
          console.warn(`Algunos archivos exceden el tamaño máximo de ${maxSize}MB`)
        }
        const newFiles = multiple ? [...files, ...validFiles] : validFiles
        if (!isControlled) {
          setInternalFiles(newFiles as NativeFile[])
        }
        // Convertir a formato File para mantener compatibilidad con la API
        onChange?.(newFiles as unknown as File[])
      } else {
        const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles
        if (!isControlled) {
          setInternalFiles(newFiles as NativeFile[])
        }
        onChange?.(newFiles as unknown as File[])
      }
    } catch (err) {
      console.error('Error al seleccionar archivo:', err)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    if (!isControlled) {
      setInternalFiles(newFiles)
    }
    onChange?.(newFiles as unknown as File[])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <YStack gap="$2" flex={1}>
      {label && <Label>{label}</Label>}
      <XStack gap="$2" alignItems="center">
        <Button
          icon={Upload}
          onPress={handleFileSelect}
          variant="outlined"
          height={52}
          borderRadius="$5"
          paddingHorizontal="$4"
        >
          Seleccionar {multiple ? 'Archivos' : 'Archivo'}
        </Button>
      </XStack>
      {files.length > 0 && (
        <YStack gap="$2" mt="$2">
          {files.map((file, index) => (
            <XStack
              key={index}
              alignItems="center"
              justifyContent="space-between"
              padding="$3"
              backgroundColor="$background"
              borderRadius="$5"
              borderWidth={1}
              borderColor="$borderColor"
              gap="$2"
            >
              <YStack flex={1} gap="$1">
                <Paragraph size="$3" fontWeight="500">
                  {file.name}
                </Paragraph>
                <Paragraph size="$2" color="$colorFocus" opacity={0.7}>
                  {formatFileSize(file.size)}
                </Paragraph>
              </YStack>
              <Button
                icon={X}
                size="$2"
                circular
                variant="outlined"
                onPress={() => removeFile(index)}
              />
            </XStack>
          ))}
        </YStack>
      )}
      {error && (
        <Paragraph size="$2" color="$red10">
          {error}
        </Paragraph>
      )}
      {helperText && !error && (
        <Paragraph size="$2" color="$colorFocus" opacity={0.7}>
          {helperText}
        </Paragraph>
      )}
    </YStack>
  )
}

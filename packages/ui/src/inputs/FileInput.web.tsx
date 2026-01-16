import { Button, XStack, YStack, Label, Paragraph } from 'tamagui'
import { Upload, X } from '@tamagui/lucide-icons'
import { useState, useRef } from 'react'

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
  const [internalFiles, setInternalFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Usar value si se proporciona (modo controlado), sino usar estado interno (modo no controlado)
  const files = value !== undefined ? value : internalFiles
  const isControlled = value !== undefined

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (maxSize) {
      const validFiles = selectedFiles.filter((file) => file.size <= maxSize * 1024 * 1024)
      if (validFiles.length !== selectedFiles.length) {
        alert(`Algunos archivos exceden el tamaño máximo de ${maxSize}MB`)
      }
      const newFiles = multiple ? [...files, ...validFiles] : validFiles
      if (!isControlled) {
        setInternalFiles(newFiles)
      }
      onChange?.(newFiles)
    } else {
      const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles
      if (!isControlled) {
        setInternalFiles(newFiles)
      }
      onChange?.(newFiles)
    }

    // Resetear el input para permitir seleccionar el mismo archivo nuevamente
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    if (!isControlled) {
      setInternalFiles(newFiles)
    }
    onChange?.(newFiles)
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
          onPress={() => inputRef.current?.click()}
          variant="outlined"
          height={52}
          borderRadius="$5"
          paddingHorizontal="$4"
        >
          Seleccionar {multiple ? 'Archivos' : 'Archivo'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          style={{
            display: 'none',
          }}
        />
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

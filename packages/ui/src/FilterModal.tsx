'use client'

import { Button, Card, Paragraph, Sheet, XStack, YStack } from 'tamagui'

export type DashboardFilterKey = 'all' | 'subscriptions' | 'one_time'

type FilterOption = {
  key: DashboardFilterKey
  label: string
  description?: string
}

const OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Todo', description: 'Incluye todas las fuentes' },
  { key: 'subscriptions', label: 'Suscripciones', description: 'Solo ingresos recurrentes' },
  { key: 'one_time', label: 'One‑time', description: 'Pagos únicos' },
]

export function FilterModal({
  open,
  onOpenChange,
  value,
  onChange,
  title = 'Filtros',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: DashboardFilterKey
  onChange: (next: DashboardFilterKey) => void
  title?: string
}) {
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[55]}
      dismissOnSnapToBottom
      position={0}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame p="$5" gap="$4" backgroundColor="$background">
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph fontWeight="800" size="$6" color="$color">
            {title}
          </Paragraph>
          <Button size="$3" variant="outlined" onPress={() => onOpenChange(false)} borderColor="$borderColor">
            Cerrar
          </Button>
        </XStack>

        <YStack gap="$3">
          {OPTIONS.map((opt) => {
            const selected = opt.key === value
            return (
              <Card
                key={opt.key}
                padding="$4"
                borderRadius="$4"
                borderWidth={1}
                borderColor={selected ? '$blue7' : '$borderColor'}
                backgroundColor={selected ? '$blue2' : '$background'}
                hoverStyle={{ borderColor: selected ? '$blue8' : '$borderColorHover' }}
                pressStyle={{ scale: 0.99 }}
                animation="quick"
                onPress={() => onChange(opt.key)}
              >
                <YStack gap="$1">
                  <Paragraph fontWeight="700" size="$5" color="$color">
                    {opt.label}
                  </Paragraph>
                  {opt.description ? (
                    <Paragraph size="$4" color="$colorFocus">
                      {opt.description}
                    </Paragraph>
                  ) : null}
                </YStack>
              </Card>
            )
          })}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}


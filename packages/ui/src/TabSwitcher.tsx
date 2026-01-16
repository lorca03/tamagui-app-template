import type React from 'react'
import { useMemo } from 'react'
import { Button, XStack, YStack, type ButtonProps, type XStackProps } from 'tamagui'

export type TabSwitcherTab<T extends string> = {
  key: T
  label: string
  disabled?: boolean
  /**
   * Contenido opcional por tab, usado si no pasas `children`/`renderContent`.
   */
  content?: React.ReactNode | ((active: T) => React.ReactNode)
}

export type TabSwitcherProps<T extends string> = {
  tabs: readonly TabSwitcherTab<T>[]
  value: T
  onValueChange: (next: T) => void

  /**
   * Renderiza el contenido según la tab activa.
   * - Si pasas `children` como función, se usará eso.
   * - Si no, se usa `renderContent`.
   * - Si no, usa `tabs[].content` del tab activo.
   */
  children?: React.ReactNode | ((active: T) => React.ReactNode)
  renderContent?: (active: T) => React.ReactNode

  /**
   * Props del contenedor del tab bar (segment control).
   */
  tabBarProps?: XStackProps

  /**
   * Props base para cada botón de tab.
   */
  tabButtonProps?: ButtonProps
  /**
   * Props extra cuando la tab está activa (píldora).
   */
  activeTabButtonProps?: ButtonProps
  /**
   * Props extra cuando la tab está inactiva.
   */
  inactiveTabButtonProps?: ButtonProps

  /**
   * (Deprecated) Se deja por compatibilidad, pero el componente ya no anima contenido.
   */
  contentAnimationMs?: number
}

export function TabSwitcher<T extends string>({
  tabs,
  value,
  onValueChange,
  children,
  renderContent,
  tabBarProps,
  tabButtonProps,
  activeTabButtonProps,
  inactiveTabButtonProps,
}: TabSwitcherProps<T>) {
  const getContent = useMemo(() => {
    if (typeof children === 'function') return children
    if (typeof renderContent === 'function') return renderContent
    return (active: T) => {
      const t = tabs.find((x) => x.key === active)
      const c = t?.content
      return typeof c === 'function' ? c(active) : c ?? null
    }
  }, [children, renderContent, tabs])

  return (
    <YStack gap="$4">
      <XStack
        backgroundColor="$backgroundHover"
        borderRadius="$4"
        padding="$1"
        borderWidth={1}
        borderColor="$borderColor"
        {...tabBarProps}
      >
        {tabs.map((t) => {
          const active = value === t.key
          return (
            <Button
              key={t.key}
              flex={1}
              size="$3"
              borderRadius="$3"
              borderColor="transparent"
              disabled={t.disabled}
              backgroundColor={active ? '$background' : 'transparent'}
              hoverStyle={{ backgroundColor: '$background' }}
              pressStyle={{ opacity: 0.85, scale: 0.99 }}
              onPress={() => onValueChange(t.key)}
              {...tabButtonProps}
              {...(active ? activeTabButtonProps : inactiveTabButtonProps)}
            >
              {t.label}
            </Button>
          )
        })}
      </XStack>

      <YStack>{getContent(value)}</YStack>
    </YStack>
  )
}


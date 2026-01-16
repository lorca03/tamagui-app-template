'use client'

import { Button, Card, H3, Input, Paragraph, ScrollView, XStack, YStack } from 'tamagui'
import {
  LayoutDashboard,
  Settings,
  FileText,
  Table,
  Search,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  DollarSign,
} from '@tamagui/lucide-icons'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'app/utils/useRouter'
import { useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { PopoverNotifications } from './components/PopoverNotifications'

// Importación condicional de AsyncStorage para Expo
let AsyncStorage: typeof import('@react-native-async-storage/async-storage').default | null = null
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default
} catch {
  // AsyncStorage no disponible (Next.js)
}

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<any>
  href: string
  badge?: string
  category?: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/', category: 'main' },
  {
    id: 'components',
    label: 'Componentes',
    icon: FileText,
    href: '/components',
    category: 'tools',
  },
  {
    id: 'tables',
    label: 'Tablas',
    icon: Table,
    href: '/tables',
    category: 'tools',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign,
    href: '/pricing',
    category: 'tools',
  },
  { id: 'settings', label: 'Configuración', icon: Settings, href: '/settings', category: 'tools' },
]

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'admin.sidebarCollapsed'

type Platform = 'expo' | 'next'

export const AdminLayout = ({
  children,
  platform = 'next',
}: {
  children: React.ReactNode
  platform?: Platform
}) => {
  const router = useRouter()
  const pathname = usePathname()
  // "collapsed" = sidebar visible pero compacto (solo iconos)
  // En móvil (expo) siempre está contraído
  const isMobile = platform === 'expo'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile ? true : false)
  const [rootTheme, setRootTheme] = useRootTheme()
  const themeSetting = useThemeSetting()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Cargar estado inicial desde storage solo en Next.js (web)
    if (!isMobile) {
      const loadSidebarState = async () => {
        // Next.js - usar localStorage
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
          try {
            const value = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY)
            setSidebarCollapsed(value === '1')
          } catch {
            // Error al leer, usar valor por defecto
          }
        }
      }
      loadSidebarState()
    }
  }, [platform, isMobile])

  const toggleSidebar = () => {
    // En móvil no se permite toggle
    if (isMobile) return

    setSidebarCollapsed((v) => {
      const next = !v
      // Next.js - usar localStorage
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        try {
          window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, next ? '1' : '0')
        } catch {
          // localStorage no disponible, continuar sin guardar
        }
      }
      return next
    })
  }

  const isDark = mounted && (rootTheme || themeSetting?.resolvedTheme) === 'dark'
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    // Asegura persistencia (localStorage) y sincroniza el provider de NextTheme
    themeSetting?.set?.(next)
    setRootTheme(next as any)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname?.startsWith(href + '/')
  }

  const groupedItems = navItems.reduce((acc, item) => {
    const category = item.category || 'main'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, NavItem[]>)

  const categoryLabels: Record<string, string> = {
    main: 'Principal',
    tools: 'Herramientas',
  }

  return (
    <XStack flex={1} height="100vh" overflow="hidden" backgroundColor="$background">
      {/* Sidebar Moderno */}
      <YStack
        width={isMobile ? 76 : sidebarCollapsed ? 76 : 280}
        borderRightWidth={1}
        borderRightColor="$borderColor"
        backgroundColor="$background"
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        elevation={4}
        shadowColor="$color"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$2" p={isMobile || sidebarCollapsed ? '$3' : '$5'}>
            {/* Logo Mejorado */}
            <XStack
              alignItems="center"
              gap="$3"
              mb="$6"
              mt="$2"
              px="$2"
              justifyContent={sidebarCollapsed ? 'center' : 'flex-start'}
            >
              <YStack
                width={40}
                height={40}
                borderRadius="$4"
                backgroundColor="$blue9"
                alignItems="center"
                justifyContent="center"
                shadowColor="$blue9"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.3}
                shadowRadius={8}
              >
                <Sparkles size={20} color="black" />
              </YStack>
              <YStack gap={2} display={sidebarCollapsed ? 'none' : 'flex'}>
                <XStack alignItems="center" gap="$2">
                  <H3 size="$7" fontWeight="800" color="$color" letterSpacing={-0.6}>
                    Admin Panel
                  </H3>
                </XStack>
              </YStack>
            </XStack>

            {/* Nav Items Agrupados */}
            <YStack gap="$4">
              {Object.entries(groupedItems).map(([category, items]) => (
                <YStack key={category} gap="$2">
                  <Paragraph
                    size="$1"
                    fontWeight="700"
                    textTransform="uppercase"
                    color="$colorFocus"
                    letterSpacing={1}
                    px="$3"
                    py="$2"
                    display={sidebarCollapsed ? 'none' : 'flex'}
                  >
                    {categoryLabels[category] || category}
                  </Paragraph>
                  <YStack gap="$1">
                    {items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <Button
                          key={item.id}
                          size="$4"
                          justifyContent={sidebarCollapsed ? 'center' : 'flex-start'}
                          backgroundColor={active ? '$blue2' : 'transparent'}
                          borderWidth={0}
                          borderRadius="$4"
                          onPress={() => router.push(item.href)}
                          fontWeight={active ? '600' : '500'}
                          color={active ? '$blue11' : '$color'}
                          hoverStyle={{
                            backgroundColor: active ? '$blue2' : '$backgroundHover',
                            scale: 1.02,
                          }}
                          pressStyle={{
                            scale: 0.98,
                          }}
                          px={sidebarCollapsed ? '$2' : '$3'}
                          py="$3"
                          position="relative"
                          animation="quick"
                        >
                          <XStack flex={1} alignItems="center" gap="$3">
                            <XStack
                              gap={sidebarCollapsed ? 0 : '$2'}
                              alignItems="center"
                              flex={1}
                              justifyContent={sidebarCollapsed ? 'center' : 'flex-start'}
                            >
                              <YStack width={24} alignItems="center" justifyContent="center">
                                <Icon size={20} color={active ? '$blue11' : '$color'} />
                              </YStack>
                              <Paragraph
                                size="$4"
                                fontWeight={active ? '600' : '500'}
                                color={active ? '$blue11' : '$color'}
                                display={sidebarCollapsed ? 'none' : 'flex'}
                              >
                                {item.label}
                              </Paragraph>
                            </XStack>
                            {item.badge && (
                              <YStack
                                backgroundColor="$green9"
                                px="$2"
                                py={2}
                                borderRadius="$10"
                                minWidth={20}
                                alignItems="center"
                                justifyContent="center"
                                display={sidebarCollapsed ? 'none' : 'flex'}
                                ml="auto"
                              >
                                <Paragraph size="$1" color="white" fontWeight="700">
                                  {item.badge}
                                </Paragraph>
                              </YStack>
                            )}
                          </XStack>
                        </Button>
                      )
                    })}
                  </YStack>
                </YStack>
              ))}
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>

      {/* Main Content */}
      <YStack flex={1} overflow="hidden" backgroundColor="$background">
        {/* Top Header Moderno */}
        <XStack
          height={72}
          paddingHorizontal="$5"
          paddingVertical="$4"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left: Menu + Search */}
          <XStack gap="$3" alignItems="center" flex={1}>
            <Button
              size="$4"
              circular
              variant="outlined"
              icon={sidebarCollapsed ? PanelLeftOpen : PanelLeftClose}
              onPress={toggleSidebar}
              borderColor="$borderColor"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$borderColorHover',
              }}
              display={isMobile ? 'none' : 'flex'}
            />
            <XStack
              flex={1}
              maxWidth={480}
              alignItems="center"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$4"
              px="$3"
              gap="$2.5"
              backgroundColor="$background"
              height={44}
              hoverStyle={{
                borderColor: '$borderColorHover',
                backgroundColor: '$backgroundHover',
              }}
              pressStyle={{
                scale: 0.98,
              }}
              animation="quick"
            >
              <Search size={18} color="$colorFocus" />
              <Input
                flex={1}
                borderWidth={0}
                backgroundColor="transparent"
                placeholder="Buscar o escribir comando..."
                fontSize="$4"
                color="$color"
                placeholderTextColor="$colorFocus"
                unstyled
                height={44}
              />
              <XStack
                backgroundColor="$backgroundPress"
                px="$2"
                py="$2"
                borderRadius="$2"
                alignItems="center"
                gap="$1"
                $sm={{ display: 'none' }}
              >
                <Paragraph size="$1" color="$colorFocus" fontWeight="600">
                  ⌘
                </Paragraph>
                <Paragraph size="$1" color="$colorFocus" fontWeight="600">
                  K
                </Paragraph>
              </XStack>
            </XStack>
          </XStack>

          {/* Right: Icons + Profile */}
          <XStack gap="$2" alignItems="center">
            {mounted && (
              <Button
                size="$4"
                circular
                variant="outlined"
                icon={isDark ? Sun : Moon}
                onPress={toggleTheme}
                borderColor="$borderColor"
                hoverStyle={{
                  backgroundColor: '$backgroundHover',
                  borderColor: '$borderColorHover',
                }}
              />
            )}
            {!mounted && (
              <Button
                size="$4"
                circular
                variant="outlined"
                icon={Moon}
                onPress={toggleTheme}
                borderColor="$borderColor"
                hoverStyle={{
                  backgroundColor: '$backgroundHover',
                  borderColor: '$borderColorHover',
                }}
              />
            )}
            {/* Notificaciones Popover */}
            <PopoverNotifications />
            <Card
              alignItems="center"
              gap="$3"
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$4"
              backgroundColor="transparent"
              cursor="pointer"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
              }}
              pressStyle={{
                scale: 0.98,
              }}
              animation="quick"
            >
              <YStack
                width={40}
                height={40}
                borderRadius="$5"
                backgroundColor="$blue9"
                alignItems="center"
                justifyContent="center"
                shadowColor="$blue9"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.2}
                shadowRadius={4}
              >
                <Paragraph color="white" fontWeight="700" size="$4">
                  M
                </Paragraph>
              </YStack>
              <YStack gap={2} $sm={{ display: 'none' }}>
                <Paragraph fontWeight="600" size="$4" color="$color">
                  Admin User
                </Paragraph>
                <Paragraph size="$2" color="$colorFocus">
                  Administrador
                </Paragraph>
              </YStack>
              <ChevronDown size={18} color="$colorFocus" $sm={{ display: 'none' }} />
            </Card>
          </XStack>
        </XStack>

        {/* Content Area con mejor espaciado */}
        <ScrollView flex={1} backgroundColor="$background" showsVerticalScrollIndicator={false}>
          <YStack p="$6" flex={1} maxWidth={1600} width="100%" alignSelf="center">
            {children}
          </YStack>
        </ScrollView>
      </YStack>
    </XStack>
  )
}

'use client'

import { Button, Card, H3, Input, Paragraph, ScrollView, XStack, YStack, useMedia, Popover } from 'tamagui'
import {
  LayoutDashboard,
  User,
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
  Menu,
  MoreVertical,
} from '@tamagui/lucide-icons'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'app/utils/useRouter'
import { useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { PopoverNotifications } from './components/PopoverNotifications'

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
]

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'admin.sidebarCollapsed'

export function WebLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const media = useMedia()
  // media.sm es true cuando la pantalla es >= sm (grande), así que invertimos para detectar pantallas pequeñas
  const isSmallScreen = !media.sm
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rootTheme, setRootTheme] = useRootTheme()
  const themeSetting = useThemeSetting()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Cargar estado inicial desde localStorage
    const loadSidebarState = async () => {
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
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed((v) => {
      const next = !v
      // Guardar en localStorage
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

  // Componente del Sidebar reutilizable
  const SidebarContent = ({ isCollapsed = false, onItemPress }: { isCollapsed?: boolean; onItemPress?: () => void }) => (
    <YStack gap="$2" p={isCollapsed ? '$3' : '$5'}>
      {/* Logo Mejorado */}
      <XStack
        alignItems="center"
        gap="$3"
        mb="$6"
        mt="$2"
        px="$2"
        justifyContent={isCollapsed ? 'center' : 'flex-start'}
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
        <YStack gap={2} display={isCollapsed ? 'none' : 'flex'}>
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
              display={isCollapsed ? 'none' : 'flex'}
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
                    justifyContent={isCollapsed ? 'center' : 'flex-start'}
                    backgroundColor={active ? '$blue2' : 'transparent'}
                    borderWidth={0}
                    borderRadius="$4"
                    onPress={() => {
                      router.push(item.href)
                      onItemPress?.()
                    }}
                    fontWeight={active ? '600' : '500'}
                    color={active ? '$blue11' : '$color'}
                    hoverStyle={{
                      backgroundColor: active ? '$blue2' : '$backgroundHover',
                      scale: 1.02,
                    }}
                    pressStyle={{
                      scale: 0.98,
                    }}
                    px={isCollapsed ? '$2' : '$3'}
                    py="$3"
                    position="relative"
                    animation="quick"
                  >
                    <XStack flex={1} alignItems="center" gap="$3">
                      <XStack
                        gap={isCollapsed ? 0 : '$2'}
                        alignItems="center"
                        flex={1}
                        justifyContent={isCollapsed ? 'center' : 'flex-start'}
                      >
                        <YStack width={24} alignItems="center" justifyContent="center">
                          <Icon size={20} color={active ? '$blue11' : '$color'} />
                        </YStack>
                        <Paragraph
                          size="$4"
                          fontWeight={active ? '600' : '500'}
                          color={active ? '$blue11' : '$color'}
                          display={isCollapsed ? 'none' : 'flex'}
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
                          display={isCollapsed ? 'none' : 'flex'}
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
  )

  return (
    <XStack flex={1} height="100vh" overflow="hidden" backgroundColor="$background">
      {/* Sidebar Moderno - Oculto en pantallas pequeñas */}
      <YStack
        width={sidebarCollapsed ? 76 : 280}
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
        display={isSmallScreen ? 'none' : 'flex'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <SidebarContent isCollapsed={sidebarCollapsed} />
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
            {/* Botón hamburguesa para móvil */}
            <Button
              size="$4"
              circular
              variant="outlined"
              icon={Menu}
              onPress={() => setMobileMenuOpen(true)}
              borderColor="$borderColor"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$borderColorHover',
              }}
              display={isSmallScreen ? 'flex' : 'none'}
            />
            {/* Botón toggle sidebar para desktop */}
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
              display={isSmallScreen ? 'none' : 'flex'}
            />
            {/* Barra de búsqueda - oculta en móvil */}
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
              display={isSmallScreen ? 'none' : 'flex'}
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
            {/* Popover de acciones para móvil */}
            {isSmallScreen && (
              <Popover placement="bottom-end" offset={8}>
                <Popover.Trigger asChild>
                  <Button
                    size="$4"
                    circular
                    variant="outlined"
                    icon={MoreVertical}
                    borderColor="$borderColor"
                    hoverStyle={{
                      backgroundColor: '$backgroundHover',
                      borderColor: '$borderColorHover',
                    }}
                  />
                </Popover.Trigger>
                <Popover.Content padding={0} borderWidth={1} borderColor="$borderColor" borderRadius="$4">
                  <Card padding="$3" gap="$2" minWidth={180} backgroundColor="$background">
                    <Button
                      size="$4"
                      justifyContent="flex-start"
                      variant="outlined"
                      icon={mounted ? (isDark ? Sun : Moon) : Moon}
                      onPress={toggleTheme}
                      borderColor="$borderColor"
                      height={44}
                    >
                      <Paragraph fontWeight="500" size="$4" color="$color">
                        {mounted && isDark ? 'Modo Claro' : 'Modo Oscuro'}
                      </Paragraph>
                    </Button>
                    <YStack>
                      <PopoverNotifications shape="square" />
                    </YStack>
                    <Popover.Close asChild>
                      <Button
                        size="$4"
                        justifyContent="flex-start"
                        variant="outlined"
                        borderColor="$borderColor"
                        height={44}
                        onPress={() => router.push('/profile')}
                      >
                        <XStack gap="$2" alignItems="center" flex={1}>
                          <YStack
                            width={28}
                            height={28}
                            borderRadius="$3"
                            backgroundColor="$blue9"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Paragraph color="white" fontWeight="700" size="$2">
                              M
                            </Paragraph>
                          </YStack>
                          <Paragraph fontWeight="500" size="$4" color="$color">
                            Perfil
                          </Paragraph>
                        </XStack>
                      </Button>
                    </Popover.Close>
                  </Card>
                </Popover.Content>
              </Popover>
            )}
            {/* Icons + Profile para desktop */}
            <XStack gap="$2" alignItems="center" display={isSmallScreen ? 'none' : 'flex'}>
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
                onPress={() => router.push('/profile')}
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
        </XStack>

        {/* Content Area con mejor espaciado */}
        <ScrollView flex={1} backgroundColor="$background" showsVerticalScrollIndicator={false}>
          <YStack p="$6" flex={1} maxWidth={1600} width="100%" alignSelf="center">
            {children}
          </YStack>
        </ScrollView>
      </YStack>

      {/* Menú móvil - Card simple */}
      {isSmallScreen && mobileMenuOpen && (
        <Card
          position="absolute"
          top={72}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          padding="$4"
          zIndex={99999}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$4">
              {/* Header */}
              <XStack justifyContent="space-between" alignItems="center">
                <H3 size="$6" fontWeight="700" color="$color">
                  Menú
                </H3>
                <Button
                  size="$3"
                  circular
                  variant="outlined"
                  icon={ChevronDown}
                  onPress={() => setMobileMenuOpen(false)}
                  borderColor="$borderColor"
                />
              </XStack>

              {/* Barra de búsqueda */}
              <XStack
                alignItems="center"
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$4"
                px="$3"
                gap="$2"
                backgroundColor="$background"
                height={44}
              >
                <Search size={18} color="$colorFocus" />
                <Input
                  flex={1}
                  borderWidth={0}
                  backgroundColor="transparent"
                  placeholder="Buscar..."
                  fontSize="$4"
                  color="$color"
                  placeholderTextColor="$colorFocus"
                  unstyled
                  height={44}
                />
              </XStack>

              {/* Sidebar content */}
              <SidebarContent onItemPress={() => setMobileMenuOpen(false)} />
            </YStack>
          </ScrollView>
        </Card>
      )}

    </XStack>
  )
}

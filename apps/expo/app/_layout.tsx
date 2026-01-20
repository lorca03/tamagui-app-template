import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Tabs } from 'expo-router'
import { Provider } from 'app/provider'
import { NativeToast } from '@my/ui/src/NativeToast'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  LayoutDashboard,
  FileText,
  Table,
  DollarSign,
  User,
} from '@tamagui/lucide-icons'

export const unstable_settings = {
  initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const insets = useSafeAreaInsets()

  return (
    <Provider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: isDark ? '#94a3b8' : '#64748b',
            tabBarStyle: {
              backgroundColor: isDark ? '#0b1220' : '#ffffff',
              borderTopWidth: 1,
              borderTopColor: isDark ? '#1f2a44' : '#e2e8f0',
              height: 60 + insets.bottom,
              paddingBottom: 8 + insets.bottom,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color as any} />,
            }}
          />
          <Tabs.Screen
            name="components"
            options={{
              title: 'Componentes',
              tabBarIcon: ({ color, size }) => <FileText size={size} color={color as any} />,
            }}
          />
          <Tabs.Screen
            name="tables"
            options={{
              title: 'Tablas',
              tabBarIcon: ({ color, size }) => <Table size={size} color={color as any} />,
            }}
          />
          <Tabs.Screen
            name="pricing"
            options={{
              title: 'Pricing',
              tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color as any} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => <User size={size} color={color as any} />,
            }}
          />
        </Tabs>
        <NativeToast />
      </ThemeProvider>
    </Provider>
  )
}

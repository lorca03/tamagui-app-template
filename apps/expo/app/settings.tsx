import { Stack } from 'expo-router'
import { AdminSettingsScreen } from 'app/features/admin/settings-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Configuración' }} />
      <AdminLayout platform="expo">
        <AdminSettingsScreen />
      </AdminLayout>
    </>
  )
}


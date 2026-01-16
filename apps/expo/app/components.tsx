import { Stack } from 'expo-router'
import { AdminComponentsScreen } from 'app/features/admin/components-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Componentes' }} />
      <AdminLayout platform="expo">
        <AdminComponentsScreen />
      </AdminLayout>
    </>
  )
}

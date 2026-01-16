import { Stack } from 'expo-router'
import { AdminTablesScreen } from 'app/features/admin/tables-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tablas' }} />
      <AdminLayout platform="expo">
        <AdminTablesScreen />
      </AdminLayout>
    </>
  )
}

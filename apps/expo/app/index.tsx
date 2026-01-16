import { Stack } from 'expo-router'
import { AdminDashboardScreen } from 'app/features/admin/dashboard-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
        }}
      />
      <AdminLayout platform="expo">
        <AdminDashboardScreen />
      </AdminLayout>
    </>
  )
}

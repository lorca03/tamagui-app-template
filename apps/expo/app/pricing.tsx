import { Stack } from 'expo-router'
import { AdminPricingScreen } from 'app/features/admin/pricing-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pricing' }} />
      <AdminLayout platform="expo">
        <AdminPricingScreen />
      </AdminLayout>
    </>
  )
}

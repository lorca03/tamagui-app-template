'use client'

import { AdminPricingScreen } from 'app/features/admin/pricing-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function PricingPage() {
  return (
    <AdminLayout platform="next">
      <AdminPricingScreen />
    </AdminLayout>
  )
}

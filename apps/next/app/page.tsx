'use client'

import { AdminDashboardScreen } from 'app/features/admin/dashboard-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function HomePage() {
  return (
    <AdminLayout platform="next">
      <AdminDashboardScreen />
    </AdminLayout>
  )
}

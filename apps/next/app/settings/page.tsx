'use client'

import { AdminSettingsScreen } from 'app/features/admin/settings-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function SettingsPage() {
  return (
    <AdminLayout platform="next">
      <AdminSettingsScreen />
    </AdminLayout>
  )
}

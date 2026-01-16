'use client'

import { AdminComponentsScreen } from 'app/features/admin/components-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function ComponentsPage() {
  return (
    <AdminLayout platform="next">
      <AdminComponentsScreen />
    </AdminLayout>
  )
}

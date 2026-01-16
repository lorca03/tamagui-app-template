'use client'

import { AdminTablesScreen } from 'app/features/admin/tables-screen'
import { AdminLayout } from 'app/features/admin/layout'

export default function TablesPage() {
  return (
    <AdminLayout platform="next">
      <AdminTablesScreen />
    </AdminLayout>
  )
}

import { AdminProfileScreen } from 'app/features/admin/profile-screen'
import { MobileLayout } from 'app/features/admin/MobileLayout'
import * as Linking from 'expo-linking'

export default function Screen() {
  return (
    <MobileLayout>
      <AdminProfileScreen linking={Linking as any} />
    </MobileLayout>
  )
}

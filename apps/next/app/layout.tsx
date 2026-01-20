import type { Metadata } from 'next'
import { NextTamaguiProvider } from 'app/provider/NextTamaguiProvider'
import { WebLayout } from 'app/features/admin/WebLayout'

export const metadata: Metadata = {
  title: 'Tamagui • App Router',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <NextTamaguiProvider>
          <WebLayout>{children}</WebLayout>
        </NextTamaguiProvider>
      </body>
    </html>
  )
}

'use client'

import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation'

// Para Next.js App Router
export function useRouter() {
  const router = useNextRouter()
  return {
    push: (href: string) => router.push(href),
    replace: (href: string) => router.replace(href),
    back: () => router.back(),
  }
}

export function usePathname() {
  return useNextPathname()
}

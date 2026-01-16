'use client'

import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import '@tamagui/polyfill-dev'

import type { ReactNode } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { config } from '@my/ui'
import { Provider } from 'app/provider'
import { StyleSheet } from 'react-native'

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useRootTheme()

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <link
          rel="stylesheet"
          href="/tamagui.css"
        />
        <style
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        />
        <style
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: config.getNewCSS(),
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </>
    )
  })

  return (
    <NextThemeProvider
      skipNextHead
      defaultTheme="light"
      // Queremos un toggle simple claro/oscuro (sin "system"), porque Tamagui
      // espera nombres de tema reales ("light" | "dark") y "system" rompe el cambio.
      enableSystem={false}
      onChangeTheme={(next) => {
        // `@tamagui/next-theme` puede emitir "system" si enableSystem está activo.
        // Con enableSystem={false} esto será solo "light" | "dark", pero lo dejamos seguro.
        setTheme((next === 'system' ? 'light' : next) as any)
      }}
    >
      <Provider
        disableRootThemeClass
        defaultTheme={theme || 'light'}
      >
        {children}
      </Provider>
    </NextThemeProvider>
  )
}

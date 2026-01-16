import { createTamagui } from 'tamagui'
import { themes } from './theme'
import { defaultConfig } from '@tamagui/config/v4'

export const config = createTamagui({
  ...defaultConfig,
  themes,
  settings: {
    ...defaultConfig.settings,
    // Permite usar longhands (backgroundColor, alignItems, etc.) en el tipado
    // y evita los errores de Biome/TS en los componentes.
    onlyAllowShorthands: false,
  },
})

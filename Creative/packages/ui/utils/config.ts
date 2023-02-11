import { ThemingProps } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_MODES = extendTheme({
  colors: {
    brand: {
      100: '#1A202C',
      200: '#161D2F',
      300: '#EC407A',
      400: '#FACB80',
      500: '#EE774D',
    },
  },
})
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'brand'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}
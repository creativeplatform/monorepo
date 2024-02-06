// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2.
// System sets initial value.
// App subscribes to system color mode changes.
const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true,
  }

// 3. extend the theme
const theme = extendTheme({ config })

export default theme
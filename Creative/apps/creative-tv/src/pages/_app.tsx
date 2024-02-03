import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from 'components/layout'
import { Seo } from 'components/layout/Seo'
import { useIsMounted } from 'hooks/useIsMounted'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import type { AppProps } from 'next/app'
import { SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_URL, THIRDWEB_API_KEY, activeChain, smartWalletInit } from '../utils/config'

// Call `extendTheme` and pass your custom values
const theme = extendTheme({
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

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: string }>) {
  const isMounted = useIsMounted()

  return (
    <ChakraProvider theme={theme}>
      <Seo />
      <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={useLivepeerClient}>
        {isMounted && (
          <ThirdwebProvider
            dAppMeta={{
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              logoUrl: SITE_LOGO,
              url: SITE_URL,
              isDarkMode: true,
            }}
            authConfig={{
              authUrl: '/api/auth',
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || 'creativeplatform.xyz',
            }}
            activeChain={activeChain}
            supportedWallets={[smartWalletInit]}
            clientId={THIRDWEB_API_KEY}>
            <Layout>
              <Component {...pageProps} />
              {process.env.NODE_ENV != 'development' && <Analytics />}
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThirdwebProvider>
        )}
      </LivepeerConfig>
    </ChakraProvider>
  )
}

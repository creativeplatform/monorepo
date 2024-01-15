import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Layout } from 'components/layout'
import { Seo } from 'components/layout/Seo'
import { useIsMounted } from 'hooks/useIsMounted'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import type { AppProps } from 'next/app'
import { SmartWallet, THIRDWEB_API_KEY, activeChain, siteMetadata } from '../utils/config'

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
              name: siteMetadata.NAME,
              description: siteMetadata.DESCRIPTION,
              logoUrl: siteMetadata.LOGO_URL,
              url: siteMetadata.URL,
              isDarkMode: true,
            }}
            authConfig={{
              authUrl: '/api/auth',
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || 'creativeplatform.xyz',
            }}
            activeChain={activeChain}
            supportedWallets={[SmartWallet]}
            clientId={THIRDWEB_API_KEY}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThirdwebProvider>
        )}
      </LivepeerConfig>
    </ChakraProvider>
  )
}

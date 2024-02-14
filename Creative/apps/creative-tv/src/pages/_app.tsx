import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider, smartWallet, embeddedWallet} from '@thirdweb-dev/react'
import { LivepeerConfig } from "@livepeer/react"
import { Layout } from 'components/layout'
import { Seo } from 'components/layout/Seo'
import { useIsMounted } from 'hooks/useIsMounted'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ACCOUNT_FACTORY_TESTNET, MUMBAI_CHAIN, THIRDWEB_API_KEY } from '../utils/config'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StyleConfig } from "@chakra-ui/theme-tools";

const components: Record<string, StyleConfig> = {
  CustomBadge: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === "dark" ? "brand.400" : "brand.300",
      color: colorMode === "dark" ? "gray.800" : "white",
      textTransform: "uppercase",
      fontWeight: "semibold",
      letterSpacing: "0.02em",
      padding: "4px",
      borderRadius: "2px",
      fontSize: "12px"
    }),
    variants: {
      custom: ({ colorMode }) => ({
        bg: colorMode === "dark" ? "dark" : "light",
        padding: "8px"
      })
    }
  }
};

// Call `extendTheme` and pass your custom values
const theme = extendTheme({
  components,
  colors: {
    brand: {
      100: "#1A202C",
      200: "#161D2F",
      300: "#EC407A",
      400: "#FACB80",
      500: "#EE774D",
    },
  },
})
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = MUMBAI_CHAIN[0]

export default function App({ 
  Component, 
  pageProps
}: AppProps<{ dehydratedState: string}>) {
  
  const isMounted = useIsMounted()
  
  const smartWalletConfig = {
    factoryAddress: ACCOUNT_FACTORY_TESTNET,
    gasless: true,
  }

  return (
    <ChakraProvider theme={theme}>
      <Seo />
      <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={useLivepeerClient}>
        {isMounted && (
          <ThirdwebProvider
          dAppMeta={{
            name: "CREATIVE TV",
            description: "The Way Your Content Should Be",
            logoUrl: "https://bafybeifvsvranpnmujrpcry6lqssxtyfdvqz64gty4vpkhvcncuqd5uimi.ipfs.w3s.link/logo-tv.gif",
            url: "https://tv.creativeplatform.xyz",
            isDarkMode: true,
          }}
          authConfig={{
            authUrl: "/api/auth",
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "creativeplatform.xyz",
          }}
            activeChain={activeChain}
            supportedWallets={[
              smartWallet(
                embeddedWallet({
                  auth: {
                    options: [ "email", "google", "apple", "facebook" ],
                  }
                }), smartWalletConfig
              )
            ]}
            clientId={THIRDWEB_API_KEY}>
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThirdwebProvider>
        )}
      </LivepeerConfig>
    </ChakraProvider>
  )
}

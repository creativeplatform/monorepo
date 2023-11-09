import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider, smartWallet, localWallet, metamaskWallet, embeddedWallet, coinbaseWallet, walletConnect} from '@thirdweb-dev/react'
import { Layout } from 'components/layout'
import { Seo } from 'components/layout/Seo'
import { useIsMounted } from 'hooks/useIsMounted'
import type { AppProps } from 'next/app'
import { ACCOUNT_FACTORY_TESTNET, ETH_CHAINS, THIRDWEB_API_KEY, WALLET_CONNECT } from '../utils/config'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

// Call `extendTheme` and pass your custom values
const theme = extendTheme({
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
const activeChain = ETH_CHAINS[0]

export default function App({ 
  Component, 
  pageProps
}: AppProps) {
  const isMounted = useIsMounted()
  // Create a client
  const queryClient = new QueryClient()

  const config = {
    factoryAddress: ACCOUNT_FACTORY_TESTNET,
    gasless: false,
  }

  return (
    <ChakraProvider theme={theme}>
      <Seo />
      <QueryClientProvider client={queryClient}>
        {isMounted && (
          <ThirdwebProvider
          dAppMeta={{
            name: "CREATIVE TV",
            description: "The Way Your Content Should Be",
            logoUrl: "https://bafybeifvsvranpnmujrpcry6lqssxtyfdvqz64gty4vpkhvcncuqd5uimi.ipfs.w3s.link/logo-tv.gif",
            url: "https://tv.creativeplatform.xyz",
            isDarkMode: true,
          }}
          // authConfig={{
          //   authUrl: "/api/auth",
          //   domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "creativeplatform.xyz",
          // }}
            queryClient={queryClient}
            activeChain={activeChain}
            supportedWallets={[
              smartWallet(metamaskWallet(), config),
              smartWallet(localWallet(), config),
              smartWallet(embeddedWallet({recommended: true}), config),
              smartWallet(coinbaseWallet(), config),
              smartWallet(walletConnect({projectId: WALLET_CONNECT }), config)
            ]}
            clientId={THIRDWEB_API_KEY}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThirdwebProvider>
        )}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

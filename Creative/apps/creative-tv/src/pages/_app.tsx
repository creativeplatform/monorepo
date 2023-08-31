import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider, metamaskWallet, smartWallet, coinbaseWallet, localWallet } from '@thirdweb-dev/react'
import { Layout } from 'components/layout'
import { Seo } from 'components/layout/Seo'
import { useIsMounted } from 'hooks/useIsMounted'
import type { AppProps } from 'next/app'
import { ChakraProvider } from 'providers/Chakra'
import { ACCOUNT_FACTORY_TESTNET, ETH_CHAINS, SMART_WALLET_KEY } from '../utils/config'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = ETH_CHAINS[0]

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  // Create a client
  const queryClient = new QueryClient()

  return (
    <ChakraProvider>
      <Seo />
      <QueryClientProvider client={queryClient}>
        {isMounted && (
          <ThirdwebProvider
            activeChain={activeChain}
            autoSwitch={true}
            supportedWallets={[
              smartWallet({
                factoryAddress: ACCOUNT_FACTORY_TESTNET,
                gasless: true,
                // this is the default
                personalWallets: [metamaskWallet(), coinbaseWallet(), localWallet()],
              }),
            ]}
            clientId={SMART_WALLET_KEY}>
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

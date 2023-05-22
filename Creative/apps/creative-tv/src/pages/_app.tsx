import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import { Mumbai } from '@thirdweb-dev/chains'
import { Layout } from 'components/layout'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { Web3Provider } from 'providers/Web3'
import { SMART_WALLET_KEY, FACTORY_CONTRACT_ADDRESS } from 'utils/config'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Mumbai;

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  // Create a client
  const queryClient = new QueryClient()

  return (
    <ChakraProvider>
      <Seo />
      {isMounted && (
        <ThirdwebProvider
          activeChain={activeChain}
          supportedWallets={[
            smartWallet({
              factoryAddress: FACTORY_CONTRACT_ADDRESS,
              thirdwebApiKey: SMART_WALLET_KEY,
              gasless: true,
              personalWallets: [
                metamaskWallet(),
                coinbaseWallet(),
                localWallet({ persist: true })
              ]
            })
          ]}
        >
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThirdwebProvider>
      )}
    </ChakraProvider>
  )
}

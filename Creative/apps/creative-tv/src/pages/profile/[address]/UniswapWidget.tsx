import { darkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets'
import { useSigner, useSmartWallet } from '@thirdweb-dev/react';
import { useColorMode } from '@chakra-ui/react';
import '@uniswap/widgets/fonts.css'

const UniswapWidget = () => {
  const signer = useSigner();
    // Our own JSON-RPC endpoints.
  const jsonRpcUrlMap = {
    137: ['https://polygon.rpc.thirdweb.com'],
    80001: ['https://mumbai.rpc.thirdweb.com'],
  }

  const { colorMode } = useColorMode()

  const myLightTheme: Theme = {
    ...lightTheme, // Extend the lightTheme
    accent: '#EC407A',
    primary: '#000000',
    secondary: '#565A69',
  }
  
  const myDarkTheme: Theme = {
    ...darkTheme, // Extend the darkTheme
    accent: '#EC407A',
    primary: '#FFFFFF',
    secondary: '#888D9B',
  }

  return (
    <>
    <SwapWidget theme={colorMode === 'dark' ? myDarkTheme : myLightTheme} provider={signer?.connect.prototype} jsonRpcUrlMap={jsonRpcUrlMap} />
    </>
  );
}

export default UniswapWidget;

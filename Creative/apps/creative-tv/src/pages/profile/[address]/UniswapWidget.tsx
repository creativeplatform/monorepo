import { SwapWidget } from '@uniswap/widgets'
import { useSigner } from '@thirdweb-dev/react';
import '@uniswap/widgets/fonts.css'

const UniswapWidget = () => {
    const signer = useSigner();
    // Our own JSON-RPC endpoints.
    const jsonRpcUrlMap = {
    137: ['https://polygon.rpc.thirdweb.com'],
    80001: ['https://mumbai.rpc.thirdweb.com'],
  }
  return (
    <>
    <SwapWidget provider={signer?._checkProvider?.prototype} jsonRpcUrlMap={jsonRpcUrlMap} />
    </>
  );
}

export default UniswapWidget;

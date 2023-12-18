import { useEffect } from 'react';
import { useSDK } from "@thirdweb-dev/react";

const useInitThirdweb = () => {
  const sdk = useSDK();

  useEffect(() => {
    // Initialize the Thirdweb SDK
    const initializeSDK = async () => {
      try {
        // Get the address from the connected wallet's signer
        const address = await sdk?.getSigner()?.getAddress();
        console.log("👋 SDK initialized by address:", address);
      } catch (err) {
        console.error("Failed to get address from the sdk", err);
      }
    };

    // Call the initializeSDK function when the sdk value changes
    initializeSDK();
  }, [sdk])
};

export default useInitThirdweb;

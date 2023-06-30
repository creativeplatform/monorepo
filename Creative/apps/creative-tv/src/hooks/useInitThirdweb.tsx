import { useSDK } from "@thirdweb-dev/react";

const sdk = useSDK();

(async () => {
  try {
    const address = await sdk?.getSigner()?.getAddress();
    console.log("👋 SDK initialized by address:", address)
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;
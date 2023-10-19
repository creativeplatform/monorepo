// Importing required modules and dependencies
import { useContract, useContractWrite, useAddress, ThirdwebSDK, useSigner } from '@thirdweb-dev/react';
import { Paywall, networkConfigs,  } from '@unlock-protocol/paywall';
import { networks, goerli } from '@unlock-protocol/networks';
import { useToast } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { ERC20_ABI, FREE_LOCK_ADDRESS_GOERLI_TESTNET } from '../utils/config';
import Unlock from "../utils/fetchers/Unlock.json";

// Main hook for purchasing NFTs
export default function usePurchaseNFT() {
  // Initialize toast for user feedback
  const toast = useToast();
  
  // Get user's wallet address
  const address = useAddress();
  
  // Predefined contract addresses and purchase price
  const LOCK_ADDRESS = '0xC9bdfA5f177961D96F137C42241e8EcBCa605781';
  const TOKEN_ADDRESS = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
  const PURCHASE_PRICE = 3000000;
  
  // Get the signer from ThirdwebSDK
  const signer = useSigner();
  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer);

  // Function to approve ERC20 token transactions
  const approveAnyToken = async (
    tokenAddress: string,
    amount: BigNumber,
    approveAddress?: string,
  ) => {
      if (!signer) return;
      // Get the ERC20 contract
      const erc20Contract = await sdkSigner?.getContractFromAbi(
          tokenAddress,
          ERC20_ABI,
      );
      // Call 'approve' function of the ERC20 contract
      return erc20Contract?.call('approve', [approveAddress, amount]);
  }

  // Function to purchase the NFT
  const purchaseNFT = async () => {
    (window as any).unlockProtocolConfig = {
      network: 5, // Network ID (1 is for mainnet, 4 for rinkeby... etc)
      locks: {
        '0xc9bdfa5f177961d96f137c42241e8ecbca605781': { // 0xabc is the address of a lock.
          name: 'One Month Premium Goerli',
          network: 5 // you can customize the network for each lock
        },
        '0xb6b645c3e2025cf69983983266d16a0aa323e2b0': { // 0xabc is the address of a lock.
          name: 'One Month Premium',
          network: 137 // you can customize the network for each lock
        },
      },
      icon: 'https://bafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q.ipfs.nftstorage.link/',
    }
    

   
    const paywall = new Paywall(networks);
    if (typeof window !== 'undefined') {
      const provider = paywall.getProvider('https://app.unlock-protocol.com')
    
    
    try {
      // Add pre-purchase logic if any
      
      // Connect a provider if you need (optional)
       paywall.connect(provider);
      
      // Load Unlock's checkout modal
      const paywallConfig = {
        // Your paywall configuration here
        locks: {
          [LOCK_ADDRESS]: {
            network: goerli,
          }
        },
        pessimistic: true,
        recipient: address, // from new SmartWallet(config);
      };
      const response = await paywall.loadCheckoutModal(paywallConfig);
      
      // Add post-purchase logic based on the 'response'
      if (response) {
        toast({
          title: "Purchased NFT",
          description: "You are now a member of CreativeTV!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      
    } catch (err) {
      console.error("Failed to purchase NFT", err);
      toast({
        title: "Failed to purchase NFT",
        description: "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  };

  // Return the main function for use elsewhere in the application
  return {
    purchaseNFT
  };
}

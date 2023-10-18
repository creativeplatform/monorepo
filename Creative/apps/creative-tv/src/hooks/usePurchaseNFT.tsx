import { useContract, useContractWrite, useAddress, ThirdwebSDK, useSigner } from '@thirdweb-dev/react'
import { useToast } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { ERC20_ABI } from '../utils/config';
import Unlock from "../utils/fetchers/Unlock.json"

export default function usePurchaseNFT() {
  const toast = useToast()
  const address = useAddress()
  const LOCK_ADDRESS = '0xC9bdfA5f177961D96F137C42241e8EcBCa605781'
  const TOKEN_ADDRESS = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
  const PURCHASE_PRICE = 3000000
  const signer = useSigner()

  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer)

  //contract call to purchase lock


  const approveAnyToken = async (
    tokenAddress: string,
    amount: BigNumber,
    approveAddress?: string,
  ) => {
      if (!signer) return
      const erc20Contract = await sdkSigner?.getContractFromAbi(
          tokenAddress,
          ERC20_ABI,
      );
      return erc20Contract?.call('approve',[approveAddress, amount]);
  }
  const purchaseNFT = async () => {
    const unlockContract = await sdkSigner?.getContractFromAbi(
      LOCK_ADDRESS,
      Unlock.abi,
    );
  
    toast({
      title: "Purchasing NFT",
      description: "Please wait while we process your request.",
      status: "info",
      duration: 9000,
      isClosable: false,
    })
    try {

      //approve any token
      await approveAnyToken(TOKEN_ADDRESS, BigNumber.from(PURCHASE_PRICE), LOCK_ADDRESS).then(() => {
        toast({
          title: "Approved NFT",
          description: "You are now minting membership!.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })

      })
      return await unlockContract?.call(
        "purchase", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
        [
          [PURCHASE_PRICE], //price here
          [address],
          [address],
          [address],
          ['0x'],
        ],
      ).then(() => {
        toast({
          title: "Purchased NFT",
          description: "You are now a member of CreativeTV!.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      })

      // console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
      toast({
        title: "Failed to purchase NFT",
        description: "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  };

  return (

      {
        purchaseNFT
      }

  )
}
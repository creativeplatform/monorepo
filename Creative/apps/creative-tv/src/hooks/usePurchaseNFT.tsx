import React from 'react'
import { useContract, useContractWrite, useAddress } from '@thirdweb-dev/react'
import { useToast } from '@chakra-ui/react';

export default function usePurchaseNFT() {
  const toast = useToast()
  const address = useAddress()
  //contract call to purchase lock
   const { contract } = useContract(
    "0x697560Ba635e92c19e660Fa0EB0bDFcD7938A08B"
  );
  const { mutateAsync: purchase, isLoading } = useContractWrite(
    contract,
    "purchase"
  );


  const purchaseNFT = async () => {
    toast({
      title: "Purchasing NFT",
      description: "Please wait while we process your request.",
      status: "info",
      duration: 9000,
      isClosable: false,   
    })
    try {
      const data = await purchase({ args: [
        [0], //price here
        [address],
        [address],
        [address],
        ['0x'],
      ]}).then(() => {
        toast({
          title: "Purchased NFT",
          description: "You are now a member of CreativeTV!.",
          status: "success",
          duration: 9000,
          isClosable: true,   
        })
      })
      
      console.info("contract call success", data);
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

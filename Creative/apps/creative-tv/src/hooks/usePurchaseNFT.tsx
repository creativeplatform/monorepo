import React from 'react'
import { useContract, useContractWrite } from '@thirdweb-dev/react'

export default function usePurchaseNFT() {
   //contract call to purchase lock
   const { contract } = useContract(
    "0x697560Ba635e92c19e660Fa0EB0bDFcD7938A08B"
  );
  const { mutateAsync: purchase, isLoading } = useContractWrite(
    contract,
    "purchase"
  );

  //This function should take 1 parameter, which is the created wallet address, and then call the contract to purchase the NFT, the address should be passed into the args
  //where there are currently addresses.
  const purchaseNFT = async (address?: string) => {
    try {
      const data = await purchase({ args: [
        [0],
        ['0x5EDf48dAF4AB7239BA9Bdc5E7AdEBB730540d133'],
        ['0x5EDf48dAF4AB7239BA9Bdc5E7AdEBB730540d133'],
        ['0x5EDf48dAF4AB7239BA9Bdc5E7AdEBB730540d133'],
        ['0x'],
      ]});
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    
      {
        purchaseNFT
      }
    
  )
}

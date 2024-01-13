import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSetClaimConditions, useContract, Web3Button } from '@thirdweb-dev/react'

type ClaimFormData = {
  price?: string
  currencyAddress: string
  phaseName: string
  maxClaimablePerWallet: string
  maxClaimableSupply: string
  startTime: Date
  waitInSeconds: string
}

type SetClaimConditionsProps = {
  nftContractAddress?: string
  nftMetadata: Record<string, any>
  contractMetadata?: string
  handleSetClaimCondition: (data: any) => Promise<boolean | undefined>
}

//
export function SetClaimConditions(props: SetClaimConditionsProps) {
  const {contract} = useContract(props.nftContractAddress)
  const {
    mutateAsync: setClaimConditions,
    isLoading,
    error,
  } = useSetClaimConditions(contract);

  const claimConditions = {
    phases: [
      {
        metadata: {
          name: "Phase 1", // The name of the phase
        },
        currencyAddress: "0x...", // The address of the currency you want users to pay in
        price: 1, // The price of the token in the currency specified above
        maxClaimablePerWallet: 1, // The maximum number of tokens a wallet can claim
        maxClaimableSupply: 100, // The total number of tokens that can be claimed in this phase
        startTime: new Date(), // When the phase starts (i.e. when users can start claiming tokens)
        waitInSeconds: 60 * 60 * 24 * 7, // The period of time users must wait between repeat claims
        snapshot: [
          {
            address: "0x...", // The address of the wallet
            currencyAddress: "0x...", // Override the currency address this wallet pays in
            maxClaimable: 5, // Override the maximum number of tokens this wallet can claim
            price: 0.5, // Override the price this wallet pays
          },
        ],
        merkleRootHash: "0x...", // The merkle root hash of the snapshot
      },
    ],
  };

  return (
    <Web3Button
      contractAddress={props.nftContractAddress || ''}
      action={() => setClaimConditions(claimConditions)}
    >
      Set Claim Conditions
    </Web3Button>
  );
}

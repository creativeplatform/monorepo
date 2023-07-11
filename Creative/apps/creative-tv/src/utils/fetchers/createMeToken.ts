import { ethers } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/react'
import { Goerli } from '@thirdweb-dev/chains';
import {
  METOKENS_ADDRESS_GOERLI,
  METOKENS_REGISTRY_ABI,
} from '../config'

interface CreateMeToken {
  name: string;
  symbol: string;
  hubId: number;
  assetsDeposited: string;
}


export const meTokenRegistryFacet = `${METOKENS_ADDRESS_GOERLI.meTokensRegistryFacet}`

export const createMeToken = async (createMeTokenData: CreateMeToken, address: string) => {
  const signer = new ethers.providers.JsonRpcProvider('https://ethereum-goerli.publicnode.com').getSigner(address)

// Create an SDK signer using the Thirdweb SDK
const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli)
const meTokenRegistryFacetContract = await sdkSigner.getContract(meTokenRegistryFacet, METOKENS_REGISTRY_ABI)
  const { name, symbol, hubId, assetsDeposited } = createMeTokenData;
  console.log(meTokenRegistryFacetContract, 'test')
  return createMeTokenData;
  /* const tx = await factoryContract.subscribe(name, symbol, hubId, assetsDeposited);

  return tx; */
}

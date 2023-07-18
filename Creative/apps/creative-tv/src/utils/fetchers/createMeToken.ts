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
  assetsDeposited: number;
}

export const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
export const meTokenRegistryFacet = `${METOKENS_ADDRESS_GOERLI.meTokensRegistryFacet}`

export const getMeTokenContract = async (address: string) => {
  const signer = new ethers.providers.JsonRpcProvider('https://ethereum-goerli.publicnode.com').getSigner(address)

  // Create an SDK signer using the Thirdweb SDK
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli)
  const meTokenRegistryFacetContract = await sdkSigner.getContract(meTokenRegistryFacet, METOKENS_REGISTRY_ABI)
  return meTokenRegistryFacetContract;
}

export const createMeToken = async (createMeTokenData: CreateMeToken, contract: any) => {
  
  try {
    const data = await contract.call(
        "subscribe", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
        [
          createMeTokenData.name, // e.g. Argument 1
          createMeTokenData.symbol, // e.g. Argument 2
          createMeTokenData.hubId,
          createMeTokenData.assetsDeposited,
        ],
      );
    console.log(data);
    // do something with the form data  
  } catch (error) {
    console.log('Error:', error);
  }
}

/* export const isApproved = async (
  tokenAddress: string,
  amount: number,
  owner: string,
  address: string,
) => {
  const signer = new ethers.providers.JsonRpcProvider('https://ethereum-goerli.publicnode.com').getSigner(address)
  const provider  = new ethers.providers.JsonRpcProvider('https://ethereum-goerli.publicnode.com')

  const erc20 = await new Contract(
    tokenAddress,
    erc20ABI,
    mainnetProvider.getSigner(owner),
  );
  const approvalAmount = await erc20.allowance(owner, foundryFacet);
  return approvalAmount.gt(amount);
};

export const approveTokens = async (
  tokenAddress: string,
  amount: BigNumber,
  provider: JsonRpcProvider,
): Promise<TransactionResponse> => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20ABI,
    provider.getSigner(),
  );
  return erc20.approve(foundryFacet, amount);
}; */
import { ethers } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/react'
import { Goerli } from '@thirdweb-dev/chains';
import {
  METOKENS_ADDRESS_GOERLI,
  METOKENS_REGISTRY_ABI,
  ERC20_ABI,
  GOERLI_PROVIDER_URL
} from '../config'

interface CreateMeToken {
  name: string;
  symbol: string;
  hubId: number;
  assetsDeposited: number;
}
export const foundryFacet = `${METOKENS_ADDRESS_GOERLI.foundryFacet}`
export const daiAddress = '0x0c4f55df47b20c8fbb134494b45a7a01097849ff';
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
}; */

export const approveTokens = async (
  amount: string,
  address: string,
  tokenAddress: string,
) => {
  const provider = new ethers.providers.JsonRpcProvider(GOERLI_PROVIDER_URL)
  const signer = provider.getSigner(address)
  // Create an SDK signer using the Thirdweb SDK
  const sdkSigner = ThirdwebSDK.fromSigner(signer, Goerli)
  const erc20 = await sdkSigner.getContractFromAbi(
    daiAddress,
    ERC20_ABI,
  );
  console.log(erc20)
  const tx = await erc20.call(
    'approve',
    ['0xBdC97D61E8198880c966716df8613cb2fE073D90', ethers.utils.parseEther(amount)],
    { gasLimit: 1000000}
  );
  console.log(tx, 'tx')
  return tx
};
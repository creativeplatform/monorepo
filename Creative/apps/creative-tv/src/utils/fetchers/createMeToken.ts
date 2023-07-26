import { ethers,  Contract } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
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
export const meTokenDiamond = `${METOKENS_ADDRESS_GOERLI.meTokenDiamond}`

export const getMeTokenContract = async (signer: any) => {
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli);
  const meTokenRegistryFacetContract = await sdkSigner.getContractFromAbi(foundryFacet, METOKENS_REGISTRY_ABI)
  return meTokenRegistryFacetContract;
}

export const createMeToken = async (createMeTokenData: CreateMeToken, contract: any,signer: any) => {
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli);
  const meTokenRegistryFacetContract = await sdkSigner.getContractFromAbi(
    meTokenDiamond, METOKENS_REGISTRY_ABI)
  try {
    const data = meTokenRegistryFacetContract.call(
        "subscribe", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
        [
          createMeTokenData.name, // e.g. Argument 1
          createMeTokenData.symbol, // e.g. Argument 2
          +createMeTokenData.hubId,
          ethers.utils.parseEther('1'),
        ],
      );
    console.log(data);
    // do something with the form data
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

export const isApprovedAmount = async (
  address: string,
  signer: any,
) => {
  // Create an SDK signer using the Thirdweb SDK
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli)
  const erc20 = await sdkSigner.getContractFromAbi(
    daiAddress,
    ERC20_ABI,
  );

  const tx = erc20.call(
    'allowance',
    [address, foundryFacet],
    { gasLimit: 1000000}
  );
  return tx
};

export const approveTokens = async (
  amount: string,
  signer: any,
) => {
  // Create an SDK signer using the Thirdweb SDK
  console.log(signer, 'signer')
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli)
  console.log(sdkSigner, 'sdkSigner')
  const erc20 = await sdkSigner.getContractFromAbi(
    daiAddress,
    ERC20_ABI,
  );
  const bigNumberValue = ethers.BigNumber.from('1000')
  return await erc20.call(
    'approve',
    [foundryFacet, bigNumberValue],
  );
};
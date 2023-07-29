import { ethers,  Contract } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Goerli } from '@thirdweb-dev/chains';
import { Orbis } from '@orbisclub/orbis-sdk';
import {
  METOKENS_ADDRESS_GOERLI,
  METOKENS_REGISTRY_ABI,
  ERC20_ABI,
  HUB_FACET_ABI,
  FOUNDRY_FACET_ABI,
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
export const meTokenApproval = '0x47fF07BfD0cdFaD6650177f661E8cC977FA8Bf36'


export const getMeTokenContract = async (signer: any) => {
  const sdkSigner = await ThirdwebSDK.fromSigner(signer, Goerli);
  const meTokenRegistryFacetContract = await sdkSigner.getContractFromAbi(foundryFacet, METOKENS_REGISTRY_ABI)
  return meTokenRegistryFacetContract;
}

/* export const createMeToken = async (createMeTokenData: CreateMeToken, contract: any,signer: any) => {
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
          1,
        ],
      );
    console.log(data);
    // do something with the form data
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
} */

export const createMeToken = async (createMeTokenData: CreateMeToken, signer: any) => {
    const metoken = await new Contract(
      meTokenDiamond, METOKENS_REGISTRY_ABI, signer
    );
  return metoken.subscribe(createMeTokenData.name, // e.g. Argument 1
  createMeTokenData.symbol, // e.g. Argument 2
  +createMeTokenData.hubId,
  ethers.utils.parseEther(createMeTokenData.assetsDeposited.toString()))
}

export const getMeTokenFor = async (ownerAddress: string, signer: any) => {
  if (!ownerAddress) throw new Error('Owner required for `getMeTokenFor`.');
  const registry = await new Contract(
    meTokenDiamond,
    METOKENS_REGISTRY_ABI,
    signer,
  );
  const addressChecksummed = await ethers.utils.getAddress(ownerAddress);
  const token =  registry.getOwnerMeToken(addressChecksummed);
  return token
};

export const mint = (
  meToken: string,
  amount: string,
  recipient: string,
  signer: any
) => {
  const meTokenFoundry = new Contract(
    meTokenDiamond,
    FOUNDRY_FACET_ABI,
    signer,
  );
  return meTokenFoundry.mint(meToken, ethers.utils.parseEther(amount), recipient);
};

export const getMeTokenInfo = async (tokenAddress: string, owner: string, signer: any) => {
  if (!tokenAddress || !owner || !signer)
    throw new Error('Token address required for `getMeTokenInfo`.');
  console.log(tokenAddress, 'tokenAddress')
  const orbis = new Orbis();
  const { data: dids } = await orbis.getDids(owner);

  const erc20 = await new Contract(tokenAddress, ERC20_ABI, signer);
  const registry = await new Contract(
    meTokenDiamond,
    METOKENS_REGISTRY_ABI,
    signer,
  );
  const hub = new Contract(meTokenDiamond, HUB_FACET_ABI, signer);
  const tokenInfo = await registry.getMeTokenInfo(tokenAddress);
    console.log(dids[0].details?.profile?.pfp, 'dids')
  return {
    symbol: `$${await erc20.symbol()}`,
    profilePicture:
    dids[0].details?.profile?.pfp || 'https://tinyurl.com/mr29vhmk',
    tokenAddress,
    collateralAddress: await hub
      .getBasicHubInfo(tokenInfo?.hubId)
      .then(({ asset }: { asset: string }) => asset),
  };
};

export const isApprovedAmount = async (
  address: string,
  amount: string,
  signer: any,
) => {
  const erc20 = await new Contract(
    daiAddress,
    ERC20_ABI,
    signer,
  );
  const approvalAmount = await erc20.allowance(address, foundryFacet);
  return approvalAmount.gt(amount);
};

export const approveTokens = async (
  amount: any,
  s: any,
) => {
  const erc20 = await new Contract(
    daiAddress,
    ERC20_ABI,
    s,
  );
  return erc20.approve(meTokenApproval, ethers.utils.parseEther(amount));
};


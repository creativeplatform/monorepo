// Import necessary libraries and configurations
import { ethers, BigNumber, BigNumberish, Transaction } from 'ethers'
import { Orbis } from '@orbisclub/orbis-sdk'
import {
    METOKENS_ADDRESS_GOERLI,
    FOUNDRY_FACET_ABI,
    HUB_FACET_ABI,
    METOKEN_FACTORY_ABI,
    METOKENS_REGISTRY_ABI,
    METOKENS_DIAMOND_ABI,
    ERC20_ABI,
} from '../config'
import { ThirdwebSDK, useAddress, useContract, useSigner, useContractRead } from '@thirdweb-dev/react'
import { Goerli } from '@thirdweb-dev/chains';
import { Sign } from 'crypto';

// Define constants for various contract addresses and token addresses
export const meTokenRegistry = `${METOKENS_ADDRESS_GOERLI.metokensRegistryFactory}`
export const meTokenFactory = `${METOKENS_ADDRESS_GOERLI.metokenFactory}`
export const hubFacet = `${METOKENS_ADDRESS_GOERLI.hubFacet}`
export const foundryFacet = `${METOKENS_ADDRESS_GOERLI.foundryFacet}`
export const meTokenDiamond = `${METOKENS_ADDRESS_GOERLI.meTokenDiamond}`
export const meTokenRegistryFacet = `${METOKENS_ADDRESS_GOERLI.meTokensRegistryFacet}`
export const nullToken = `0x${'0'.repeat(40)}`
export const daiAddress = `${erc20Token.DAI.chain.ethereum.goerli}`

// Define an interface for BasicHubInfo
interface BasicHubInfo {
    asset: string;
    // Add any other properties you expect in the response
}

interface CreateMeToken {
    name: string;
    symbol: string;
    hubId: number;
    assetsDeposited: string;
}


// Define a function to get collateral data based on the collateral token address
export const getCollateralData = async (collateralTokenAddress: string) => {
    let id;
    // Metokens will have multiple options for collateral
    // When a new token can be used as collateral add a case to match token with ID for query.
    switch (collateralTokenAddress) {
        case daiAddress:
            id = 'dai';
            break;
        default:
            throw new Error('Only DAI is supported as collateral currently.');
    }

    const tokenURL = `https://api.coingecko.com/api/v3/${id}?localization=false`;
    const tokenResponse = await fetch(tokenURL);
    const tokenInfo = await tokenResponse.json();
    return {
        image: tokenInfo.image.small,
        currentPrice: tokenInfo.market_data.current_price.usd,
    };
};

// Get the user's address using the Thirdweb SDK
const address = useAddress()
if (address === undefined) throw new Error('Wallet not detected');

// Get the signer for the user's address
const signer = new ethers.providers.JsonRpcProvider().getSigner(address)

// Create an SDK signer using the Thirdweb SDK
const sdkSigner = ThirdwebSDK.fromSigner(signer, Goerli)

// Use the mainnet provider for reads, to ensure anyone can view the profile regardless of the network
const registryContract = await sdkSigner.getContract(meTokenRegistry, METOKENS_REGISTRY_ABI)

const factoryContract = await sdkSigner.getContract(meTokenFactory, METOKEN_FACTORY_ABI)

const hubContract = await sdkSigner.getContract(hubFacet, HUB_FACET_ABI)

const foundryContract = await sdkSigner.getContract(foundryFacet, FOUNDRY_FACET_ABI)

const diamondContract = await sdkSigner.getContract(meTokenDiamond, METOKENS_DIAMOND_ABI)

const meTokenRegistryFacetContract = await sdkSigner.getContract(meTokenRegistryFacet, METOKENS_REGISTRY_ABI)

export const createMeToken = async (createMeTokenData: CreateMeToken) => {
    const { name, symbol, hubId, assetsDeposited } = createMeTokenData;
    console.log(meTokenRegistryFacetContract, 'test')
    return createMeTokenData;
    /* const tx = await factoryContract.subscribe(name, symbol, hubId, assetsDeposited);

    return tx; */
}

// READ||WRITE CONTRACTS

// Define a function to get the MeToken for a given owner address
export const getMeTokenFor = async (ownerAddress: string) => {
    if (!ownerAddress) throw new Error('Owner required for `getMeTokenFor`.');
    const registry = await diamondContract.call(
        "getMeTokenInfo", // Name of your function as it is on the smart contract
    );
    return registry.getOwnerMeToken(ownerAddress);
};

// Define a function to get ERC20 token data for a given token address and owner
export const getERC20TokenData = async (address: string, owner: string) => {
    if (!address) throw new Error('`address` required for `getERC20TokenData`.');
    if (!owner) throw new Error('`owner` required for `getERC20TokenData`.');

    const erc20Contract = await sdkSigner.getContractFromAbi(
        address,
        ERC20_ABI,
    );

    const metadata = await erc20Contract.erc20.get();

    return metadata;
};

// Define a function to get MeToken info for a given token address and owner
export const getMeTokenInfo = async (tokenAddress: string, owner: string) => {
    if (!tokenAddress) {
        throw new Error('Token address required for `getMeTokenInfo`.');
    }

    const orbis = new Orbis();
    const { data: dids } = await orbis.getDids(address);

    const erc20Contract = await sdkSigner.getContractFromAbi(tokenAddress, ERC20_ABI);
    const registry = await sdkSigner.getContractFromAbi(meTokenDiamond, METOKENS_REGISTRY_ABI);
    const hub = await sdkSigner.getContractFromAbi(meTokenDiamond, HUB_FACET_ABI);

    const tokenInfo = await registry.call('getMeTokenInfo', [tokenAddress]);

    return {
        symbol: `$${(await erc20Contract.erc20.get()).symbol}`,
        profilePicture: dids?.[0]?.details.profile?.pfp || 'https://tinyurl.com/mr29vhmk',
        tokenAddress,
        collateralAddress: await hub.call('getBasicHubInfo', [tokenInfo?.hubId, ({ asset }: { asset: string }) => asset]),
    };
};

// Define a preview function for calculating minted MeTokens or assets returned for burning
export const preview = async (
    meTokenAddress: string,
    amount: BigNumber,
    senderAddress: string,
    type: string,
) => {
    if (!amount || !meTokenAddress) return BigNumber.from(0);

    const meTokenFoundry = await sdkSigner.getContractFromAbi(
        meTokenDiamond,
        FOUNDRY_FACET_ABI,
    );
    if (type === 'mint') {
        return meTokenFoundry.call('calculateMeTokensMinted', [meTokenAddress, amount]);
    }
    if (type === 'burn') {
        return meTokenFoundry.call('calculateAssetsReturned', [meTokenAddress,
            amount,
            senderAddress,]);
    }
    return BigNumber.from(0);
};

// Check if a certain amount of tokens is approved by the owner for the foundry contract
export const isApproved = async (
    tokenAddress: string,
    amount: BigNumberish,
    owner: string,
) => {
    const erc20Contract = await sdkSigner.getContractFromAbi(
        tokenAddress,
        ERC20_ABI,
    );
    const approvalAmount = await erc20Contract.call('allowance', [owner, foundryFacet]);
    return approvalAmount.gt(amount);
};

// Approve a certain amount of tokens for the foundry contract
export const approveTokens = async (
    tokenAddress: string,
    amount: BigNumber,
    provider?: Sign,
) => {
    if (!provider)  throw new Error('Wallet not detected');
    const erc20Contract = await sdkSigner.getContractFromAbi(
        tokenAddress,
        ERC20_ABI,
    );
    return erc20Contract.call('approve',[foundryFacet, amount]);
};

// Transfer a certain amount of tokens from the owner to another address
export const spendTokens = async (
    tokenAddress: string,
    amount: BigNumber,
    owner: string,
    provider?: Sign,
) => {
    if (!provider)  throw new Error('Wallet not detected');
    const erc20Contract = await sdkSigner.getContractFromAbi(
        tokenAddress,
        ERC20_ABI,
    );
    return erc20Contract.call('transfer',[owner, amount]);
};

// Mint MeTokens by providing the MeToken address, amount, and recipient
export const mint = async (
    meToken: string,
    amount: BigNumber,
    recipient: string,
    provider?: Sign,
) => {
    if (!provider)  throw new Error('Wallet not detected');
    const meTokenFoundry = await sdkSigner.getContractFromAbi(
        meTokenDiamond,
        FOUNDRY_FACET_ABI,
    );
    return meTokenFoundry.call('mint', [meToken, amount, recipient]);
};

// Burn MeTokens by providing the MeToken address, amount, and sender
export const burn = async (
    meToken: string,
    amount: BigNumber,
    sender: string,
    provider?: Sign,
) => {
    if (!provider)  throw new Error('Wallet not detected');
    const meTokenFoundry = await sdkSigner.getContractFromAbi(
        meTokenDiamond,
        FOUNDRY_FACET_ABI,
    );
    return meTokenFoundry.call('burn', [meToken, amount, sender]);
};

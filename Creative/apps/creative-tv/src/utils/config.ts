import { ThemingProps, extendTheme } from '@chakra-ui/react'
import { Mumbai, Polygon } from '@thirdweb-dev/chains'
import { embeddedWallet, metamaskWallet, smartWallet } from '@thirdweb-dev/react'
import gql from 'graphql-tag'

export const SITE_NAME = 'CREATIVE TV'
export const SITE_DESCRIPTION = 'The way content should be.'
export const SITE_IMAGE = '/creative-membership.png'
export const SITE_URL = 'https://creativeplatform.xyz'
export const SITE_COPYRIGHT = '© 2023 Creative Organization DAO, LLC. All rights reserved.'
export const SITE_LOGO = '/grant-logo.png'

export const ACCOUNT_FACTORY = {
    mumbai: '0xc56eE04279171c9A2eA50D055082142d20A9dBf4', // Account Factory (MUMBAI)
    mainnet: '', // FACTORY CONTRACT (POLYGON)
}
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = MUMBAI_CHAIN[0]
export const activeChain = 'mumbai' // TODO: revert chain back to the top commented option

export const THIRDWEB_AUTH_PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY // for Thiredweb Auth
export const THIRDWEB_API_SECRET = process.env.THIRDWEB_API_SECRET // for backend access
export const DEV_TESTNET_PRIVATE_KEY = process.env.DEV_TESTNET_PRIVATE_KEY // dev private key
export const NEXT_PUBLIC_AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
export const NEXT_PUBLIC_STUDIO_API_KEY = process.env.NEXT_PUBLIC_STUDIO_API_KEY
export const NEXT_PUBLIC_THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY
export const SESSION_PASSWORD = process.env.NEXT_SESSION_PASSWORD
export const NODE_ENV = process.env.NODE_ENV
export const SIWE_SESSION_SECRET = process.env.NEXT_PUBLIC_SIWE_SESSION_SECRET
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
export const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY
export const POLYGONSCAN_API_KEY = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY
export const HOST = process.env.NEXT_PUBLIC_HOST
export const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY
export const EXPLORER_KEY = process.env.NEXT_PUBLIC_EXPLORER_KEY
export const PAPER_CLIENT_ID = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID
export const WALLET_CONNECT = process.env.NEXT_PUBLIC_WALLET_CONNECT
export const WERT_PRIVATE_KEY = process.env.NEXT_PUBLIC_WERT_PRIVATE_KEY
export const WERT_PARTNER_ID = process.env.NEXT_PUBLIC_WERT_PARTNER_ID

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_MODES = extendTheme({
  colors: {
    brand: {
      100: '#1A202C',
      200: '#161D2F',
      300: '#EC407A',
      400: '#FACB80',
      500: '#EE774D',
    },
  },
})
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'brand'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const EXPLORER_API_URL = {
  GOERLI: 'https://api-goerli.etherscan.io/',
  POLYGON: 'https://api.polygonscan.com/',
}

// LINKS
export const SOCIAL_TWITTER = 'https://twitter.com/creativecrtv'
export const SOCIAL_GITHUB = 'https://github.com/creativeplatform/creative-tv'
export const SOCIAL_DISCORD = 'https://discord.gg/creativeplatform'
export const SOCIAL_EMAIL = 'mailto:creatives@creativeplatform.xyz'
export const SOCIAL_LENS = 'https://lensfrens.xyz/thecreative'
export const SOCIAL_LINKEDIN = 'https://www.linkedin.com/company/creativeplatform'

// FEATURED CAROUSEL PLAYLISTS
export const CAROUSEL_PLAYLISTS = {
  0: {
    title: 'Trending 📊',
    description: 'The most popular content on Creative TV.',
    name_1: 'The Wizards Hat ⌐◨-◨ Animated Short Film',
    playbackId_1: 'd82af4v0nip5tka7',
    name_2: 'DAO Palace Documentary',
    playbackId_2: 'a2b2fcgqx7ghfpxj',
    name_3: 'This is Nouns',
    playbackId_3: '4d8b5ud89j96qkwt',
    name_4: 'Episode 1 - Wait a minute, who are you?',
    playbackId_4: '6461dsqs9qjr1dji',
  },
}

// BLOCKCHAIN LIST
export const POLYGON_CHAIN = [Polygon]
export const MUMBAI_CHAIN = [Mumbai]

// Title text for the various transaction notifications.
export const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// EPISODE DROP CONTRACT ADDRESS
export const EPISODE_DROP_ADDRESS = {
  testnet: '0xE675e85ccf7b8ADB2E466fc06662319628B75a9F',
}

// Unlock Contracts (MUMBAI)
export const LOCK_ADDRESS_MUMBAI_TESTNET = {
  address: '0x9a9280897c123b165e23f77cf4c58292d6ab378d',
  rpc_url: 'mumbai.rpc.thirdweb.com',
  chainId: '80001',
  symbol: 'MATIC',
}

// Account Factory (MUMBAI)
export const ACCOUNT_FACTORY_TESTNET = '0x714a1a66de408a355dA20bA7FeEbC6BEFCC3E2bf'

// FACTORY CONTRACT (POLYGON)
export const ACCOUNT_FACTORY_POLYGON = ''

// Setup the Smart Wallet configuration
export const SMART_WALLET_CONFIG = {
  chain: Mumbai, // the chain where your smart wallet will be or is deployed
  factoryAddress: ACCOUNT_FACTORY_TESTNET, // your own deployed account factory address
  clientId: THIRDWEB_API_KEY, // obtained from the thirdweb dashboard
  gasless: true, // enable or disable gasless transactions
}

export const UNLOCK_API_URL = 'https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2'
export const UNLOCK_QUERY_HOLDS_KEY = gql`
  query keysForLock($lockAddresses: [String!]!, $walletAddress: String!) {
    keys(where: { lock_in: $lockAddresses, owner: $walletAddress }) {
      id
      owner
      expiration
      cancelled
    }
  }
`

// CREATIVE ADDRESS
export const CREATIVE_ADDRESS = '0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260'

// ERC20 TOKENS
export const MUMBAI_ERC20_TOKENS = {
  TESTR: '0xc0823427fE72cFD105c71BEAd0476412283B07c5',
}

// Livepeer API
export const LIVEPEER_API_URL = 'https://livepeer.com/api'
export const LIVEPEER_HERO_PLAYBACK_ID = 'cbd1dw72qst9xmps' // Welcome To Creative Organization DAO
export const LIVEPEER_FEATURED_PLAYBACK_ID = '5c2bzf537qbq0r7o' // The Creative Podcast Episode 03

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.NEXT_SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const NAME_OF_SAVED_CONTRACT_ADDRESS = 'JOHN_DOE' // The name used to save the deployed contract address to localStorage or remote Server.
export const DEV_ENVIRONMENT = {
  prod: 'production',
  dev: 'development',
  test: 'test',
}

// VIDEO NFT MUMBAI
export const VIDEO_NFT_CONTRACT_ADDRESS = '0x205e06b24328b59e3846c3Fa4a55de7c1D6b227C'

// 1. export the LENS contract address
export const LENS_CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

// CREW3 API
export const CREATIVE_CREW3 = 'thecreativedao'

// METOKENS CONTRACT ADDRESS
// METOKENS GOERLI
export const METOKENS_ADDRESS_MUMBAI = {
  foundryFacet: '0x09a2e447ED411EaC76c5aff9168bde1f9D4B154f',
  hubFacet: '0xa6A9320205A290903DA361b8a2073284787acF7f',
  metokenFactory: '0x88B30Fe63473EeB33a0E2E8e46563c265AC3FD49',
  metokensRegistryFactory: '0xab90dDCBD864c4D6f51B20d969E06d70399aB79d',
  meTokenDiamond: '0xBdC97D61E8198880c966716df8613cb2fE073D90',
  meTokensRegistryFacet: '0xab90dDCBD864c4D6f51B20d969E06d70399aB79d',
}

// METOKENS MAINNET
export const METOKENS_ADDRESS_POLYGON = {
  foundryFacet: '0xA56AAF637b057a5EDf7b7252D0B7280042E71335',
  hubFacet: '0x4555cf6E984186F6C0dfeba1A26764b21553B39f',
  meTokenFactory: '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225',
  metokensRegistryFactory: '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c',
  meTokenDiamond: '0x0B4ec400e8D10218D0869a5b0036eA4BCf92d905',
}
// METOKENS CONTRACT ABI

export const FOUNDRY_FACET_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'burner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsReturned',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'donor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'Donate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensMinted',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'meTokensBurned', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'burn',
    outputs: [{ internalType: 'uint256', name: 'assetsReturned', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'meTokensBurned', type: 'uint256' },
      { internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'calculateAssetsReturned',
    outputs: [{ internalType: 'uint256', name: 'assetsReturned', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
    ],
    name: 'calculateMeTokensMinted',
    outputs: [{ internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'vSig', type: 'uint8' },
      { internalType: 'bytes32', name: 'rSig', type: 'bytes32' },
      { internalType: 'bytes32', name: 'sSig', type: 'bytes32' },
    ],
    name: 'mintWithPermit',
    outputs: [{ internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const HUB_FACET_ABI = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'CancelUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'Deactivate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'FinishUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetRefundRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'targetReserveWeight',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'reconfigure',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endCooldown',
        type: 'uint256',
      },
    ],
    name: 'InitUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'refundRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseY',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'reserveWeight',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'encodedVaultArgs',
        type: 'bytes',
      },
    ],
    name: 'Register',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'TransferHubOwnership',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'cancelUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'deactivate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'finishUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'getBasicHubInfo',
    outputs: [
      { internalType: 'uint256', name: 'refundRatio', type: 'uint256' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'vault', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'bool', name: 'updating', type: 'bool' },
      { internalType: 'bool', name: 'active', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'getHubInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endCooldown', type: 'uint256' },
          { internalType: 'uint256', name: 'refundRatio', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'targetRefundRatio',
            type: 'uint256',
          },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'vault', type: 'address' },
          { internalType: 'address', name: 'asset', type: 'address' },
          { internalType: 'bool', name: 'updating', type: 'bool' },
          { internalType: 'bool', name: 'reconfigure', type: 'bool' },
          { internalType: 'bool', name: 'active', type: 'bool' },
        ],
        internalType: 'struct HubInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubCooldown',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubDuration',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubWarmup',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'targetRefundRatio', type: 'uint256' },
      { internalType: 'uint32', name: 'targetReserveWeight', type: 'uint32' },
    ],
    name: 'initUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'contract IVault', name: 'vault', type: 'address' },
      { internalType: 'uint256', name: 'refundRatio', type: 'uint256' },
      { internalType: 'uint256', name: 'baseY', type: 'uint256' },
      { internalType: 'uint32', name: 'reserveWeight', type: 'uint32' },
      { internalType: 'bytes', name: 'encodedVaultArgs', type: 'bytes' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'period', type: 'uint256' }],
    name: 'setHubCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'period', type: 'uint256' }],
    name: 'setHubDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'period', type: 'uint256' }],
    name: 'setHubWarmup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'transferHubOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const METOKEN_FACTORY_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'address', name: 'diamond', type: 'address' },
    ],
    name: 'create',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const METOKENS_REGISTRY_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'CancelResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'CancelTransferMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'ClaimMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'FinishResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetHubId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'migration',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'encodedMigrationArgs',
        type: 'bytes',
      },
    ],
    name: 'InitResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minted',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: false,
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
    ],
    name: 'Subscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'TransferMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'add', type: 'bool' },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalanceLocked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'add', type: 'bool' },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalancePooled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalances',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: 'meToken', type: 'address' }],
    name: 'cancelResubscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelTransferMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'oldOwner', type: 'address' }],
    name: 'claimMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'meToken', type: 'address' }],
    name: 'finishResubscribe',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'hubId', type: 'uint256' },
          { internalType: 'uint256', name: 'balancePooled', type: 'uint256' },
          { internalType: 'uint256', name: 'balanceLocked', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'targetHubId', type: 'uint256' },
          { internalType: 'address', name: 'migration', type: 'address' },
        ],
        internalType: 'struct MeTokenInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'meToken', type: 'address' }],
    name: 'getBasicMeTokenInfo',
    outputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'hubId', type: 'uint256' },
      { internalType: 'uint256', name: 'balancePooled', type: 'uint256' },
      { internalType: 'uint256', name: 'balanceLocked', type: 'uint256' },
      { internalType: 'address', name: 'migration', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'meToken', type: 'address' }],
    name: 'getMeTokenInfo',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'hubId', type: 'uint256' },
          { internalType: 'uint256', name: 'balancePooled', type: 'uint256' },
          { internalType: 'uint256', name: 'balanceLocked', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'targetHubId', type: 'uint256' },
          { internalType: 'address', name: 'migration', type: 'address' },
        ],
        internalType: 'struct MeTokenInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'getOwnerMeToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'oldOwner', type: 'address' }],
    name: 'getPendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'targetHubId', type: 'uint256' },
      { internalType: 'address', name: 'migration', type: 'address' },
      { internalType: 'bytes', name: 'encodedMigrationArgs', type: 'bytes' },
    ],
    name: 'initResubscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'isOwner',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenDuration',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenWarmup',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'period', type: 'uint256' }],
    name: 'setMeTokenDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'period', type: 'uint256' }],
    name: 'setMeTokenWarmup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'uint256', name: 'hubId', type: 'uint256' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
    ],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'newBalance', type: 'uint256' },
    ],
    name: 'updateBalances',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const METOKENS_DIAMOND_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
    ],
    name: 'getCurveInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'baseY',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'targetBaseY',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'reserveWeight',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'targetReserveWeight',
            type: 'uint32',
          },
        ],
        internalType: 'struct LibCurve.CurveInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balancePooled',
        type: 'uint256',
      },
    ],
    name: 'viewAssetsReturned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balancePooled',
        type: 'uint256',
      },
    ],
    name: 'viewMeTokensMinted',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balancePooled',
        type: 'uint256',
      },
    ],
    name: 'viewTargetAssetsReturned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balancePooled',
        type: 'uint256',
      },
    ],
    name: 'viewTargetMeTokensMinted',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
        ],
        indexed: false,
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: 'diamondCut',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'init',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'DiamondCut',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
        ],
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: 'cut',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: 'init',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'diamondCut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'functionSelector',
        type: 'bytes4',
      },
    ],
    name: 'facetAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'facetAddress_',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facetAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: 'facetAddresses_',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'facet',
        type: 'address',
      },
    ],
    name: 'facetFunctionSelectors',
    outputs: [
      {
        internalType: 'bytes4[]',
        name: 'facetFunctionSelectors_',
        type: 'bytes4[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondLoupeFacet.Facet[]',
        name: 'facets_',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'SetBurnBuyerFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'SetBurnOwnerFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'SetMintFee',
    type: 'event',
  },
  {
    inputs: [],
    name: 'burnBuyerFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'burnOwnerFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'setBurnBuyerFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'setBurnOwnerFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'setMintFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'burner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsReturned',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'donor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'Donate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensMinted',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'calculateAssetsReturned',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsReturned',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'calculateMeTokensMinted',
    outputs: [
      {
        internalType: 'uint256',
        name: 'meTokensMinted',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'vSig',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'rSig',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'sSig',
        type: 'bytes32',
      },
    ],
    name: 'mintWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'CancelUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'Deactivate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'FinishUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetRefundRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'targetReserveWeight',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'reconfigure',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endCooldown',
        type: 'uint256',
      },
    ],
    name: 'InitUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'refundRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseY',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'reserveWeight',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'encodedVaultArgs',
        type: 'bytes',
      },
    ],
    name: 'Register',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'TransferHubOwnership',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'cancelUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'count',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'deactivate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'finishUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getHubInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endCooldown',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'refundRatio',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'targetRefundRatio',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'vault',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'updating',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'reconfigure',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct HubInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubCooldown',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubWarmup',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'targetRefundRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'targetReserveWeight',
        type: 'uint32',
      },
    ],
    name: 'initUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        internalType: 'contract IVault',
        name: 'vault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'refundRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'baseY',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'reserveWeight',
        type: 'uint32',
      },
      {
        internalType: 'bytes',
        name: 'encodedVaultArgs',
        type: 'bytes',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cooldown',
        type: 'uint256',
      },
    ],
    name: 'setHubCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    name: 'setHubDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'warmup',
        type: 'uint256',
      },
    ],
    name: 'setHubWarmup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferHubOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'CancelResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'CancelTransferMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'ClaimMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'FinishResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetHubId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'migration',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'encodedMigrationArgs',
        type: 'bytes',
      },
    ],
    name: 'InitResubscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minted',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
    ],
    name: 'Subscribe',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'TransferMeTokenOwnership',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'add',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalanceLocked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'add',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalancePooled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'UpdateBalances',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'cancelResubscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelTransferMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
    ],
    name: 'claimMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'finishResubscribe',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'hubId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balancePooled',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceLocked',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endCooldown',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'targetHubId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'migration',
            type: 'address',
          },
        ],
        internalType: 'struct MeTokenInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
    ],
    name: 'getMeTokenInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'hubId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balancePooled',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceLocked',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endCooldown',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'targetHubId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'migration',
            type: 'address',
          },
        ],
        internalType: 'struct MeTokenInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'getOwnerMeToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
    ],
    name: 'getPendingOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'targetHubId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'migration',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'encodedMigrationArgs',
        type: 'bytes',
      },
    ],
    name: 'initResubscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenCooldown',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenWarmup',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cooldown',
        type: 'uint256',
      },
    ],
    name: 'setMeTokenCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    name: 'setMeTokenDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'warmup',
        type: 'uint256',
      },
    ],
    name: 'setMeTokenWarmup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'hubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferMeTokenOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'updateBalances',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deactivateController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'diamondController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'durationsController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feesController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'meTokenRegistryController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registerController',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setDeactivateController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setDiamondController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setDurationsController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setFeesController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setMeTokenRegistryController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'setRegisterController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'forwarder',
        type: 'address',
      },
    ],
    name: 'setTrustedForwarder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'trustedForwarder',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const erc20Token = {
  TESTR: {
    chain: {
      polygon: {
        mumbai: '0xc0823427fE72cFD105c71BEAd0476412283B07c5',
        mainnet: '',
      },
      ethereum: {
        mainnet: '',
        sepolia: '',
      },
    },
  },
  USDC: {
    chain: {
      polygon: {
        mumbai: '0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97',
        mainnet: '',
      },
      ethereum: {
        mainnet: '',
        sepolia: '',
      },
    },
  },
  DAI: {
    chain: {
      polygon: {
        mumbai: '0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1',
        mainnet: '',
      },
      ethereum: {
        sepolia: '',
        goerli: '0xE65Ce7f6a02F50d4717b5966e3Bd65B3FDCB480a',
        mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      },
    },
  },
}

// ERC20 ABI
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

// 2. export the LENS contract abi
export const LENS_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'followNFTImpl', type: 'address' },
      { internalType: 'address', name: 'collectNFTImpl', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'CallerNotCollectNFT', type: 'error' },
  { inputs: [], name: 'CallerNotFollowNFT', type: 'error' },
  { inputs: [], name: 'CannotInitImplementation', type: 'error' },
  { inputs: [], name: 'EmergencyAdminCannotUnpause', type: 'error' },
  { inputs: [], name: 'InitParamsInvalid', type: 'error' },
  { inputs: [], name: 'Initialized', type: 'error' },
  { inputs: [], name: 'NotGovernance', type: 'error' },
  { inputs: [], name: 'NotGovernanceOrEmergencyAdmin', type: 'error' },
  { inputs: [], name: 'NotOwnerOrApproved', type: 'error' },
  { inputs: [], name: 'NotProfileOwner', type: 'error' },
  { inputs: [], name: 'NotProfileOwnerOrDispatcher', type: 'error' },
  { inputs: [], name: 'Paused', type: 'error' },
  { inputs: [], name: 'ProfileCreatorNotWhitelisted', type: 'error' },
  { inputs: [], name: 'ProfileImageURILengthInvalid', type: 'error' },
  { inputs: [], name: 'PublicationDoesNotExist', type: 'error' },
  { inputs: [], name: 'PublishingPaused', type: 'error' },
  { inputs: [], name: 'SignatureExpired', type: 'error' },
  { inputs: [], name: 'SignatureInvalid', type: 'error' },
  { inputs: [], name: 'ZeroSpender', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct DataTypes.EIP712Signature',
        name: 'sig',
        type: 'tuple',
      },
    ],
    name: 'burnWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'collect',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'collector', type: 'address' },
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'uint256', name: 'pubId', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.CollectWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'collectWithSig',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'contentURI', type: 'string' },
          {
            internalType: 'uint256',
            name: 'profileIdPointed',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'pubIdPointed', type: 'uint256' },
          { internalType: 'bytes', name: 'referenceModuleData', type: 'bytes' },
          { internalType: 'address', name: 'collectModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'collectModuleInitData',
            type: 'bytes',
          },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
        ],
        internalType: 'struct DataTypes.CommentData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'comment',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'contentURI', type: 'string' },
          {
            internalType: 'uint256',
            name: 'profileIdPointed',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'pubIdPointed', type: 'uint256' },
          { internalType: 'bytes', name: 'referenceModuleData', type: 'bytes' },
          { internalType: 'address', name: 'collectModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'collectModuleInitData',
            type: 'bytes',
          },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.CommentWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'commentWithSig',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'string', name: 'handle', type: 'string' },
          { internalType: 'string', name: 'imageURI', type: 'string' },
          { internalType: 'address', name: 'followModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'followModuleInitData',
            type: 'bytes',
          },
          { internalType: 'string', name: 'followNFTURI', type: 'string' },
        ],
        internalType: 'struct DataTypes.CreateProfileData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'createProfile',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'wallet', type: 'address' }],
    name: 'defaultProfile',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
      { internalType: 'uint256', name: 'collectNFTId', type: 'uint256' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'emitCollectNFTTransferEvent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'followNFTId', type: 'uint256' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'emitFollowNFTTransferEvent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'exists',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256[]', name: 'profileIds', type: 'uint256[]' },
      { internalType: 'bytes[]', name: 'datas', type: 'bytes[]' },
    ],
    name: 'follow',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'follower', type: 'address' },
          { internalType: 'uint256[]', name: 'profileIds', type: 'uint256[]' },
          { internalType: 'bytes[]', name: 'datas', type: 'bytes[]' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.FollowWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'followWithSig',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getCollectModule',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getCollectNFT',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCollectNFTImpl',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getContentURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getDispatcher',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getFollowModule',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getFollowNFT',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFollowNFTImpl',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getFollowNFTURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGovernance',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getHandle',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getProfile',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'pubCount', type: 'uint256' },
          { internalType: 'address', name: 'followModule', type: 'address' },
          { internalType: 'address', name: 'followNFT', type: 'address' },
          { internalType: 'string', name: 'handle', type: 'string' },
          { internalType: 'string', name: 'imageURI', type: 'string' },
          { internalType: 'string', name: 'followNFTURI', type: 'string' },
        ],
        internalType: 'struct DataTypes.ProfileStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'handle', type: 'string' }],
    name: 'getProfileIdByHandle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getPub',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'profileIdPointed',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'pubIdPointed', type: 'uint256' },
          { internalType: 'string', name: 'contentURI', type: 'string' },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          { internalType: 'address', name: 'collectModule', type: 'address' },
          { internalType: 'address', name: 'collectNFT', type: 'address' },
        ],
        internalType: 'struct DataTypes.PublicationStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'getPubCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getPubPointer',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getPubType',
    outputs: [{ internalType: 'enum DataTypes.PubType', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'uint256', name: 'pubId', type: 'uint256' },
    ],
    name: 'getReferenceModule',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getState',
    outputs: [{ internalType: 'enum DataTypes.ProtocolState', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'address', name: 'newGovernance', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'collectModule', type: 'address' }],
    name: 'isCollectModuleWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'followModule', type: 'address' }],
    name: 'isFollowModuleWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'profileCreator', type: 'address' }],
    name: 'isProfileCreatorWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'referenceModule', type: 'address' }],
    name: 'isReferenceModuleWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'mintTimestampOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'profileIdPointed',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'pubIdPointed', type: 'uint256' },
          { internalType: 'bytes', name: 'referenceModuleData', type: 'bytes' },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
        ],
        internalType: 'struct DataTypes.MirrorData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'mirror',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'profileIdPointed',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'pubIdPointed', type: 'uint256' },
          { internalType: 'bytes', name: 'referenceModuleData', type: 'bytes' },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.MirrorWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'mirrorWithSig',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct DataTypes.EIP712Signature',
        name: 'sig',
        type: 'tuple',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
      {
        components: [
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct DataTypes.EIP712Signature',
        name: 'sig',
        type: 'tuple',
      },
    ],
    name: 'permitForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'contentURI', type: 'string' },
          { internalType: 'address', name: 'collectModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'collectModuleInitData',
            type: 'bytes',
          },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
        ],
        internalType: 'struct DataTypes.PostData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'post',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'contentURI', type: 'string' },
          { internalType: 'address', name: 'collectModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'collectModuleInitData',
            type: 'bytes',
          },
          { internalType: 'address', name: 'referenceModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'referenceModuleInitData',
            type: 'bytes',
          },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.PostWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'postWithSig',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
    name: 'setDefaultProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'wallet', type: 'address' },
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.SetDefaultProfileWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'setDefaultProfileWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'address', name: 'dispatcher', type: 'address' },
    ],
    name: 'setDispatcher',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'address', name: 'dispatcher', type: 'address' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.SetDispatcherWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'setDispatcherWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newEmergencyAdmin', type: 'address' }],
    name: 'setEmergencyAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'address', name: 'followModule', type: 'address' },
      { internalType: 'bytes', name: 'followModuleInitData', type: 'bytes' },
    ],
    name: 'setFollowModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'address', name: 'followModule', type: 'address' },
          {
            internalType: 'bytes',
            name: 'followModuleInitData',
            type: 'bytes',
          },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.SetFollowModuleWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'setFollowModuleWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'string', name: 'followNFTURI', type: 'string' },
    ],
    name: 'setFollowNFTURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'followNFTURI', type: 'string' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.SetFollowNFTURIWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'setFollowNFTURIWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newGovernance', type: 'address' }],
    name: 'setGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'profileId', type: 'uint256' },
      { internalType: 'string', name: 'imageURI', type: 'string' },
    ],
    name: 'setProfileImageURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'profileId', type: 'uint256' },
          { internalType: 'string', name: 'imageURI', type: 'string' },
          {
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
              { internalType: 'uint256', name: 'deadline', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.EIP712Signature',
            name: 'sig',
            type: 'tuple',
          },
        ],
        internalType: 'struct DataTypes.SetProfileImageURIWithSigData',
        name: 'vars',
        type: 'tuple',
      },
    ],
    name: 'setProfileImageURIWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum DataTypes.ProtocolState',
        name: 'newState',
        type: 'uint8',
      },
    ],
    name: 'setState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'sigNonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenDataOf',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint96', name: 'mintTimestamp', type: 'uint96' },
        ],
        internalType: 'struct IERC721Time.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'collectModule', type: 'address' },
      { internalType: 'bool', name: 'whitelist', type: 'bool' },
    ],
    name: 'whitelistCollectModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'followModule', type: 'address' },
      { internalType: 'bool', name: 'whitelist', type: 'bool' },
    ],
    name: 'whitelistFollowModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'profileCreator', type: 'address' },
      { internalType: 'bool', name: 'whitelist', type: 'bool' },
    ],
    name: 'whitelistProfileCreator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'referenceModule', type: 'address' },
      { internalType: 'bool', name: 'whitelist', type: 'bool' },
    ],
    name: 'whitelistReferenceModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]




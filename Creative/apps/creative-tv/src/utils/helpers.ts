import { CreateToastFnReturn } from '@chakra-ui/react'
import { NetworkInput, ThirdwebSDK } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { THIRDWEB_API_KEY, erc20Token } from './config'

export const thirdwebSDK = (network: NetworkInput) =>
  new ThirdwebSDK(network, {
    clientId: THIRDWEB_API_KEY,
  })

// Use as the name of contract saved for temporal or permanent storage
/**
 *
 * @param name A name to identify the contract address
 * @returns editionContract::name
 *
 * @example const res = parseEditionDropContract('John')
 * console.log(res) = 'EditionDrop::John'
 */
const parseEditionDropContract = (name: string) => {
  return `EditionDrop::${name}`
}

type LocalStateSetArgs = {
  name: string
  value: string
}
type LocalStateGetArgs = {
  name: string
}

/**
 * This object holds functions that works with the browser localStrage API
 */
export const windowStorage = {
  /**
   * This function saves data to the web browser local store
   * @param key This represent the name to save the item on
   * @param value This is the item to save
   * @example
   *
   * set({key: 'bat', value: 'man mobile'})
   * or
   * set({ key: 'user', value: JSON.stringify({ firstName: 'bat', lastName: 'man' }) })
   *
   */
  set: ({ name, value }: LocalStateSetArgs) => {
    name = parseEditionDropContract(name)
    const res = windowStorage.get({ name })
    if (res) {
      throw Error('Key already in use; try another key name')
    } else {
      if (typeof value == 'object') {
        throw Error('Value needs to be stringified')
      } else {
        localStorage.setItem(name, value)
      }
    }
  },
  /**
   *
   * @param key This represent the name to the item to retrieve
   * @returns item saved
   */
  get: ({ name }: LocalStateGetArgs) => {
    name = parseEditionDropContract(name)
    console.log('name: ', name)

    // 0x6171a3DfAcd25802079137d5D69db51D64E025a1
    const exists = localStorage.getItem(name)
    if (exists) {
      return exists
    } else {
      // throw new Error('Key not found!')
      console.log('Key not found!')
    }
  },
}

type DeployEditionDropContractType = {
  name: string
  primary_sale_recipient: string //connectedAddress
  app_uri: string // Website of your contract dApp
  symbol: string // Symbol of the edition drop
  platform_fee_recipient: string
  fee_recipient: string //connectedAddress
  seller_fee_basis_points: number
  platform_fee_basis_points: number | undefined
  image: string
  description: string
  trusted_forwarders: string[]
}
/**
 * This function helps to deploy the parseEditionDropContract by Thirdweb
 */
export async function deployEditionDropContract(signer: ethers.Signer, network: NetworkInput, args: DeployEditionDropContractType) {
  const sdk = ThirdwebSDK.fromSigner(signer, network as any, {
    clientId: THIRDWEB_API_KEY,
  })

  // Is there an sdk found?
  if (!sdk) return

  try {
    const contractAddress = await sdk.deployer.deployEditionDrop({
      name: args.name,
      primary_sale_recipient: args.primary_sale_recipient,
      app_uri: args.app_uri, // Website of your contract dApp
      symbol: args.symbol, // Symbol of the edition drop
      platform_fee_basis_points: args.platform_fee_basis_points,
      platform_fee_recipient: args.platform_fee_recipient,
      fee_recipient: args.fee_recipient,
      seller_fee_basis_points: args.seller_fee_basis_points,
      image: args.image,
      description: args.description,
      trusted_forwarders: args.trusted_forwarders,
    })

    return contractAddress
  } catch (err: any) {
    throw Error(err.message)
  }
}

export const claimConditions = {
  phase: {
    'Select phase': '',
    'Phase 1': 'Phase 1',
  },
  waitInSecondsOptions: {
    'Select period': '',
    '5 mins': 60 * 5,
    '15 mins': 60 * 15,
    '30 mins': 60 * 30,
    '1 hr': 60 * 60 * 1,
    '3 hrs': 60 * 60 * 3,
    '6 hrs': 60 * 60 * 6,
    '9 hrs': 60 * 60 * 9,
    '12 hrs': 60 * 60 * 12,
    '24 hrs': 60 * 60 * 24,
    '48 hrs': 60 * 60 * 24 * 2,
    '72 hrs': 60 * 60 * 24 * 3,
    '96 hrs': 60 * 60 * 24 * 4,
    '120 hrs': 60 * 60 * 24 * 5,
  },
  currency: {
    // The tokens accepted for payment by the buyer
    USDC: erc20Token.USDC.chain.polygon.mumbai,
    TESTR: erc20Token.TESTR.chain.polygon.mumbai,
  },
}

export function parseTimestampToDate(ts: number) {
  if (!ts) {
    return 'Not available'
  } else {
    const d = new Date(ts)
    const longEnUSFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return longEnUSFormat.format(d)
  }
}

/**
 * The function wrap a sentence at particular length of characters
 * @param txt The sentence body
 * @param wrapAfter The number of characters to start
 * @returns The wrapped sentence
 */
const wordWrap = (txt: string, wrapAfter: number) => {
  txt = txt.trim()
  if (txt.length > wrapAfter) {
    return txt.slice(0, wrapAfter) + '...'
  }

  return txt
}

/**
 * String formating functions
 */
export const formatString = {
  wordWrap,
  removeUnderScore: (str: string) => {
    if (!str.includes('_')) {
      return str.toUpperCase()
    } else {
      return str.split('_').join(' ').toUpperCase()
    }
  },

  titleCase: (str: string) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  },
  truncate: (str: string, startAt: 'left' | 'middle' | 'right', numOfLetter: number) => {
    // TODO: finish this up

    if (startAt == 'left') {
      str = '.'.repeat(numOfLetter) + str.slice(numOfLetter)
    } else if (startAt == 'middle') {
      str = str.slice(0, numOfLetter) + '.'.repeat(5) + str.slice(str.length - numOfLetter)
    } else if (startAt == 'right') {
      str = str.slice(0, numOfLetter) + str.slice(numOfLetter) + '.'.repeat(numOfLetter)
    }
    return str
  },
}

type HandleCopyStringArgs = {
  txt: string | undefined
  toast: CreateToastFnReturn | any
}
// Copy string to clipboard
export const handleCopyString = (args: HandleCopyStringArgs) => {
  navigator.clipboard.writeText(args.txt ?? '')
  console.log('str copied:', args.txt)
  args.toast
}

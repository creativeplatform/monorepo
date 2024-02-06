import { CreateToastFnReturn } from '@chakra-ui/react'
import { NetworkInput, ThirdwebSDK } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { THIRDWEB_API_KEY, ERC20_TOKEN } from './config'

export const thirdwebSDK = (network: NetworkInput) =>
  new ThirdwebSDK(network, {
    clientId: THIRDWEB_API_KEY,
  })

export const thirdwebSDKFromSigner = (signer: ethers.Signer, network: NetworkInput) => {
  return ThirdwebSDK.fromSigner(signer, network as any, {
    clientId: THIRDWEB_API_KEY,
  })
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
  const sdk = thirdwebSDKFromSigner(signer, network)

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

export const claimConditionsOptions = {
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
    USDC: ERC20_TOKEN.USDC.chain.polygon.mumbai,
    TESTR: ERC20_TOKEN.TESTR.chain.polygon.mumbai,
  },
}

/**
 * Function to parse timestamp to readable date
 * @param dateString The date object to parse
 * @returns Form input date
 *
 * @example
 * const date = parseDate('Tue Jan 16 2024 13:13:32')
 *  =>  16/01/2024 13:13
 */
function parseTimestampToDate(ts: number) {
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
 * Function to parse `Date` string
 * @param dateString The date object to parse
 * @returns Form input date
 *
 * @example
 * const date = parseDate('Tue Jan 16 2024 13:13:32')
 *  =>  // '2024-01-16T13:13'
 */
function parseDate(dateString: Date) {
  const d = new Date(dateString)

  const hour = d.getHours()
  const minutes = d.getMinutes()
  const date = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()

  const dd = date > 10 ? date : `0${date}`
  const mm = month > 10 ? month : `0${month + 1}`
  const hh = hour > 10 ? hour : `0${hour}`
  const min = minutes > 10 ? minutes : `0${minutes}`

  // '2024-01-16T11:45'
  return `${year}-${mm}-${dd}T${hh}:${min}`
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

/**
 *
 * @param price The price in BigNumber
 * @param decimals The decimals uint
 * @returns Human readable figure
 *
 * @example const res = parseCurrencyDecimals(2500000000000000000, 18)
 * console.log(res) => 2.5
 */
export const parseCurrencyDecimals = (price: number, decimals: number) => {
  if (decimals) {
    return parseInt(price.toString()) / 10 ** decimals
  }
}

/**
 * This functions accepts a ERC20 token address that is contained the
 * `claimConditions.currency` and returns the symbol of the token.
 *
 * @param currencyAddress The contract address to the token
 * @returns The symbol of the token
 *
 *
 * @example const symbol = parseCurrencyAddressToSymbol('0x0245944939948844')
 * console.log(symbol) => USDC
 */
export const parseCurrencyAddressToSymbol = (currencyAddress: string) => {
  return Object.values(claimConditionsOptions.currency).map((d, i) => {
    if (parseInt(d) == parseInt(currencyAddress)) {
      return Object.keys(claimConditionsOptions.currency)[i]
    }
  })
}

export const date = {
  parseDate,
  parseTimestampToDate,
}
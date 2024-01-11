import { NetworkInput, ThirdwebSDK } from '@thirdweb-dev/react'
import { THIRDWEB_API_KEY } from './config'

export const thirdwebSDK = (network: NetworkInput) =>
  new ThirdwebSDK(network, {
    clientId: THIRDWEB_API_KEY,
  })

// export function thirdwebSdkWithSigner(signer: Signer, network: ChainOrRpcUrl | undefined) {
//   return ThirdwebSDK.fromSigner(signer, network, {
//     clientId: THIRDWEB_API_KEY,
//   })
// }

export const salesClaimPhase = {
  'Select phase': '',
  'Phase 1': 'Phase 1',
}

export const waitInSecondsClaimConditionsOptions = {
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

type LocalStateArgs = {
  key: string
  value: string
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
  set: ({ key, value }: LocalStateArgs) => {
    const res = windowStorage.get(key)
    if (res) {
      throw Error('Key already in use; try another key name')
    } else {
      if (typeof value == 'object') {
        throw Error('Value needs to be stringified')
      } else {
        localStorage.setItem(key, value)
      }
    }
  },
  /**
   *
   * @param key This represent the name to the item to retrieve
   * @returns item saved
   */
  get: (key: string) => {
    const exists = localStorage.getItem(key)
    if (exists) {
      return exists
    } else {
      // throw Error('Key not found!')
      console.log('Key not found!')
    }
  },
}

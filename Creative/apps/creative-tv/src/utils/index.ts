import { ChainOrRpcUrl, NetworkInput, ThirdwebSDK} from '@thirdweb-dev/react'
import { THIRDWEB_API_KEY } from './config'
import { Signer } from 'ethers'


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

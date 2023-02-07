import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { polygon } from '@wagmi/chains'
import request from 'graphql-request'
import gql from 'graphql-tag'

const UNLOCK_API_URL = 'https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2'
const UNLOCK_QUERY_HOLDS_KEY = gql`
  query keysForLock($lockAddress: String!, $walletAddress: String!) {
    keys(where: { lock: $lockAddress, owner: $walletAddress }) {
      id
      owner
      expiration
      cancelled
    }
  }
`

interface UnlockKey {
  id: string
  owner: string
  expiration: string
  cancelled: boolean
}

interface Props {
  lockAddress: string
  walletAddress?: string
  redirectTo?: string
}

const useLock = ({ lockAddress, walletAddress = '', redirectTo }: Props) => {
  const [checkoutHref, setCheckoutHref] = useState<string>('')
  const { isLoading, data, refetch } = useQuery<{ keys: UnlockKey[] }>({
    initialData: { keys: [] },
    queryKey: [lockAddress, walletAddress],
    queryFn: () => request(UNLOCK_API_URL, UNLOCK_QUERY_HOLDS_KEY, { lockAddress, walletAddress }),
  })

  useEffect(() => {
    const url = new URL('https://app.unlock-protocol.com/checkout')
    const paywallConfig = {
      locks: { [lockAddress]: { network: polygon.id } },
      skipRecipient: true,
      pessimistic: true,
    }
    url.searchParams.set('paywallConfig', JSON.stringify(paywallConfig))
    if (redirectTo) url.searchParams.set('redirectTo', redirectTo)
    setCheckoutHref(url.href)
  }, [])

  return {
    status: isLoading ? 'pending' : data.keys[0] && !data.keys[0].cancelled ? 'unlocked' : 'locked',
    checkoutHref,
    refetch,
  }
}

export default useLock

import React from 'react'
import { Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import useLock from 'hooks/useLock'
import { useAccount } from 'wagmi'
import { LOCK_ADDRESS_CREATIVE_TV } from 'utils/config'

export default function TokenGate() {
  const { address } = useAccount()
  const lock = useLock({ lockAddress: LOCK_ADDRESS_CREATIVE_TV, walletAddress: address })

  return (
    <div>
      <NextSeo title="Token Gate Example" />
      <Heading as="h2" fontSize="2xl" my={4}>
        Token Gate Example
      </Heading>
      {lock.status !== 'unlocked' ? (
        <>
          <p>Unlock Demo is currently locked 🔒</p>
          <a href={lock.checkoutHref}>Unlock!</a>
        </>
      ) : (
        <p className="unlock-content unlocked">Unlock Demo unlocked 🎉</p>
      )}
    </div>
  )
}

import React from 'react'
import { Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import useLock from 'hooks/useLock'
import { useAccount } from 'wagmi'

export const LOCK_ADDRESS_CREATIVE_TV = '0xb9c69af58109927cc2dcce8043f82158f7b96ca7'

export default function TokenGateExample() {
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

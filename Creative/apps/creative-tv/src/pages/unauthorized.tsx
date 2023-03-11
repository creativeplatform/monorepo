import React from 'react'
import { NextSeo } from 'next-seo'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { HOST, SITE_LOGO } from 'utils/config'

export default function Unauthorized() {
  const url = new URL('https://app.unlock-protocol.com/checkout')
  const paywallConfig = {
    locks: {
      '0xe174caa294999ec622988242641a27c11e6c22d8': { network: 137, name: 'CRTV+FAN', skipRecipient: true },
      '0xb9c69af58109927cc2dcce8043f82158f7b96ca7': { network: 137, name: 'CRTV+CREATOR' },
      '0xb311afe316b004dbf569381ae174eaa897b757f6': { network: 137, name: 'CRTV+BRAND' },
    },
    pessimistic: true,
    skipRecipient: true,
    title: 'CREATIVE+Memberships',
    icon: SITE_LOGO,
    persistentCheckout: false,
    referrer: '0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260',
    messageToSign: '',
    hideSoldOut: false,
    redirectUri: `${ HOST }/discover`,
  }
  url.searchParams.append('paywallConfig', JSON.stringify(paywallConfig))
  url.searchParams.append('redirectTo', HOST )

  return (
    <>
      <NextSeo title="Unauthorized" />
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={'red.500'}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center">
            <CloseIcon boxSize={'20px'} color={'white'} />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          You don't have access
        </Heading>
        <a href={url.href}>Get Access</a>
      </Box>
    </>
  )
}

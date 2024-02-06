import React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb, Box, Heading, Flex, Text } from '@chakra-ui/react'
import { useAddress } from '@thirdweb-dev/react'
import AllAssets from '../../components/AllAssets'
import SignIn from '../../components/SignIn'

export default function Discover() {
  const router = useRouter()
  const address = useAddress()

  return (
    <>
      <NextSeo title="Discover" />
      <Box p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}><span role="img" aria-label="home">🏠</span> Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Explore</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box>
      <Heading mb={10}>Explore Content</Heading>
      {!address ? (
        <Flex flexDirection="column" my={10} gap={5} maxW="md">
          <Text>Sign in to see uploaded content.</Text>
          <Box w="50%">
            <SignIn btnTitle={'Sign In'} />
          </Box>
        </Flex>
      ):(
        <>
        <AllAssets />
        </>
      )}
      </Box>
    </>
  )
}

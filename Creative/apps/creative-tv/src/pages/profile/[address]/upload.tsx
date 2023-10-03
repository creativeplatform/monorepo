import React, { useMemo } from 'react'
import { useAddress, ConnectWallet } from '@thirdweb-dev/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, Flex, Text, Box } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import UploadVideoAsset from '../../../components/UploadVideoAsset'

const Upload: NextPage = () => {
  const router = useRouter()
  const address = useAddress()
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])

  return (
    <>
      <NextSeo title="Video Upload" />
      <Container maxW={'1200px'}>
        <Breadcrumb mt={10}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Upload Video Assets</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt={10}>Upload Video Content</Heading>
        {!address ? (
          <Flex flexDirection="column" my={10} gap={5} maxW="md">
          <Text>Sign in to upload your video content 🧐</Text>
          <Box w="50%">
            <ConnectWallet btnTitle={'Sign In'} />
          </Box>
        </Flex>
        ): (
          <>
            <UploadVideoAsset />
          </>
        )}
        
      </Container>
    </>
  )
}

export default Upload;
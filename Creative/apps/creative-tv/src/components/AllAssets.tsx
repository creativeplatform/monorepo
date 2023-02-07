import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { useAsset } from '@livepeer/react'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Box,
  SimpleGrid,
  AspectRatio,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fetchAssets } from 'utils/fetchers/assets'
import { LivepeerConfig } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'

interface HeaderProps {
  children: ReactNode
}

export const AllAssets = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  const { isLoading, isError, isSuccess, data, status, error } = useQuery([''], fetchAssets, { staleTime: 3000 })

  if (isLoading) {
    console.log('loading...')
    return <div>Loading...</div>
  }

  if (isError) {
    console.log('error', error)
    return <div>Error:</div>
  }

  if (isSuccess) {
    console.log('data', data)
  }
  return (
    <LivepeerConfig client={useLivepeerClient}>
      <Box>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {data.slice(0, data.length).map((video, index) => (
            <Card key={video.id}>
              <CardBody>
                <AspectRatio maxW="560px" ratio={1}>
                  <iframe title={video.name} src={video.downloadUrl} allowFullScreen />
                </AspectRatio>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{video.name}</Heading>
                </Stack>
                {video?.status === 'ready' ? <Badge colorScheme="green">{video?.status}</Badge> : <Badge colorScheme="red">{video?.status}</Badge>}
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2" className="assets-btn-group">
                  {video?.status === 'ready' ? (
                    <Button
                      onClick={() => router.push(`/pages/mint-nft-video?assetId=${video.id}`)}
                      className="card-mint-button"
                      as={motion.div}
                      _hover={{ transform: 'scale(1.1)' }}>
                      Update Asset
                    </Button>
                  ) : (
                    <Button disabled className="card-mint-button">
                      Update Asset
                    </Button>
                  )}
                  {video?.status === 'ready' ? (
                    <Button
                      onClick={() => router.push(`/pages/mint-nft-video?assetId=${video.id}`)}
                      className="card-mint-button"
                      as={motion.div}
                      _hover={{ transform: 'scale(1.1)' }}>
                      Mint NFT
                    </Button>
                  ) : (
                    <Button disabled className="card-mint-button">
                      Mint NFT
                    </Button>
                  )}
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </LivepeerConfig>
  )
}
export default AllAssets

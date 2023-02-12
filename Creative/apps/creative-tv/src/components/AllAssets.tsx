import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Box, SimpleGrid, AspectRatio, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LivepeerConfig } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { Video } from 'utils/fetchers/assets'

export const AllAssets = (): JSX.Element => {
  const router = useRouter()
  const { isLoading, isError, data, error } = useQuery<Video[]>([''], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (isLoading) {
    console.log('loading...')
    return <div>Loading...</div>
  }

  if (isError) {
    console.log('error', error)
    return <div>Error:</div>
  }

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <Box>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {data.map((video) => (
            <Card key={video.id}>
              <CardBody>
                <AspectRatio maxW="560px" ratio={1}>
                  <iframe title={video.name} src={video.downloadUrl} allowFullScreen />
                </AspectRatio>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{video.name}</Heading>
                </Stack>
                <Badge colorScheme={video.status.phase === 'ready' ? 'green' : 'red'}>{video.status.phase}</Badge>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2" className="assets-btn-group">
                  {video.status.phase === 'ready' ? (
                    <>
                      <Button
                        onClick={() => router.push(`/pages/mint-nft-video?assetId=${video.id}`)}
                        className="card-mint-button"
                        as={motion.div}
                        _hover={{ transform: 'scale(1.1)' }}>
                        Update Asset
                      </Button>
                      <Button
                        onClick={() => router.push(`/pages/mint-nft-video?assetId=${video.id}`)}
                        className="card-mint-button"
                        as={motion.div}
                        _hover={{ transform: 'scale(1.1)' }}>
                        Mint NFT
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button disabled className="card-mint-button">
                        Update Asset
                      </Button>
                      <Button disabled className="card-mint-button">
                        Mint NFT
                      </Button>
                    </>
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

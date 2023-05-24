import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Box, SimpleGrid, Badge, CardHeader, Flex, Avatar, Text, Image } from '@chakra-ui/react'
import { DownloadIcon, ChatIcon, CheckIcon, CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { LivepeerConfig, Player } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { assetData } from 'utils/fetchers/assets'
import { SITE_LOGO } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'

const PosterImage = () => {
  return <Image  src={`${CREATIVE_LOGO_WHT}`} width={250} height={250} objectFit="contain" alt="Creative Logo" />
}

export default function AllAssets() {
  const router = useRouter()
  const videos = useQuery<assetData["video"][]>([''], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (videos.isLoading) {
    console.log('loading...')
    // loading state
    return <Box>Loading...</Box>
  }

  if (videos.isError) {
    console.log('error', videos.error)
    return <Box children='error' />
  }

  const readyVideos = videos.data.filter(
    (video): video is assetData["video"] => video.status.phase === 'ready'
  );

  return (
  <LivepeerConfig client={useLivepeerClient}>
      <SimpleGrid spacing={4} minChildWidth={350}>
        {readyVideos.map((video) => (
          <Card
            key={video.id}
            maxW='md'
            variant={"elevated"}>
            <CardHeader>
              <Flex>
                <Flex flex={1} gap={4} align="center" flexWrap={'wrap'}>
                  <Avatar name='creative' src={SITE_LOGO} />
                  <Box>
                    <Heading size='sm'>thecreative.eth</Heading>
                    <Text>Creator</Text>
                  </Box>
                </Flex>
              </Flex>
              </CardHeader>
              <>
            <Player 
                title={video.name}
                playbackId={video.playbackId}
                showTitle
                poster={<PosterImage />}
                showLoadingSpinner
                controls={{ autohide: 500, hotkeys: false }}
                autoPlay
                muted
                aspectRatio='16to9'
                showPipButton
                autoUrlUpload={{fallback: true, ipfsGateway: 'https://w3s.link'}}
                theme={{
                  borderStyles: {
                    containerBorderStyle: 'solid',
                  },
                  colors: {
                    accent: '#EC407A',
                  },
                  space: {
                    controlsBottomMarginX: '10px',
                    controlsBottomMarginY: '5px',
                    controlsTopMarginX: '15px',
                    controlsTopMarginY: '10px',
                  },
                  radii: {
                    containerBorderRadius: '0px',
                  },
                }}
                />
            </>
              <CardBody>
                <Badge colorScheme={video.status.phase === 'ready' ? 'green' : 'red'}>{video.status.phase}</Badge>
                <Stack mt="6" spacing="3">
                  <Heading size={'md'}>{video.name.slice(0, -4)}</Heading>
                  <Text>
                    With Creative TV, I wanted to sync the speed of creation with the speed
                    of design. I wanted the creator to be just as excited as the designer to
                    create new content.
                  </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter
              justify='space-between'
              flexWrap='wrap'
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
            {video.status.phase === 'ready' ? (
              <>
              <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                Comment
              </Button>
              <Button flex='1' variant='ghost' leftIcon={<LinkIcon />}>
                Share
              </Button>
              <Button 
                backgroundColor={'#EC407A'}
                onClick={() => router.push(`/mint-nft-video?assetId=${video.id}`)}
                className="card-mint-button"
                as={motion.div}
                _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                flex='1' 
                variant='ghost' 
                leftIcon={<DownloadIcon />}>
                Collect
              </Button>
              </>
              ) : (
              <>
                <Button 
                  flex='1' 
                  disabled 
                  variant='ghost' 
                  leftIcon={<ChatIcon />}>
                  Comment
                </Button>
                <Button 
                  flex='1'
                  disabled 
                  variant='ghost' 
                  leftIcon={<LinkIcon />}
                  >
                  Share
                </Button>
                <Button
                  leftIcon={<DownloadIcon />}
                  backgroundColor={'#EC407A'}
                  disabled 
                  className="card-mint-button"
                  as={motion.div}
                  _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                  flex='1' 
                  variant='ghost' 
                >
                  Collect
                </Button>
              </>
              )}
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
  </LivepeerConfig>
  )
}

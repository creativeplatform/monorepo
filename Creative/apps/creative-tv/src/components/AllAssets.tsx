import { ChatIcon, DownloadIcon, LinkIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LivepeerConfig, Player } from '@livepeer/react'
import { useQuery } from '@tanstack/react-query'
import { useAddress } from '@thirdweb-dev/react'
import { motion } from 'framer-motion'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { useRouter } from 'next/router'
import { SITE_LOGO } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import { AssetData } from 'utils/fetchers/assets'
// import { Discussion } from "@orbisclub/components";
// import "@orbisclub/components/dist/index.modern.css";

type ApiResponse<TData> = { data?: TData; errors?: any[] }

const PosterImage = () => {
  return (
    <Image src={`${CREATIVE_LOGO_WHT}`} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
  )
}

export default function AllAssets() {
  const router = useRouter()
  const connectedAddress = useAddress()
  const videosQuery = useQuery<ApiResponse<AssetData['video'][]>>(['allVideos'], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (videosQuery.isLoading) {
    console.log('loading...')
    // loading state
    return <Box mb={24}>Loading...</Box>
  }

  if (videosQuery.isError || videosQuery.data.errors) {
    console.log('error', videosQuery.error)
    return <Box children="Error loading resource." mb={24} />
  }

  const readyVideos =
    videosQuery.data.data?.filter((video): video is AssetData['video'] => {
      return (
        video.status.phase === 'ready' &&
        Number(video.storage?.ipfs?.spec?.nftMetadata?.assetData?.properties?.pricePerNFT) > 0 &&
        video.creatorId?.value != connectedAddress
      )
    }) ?? []

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <SimpleGrid spacing={4} minChildWidth={350} mb={12}>
        {readyVideos.map((video) => {
          return (
            <Card key={video.id} maxW="md" variant={'elevated'} mb={12}>
              <CardHeader>
                <Flex>
                  <Flex flex={1} gap={4} align="center" flexWrap={'wrap'}>
                    <Avatar name="creative" src={SITE_LOGO} />
                    <Box>
                      <Heading size="sm">thecreative.eth</Heading>
                      <Text>Creator</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <>
                <Player
                  title={video?.name}
                  playbackId={video?.playbackId}
                  showTitle
                  poster={<PosterImage />}
                  showLoadingSpinner
                  controls={{ autohide: 500, hotkeys: false }}
                  aspectRatio="16to9"
                  showPipButton
                  autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
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
                <Flex>
                  <Badge colorScheme={video?.status.phase === 'ready' ? 'green' : 'red'}>{video?.status.phase}</Badge>
                  <Spacer />
                  <Text>Views: {video?.viewCount.toString()}</Text> {/* Displaying the view count */}
                </Flex>
                <Stack mt="6" spacing="3">
                  <HStack>
                    <Heading>{video?.name}</Heading>
                    <Spacer />
                    <Text fontSize="1.5em" fontWeight={'medium'}>
                      ${video.storage?.ipfs?.spec?.nftMetadata?.assetData?.properties?.pricePerNFT}
                    </Text>
                  </HStack>
                  <Text>
                    {/* {video.storage?.ipfs.spec.nftMetadata.description} */}
                    With Creative TV, we wanted to sync the speed of creation with the speed of design. We wanted the creator to be just as excited as
                    the designer to create new content.
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}>
                {video.status.phase === 'ready' ? (
                  <>
                    <ButtonGroup mb={5} spacing={10}>
                      <Button
                        as={motion.div}
                        _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                        flex="1"
                        variant="ghost"
                        leftIcon={<ChatIcon />}
                        onClick={() => router.push(`discover/${encodeURIComponent(video?.id)}`)}>
                        Comment
                      </Button>
                      <Button
                        as={motion.div}
                        _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                        flex="1"
                        variant="ghost"
                        leftIcon={<LinkIcon />}>
                        Share
                      </Button>
                      <Button
                        backgroundColor={'#EC407A'}
                        onClick={() =>
                          router.push({
                            pathname: `discover/mint-nft`,
                            query: {
                              assetData: JSON.stringify(video),
                            },
                          })
                        }
                        className="card-mint-button"
                        as={motion.div}
                        _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                        flex="1"
                        variant="ghost"
                        leftIcon={<DownloadIcon />}>
                        Collect
                      </Button>
                    </ButtonGroup>
                  </>
                ) : (
                  <>{''}</>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </SimpleGrid>
    </LivepeerConfig>
  )
}

import { Box, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import { useQuery } from '@tanstack/react-query'
import { useAddress } from '@thirdweb-dev/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { globalTheme } from 'utils/config'
import { AssetData } from 'utils/fetchers/assets'
import VideoCard from './VideoCard'
// import { Discussion } from "@orbisclub/components";
// import "@orbisclub/components/dist/index.modern.css";

type ApiResponse<TData> = { data?: TData; errors?: any[] }

export default function AllAssets() {
  const connectedAddress = useAddress()
  const videosQuery = useQuery<ApiResponse<AssetData['video'][]>>(['allVideos'], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (videosQuery?.isLoading) {
    return (
      <VStack spacing={0} alignItems={'flex-start'} my={4}>
        <Spinner my={12} alignSelf={'center'} size="md" thickness="3px" speed="0.5s" emptyColor="gray.200" color={globalTheme?.colors.primary} />
      </VStack>
    )
  }

  if (videosQuery?.isError || videosQuery?.data.errors) {
    console.error('videosQueryError', videosQuery?.error)
    return <Box children="Error loading resource." mb={24} />
  }

  if (videosQuery?.data?.data === undefined) {
    return <Box children="Error loading resource." mb={24} />
  }

  const readyVideos =
    videosQuery?.data?.data?.filter((video): video is AssetData['video'] => {
      return (
        video?.status?.phase === 'ready' &&
        Number(video.storage?.ipfs?.spec?.nftMetadata?.properties?.pricePerNFT) > 0 &&
        video.creatorId?.value != connectedAddress
      )
    }) ?? []

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <SimpleGrid spacing={4} minChildWidth={350} mb={12}>
        {readyVideos && readyVideos?.length > 0 ? (
          readyVideos?.map((video) => {
            return <VideoCard key={video?.id} video={video} />
          })
        ) : (
          <Box
            style={{
              textAlign: 'center',
              width: '50%',
              margin: 'auto',
              padding: '8px',
            }}>
            <Text>No video at the moment!</Text>
          </Box>
        )}
      </SimpleGrid>
    </LivepeerConfig>
  )
}
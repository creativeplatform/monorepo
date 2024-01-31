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
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LivepeerConfig, Player } from '@livepeer/react'
import { useQuery } from '@tanstack/react-query'
import { useAddress } from '@thirdweb-dev/react'
import { motion } from 'framer-motion'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { useRouter } from 'next/router'
import { SITE_LOGO, globalTheme } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import { AssetData } from 'utils/fetchers/assets'
import VideoCard from './VideoCard'
import { logger } from 'utils/helpers'
import { PosterImage } from './PosterImage'
// import { Discussion } from "@orbisclub/components";
// import "@orbisclub/components/dist/index.modern.css";

type ApiResponse<TData> = { data?: TData; errors?: any[] }

export default function AllAssets() {

  const connectedAddress = useAddress()
  const videosQuery = useQuery<ApiResponse<AssetData['video'][]>>(['allVideos'], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (videosQuery.isLoading) {
    return (
      <VStack spacing={0} alignItems={'flex-start'} my={4}>
        <Spinner my={12} alignSelf={'center'} size="md" thickness="3px" speed="0.5s" emptyColor="gray.200" color={globalTheme.colors.primary} />
      </VStack>
    )
  }

  if (videosQuery.isError || videosQuery.data.errors) {
    logger({ title: 'videosQueryError', description: videosQuery.error, type: 'error' })
    return <Box children="Error loading resource." mb={24} />
  }

  const readyVideos =
    videosQuery.data.data?.filter((video): video is AssetData['video'] => {
      return (
        video.status.phase === 'ready' &&
        Number(video.storage?.ipfs.spec.nftMetadata.properties.pricePerNFT) > 0 &&
        video.creatorId?.value != connectedAddress
      )
    }) ?? []

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <SimpleGrid spacing={4} minChildWidth={350} mb={12}>
        {readyVideos.map((video) => {
          return <VideoCard key={video.id} video={video} />
        })}
      </SimpleGrid>
    </LivepeerConfig>
  )
}

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { NextSeo } from 'next-seo'
import { LivepeerConfig, Player } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { assetData, fetchAssetId } from 'utils/fetchers/assets'
import { SITE_LOGO } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Input,
    useToast,
    Image,
    ButtonGroup,
    IconButton,
    Link,
    BreadcrumbItem, 
    BreadcrumbLink, 
    Breadcrumb,
} from '@chakra-ui/react'
import{ Emoji } from 'ui'
import {
    useAddress,
    useContract,
    useOwnedNFTs,
    useNFTBalance,
    useContractWrite,
} from '@thirdweb-dev/react'

const PosterImage = () => {
    return <Image src={`${CREATIVE_LOGO_WHT}`} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
}


const VideoPage = () => {
    const router = useRouter()
    const { query: { playbackId } } = router;
    const address = useAddress()
    const toast = useToast()
    const { id } = router.query; // Access the video ID from the router's query object
    const videoQuery = useQuery<assetData['video'][]>(['assetId', playbackId], fetchAssetId, {
        staleTime: 3000,
      });
    
      if (videoQuery.isLoading) {
        console.log('loading...')
        // loading state
        return <Box>Loading...</Box>
      }
    
      if (videoQuery.isError || !videoQuery.data) {
        toast({
          title: 'Error',
          description: 'Failed to fetch video data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return <Box>Error fetching video data</Box>;
      }
      

  const videoData = videoQuery.data[0]; // Access the fetched video data

    return (
        <LivepeerConfig client={useLivepeerClient}>
            <NextSeo title="" />
            <Container maxW={"1200px"} mt={10}>
                <Button colorScheme={'blue'} onClick={() => router.push("/discover")}>Back</Button>
                <Box mt={10}>
                    <Player
                        title={videoData?.name}
                        playbackId={videoData?.playbackId}
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
                </Box>
            </Container>
        </LivepeerConfig>
    )
}

export default VideoPage;
import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { LivepeerConfig, Player, useAsset } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import {
    Box,
    Button,
    Container,
    useToast,
    Image,
} from '@chakra-ui/react'
import {
    useAddress,
} from '@thirdweb-dev/react'

const PosterImage = () => {
    return <Image src={`${CREATIVE_LOGO_WHT}`} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
}


const VideoPage = () => {
    const router = useRouter()
    const address = useAddress()
    const toast = useToast()
    // Extract the assetId from the router's query parameters
    const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])

    // Fetch the asset data using the useAsset hook
    const { data: asset, isLoading: assetLoading, isError: assetError } = useAsset({
        assetId,
        enabled: assetId?.length === 36,
        refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
    })
    
    // Check if the asset data is still loading
    if (assetLoading) {
        // Render loading state
        return <Box>Loading asset data...</Box>
    }
    
    // Check if there was an error fetching the asset data
    if (assetError) {
        // Render error state
        return <Box>Error fetching asset data</Box>
    }

    return (
        <>
            <NextSeo title="" />
            <Container maxW={"1200px"} mt={10}>
                <Button colorScheme={'blue'} onClick={() => router.push("/discover")}>Back</Button>
                <Box mt={10}>
                    <Player
                        title={asset?.name}
                        playbackId={asset?.playbackId}
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
        </>
    )
}

export default VideoPage;
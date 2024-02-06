import { Box, createIcon, Heading, Stack, Text } from "@chakra-ui/react"
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Provider, Carousel, LeftButton, RightButton, } from "chakra-ui-carousel"
import { LivepeerConfig, Player } from '@livepeer/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import { CAROUSEL_PLAYLISTS } from 'utils/config'
import { CREATIVE_LOGO_WHT, HEADING_1, GOVERN_DESC } from "utils/context"

export const PosterImage = () => {
    return (
      <Image
        src={ CREATIVE_LOGO_WHT }
        fill
        style={{ objectFit: "contain" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="Creative Logo"
        priority
      />
    )
}

export default function CarouselComponent() {
    return (
        <LivepeerConfig client={useLivepeerClient}>
                <Stack align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: 'column', md: 'column' }}>
                    <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '3xl', lg: '5xl' }} mb={4}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: '#EE774D',
                            zIndex: -1,
                            }}>
                            {HEADING_1}
                        </Text>
                    </Heading>
                    <Text color={'gray.500'} textAlign={'center'}>{GOVERN_DESC}</Text>
                </Stack>
                <Provider>
                    <Carousel gap={50}>
                        <Box position={'relative'} height={'280px'} rounded={'2xl'} boxShadow={'2xl'} width={'auto'} overflow={'hidden'}>
                            <Player
                                title={CAROUSEL_PLAYLISTS[0].name_1}
                                playbackId={CAROUSEL_PLAYLISTS[0].playbackId_1}
                                poster={<PosterImage />}
                                showTitle={true}
                                aspectRatio="1to1"
                                autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
                                showUploadingIndicator={true}
                                controls={{
                                autohide: 3000,
                                hotkeys: true
                                }}
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
                        <Box position={'relative'} height={'280px'} rounded={'2xl'} boxShadow={'2xl'} width={'auto'} overflow={'hidden'}>
                            <Player
                                title={CAROUSEL_PLAYLISTS[0].name_2}
                                playbackId={CAROUSEL_PLAYLISTS[0].playbackId_2}
                                poster={<PosterImage />}
                                showTitle={true}
                                aspectRatio="1to1"
                                autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
                                showUploadingIndicator={true}
                                controls={{
                                autohide: 3000,
                                hotkeys: true
                                }}
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
                        <Box position={'relative'} height={'280px'} rounded={'2xl'} boxShadow={'2xl'} width={'auto'} overflow={'hidden'}>
                            <Player
                                title={CAROUSEL_PLAYLISTS[0].name_3}
                                playbackId={CAROUSEL_PLAYLISTS[0].playbackId_3}
                                poster={<PosterImage />}
                                showTitle={true}
                                aspectRatio="1to1"
                                autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
                                showUploadingIndicator={true}
                                controls={{
                                autohide: 3000,
                                hotkeys: true
                                }}
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
                        <Box position={'relative'} height={'280px'} rounded={'2xl'} boxShadow={'2xl'} width={'auto'} overflow={'hidden'}>
                            <Player
                                title={CAROUSEL_PLAYLISTS[0].name_4}
                                playbackId={CAROUSEL_PLAYLISTS[0].playbackId_4}
                                poster={<PosterImage />}
                                showTitle={true}
                                aspectRatio="1to1"
                                autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
                                showUploadingIndicator={true}
                                controls={{
                                autohide: 3000,
                                hotkeys: true
                                }}
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
                    </Carousel>
                    {/* TODO: CREATE NEW SHARED SLIDER COMPONENTS */}
                    {/* <LeftButton
                        bgColor="#EC407A"
                        customIcon={<ArrowLeftIcon />}
                        textColor={"white.500"}
                        style={{ position: 'relative', top: '0', left: '25rem', transform: 'translateY(-50%)' }}
                        display={{ sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
                    />
                    <RightButton 
                        bgColor="#FACB80" 
                        customIcon={<ArrowRightIcon />} 
                        style={{ position: 'relative', left: '30rem', transform: 'translateY(-150%)' }}
                        display={{  sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} 
                    /> */}
                </Provider>
        </LivepeerConfig>
    );
}
const PlayIcon = createIcon({
    displayName: 'PlayIcon',
    viewBox: '0 0 58 58',
    d: 'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
})
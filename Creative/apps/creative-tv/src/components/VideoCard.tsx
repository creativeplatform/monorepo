import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Flex, Avatar, Box, Stack, HStack, Divider, Button, Badge, Spacer, ButtonGroup } from '@chakra-ui/react';
import { Player } from '@livepeer/react';
import { useRouter } from 'next/router'
import { PosterImage } from './PosterImage';
import { AssetData } from 'utils/fetchers/assets';
import { SITE_LOGO } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import { DownloadIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

interface VideoCardProps {
    video: AssetData['video'];
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const router = useRouter()
    return(
        <Card key={video.id} maxW="md" variant={'elevated'} mb={12}>
            <CardHeader>
            <Flex>
                <Flex flex={1} gap={4} align="center" flexWrap={'wrap'}>
                <Avatar name="creative" src={SITE_LOGO} />
                <Box>
                    <Heading size="sm">{video?.creatorId[0]}</Heading>
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
                    poster={<PosterImage alt="Creative logo" imgSrc={`${CREATIVE_LOGO_WHT}`} />}
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
                <Badge colorScheme={video?.status?.phase === 'ready' ? 'green' : 'red'}>{video?.status?.phase}</Badge>
                <Spacer />
                <Text>Views: {video?.viewCount.toString()}</Text> {/* Displaying the view count */}
            </Flex>
            <Stack mt="6" spacing="3">
                <HStack>
                <Heading>{video?.name}</Heading>
                <Spacer />
                <Text fontSize="1.5em" fontWeight='bold'>
                    {video?.storage?.ipfs?.spec?.nftMetadata?.properties?.pricePerNFT}<span style={{fontSize:'sm'}}> REP</span>
                </Text>
                </HStack>
                <Text>
                {video?.storage?.ipfs?.spec?.nftMetadata?.description ||
                    'With Creative TV, we wanted to sync the speed of creation with the speed of design. We wanted the creator to be just as excited as                    the designer to create new content.'}
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
            {video?.status?.phase === 'ready' ? (
                <>
                <ButtonGroup mb={5} spacing={10}>
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
    
}

export default VideoCard;
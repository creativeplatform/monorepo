import React, { useMemo } from 'react';
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    Text, 
    Flex, 
    Avatar, 
    Box, 
    Stack, 
    HStack, 
    Divider, 
    Button, 
    Badge, 
    Spacer, 
    ButtonGroup 
} from '@chakra-ui/react';
import { Player } from '@livepeer/react';
import { useRouter } from 'next/router'
import { PosterImage } from './PosterImage';
import { ethers } from 'ethers'
import { useActiveClaimConditionForWallet, useAddress, useContract } from '@thirdweb-dev/react'
import { AssetData } from 'utils/fetchers/assets';
import { SITE_LOGO } from 'utils/config'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import { DownloadIcon, LinkIcon, ChatIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

interface VideoCardProps {
    video: AssetData['video'];
}

const contractAddress = '0x914B872Ce6Da4cc7523B768a3cef8b472F2d2511' // TODO: get contractAddress from metadata
const tokenId = 0 // TODO: get tokenId from metadata

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const { data: nftContract } = useContract(contractAddress)
  const address = useAddress()
  const router = useRouter()

  const activeClaimCondition = useActiveClaimConditionForWallet(nftContract, address, tokenId)

  // This returns the same price for all the Videos.
//   const pricePerNFT = useMemo(() => {
//     const bnPrice = ethers.BigNumber.from(activeClaimCondition.data?.currencyMetadata.value || 0)
//     return (
//       <>
//         {ethers.utils.formatUnits(bnPrice, activeClaimCondition.data?.currencyMetadata.decimals || 18)}
//         <span style={{ fontSize: 'sm' }}> {activeClaimCondition.data?.currencyMetadata.symbol}</span>
//       </>
//     )
//   }, [
//     activeClaimCondition.data?.currencyMetadata.decimals,
//     activeClaimCondition.data?.currencyMetadata.symbol,
//     activeClaimCondition.data?.currencyMetadata.value,
//   ])

    return(
        <Card key={video.id} maxW="md" variant={'elevated'} mb={12}>
            <CardHeader>
            <Flex>
                <Flex flex={1} gap={4} align="center" flexWrap={'wrap'}>
                <Avatar name="creative" src={SITE_LOGO} />
                <Box>
                    <Heading as={'h4'} size="sm">thecreative.eth</Heading>
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
                <Heading as={"h1"} size={"lg"}>{video?.name}</Heading>
                <Spacer />
                <Text color={'brand.300'} fontSize={'xl'}>
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
    
}

export default VideoCard;
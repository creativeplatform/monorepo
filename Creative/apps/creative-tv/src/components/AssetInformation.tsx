import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'
import { useCallback, useMemo, useState } from 'react'
import { 
    Box, 
    Text, 
    Badge, 
    Button,
     HStack, 
    Progress, 
    Input, 
    Textarea 
} from '@chakra-ui/react'
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps
} from '@chakra-ui/stepper'

import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import VideoPreview from './VideoPreview'
import Dropzone from './Dropzone'

interface AssetData {
    title: string;
    description: string;
    animation_url: string;
    external_url: string;
    image_url: string;
    properties: {
      playbackId: string;
      videoIpfs: string;
    };
  }

  // AssetInformation component
  const AssetInformation = ({ asset, assetData }: { asset: any; assetData: AssetData }) => (
    <HStack spacing={'10px'}>
      <Box>Asset Name: {asset?.[0]?.name}</Box>
      <Box>Playback URL: {asset?.[0]?.playbackUrl}</Box>
      <Box>IPFS CID: {asset?.[0]?.storage?.ipfs?.cid ?? 'None'}</Box>
      <Box>Title: {assetData.title}</Box>
      <Box>Description: {assetData.description}</Box>
    </HStack>
  )


const CreateAndViewAsset = () => {
  const [video, setVideo] = useState<File | undefined>()
  const [assetData, setAssetData] = useState<AssetData>({
    title: '',
    description: '',
    animation_url: '',
    external_url: '',
    image_url: '',
    properties: {
      playbackId: '',
      videoIpfs: '',
    },
  })

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: 3,
  });

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video, data: assetData }] as const,
        }
      : null
  )

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0]?.id,
    refetchInterval: 30000,
  })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])

  const isLoading = useMemo(
    () => status === 'loading' || (asset?.[0] && asset[0]?.status?.phase !== 'ready'),
    [status, asset]
  )

  const progressFormatted = useMemo(() => {
    if (progress?.[0]?.phase === 'failed') {
      return 'Failed to process video.'
    } else if (progress?.[0]?.phase === 'waiting') {
      return 'Waiting...'
    } else if (progress?.[0]?.phase === 'uploading') {
      return (
        <Box>
          Uploading:
          <Progress hasStripe isAnimated colorScheme='#EC407A' value={Math.round(progress?.[0]?.progress * 100)} />
        </Box>
      )
    } else if (progress?.[0]?.phase === 'processing') {
      return `Processing: ${Math.round(progress?.[0]?.progress * 100)}%`
    } else {
      return null
    }
  }, [progress])

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    // Additional logic or handling can be done here
  };

  return (
    <Box>
        <Stepper size='lg' index={activeStep}>
        {Array.from({ length: 3 }, (_, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{`Step ${index + 1}`}</StepTitle>
              <StepDescription>{`Description for Step ${index + 1}`}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {!asset && <Dropzone onDrop={onDrop} />}
      {video && <VideoPreview video={video} />}
      {asset?.[0]?.playbackId && <Player title={asset[0]?.name} playbackId={asset[0]?.playbackId} />}
      <form onSubmit={handleSubmit}></form>
      <Box mb={5}>
        <Input
          placeholder="Title"
          value={assetData.title}
          onChange={(e) => setAssetData((prevData) => ({ ...prevData, title: e.target.value }))}
        />
      </Box>
      <Box mb={5}>
        <Textarea
          placeholder="Description"
          value={assetData.description}
          onChange={(e) => setAssetData((prevData) => ({ ...prevData, description: e.target.value }))}
        />
      </Box>
      <Box className="upload-button">
        <Box>
          {metrics?.metrics?.[0] && <Badge className="views-video">Views: {metrics?.metrics?.[0]?.startViews}</Badge>}
          {video && <Badge className="video-name">{video.name}</Badge>}
          {progressFormatted && <Text className="processing-video">{progressFormatted}</Text>}
        </Box>
        {!asset?.[0]?.id && (
          <Button
            className="upload-button"
            as={motion.div}
            bgColor={'#EC407A'}
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            onClick={createAsset}
            disabled={isLoading || !createAsset}
          >
            Upload Video
          </Button>
        )}
      </Box>
      {asset?.[0]?.playbackId && (
        <Box className="Proceed-button">
          <Button
            onClick={() => router.push(`/mint-nft-video?assetId=${asset[0]?.id}`)}
            className="mint-button"
            bgColor={'#EC407A'}
            as={motion.div}
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
          >
            Proceed to Mint NFT
          </Button>
        </Box>
      )}
      {asset && <AssetInformation asset={asset} assetData={assetData} />}
    </Box>
  )
}

export default CreateAndViewAsset

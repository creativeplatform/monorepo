import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'

import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Box, Text, Badge, Button, HStack, Progress } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

interface AssetData {
  title: string;
  description: string;
  animation_url: string;
  external_url: string;
  image_url: string;
  properties: {
    playbackId: string;
    videoIpfs: string;
  }
}
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
          sources: [{ name: video.name, file: video, data: assetData, }] as const,
        }
      : null
  )
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  })
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4'],
    },
    maxFiles: 1,
    onDrop,
  })
  const isLoading = useMemo(() => status === 'loading' || (asset?.[0] && asset[0].status?.phase !== 'ready'), [status, asset])
  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? (
            <Box>
              {`Uploading:` && <Progress hasStripe isAnimated colorScheme='#EC407A' value={Math.round(progress?.[0]?.progress * 100)} /> }
            </Box>
        )
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  )
  const router = useRouter()
  return (
    <Box>
      {!asset && (
        <Box className="parent-dropZone" w='100%' p={4} border='4px dashed #EC407A' my={5} cursor={'pointer'}>
          <Box className="dropZone" {...getRootProps()}>
            <Box as="input" {...getInputProps()} />
            <Box as="span" className="drag-txt">
              Drag and Drop or Browse Files
            </Box>
          </Box>
          {error?.message && <Text variant="red">{error.message}</Text>}
          {video && (
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                Video Preview:
              </Text>
              <video
                src={URL.createObjectURL(video)}
                controls
                style={{ maxWidth: '100%', marginTop: '8px' }}
              />
            </Box>
          )}
        </Box>
      )}
      {asset?.[0]?.playbackId && <Player title={asset[0].name} playbackId={asset[0].playbackId} />}
      <Box className="upload-button">
        <Box>
          {metrics?.metrics?.[0] && <Badge className="views-video">Views: {metrics?.metrics?.[0]?.startViews}</Badge>}
          {video ? <Badge className="video-name">{video.name}</Badge> : <Box></Box>}
          {progressFormatted && <Text className="processing-video">{progressFormatted}</Text>}
        </Box>
        {!asset?.[0].id && (
          <Button
            className="mint-button"
            as={motion.div}
            bgColor={'#EC407A'}
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            onClick={() => {
              createAsset?.()
            }}
            disabled={isLoading || !createAsset}>
            Upload Video
          </Button>
        )}
      </Box>
      {asset?.[0]?.playbackId && (
        <Box className="Proceed-button">
          <Button
            onClick={() => router.push(`/mint-nft-video?assetId=${asset[0].id}`)}
            className="mint-button"
            bgColor={'#EC407A'}
            as={motion.div}
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}>
            Proceed to Mint NFT
          </Button>
        </Box>
      )}
      <Box key={asset?.[0].id}>
        <HStack spacing={'5px'}>
          <Box >Asset Name: {asset?.[0].name}</Box>
          <Box>Playback URL: {asset?.[0].playbackUrl}</Box>
          <Box>IPFS CID: {asset?.[0].storage?.ipfs?.cid ?? 'None'}</Box>
        </HStack>
      </Box>
    </Box>
  )
}
export default CreateAndViewAsset
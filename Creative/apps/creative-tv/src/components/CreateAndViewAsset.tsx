import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Text, Badge, Button, Flex, Progress, Textarea } from '@chakra-ui/react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

interface AssetProps {
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
  const [description, setDescription] = useState('')
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
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
      setVideoPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
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
        <Box className="parent-dropZone" mt={10}>
          <Box className="dropZone" {...getRootProps()} style={{ width: "100%", height: "20%", border: "1px dashed" }}>
            <Box as="input" {...getInputProps()} />
            <Box as="span">
              <Text className="drag-txt">Drag & Drop or Browse Files</Text>
            </Box>
            {videoPreviewUrl && <video src={videoPreviewUrl} autoPlay controls />}
          </Box>

          {error?.message && <Text variant="red">{error.message}</Text>}
        </Box>
      )}

      {asset?.[0]?.playbackId && <Player title={asset[0].name} playbackId={asset[0].playbackId} />}
      

      

      <Flex className="upload-button" my={5}>
        <Flex>
          {metrics?.metrics?.[0] && <Badge className="views-video">Views: {metrics?.metrics?.[0]?.startViews}</Badge>}
          {video ? <Badge className="video-name">{video.name}</Badge> : <Box></Box>}
          {progressFormatted && <Text className="processing-video">{progressFormatted}</Text>}
        </Flex>
        {!asset?.[0].id && (
          <Button
          className="mint-button"
          as={motion.div}
          bgColor={'#EC407A'}
          _hover={{ transform: 'scale(1.1)' }}
          onClick={open}
          disabled={isLoading || !createAsset}
        >
          Upload Video
        </Button>
        
        )}
      </Flex>
      <Box mt={10}>
        <Text>Video Description</Text>
        {/* Add the video description form */}
        <Textarea
          placeholder="Enter video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Flex key={asset?.[0].id}>
        <Box>Asset Name: {asset?.[0].name}</Box>
        <Box>Playback URL: {asset?.[0].playbackUrl}</Box>
        <Box>IPFS CID: {asset?.[0].storage?.ipfs?.cid ?? 'None'}</Box>
      </Flex>
      {asset?.[0]?.playbackId && (
        <Box className="Proceed-button" my={5}>
          <Button
            onClick={() => router.push(`/mint-nft-video?assetId=${asset[0].id}`)}
            className="mint-button"
            bgColor={'#EC407A'}
            as={motion.div}
            _hover={{ transform: 'scale(1.1)' }}>
            Proceed to Mint NFT
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default CreateAndViewAsset

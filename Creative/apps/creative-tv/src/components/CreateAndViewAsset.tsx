import { Player, useAssetMetrics, useCreateAsset, useAsset, useUpdateAsset } from '@livepeer/react'
import { useAddress } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Text, Badge, Button, HStack, Progress } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export interface AssetData {
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
  const [video, setVideo] = useState<File | null>(null);
  const [ assetName, setAssetName ] = useState<string>( '' );
  const [ description, setDescription ] = useState<string>();
  const [ isWriteInProgress, setIsWriteInProgress ] = useState<boolean>();
  const [ isUpdateAsset, setIsUpdateAsset ] = useState<boolean>();
  const [ isFileSelected, setIsFileSelected ] = useState<boolean>( false );
  const [ isUploadingToIPFS, setIsUploadingToIPFS ] = useState<boolean>( false );
  const [ isProcessing, setIsProcessing ] = useState<boolean>( false );
  const [ showErrorMessage, setShowErrorMessage ] = useState<boolean>( false );
  const [ buttonClicked, setButtonClicked ] = useState<boolean>( false );
  const address = useAddress();
  const router = useRouter();

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
    data: createdAsset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: assetName, file: video, data: assetData, }] as const,
        }
      : null
  )
  const { data: metrics } = useAssetMetrics({
    assetId: createdAsset?.[0].id,
    refetchInterval: 30000,
  })
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
      setIsFileSelected(true);
      // Update the assetData state with relevant properties
      setAssetData((prevData) => ({
        ...prevData,
        animation_url: assetData.animation_url, // Set the animation URL
        external_url: assetData.external_url, // Set the external URL
        image_url: assetData.image_url, // Set the image URL
        properties: {
          playbackId: assetData.properties.playbackId, // Set the playback ID
          videoIpfs: assetData.properties.videoIpfs, // Set the video IPFS
        },
      }));
    } else {
      setVideo(null);
      setIsFileSelected(false);
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.mkv', '.avi', '.wmv', '.flv', '.webm'],
    },
    maxFiles: 1,
    onDrop,
  })

  // Getting asset and refreshing for the status
  const {
    data: asset,
    error: assetError,
    status: assetStatus,
  } = useAsset({
    assetId: createdAsset?.[0].id,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  });

  // Storing asset to IPFS with metadata by updating the asset
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset(
    asset
      ? {
          name: assetName,
          assetId: asset.id,
          storage: {
            ipfs: true,
            metadata: {
              name: assetName,
              description: assetData.description,
              image: assetData.image_url, // clear the default thumbnail
            },
          },
        }
      : undefined
  );
  
  const progressFormatted = useMemo(() => {
    if (progress?.[0]?.phase === 'failed') {
      return 'Failed to process video.';
    } else if (progress?.[0]?.phase === 'waiting') {
      return 'Waiting...';
    } else if (progress?.[0]?.phase === 'uploading') {
      return (
        <Box>
          {`Uploading:` && (
            <Progress
              hasStripe
              isAnimated
              colorScheme="#EC407A"
              value={Math.round(progress?.[0]?.progress * 100)}
            />
          )}
        </Box>
      );
    } else if (progress?.[0]?.phase === 'processing') {
      return `Processing: ${Math.round(progress?.[0]?.progress * 100)}%`;
    } else {
      return null;
    }
  }, [progress]);

  return (
    <>
      {!createdAsset && (
        <Box className="parent-dropZone" w="100%" p={4} border="4px dashed #EC407A" my={5} cursor="pointer">
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
              <video src={URL.createObjectURL(video)} controls style={{ maxWidth: '100%', marginTop: '8px' }} />
            </Box>
          )}
        </Box>
      )}
      {createdAsset?.[0]?.playbackId && <Player title={createdAsset[0].name} playbackId={createdAsset[0].playbackId} />}
      <Box className="upload-button">
        <Box>
          {metrics?.metrics?.[0] && <Badge className="views-video">Views: {metrics.metrics[0].startViews}</Badge>}
          {video ? <Badge className="video-name">{video.name}</Badge> : null}
          {progressFormatted && <Text className="processing-video">{progressFormatted}</Text>}
        </Box>
        {!createdAsset?.[0]?.id && (
          <Button
            className="mint-button"
            as={motion.div}
            bgColor="#EC407A"
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            onClick={() => {
              createAsset?.();
            }}
            disabled={!createAsset}
          >
            Upload Video
          </Button>
        )}
      </Box>
      {createdAsset && (
        <Box className="Proceed-button">
          <Button
            onClick={() => router.push(`/mint-nft-video?assetId=${createdAsset[0].id}`)}
            className="mint-button"
            bgColor="#EC407A"
            as={motion.div}
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
          >
            Proceed to Mint NFT
          </Button>
        </Box>
      )}
      <Box key={createdAsset?.[0]?.id}>
        <HStack spacing="5px">
          <Box>Asset Name: {createdAsset?.[0]?.name}</Box>
          <Box>Playback URL: {createdAsset?.[0]?.playbackUrl}</Box>
          <Box>IPFS CID: {createdAsset?.[0]?.storage?.ipfs?.cid ?? 'None'}</Box>
        </HStack>
      </Box>
    </>
  );
};

export default CreateAndViewAsset
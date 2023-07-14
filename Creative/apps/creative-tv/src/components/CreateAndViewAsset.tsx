import { Player, useAssetMetrics, useCreateAsset, useAsset, useUpdateAsset } from '@livepeer/react'
import { useAddress, useSDK } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Text, Badge, Button, HStack, Progress, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Textarea, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { CREATIVE_ADDRESS } from 'utils/config';
import { useForm } from 'react-hook-form';

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
// Note: This code contains a React component for creating and viewing assets.
const CreateAndViewAsset = () => {
  // Note: This component relies on several external libraries and custom hooks for asset management, file uploading, UI components, and routing.
  // Note: The component uses the `useState` hook to manage various state variables.

  const [video, setVideo] = useState<File | null>(null); // Note: The `video` state variable stores the selected video file.

  const [ assetName, setAssetName ] = useState<string>( "" ); // Note: The `assetName` state variable stores the name of the asset entered by the user.

  const [ description, setDescription ] = useState<string>(); // Note: The `description` state variable stores the description of the asset entered by the user.

  const [ isWriteInProgress, setIsWriteInProgress ] = useState<boolean>(); // Note: The `isWriteInProgress` state variable indicates whether an asset write operation is in progress.

  const [ isUpdateAsset, setIsUpdateAsset ] = useState<boolean>();  // Note: The `isUpdateAsset` state variable indicates whether an asset update operation is in progress.

  const [ isFileSelected, setIsFileSelected ] = useState<boolean>( false ); // Note: The `isFileSelected` state variable indicates whether a video file has been selected.

  const [ isUploadingToIPFS, setIsUploadingToIPFS ] = useState<boolean>( false ); // Note: The `isUploadingToIPFS` state variable indicates whether the video file is currently being uploaded to IPFS.

  const [ isProcessing, setIsProcessing ] = useState<boolean>( false ); // Note: The `isProcessing` state variable indicates whether the video file is currently being processed.

  const [ showErrorMessage, setShowErrorMessage ] = useState<boolean>( false ); // Note: The `showErrorMessage` state variable indicates whether an error message should be displayed.

  const [ buttonClicked, setButtonClicked ] = useState<boolean>( false ); // Note: The `buttonClicked` state variable indicates whether a button has been clicked.

  const address = useAddress(); // Note: The `address` variable stores the address of the user.

  const router = useRouter(); // Note: The `router` variable provides routing functionality.


  const [assetData, setAssetData] = useState<AssetData>({ // Note: The `assetData` state variable stores the data related to the asset, including the title, description, animation URL, external URL, image URL, playback ID, and video IPFS.

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

  const { register, handleSubmit, formState: { errors } } = useForm<AssetData>();

  const onSubmit = (data: AssetData) => {
    console.log(data);
  };
  
  const {
    mutate: createAsset,
    data: createdAsset,
    status,
    progress,
    error,
  } = useCreateAsset( // Note: The `useCreateAsset` hook is used to handle asset creation. It provides functions, data, status, progress, and error information related to the asset creation process.

    video
      ? {
          sources: [{ name: assetName, file: video, data: assetData, }] as const,
        }
      : null
  )

  const onDrop = useCallback(async (acceptedFiles: File[]) => { // Note: The `onDrop` function is called when a file is dropped or selected. It sets the selected video file in the `video` state and updates the `assetData` state with relevant properties.
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
  const { getRootProps, getInputProps } = useDropzone({ // Note: The `useDropzone` hook is used to handle file selection and provide drag-and-drop functionality.
    accept: {
      'video/*': ['.mp4', '.mov', '.mkv', '.avi', '.wmv', '.flv', '.webm'],
    },
    maxFiles: 1,
    onDrop,
  })
  
  const progressFormatted = useMemo(() => { // Note: The `progressFormatted` variable formats the progress of the video upload and processing.
    if (progress?.[0]?.phase === 'failed') {
      return 'Failed to process video.';
    } else if (progress?.[0]?.phase === 'waiting') {
      return 'Waiting...';
    } else if (progress?.[0]?.phase === 'uploading') {
      return (
        <Flex>
          {`Uploading:` && (
            <Progress
              hasStripe
              isAnimated
              colorScheme="#EC407A"
              value={Math.round(progress?.[0]?.progress * 100)}
            />
          )}
        </Flex>
      );
    } else if (progress?.[0]?.phase === 'processing') {
      return `Processing: ${Math.round(progress?.[0]?.progress * 100)}%`;
    } else {
      return null;
    }
  }, [progress]);

  const isError = !(assetName === '' || description === ''); // Note: The `isError` variable checks if the asset name and description are empty and determines if an error should be displayed.


  return (
    <>
      {!createdAsset && (
        <Box className="parent-dropZone" w="100%" p={4} border="4px dashed #EC407A" my={5} cursor="pointer"> 
          <Box className="dropZone" {...getRootProps()}>
            <Box as="input" {...getInputProps()} />
            <Box as="span" className="drag-txt">
              <Text>Drag and Drop or Browse Files</Text>
            </Box>
          </Box>
          {error?.message && <Text variant="red">{error?.message}</Text>}
        </Box>
      )}
      {isFileSelected && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Video Preview:
          </Text>
          <Flex minWidth='max-content' alignItems='center'>
          {video && (
            <video src={URL.createObjectURL(video)} controls style={{ maxWidth: '1000px', maxHeight:'400px', marginTop: '8px' }} />
          )}
          </Flex>
        </Box>
      )}
      {createdAsset?.[0]?.playbackId && <Player title={createdAsset[0].name} playbackId={createdAsset[0].playbackId} />}
      {/* Form for asset name and description */}
      <Box my={4} maxWidth={400} mx={'auto'}>
      {!createdAsset?.[0]?.id && (
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="assetData" isRequired>
          <FormLabel>Episode Title</FormLabel>
          <Input placeholder="Enter the name of the video" type='text' {...register('title', { required: true })} value={assetName} onChange={(e) => setAssetName(e.target.value)}/>
          {!isError ? (
            <FormHelperText>
              Enter the episode title you'd like to use for this video.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Episode title is required.</FormErrorMessage>
          )}
          <FormLabel mt={4}>Description</FormLabel>
          <Textarea placeholder="Enter a description for the episode video" {...register('description', { required: true })} value={description} onChange={(e) => setDescription(e.target.value)} />
          {!isError ? (
            <FormHelperText>
              Enter the episode description you'd like to use for this video.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Episode description is required.</FormErrorMessage>
          )}
          </FormControl>
        {video ? <Badge className="video-name">{assetName}</Badge> : null}
        {progressFormatted && <Text className="processing-video">{progressFormatted}</Text>}
          <Button
            type='submit'
            className="upload-button"
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
          </form>
        )}
      </Box>
      {createdAsset && (
        <Box className="Proceed-button">
          <Button
            onClick={() => router.push({
              pathname: '/mint-nft-video',
              query: { 
                assetId: createdAsset[0].id,
                assetData: JSON.stringify(assetData),
              },
            })}
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
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Progress,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Player, useCreateAsset } from '@livepeer/react'
import { useAddress } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { VideoPreview } from './VideoPreview'

export interface AssetData {
  title: string
  description: string
  animation_url: string
  external_url: string
  image_url: string
  properties: {
    playbackId: string
    videoIpfs: string
  }
}

export interface MintDetail {
  nFTAmountToMint: number
  pricePerNFT: number
}

// Add MintDetails to AssetData
export interface AssetData extends Partial<MintDetail> {}

// Note: This code contains a React component for creating and viewing assets.
const CreateAndViewAsset = () => {
  // Note: This component relies on several external libraries and custom hooks for asset management, file uploading, UI components, and routing.
  // Note: The component uses the `useState` hook to manage various state variables.

  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null) // Note: The `video` state variable stores the selected video file.

  const [nFTAmountToMint, setnFTAmountToMint] = useState(0) // Note: The `nFTAmountToMint` state variable stores the amount of nft to mint.

  const [pricePerNFT, setPricePerNFT] = useState(0) // Note: The `pricePerNFT` state variable stores the price of an nft being minted.

  const [isFileSelected, setIsFileSelected] = useState<boolean>(false) // Note: The `isFileSelected` state variable indicates whether a video file has been selected.

  const address = useAddress() // Note: The `address` variable stores the address of the user.

  const router = useRouter() // Note: The `router` variable provides routing functionality.

  const [assetData, setAssetData] = useState<AssetData>({
    // Note: The `assetData` state variable stores the data related to the asset, including the title, description, animation URL, external URL, image URL, playback ID, and video IPFS.

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

  const assetTitle: string = assetData.title // Note: The `assetTitle` variable stores the title of the asset.
  const description: string = assetData.description // Note: The `description` variable stores the description of the asset.

  const {
    mutate: createAsset,
    data: createdAsset,
    status: createAssetStatus,
    progress,
    error: createAssetError,
  } = useCreateAsset(
    // Note: The `useCreateAsset` hook is used to handle asset creation. It provides functions, data, status, progress, and error information related to the asset creation process.

    selectedVideoFile
      ? {
          sources: [
            {
              name: assetTitle,
              description: description,
              file: selectedVideoFile,
              data: assetData,
              creatorId: address,
            },
          ] as const,
        }
      : null
  )

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Note: The `onDrop` function is called when a file is dropped or selected. It sets the selected video file in the `video` state and updates the `assetData` state with relevant properties.
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setSelectedVideoFile(acceptedFiles[0])
      setIsFileSelected(true)

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
      }))
    } else {
      setSelectedVideoFile(null)
      setIsFileSelected(false)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    // Note: The `useDropzone` hook is used to handle file selection and provide drag-and-drop functionality.
    accept: {
      'video/*': ['.mp4', '.mov', '.mkv', '.avi', '.wmv', '.flv', '.webm'],
    },
    maxFiles: 1,
    onDrop,
  })

  const uploadProgressPercent = progress?.[0]?.progress && Math.round(progress?.[0]?.progress * 100)

  const progressFormatted = useMemo(() => {
    // Note: The `progressFormatted` variable formats the progress of the video upload and processing.

    if (progress?.[0]?.phase === 'failed') {
      return <p>Failed to process video.</p>
    } else if (progress?.[0]?.phase === 'waiting') {
      return <Spinner thickness="4px" color="#EC407A" size={'md'} emptyColor="gray.200" />
    } else if (progress?.[0]?.phase === 'uploading') {
      return <Progress value={uploadProgressPercent} colorScheme="pink" hasStripe size="md" />
    } else if (progress?.[0]?.phase === 'processing') {
      return <Progress size="md" isIndeterminate colorScheme="pink" />
    } else {
      return null
    }
  }, [progress])

  /** The renderVideoPreview is use to memoize a component   */
  const renderVideoPreview = useMemo(() => <VideoPreview video={selectedVideoFile} />, [selectedVideoFile])

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<AssetData>()

  const isError = assetTitle === '' || description === '' // Note: The `isError` variable checks if the asset name and description are empty and determines if an error should be displayed.

  const handleAssetUpload: SubmitHandler<AssetData> = (data) => {
    if (isError) {
      return
    }

    setAssetData((prev) => ({
      ...prev,
      title: data.title,
      description: data.description,
    }))

    createAsset && createAsset()
  }

  const { handleSubmit: handleMintSubmit, control: handleMintControl, formState: mintFormState } = useForm<MintDetail>()
  const isRequiredFields = mintFormState.errors.nFTAmountToMint?.type === 'required' || mintFormState.errors.pricePerNFT?.type === 'required'

  const handleAssetMint: SubmitHandler<MintDetail> = (data) => {
    if (isRequiredFields) {
      return
    }

    router.push({
      pathname: '/mint-nft-video',
      query: {
        assetId: createdAsset?.[0].id,
        assetData: JSON.stringify(assetData),
      },
    })
  }

  return (
    <Box minH={600}>
      {!createdAsset && (
        <Box className="parent-dropZone" w="100%" p={4} border="4px dashed #EC407A" my={12} cursor="pointer">
          <Box className="dropZone" {...getRootProps()}>
            <Box as="input" {...getInputProps()} />
            <Box as="span" className="drag-txt">
              <Text textAlign={'center'}>Drag and Drop or Browse Files</Text>
            </Box>
          </Box>
        </Box>
      )}

      {createAssetError?.message && <Text> {createAssetError.message} </Text>}

      {isFileSelected && (
        <>
          {/* The preview of uploaded video */}
          {!createdAsset?.[0]?.id && renderVideoPreview}
          {/* Form for asset name and description */}
          <Box my={12} maxWidth={400} mx={'auto'}>
            {!createdAsset?.[0]?.id && (
              /* "handleSubmit" will validate form inputs before invoking "onSubmit" */
              <form onSubmit={handleSubmit(handleAssetUpload)}>
                <FormControl id="assetData" mb={8}>
                  <FormLabel>Episode Title</FormLabel>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        size={'lg'}
                        onChange={(e) => {
                          setAssetData(prev => ({...prev, title: e.target.value}))
                          field.onChange(e)
                        }}
                        value={field.value}
                        mb={formErrors.title ? 0 : 4}
                        disabled={createAssetStatus === 'loading'}
                        placeholder="Enter the name of the video"
                        aria-invalid={formErrors.title ? 'true' : 'false'}
                      />
                    )}
                  />
                  {formErrors.title && formErrors.title.type === 'required' && (
                    <FormHelperText mb="32px">Enter the episode title you'd like to use for this video.</FormHelperText>
                  )}
                  <FormLabel mt={4}>Episode Description</FormLabel>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Textarea
                        onChange={(e) => {
                          setAssetData(prev => ({...prev, description: e.target.value}))
                          field.onChange(e)
                        }}
                        value={field.value}
                        disabled={createAssetStatus === 'loading'}
                        mb={formErrors.description ? 0 : 4}
                        placeholder="Enter a description for the video"
                      />
                    )}
                  />
                  {formErrors.description && formErrors.description.type == 'required' && (
                    <FormHelperText mb={4}>Enter the description you'd like to use for this episode.</FormHelperText>
                  )}
                </FormControl>

                {createAssetError?.message ? (
                  <Box className="processing-video" my={8}>
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription ml={2}>{createAssetError.message}!</AlertDescription>
                    </Alert>
                  </Box>
                ) : (
                  progressFormatted && (
                    <Box className="processing-video" my={12}>
                      {progressFormatted}
                    </Box>
                  )
                )}
                <Center>
                  <Button
                    type="submit"
                    className="upload-button"
                    style={{ backgroundColor: progress?.[0]?.phase === 'uploading' || progress?.[0]?.phase === 'processing' ? '#8e2649' : '#EC407A' }}
                    _hover={{
                      color: 'gray.800',
                      transform: isError && 'scale(1.015)',
                      cursor: progress?.[0]?.phase === 'processing' ? 'progress' : 'pointer',
                    }}
                    disabled={createAssetStatus === 'loading' || !createAsset || progress?.[0]?.phase === 'processing'}
                    mb={20}>
                      Upload Video
                  </Button>
                </Center>
              </form>
            )}
          </Box>
        </>
      )}

      {createdAsset?.[0]?.playbackId && (
        <>
          <div style={{ marginBottom: '32px' }}>
            <Player 
            title={createdAsset[0].name} 
            playbackId={createdAsset[0].playbackId}
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
          </div>

          <Stack spacing="20px" my={12} style={{ border: '1px solid whitesmoke', padding: 24 }}>
            <Text as={'h3'} style={{ fontWeight: '600', fontSize: 24, marginBottom: 24 }}>
              Asset uploaded successfully.
            </Text>

            <Text style={{ fontWeight: '500' }}>Asset Details is as follows:</Text>
            <Box style={{ color: 'whitesmoke', lineHeight: 1.75 }}>
              <Text>Asset Name: {createdAsset?.[0]?.name}</Text>
              <Text>Playback URL: {createdAsset?.[0]?.playbackUrl}</Text>
              <Text>IPFS CID: {createdAsset?.[0]?.storage?.ipfs?.cid ?? 'None'}</Text>
            </Box>
          </Stack>
          <Box className="Proceed-button">
            <Box my={12} maxWidth={400} mx={'auto'}>
              <form onSubmit={handleMintSubmit(handleAssetMint)}>
                <FormControl id="assetMintDetail" mb={8}>
                  <FormLabel>Number of NFTs to mint?</FormLabel>
                  <Controller
                    name="nFTAmountToMint"
                    control={handleMintControl}
                    rules={{ required: true, min: 1, max: 100 }}
                    render={({ field }) => (
                      <Input
                        size={'lg'}
                        type="number"
                        onChange={(e) => {
                          setnFTAmountToMint(+e.target.value)
                          field.onChange(e)
                        }}
                        value={field.value}
                        mb={formErrors.nFTAmountToMint ? 0 : 4}
                        disabled={mintFormState.isLoading}
                        placeholder="Enter number of nft(s) to mint"
                        aria-invalid={formErrors.nFTAmountToMint ? 'true' : 'false'}
                      />
                    )}
                  />
                  {mintFormState.errors.nFTAmountToMint && mintFormState.errors.nFTAmountToMint.type === 'required' && (
                    <FormHelperText mb="32px">Numbers of NFT to mint is required.</FormHelperText>
                  )}
                  {mintFormState.errors.nFTAmountToMint && mintFormState.errors.nFTAmountToMint.type === 'min' && (
                    <FormHelperText mb="32px">You can't mint 0 nft. Try 1 - 100.</FormHelperText>
                  )}
                  {mintFormState.errors.nFTAmountToMint && mintFormState.errors.nFTAmountToMint.type === 'max' && (
                    <FormHelperText mb="32px">You can't mint more than 100 nfts.</FormHelperText>
                  )}
                  <FormLabel mt={4}>Price per NFT</FormLabel>
                  <Controller
                    name="pricePerNFT"
                    control={handleMintControl}
                    rules={{ required: true, min: 0 }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        size={'lg'}
                        onChange={(e: any) => {
                          setPricePerNFT(e.target.value)
                          field.onChange(e)
                        }}
                        value={field.value}
                        mb={mintFormState.errors.pricePerNFT ? 0 : 4}
                        disabled={mintFormState.isLoading}
                        placeholder="Enter price per NFT"
                        aria-invalid={formErrors.nFTAmountToMint ? 'true' : 'false'}
                      />
                    )}
                  />
                  {mintFormState.errors.pricePerNFT && mintFormState.errors.pricePerNFT.type == 'required' && (
                    <FormHelperText mb={4}>Price per NFT is required.</FormHelperText>
                  )}
                  {mintFormState.errors.pricePerNFT && mintFormState.errors.pricePerNFT.type === 'min' && (
                    <FormHelperText mb={4}>The price can't be a negative value.</FormHelperText>
                  )}
                </FormControl>
                <Center>
                  <Button
                    type="submit"
                    className="mint-button"
                    bgColor="#EC407A"
                    disabled={mintFormState.isLoading}
                    _hover={{ transform: 'scale(1.02)', cursor: 'pointer' }}
                    onClick={() => {
                      setAssetData((prev) => ({
                        ...prev,
                        nFTAmountToMint: nFTAmountToMint,
                        pricePerNFT: pricePerNFT,
                        properties: {
                          playbackId: String(createdAsset?.[0]?.playbackId),
                          videoIpfs: String(createdAsset?.[0]?.storage?.ipfs?.cid),
                        },
                      }))
                    }}>
                    Proceed to Mint NFT
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default CreateAndViewAsset
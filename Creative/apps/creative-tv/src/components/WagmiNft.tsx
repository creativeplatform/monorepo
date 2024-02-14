import { 
  Box, 
  Button, 
  Stack, 
  Text, 
  useToast, 
  Flex,
  Skeleton,
} from '@chakra-ui/react'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import { ThirdwebSDK, useAddress, useContract, useMetadata, useSigner, MediaRenderer } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { removeUnderScore } from 'utils/formatString'
import { Emoji } from 'ui/emoji'
import { CREATIVE_ADDRESS, THIRDWEB_API_KEY } from '../utils/config'
import { AssetData } from './CreateAndViewAsset'
import { ErrorBoundary } from './hoc/ErrorBoundary'
import SignIn from './SignIn'

interface WagmiNftProps {
  assetId: string
  assetData: AssetData
}

interface NFTCollection {
  image_url: string
}
type ContractMetaData = {
  name: string
  description: string
  image: string
  app_uri: string
  seller_fee_basis_points: number
  fee_recipient: string
  merkle: Record<any, any>
  symbol: string
  [idx: string]: any
}
const WagmiNft = (props: WagmiNftProps): JSX.Element => {
  const address = useAddress()
  const router = useRouter()
  const signer = useSigner()
  const toast = useToast()
  const [deployError, setDeployError] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [error, setError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const [deployedContractAddress, setDeployedContractAddress] = useState<string>('')
  const { contract } = useContract(deployedContractAddress)
  const { data: contractMetadata, isLoading } = useMetadata(contract)

  // Getting asset and refreshing for the status
  const {
    data: asset,
    error: assetError,
    status: assetStatus,
  } = useAsset({
    assetId: props.assetId,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  })

  let notification = (): React.ReactNode => {
    if (assetStatus === 'loading') {
      // Render loading state
      return 'Loading asset data...'
      // console.log('Loading asset data to IPFS...', assetStatus)
    } else if (assetError) {
      // Render error state
      // console.log('Loading asset data to IPFS...', assetError)
      return 'Error fetching asset data'
    }
  }

  // Storing asset to IPFS with metadata by updating the asset
  const {
    mutate: updateAsset,
    status: updateStatus,
    error: updateError,
  } = useUpdateAsset(
    // asset
    assetStatus === 'success'
      ? {
          name: String(asset?.name),
          assetId: String(asset?.id),
          storage: {
            ipfs: true,
            metadata: {
              description: props.assetData.description,
              image: props.assetData.image_url, // clear the default thumbnail
              properties: {
                animation_url: props.assetData.animation_url,
                external_url: props.assetData.external_url,
                image_url: props.assetData.image_url,
                nFTAmountToMint: props.assetData.nFTAmountToMint,
                pricePerNFT: props.assetData.pricePerNFT,
              },
            },
          },
        }
      : undefined
  )

  notification = () => {
    // if (updateStatus === 'loading') {
    //   // Render loading state
    //   return 'Loading asset data to IPFS...'
    // }

    if (updateError) {
      // console.log('Error fetching asset data for IPFS...', updateError)
      // Render error state
      return 'Error fetching asset data for IPFS'
    }
  }

  const FallbackComponent = (error: unknown): JSX.Element => {
    return <div>Error: {String(error)}</div>;
  };

  // Function to deploy the edition drop contract
  const deployNftCollection = async ({ image_url }: NFTCollection) => {
    // Is there an sdk found and is there a connect wallet address?
    if (!signer || !address) return

    const sdk = new ThirdwebSDK(signer, {
       clientId: THIRDWEB_API_KEY,
    })

    // Is there an sdk found?
    if (!sdk) return

    // Is there a name and description?
    if (!props.assetData.description || !asset?.name) return

    try {
      setIsDeploying(true)

      const contractAddress = await sdk.deployer.deployNFTDrop({
        name: asset?.name,
        primary_sale_recipient: address,
        app_uri: 'https://tv.creativeplatform.xyz', // Website of your contract dApp
        symbol: 'EPISD', // Symbol of the edition drop
        platform_fee_basis_points: 200,
        platform_fee_recipient: CREATIVE_ADDRESS,
        fee_recipient: address,
        seller_fee_basis_points: 300,
        image: asset?.storage?.ipfs?.nftMetadata?.url,
        description: props.assetData?.description,
        trusted_forwarders: [CREATIVE_ADDRESS],
      })

      console.log('Contract deployed', contractAddress)

      setDeployedContractAddress(contractAddress)
    } catch (err: any) {
      setIsDeploying(false)

      // TODO: send err to ErrorService
      console.log(err)
      setDeployError('Contract deployment failed!')
    }
  }

  const getContractMetaData = () => {
    const data: ContractMetaData = contractMetadata as unknown as any
    let keys: string[], values: string[]

    if (data?.name) {
      keys = Object.keys(data)
      values = Object.values(data)

      return keys.map((k, i) => (
        <div key={i}>
          <p>
          <span style={{ fontWeight: '700' }}>{removeUnderScore(k)}: </span>{typeof values[i] === 'string' ? values[i] : JSON.stringify(values[i])}
          </p>
        </div>
      ))
    }
  }

  // mint nft
  const mintNFT = async () => {
    try {
      setIsMinting(true)

      const txn = await contract?.call('lazyMint', [props?.assetData?.nFTAmountToMint, asset?.storage?.ipfs?.cid, []])

      if (!txn.receipt) {
        setIsMinting(false)
      }

      console.log('[Minted] ', txn.receipt)

      toast({
        title: 'NFT Minted',
        description: 'Successfully minted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      const timeout = setTimeout(() => {
        router.replace(`/profile/${address}`)
        clearTimeout(timeout)
      }, 1000)
    } catch (err: any) {
      setIsMinting(false)
      setError(err.message)
      toast({
        status: 'error',
        title: 'NFT not minted',
        description: err.message,
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box className="address-mint" minH={'600'}>
      {!address && (
        <SignIn btnTitle={'Sign In'} />
      )}

      {notification ? (
        <Text as={'h3'} my={8} style={{ fontWeight: '600', fontSize: 24 }}>
          {notification()}
        </Text>
      ) : null}

      {address && props.assetId && (
        <>
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="1200px">
                <Text my={4} style={{ fontWeight: '600', fontSize: 24 }}>
                  <Emoji symbol='☁️' label='cloud'/> Your asset is ready to be uploaded to IPFS.
                </Text>
                <Button
                  my={8}
                  w={'160px'}
                  className="upload-button"
                  bgColor="#EC407A"
                  isLoading={updateStatus === 'loading'}
                  disabled={updateStatus === 'loading'}
                  _hover={{
                    transform: asset?.storage?.status?.phase === 'processing' ? '' : 'scale(1.02)',
                    cursor: asset?.storage?.status?.phase === 'processing' ? 'progress' : 'pointer',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    updateAsset?.() // Function to upload asset to IPFS
                  }}>
                  {updateStatus === 'loading' ? 'Uploading...' : 'Upload to IPFS'}{' '}
                </Button>
              </Stack>
            </>
          ) : null}

          {!contract?.getAddress() && asset?.storage?.ipfs?.cid ? (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="1200px">
                {!asset ? (
                  <Skeleton height={1080} />
                ):(
                  <MediaRenderer
                  src={`${asset?.storage?.ipfs?.url}`}
                  alt={asset?.name}
                  width={'1920'}
                  height={'1080'}
                />
                )} 

                <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
                  <Emoji symbol='👍🏾' label='thumbs up'/>Congrats, Your Asset Was Uploaded To IPFS!
                </Text>

                <Button
                  width={160}
                  className="show-details-button"
                  my={4}
                  onClick={() => setShowDetails(!showDetails)}
                  style={{ backgroundColor: '#EC407A' }}>
                  {showDetails ? 'Hide ' : 'Show '}Details
                </Button>

                <Box my={8} style={{ display: showDetails ? 'block' : 'none' }}>
                  <Text as="h4" mb={8} style={{ fontWeight: '700', fontSize: 22 }}>
                    Asset details:
                  </Text>
                  <Box style={{ lineHeight: 2.75 }}>
                    <Text>
                    <span style={{ fontWeight: '700' }}>Asset Name: </span>{asset?.name}{' '}
                    </Text>
                    <Text>
                    <span style={{ fontWeight: '700' }}>Playback URL: </span>{asset?.playbackUrl}
                    </Text>
                    <Text>
                    <span style={{ fontWeight: '700' }}>IPFS CID: </span>{asset?.storage?.ipfs?.cid ?? 'None'}
                    </Text>
                  </Box>
                </Box>
              </Stack>

              <ErrorBoundary fallback={FallbackComponent(error)}>
                <Box my={16} style={{ padding: 24 }} maxWidth="700px">
                  <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 4 }}><Emoji symbol='🧩' label='puzzle piece'/> Now deploy the contract for your uploaded asset</Text>
                  <Button
                    className="deploy-button"
                    my={4}
                    // as={motion.div}
                    bgColor="#EC407A"
                    _hover={{ transform: isDeploying ? '' : 'scale(1.02)', cursor: isDeploying ? 'progress' : 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault()
                      deployNftCollection?.({ image_url: String(asset?.storage?.ipfs?.cid) }) // Function to deploy edition drop contract
                    }}
                    isLoading={isDeploying}
                    disabled={isDeploying}>
                    {isDeploying ? 'Deploying Contract...' : 'Deploy Contract'}
                  </Button>
                  <Box>
                    {!isDeploying && (
                        <span style={{ color: '#c1c1c1', fontWeight: 700 }}>{deployError}</span>
                      )
                    }
                  </Box>
                </Box>
              </ErrorBoundary>
            </>
          ) : null }

          {asset?.storage?.ipfs?.cid && contract?.getAddress() && (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="1200px">
                <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
                  <Emoji symbol='🎉' label='tada' /> Contract Deployed Succesfully!
                </Text>
                <Button
                  width={160}
                  className="show-details-button"
                  my={4}
                  onClick={() => {
                    setShowDetails(!showDetails)
                  }}
                  style={{ backgroundColor: '#EC407A' }}>
                  {showDetails ? 'Hide ' : 'Show '}Details
                </Button>

                <Box my={8} style={{ display: showDetails ? 'block' : 'none' }}>
                  <Flex style={{ lineHeight: 2.75 }}>
                    <Text>
                      <span style={{ fontWeight: '700' }}>Address: </span>{contract.getAddress()}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      {getContractMetaData()}
                    </Text>
                  </Flex>
                </Box>
              </Stack>
            </>
          )}
          <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="700px">
            <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
              <Emoji symbol='⌚️' label='watch'/> Time to mint your NFTs!
            </Text>

            <Button
              onClick={mintNFT}
              disabled={isMinting}
              _hover={{ cursor: isMinting ? 'progress' : 'pointer' }}
              style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}>
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
          </Stack>
        </>
      )}
    </Box>
  )
}

export default WagmiNft
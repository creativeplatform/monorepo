import { 
  Box, 
  Button, 
  Stack, 
  Text, 
  useToast, 
  Flex,
  Skeleton,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import { ConnectWallet, MediaRenderer, useAddress, useContract, useMetadata, useSigner } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
// import { CREATIVE_ADDRESS, NEXT_PUBLIC_THIRDWEB_API_KEY } from 'utils/config'
import { useContractAddress } from 'hooks/useContractAddress'
import { deployEditionDropContract, formatString } from 'utils/helpers'
import { CREATIVE_ADDRESS } from '../utils/config'
import { AssetData } from './CreateAndViewAsset'
import { LazyMintNft } from './LazyMintNft'
import { ErrorBoundary } from './hoc/ErrorBoundary'

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
  const connectedAddress = useAddress()
  const signer = useSigner()
  const toast = useToast()
  const [deployError, setDeployError] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [showMetadataDetails, setMetadataDetails] = useState(false)
  const [deployedContractAddress, setDeployedContractAddress] = useState<string>('')
  const { error: errContractAddress, isFetching, nftContractAddress: savedContractAddress, postContractAddress } = useContractAddress()
  const { contract: nftContract } = useContract(deployedContractAddress)
  const { data: contractMetadata, isLoading } = useMetadata(nftContract)
  const [showDetails, setShowDetails] = useState(false)

  // const router = useRouter()
  // const [isMinting, setIsMinting] = useState(false)
  // const [lazyMintTxStatus, setLazyMintTxStatus] = useState<number | undefined>(0)
  // const [lazyMintTxHash, setLazyMintTxHash] = useState('')
  // const [error, setError] = useState(false)
  // const [txCount, setTxCount] = useState(0)
  // const [lazyMintedTokens, setLazyMintedTokens] = useState<NFT[]>([])

  useEffect(() => {
    setDeployedContractAddress(savedContractAddress)
  }, [])

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

  // Function to deploy the edition drop contract
  const deployNftCollection = async (e: any) => {
    e.preventDefault()

    // Is there an sdk found and is there a connect wallet address?
    if (!signer || !connectedAddress) return

    // Is there a name and description?
    if (!props.assetData.description || !asset?.name) return

    try {
      setIsDeploying(true)

      const contractAddress = await deployEditionDropContract(signer, 'mumbai', {
        name: asset?.name,
        primary_sale_recipient: connectedAddress,
        app_uri: 'https://tv.creativeplatform.xyz', // Website of your contract dApp
        symbol: 'EPISD', // Symbol of the edition drop
        platform_fee_basis_points: 200,
        platform_fee_recipient: CREATIVE_ADDRESS,
        fee_recipient: connectedAddress,
        seller_fee_basis_points: 300,
        image: asset?.storage?.ipfs?.nftMetadata?.url || 'Not available',
        description: props.assetData.description,
        trusted_forwarders: [CREATIVE_ADDRESS],
      })

      // post to server
      const res = await postContractAddress({ contractAddress: contractAddress!, userAddress: connectedAddress! })
      if (res.status === 201) {
        setDeployedContractAddress(contractAddress!)
      }

      toast({
        title: 'Contract deployment',
        description: `Deployed successfully at: ${contractAddress}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err: any) {
      setIsDeploying(false)

      // TODO: send err to ErrorService
      console.log(err.message)
      setDeployError('Contract deployment failed!')
      toast({
        title: 'Contract deployment',
        description: `Deployment failed with: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
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
            <span style={{ fontWeight: '700' }}>{formatString.removeUnderScore(k)}: </span>
            <span>{typeof values[i] === 'string' ? values[i] : JSON.stringify(values[i])}</span>
          </p>
        </div>
      ))
    }
  }

  const handleUpdateAssetToIPFS = async (e: any) => {
    e.preventDefault()

    // const deployContract = windowStorage.get({ name: NAME_OF_SAVED_CONTRACT_ADDRESS })
    // console.log('deployContract: ', deployContract)
    // if (deployContract !== undefined) {
    //   setDeployedContractAddress(deployContract)
    // }
    updateAsset?.() // Function to upload asset to IPFS
  }

  return (
    <Box className="address-mint" minH="600px"> {/* Corrected minH value to include px for consistency */}
      {!connectedAddress && (
        <ConnectWallet
          btnTitle="Sign In"
          className="signIn-button"
          style={{
            marginBottom: '24px',
            margin: '48px 0', // This might be overridden by marginBottom, consider adjusting
            fontWeight: '600',
          }}
        />
      )}

      {notification && (
        <Text as="h3" my={8} style={{ fontWeight: '600', fontSize: '24px' }}> {/* Ensure notification is a function or adjust accordingly */}
          {notification()}
        </Text>
      )}

      {connectedAddress && props.assetId && (
        <>
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' && (
            <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: '24px' }} maxWidth="1200px">
              <Heading as="h2" size="lg" my={4}>
                Your video is now ready to be uploaded to IPFS.
              </Heading>
              <Button
                my={8}
                w="160px"
                className="upload-button"
                bgColor="#EC407A"
                isLoading={updateStatus === 'loading'}
                disabled={updateStatus === 'loading'}
                _hover={{
                  transform: asset?.storage?.status?.phase === 'processing' ? '' : 'scale(1.02)',
                  cursor: asset?.storage?.status?.phase === 'processing' ? 'progress' : 'pointer',
                }}
                onClick={handleUpdateAssetToIPFS}
              >
                {updateStatus === 'loading' ? 'Saving to IPFS...' : 'Save to IPFS'}
              </Button>
            </Stack>
          )}

          {!nftContract && asset?.storage?.ipfs?.cid && (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: '24px' }} maxWidth="1200px">
                {(!asset || isLoading) ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="brand.300"
                    size="xl"
                  />
                ) : (
                  <MediaRenderer
                    src={`${asset?.storage?.ipfs?.url}`}
                    alt={asset?.name}
                    width="1920"
                    height="1080"
                  />
                )}
                <Heading as="h2" size="lg" my={2}>
                  Congrats, Your Asset Was Uploaded To IPFS!
                </Heading>
                <Button
                  width="160px"
                  className="show-details-button"
                  my={4}
                  onClick={() => setShowDetails(!showDetails)}
                  style={{ backgroundColor: '#EC407A' }}
                >
                  {showDetails ? 'Hide ' : 'Show '}Details
                </Button>

                <Box my={8} style={{ display: showDetails ? 'block' : 'none' }}>
                  <Heading as="h3" size="md" mb={8}>
                    Asset details:
                  </Heading>
                  <Box style={{ lineHeight: '2.75' }}>
                    <Text>
                      <span style={{ fontWeight: '700' }}>Asset Name: </span>{asset?.name}
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
            </>
          )}

          {!nftContract?.getAddress() && asset?.storage?.ipfs?.cid && (
            <ErrorBoundary fallback={() => <p>Failed to load...</p>}> {/* Ensure ErrorBoundary is correctly implemented */}
              <Box my={16} style={{ border: '1px solid #aeaeae', padding: '24px' }}>
                <Text style={{ fontWeight: '500', fontSize: '20px', marginBottom: '4px' }}>Now deploy the contract for your uploaded Asset</Text>
                <Button
                  className="deploy-button"
                  my={4}
                  bgColor="#EC407A"
                  isLoading={isDeploying}
                  _hover={{ transform: isDeploying ? '' : 'scale(1.02)', cursor: isDeploying ? 'progress' : 'pointer' }}
                  onClick={deployNftCollection}
                >
                  {isDeploying ? 'Deploying Contract...' : 'Deploy Contract'}
                </Button>

                {!isDeploying && <span style={{ color: '#c1c1c1', fontWeight: 400, marginLeft: '24px' }}>{deployError}</span>}
              </Box>
            </ErrorBoundary>
          )}

          {asset?.storage?.ipfs?.nftMetadata?.cid && nftContract?.getAddress() && (
            <>
              <Stack spacing="20px" style={{ border: '1px solid #a4a4a4', padding: '24px' }}>
                <Text as="h4" my={2} style={{ fontWeight: '500', fontSize: '22px' }}>
                  Contract deployed successfully!
                </Text>

                <Button
                  className="show-details-button"
                  onClick={() => setMetadataDetails(!showMetadataDetails)}
                  style={{ maxWidth: '240px', margin: '12px 0', backgroundColor: '#EC407A', marginTop: '4px' }}
                >
                  {showMetadataDetails ? 'Hide ' : 'Show '}Contract MetaData
                </Button>

                <Box my={8} style={{ display: showMetadataDetails ? 'block' : 'none' }}>
                  <Flex direction="column" style={{ lineHeight: '2.75' }}>
                    <Text>
                      <span style={{ fontWeight: '700' }}>Contract Address: </span>
                      <span>{nftContract.getAddress()}</span>
                    </Text>
                    {getContractMetaData()}
                  </Flex>
                </Box>
              </Stack>

              <LazyMintNft asset={asset} assetData={props.assetData} nftContract={nftContract} />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default WagmiNft

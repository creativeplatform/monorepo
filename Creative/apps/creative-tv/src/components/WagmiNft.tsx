import { Box, Button, Flex, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import {
  ConnectWallet,
  MediaRenderer,
  ThirdwebSDK,
  Web3Button,
  getAllDetectedExtensionNames,
  useAddress,
  useContract,
  useSigner,
  useStorageUpload,
} from '@thirdweb-dev/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CREATIVE_ADDRESS, NEXT_PUBLIC_THIRDWEB_API_KEY } from 'utils/config'
import { AssetData } from './CreateAndViewAsset'
import { ErrorBoundary } from './hoc/ErrorBoundary'

interface WagmiNftProps {
  assetId: string
  assetData: AssetData
}

interface NFTCollection {
  image_url: string
}
const WagmiNft = (props: WagmiNftProps): JSX.Element => {
  const address = useAddress()
  const router = useRouter()
  const signer = useSigner()
  const toast = useToast()
  const [deployError, setDeployError] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [isUpdatingIPFS, setIsUpdatingIPFS] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const [contractDeployed, setContractDeployed] = useState<string>('')
  const { contract } = useContract(contractDeployed)

  const { mutateAsync: upload } = useStorageUpload({
    onProgress: (p) => {
      console.log(p)
    },
  })

  const {
    data: asset,
    status: assetStatus,
    error: assetError,
  } = useAsset({ assetId: props.assetId, refetchInterval: (data) => (data?.status?.phase !== 'ready' ? 5000 : false) })

  // Storing asset to IPFS with metadata by updating the asset
  const {
    mutate: updateAsset,
    status: updateStatus,
    isLoading,
  } = useUpdateAsset(
    assetStatus === 'success'
      ? {
          assetId: String(asset?.id),
          name: String(asset?.name),
          storage: {
            ipfs: true,
            metadata: {
              properties: {
                animation_url: props.assetData.animation_url,
                external_url: props.assetData.external_url,
                image_url: props.assetData.image_url,
                nFTAmountToMint: props.assetData.nFTAmountToMint,
                pricePerNFT: props.assetData.pricePerNFT,
              },
              description: props.assetData.description,
              image: props.assetData.image_url, // clear the default thumbnail
            },
          },
        }
      : undefined
  )

  const loadingSpinner = <Spinner thickness="4px" color="#EC407A" size={'lg'} emptyColor="gray.200" />

  // Function to deploy the edition drop contract
  const deployNftCollection = async ({ image_url }: NFTCollection) => {
    // Is there an sdk found and is there a connect wallet address?
    if (!signer || !address) return

    const sdk = new ThirdwebSDK(signer, {
      clientId: NEXT_PUBLIC_THIRDWEB_API_KEY,
    })

    // Is there an sdk found?
    if (!sdk) return

    // Is there a name and description?
    if (!props.assetData.description || !asset?.name) return

    try {
      const contractAddress = await sdk.deployer.deployBuiltInContract('edition-drop', {
        name: asset?.name,
        description: props.assetData.description,
        primary_sale_recipient: address,
        app_uri: 'https://tv.creativeplatform.xyz', // Website of your contract dApp
        symbol: 'EPISD', // Symbol of the edition drop
        platform_fee_basis_points: 200,
        platform_fee_recipient: CREATIVE_ADDRESS,
        fee_recipient: address,
        seller_fee_basis_points: 300,
        image: image_url,
      })

      setIsDeploying(!isDeploying)
      setContractDeployed(contractAddress)
    } catch (err: any) {
      setDeployError(err.message)
      setIsDeploying(!isDeploying)
    }
  }

  return (
    <Box className="address-mint" minH={'600'}>
      {!address && (
        <ConnectWallet
          btnTitle={'Sign In'}
          style={{
            marginBottom: '24px',
            margin: '48px 0',
            fontWeight: '600',
          }}
        />
      )}

      <Flex
        justifyContent={'center'}
        alignContent={'center'}
        style={{
          margin: '48px 0',
        }}>
        {isLoading ? loadingSpinner : null}
      </Flex>

      {asset?.id && address && (
        <Box>
          {updateStatus === 'idle' &&
            (!asset?.storage?.ipfs?.cid && asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
              <>
                <Text style={{ fontWeight: '600', fontSize: 24, marginBottom: 48 }}>Your asset is ready to be uploaded to IPFS.</Text>
                <Button
                  className="upload-button"
                  as={motion.div}
                  bgColor={isUpdatingIPFS ? 'gray.500' : '#EC407A'}
                  _hover={{
                    transform: isUpdatingIPFS ? '' : 'scale(1.02)',
                    cursor: isUpdatingIPFS ? 'progress' : 'pointer',
                  }}
                  onClick={async (e) => {
                    e.preventDefault()
                    setIsUpdatingIPFS(true)
                    updateAsset?.() // Function to upload asset to IPFS
                  }}
                  disabled={isUpdatingIPFS}>
                  {isUpdatingIPFS ? 'Uploading...' : ' Upload to IPFS'}
                </Button>
              </>
            ) : null)}
          {updateStatus == 'success' && asset?.storage?.ipfs?.cid ? (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid whitesmoke', padding: 24 }} maxWidth="700px">
                <MediaRenderer
                  width="100%"
                  height="auto"
                  alt={asset.name}
                  requireInteraction={true}
                  style={{ backgroundColor: 'black' }}
                  src={`https://${NEXT_PUBLIC_THIRDWEB_API_KEY}.ipfscdn.io/ipfs/${asset?.storage?.ipfs?.cid}`}
                />

                <Text as={'h3'} my={8} style={{ fontWeight: '600', fontSize: 24 }}>
                  Congrats, your asset was uploaded to IPFS.
                </Text>

                <Button mb={4} onClick={() => setShowDetails(!showDetails)} style={{ backgroundColor: 'white' }}>
                  {showDetails ? 'Hide ' : 'Show '}Details
                </Button>
                <Box my={8} style={{ display: showDetails ? 'block' : 'none' }}>
                  <Text as="h4" style={{ fontWeight: '700', fontSize: 22 }}>
                    Asset Details is as follows:
                  </Text>
                  <div style={{ color: 'whitesmoke', lineHeight: 2.75 }}>
                    <p>
                      Asset Name: <span style={{ fontWeight: '700' }}>{asset.name}</span>{' '}
                    </p>
                    <p>
                      Playback URL: <span style={{ fontWeight: '700' }}>{asset.playbackUrl}</span>
                    </p>
                    <p>
                      IPFS CID: <span style={{ fontWeight: '700' }}>{asset?.storage?.ipfs?.cid ?? 'None'}</span>
                    </p>
                  </div>
                </Box>
              </Stack>

              {!contract?.getAddress() && (
                <ErrorBoundary fallback={<p>{deployError}</p>}>
                  <Box my={24} style={{ border: '1px solid whitesmoke', padding: 24 }} maxWidth="700px">
                    <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 24 }}>Now deploy the contract for your uploaded Asset</Text>
                    <br />
                    <Button
                      className="mint-button"
                      as={motion.div}
                      bgColor="#EC407A"
                      _hover={{ transform: isDeploying ? '' : 'scale(1.02)', cursor: isDeploying ? 'progress' : 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault()
                        deployNftCollection?.({ image_url: String(asset?.storage?.ipfs?.cid) }) // Function to deploy edition drop contract
                      }}
                      disabled={isDeploying ? true : false}>
                      {isDeploying ? 'Deploying Contract...' : 'Deploy Contract'}
                    </Button>
                  </Box>
                </ErrorBoundary>
              )}
            </>
          ) : null}
          {contract && (
            <Box my={24} style={{ border: '1px solid whitesmoke', padding: 24, maxWidth: '700px' }}>
              <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 24 }}>
                Contract succesfully deployed. You can now mint your video NFT.
              </Text>
              <br />
              <Web3Button
                style={{ marginBottom: 12 }}
                contractAddress={contract?.getAddress()}
                action={async (contract) => {
                  // const ext = getAllDetectedExtensionNames(contract.abi)

                  const tx = await contract.call('lazyMint', [props.assetData.nFTAmountToMint, asset?.storage?.ipfs?.cid, []])
                  
                  console.log(tx)
                }}
                onSubmit={() => console.log('Txn submitted')}
                onSuccess={() => {
                  toast({
                    title: 'NFT Minted',
                    description: 'Successfully minted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
                }}
                onError={(err) => {
                  toast({
                    status: 'error',
                    title: 'NFT not minted',
                    description: err.message,
                    duration: 5000,
                    isClosable: true,
                  })
                }}>
                Mint NFT
              </Web3Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default WagmiNft

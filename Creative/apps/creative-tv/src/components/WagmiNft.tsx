import { Box, Button, Flex, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import {
  ConnectWallet,
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
import { CREATIVE_ADDRESS } from 'utils/config'
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
  const [isUpdatingIPFS, setIsUpdatingIPFS] = useState(false)

  const [contractDeployed, setContractDeployed] = useState<string>('')
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
    isIdle,
    isLoading,
    isSuccess,
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

  const statusAndErrorCheck = () => {
    if (assetStatus === 'loading') {
      // Render loading state
      return loadingSpinner
    } else if (assetError?.message) {
      // Render error state
      return 'Error fetching asset data'
    }

    if (updateStatus === 'loading') {
      // Render loading state
      console.log('Loading asset data to IPFS...', updateStatus)
      return (
        <>
          {loadingSpinner}
          <Text>Loading asset data to IPFS...</Text>
        </>
      )
    }

    if (updateStatus === 'error') {
      // Render error state
      return 'Error fetching asset data for IPFS'
    }
  }

  // Function to deploy the edition drop contract
  const deployNftCollection = async ({ image_url }: NFTCollection) => {
    // Is there an sdk found and is there a connect wallet address?
    if (!signer || !address) return
    const sdk = ThirdwebSDK.fromSigner(signer)

    // Is there an sdk found?
    if (!sdk) return

    // Is there a name and description?
    if (!props.assetData.description || !asset?.name) return

    try {
      const deployed = await sdk.deployer.deployEditionDrop({
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

      console.log('Contract deployed', deployed)
      setContractDeployed(deployed)
    } catch (err: any) {
      // throw err
      setDeployError(err.message)
    }
  }

  const { contract } = useContract(contractDeployed)

  // const { mutateAsync, isLoading: lazyIsLoading, error: lazyError, isSuccess: lazySuccess } = useContractWrite(contract, 'lazyMint')

  return (
    <Box className="address-mint" minH={'600'}>
      {!address ? (
        <ConnectWallet
          btnTitle={'Sign In'}
          style={{
            marginBottom: '24px',
            margin: '48px 0',
            fontWeight: '600',
          }}
        />
      ) : (
        <span
          style={{
            display: 'block',
            backgroundColor: 'whitesmoke',
            padding: '10px',
            borderRadius: '8px',
            margin: '48px 0',
            color: '#333',
            fontWeight: '600',
            maxWidth: '440px',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
          {address}
        </span>
      )}

      <Flex
        justifyContent={'center'}
        alignContent={'center'}
        style={{
          margin: '48px 0',
        }}>
        {/* {typeof statusAndErrorCheck() === 'string' ? <Text style={{ textAlign: 'center' }}>{statusAndErrorCheck()}</Text> : statusAndErrorCheck()} */}
        {isLoading ? loadingSpinner : null}
      </Flex>

      {asset?.id && address && (
        <Box>
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
            <>
              <Text style={{ fontWeight: '600', fontSize: 24, marginBottom: 48 }}>
                {isUpdatingIPFS ? 'Uploading...' : 'Your asset is ready to be uploaded to IPFS.'}
              </Text>

              <Button
                className="upload-button"
                as={motion.div}
                bgColor={isUpdatingIPFS ? 'gray.500' : '#EC407A'}
                _hover={{ transform: 'scale(1.02)', cursor: isUpdatingIPFS ? 'pointer' : 'cancel' }}
                onClick={async (e) => {
                  e.preventDefault()
                  setIsUpdatingIPFS(true)
                  updateAsset?.() // Function to upload asset to IPFS
                }}
                disabled={isUpdatingIPFS}>
                Upload to IPFS
              </Button>
            </>
          ) : null}

          {/* {asset?.storage?.ipfs?.cid !== 'undefined' ? setIsUpdatingIPFS(false) : null} */}
          {asset?.storage?.ipfs?.cid ? (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid whitesmoke', padding: 24 }} maxWidth="700px">
                <Text as={'h3'} style={{ fontWeight: '600', fontSize: 24, marginBottom: 24 }}>
                  Congrats, your asset was uploaded to IPFS.
                </Text>

                <Text style={{ fontWeight: '700' }}>Asset Details is as follows:</Text>
                <div style={{ color: 'whitesmoke', lineHeight: 1.75 }}>
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
              </Stack>
            </>
          ) : null}

          <ErrorBoundary fallback={<p>{deployError}</p>}>
            {asset?.storage?.ipfs?.cid ? (
              <>
                {/* <MediaRenderer alt={asset.name} src={'ipfs://bafybeifgj7b7wsyz445q7efrw5fspfkeru6ibpqlyvgguqtxkasf3j5hyy/'} /> */}
                <Box my={24} style={{ border: '1px solid whitesmoke', padding: 24 }} maxWidth="700px">
                  <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 24 }}>Now deploy the contract for your uploaded Asset</Text>
                  <br />
                  <Button
                    className="mint-button"
                    as={motion.div}
                    bgColor="#EC407A"
                    _hover={{ transform: 'scale(1.02)', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault()
                      deployNftCollection?.({ image_url: String(asset?.storage?.ipfs?.cid) }) // Function to deploy edition drop contract
                      console.log('Deploy contract called..', asset?.storage?.ipfs?.cid)
                    }}>
                    Deploy Contract
                  </Button>
                </Box>
              </>
            ) : null}
          </ErrorBoundary>

          {contract?.getAddress()}
          {contract && (
            <Web3Button
              contractAddress={contract?.getAddress()}
              action={async (contractDeployed) => {
                const ext = getAllDetectedExtensionNames(contractDeployed.abi)
                console.log(ext)
                await contractDeployed.call('lazyMint', [address, asset?.storage?.ipfs?.cid])
              }}
              onSubmit={() => console.log('Txn submitted')}
              onSuccess={(res) => console.log('Web3Btn successful...', res)}
              onError={(err) => console.log('Web3Btn successful...', err.message)}>
              Mint NFT
            </Web3Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default WagmiNft

const w = {
  id: '239412fa-f705-431f-bb48-cc24b8aa8b1f',
  hash: [
    { hash: '9269db475787d1e6b014262638317144', algorithm: 'md5' },
    { hash: '20bc1967a7c49c8fc4ab5dddd11961644f9781fe3f1a8feaab9b901c2fe09412', algorithm: 'sha256' },
  ],
  name: 'way ',
  size: 1389751,
  source: { type: 'directUpload' },
  status: { phase: 'ready', updatedAt: 1691773103543 },
  userId: 'ae4beb89-7a71-4100-b48e-78a3de9f1e11',
  storage: {
    ipfs: {
      cid: 'bafybeifgj7b7wsyz445q7efrw5fspfkeru6ibpqlyvgguqtxkasf3j5hyy',
      spec: { nftMetadata: {} },
      updatedAt: 1691773103543,
      nftMetadata: {
        cid: 'bafkreicpmltyyyeknuj3zkarveshgi2azgen2xuy67k5jlysjmny3lnyty',
        url: 'ipfs://bafkreicpmltyyyeknuj3zkarveshgi2azgen2xuy67k5jlysjmny3lnyty',
        gatewayUrl: 'https://ipfs.livepeer.studio/ipfs/bafkreicpmltyyyeknuj3zkarveshgi2azgen2xuy67k5jlysjmny3lnyty',
      },
      url: 'ipfs://bafybeifgj7b7wsyz445q7efrw5fspfkeru6ibpqlyvgguqtxkasf3j5hyy',
      gatewayUrl: 'https://ipfs.livepeer.studio/ipfs/bafybeifgj7b7wsyz445q7efrw5fspfkeru6ibpqlyvgguqtxkasf3j5hyy',
    },
    status: { phase: 'ready', tasks: { last: '8aa24447-22e8-4476-885a-0a7311f19cac' } },
  },
  createdAt: 1691770017304,
  creatorId: { type: 'unverified', value: '0x32466Aa64E0525E731b41b884DAB8fff3B9c5448' },
  videoSpec: { format: 'mp4', duration: 25.567 },
  playbackId: '239430yk9vcmflck',
  downloadUrl: 'https://lp-playback.com/hls/239430yk9vcmflck/video',
  playbackUrl: 'https://lp-playback.com/hls/239430yk9vcmflck/index.m3u8',
}

const asset = {
  title: 'way ',
  description: 'mile path',
  animation_url: '',
  external_url: '',
  image_url: '',
  properties: { playbackId: '239430yk9vcmflck', videoIpfs: 'undefined' },
  numToMint: '24',
  pricePerNFT: '1.35',
}

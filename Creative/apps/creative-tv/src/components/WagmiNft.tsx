import { Box, Button, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import { ConnectWallet, MediaRenderer, NFT, useAddress, useContract, useMetadata, useSigner } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { CREATIVE_ADDRESS, NEXT_PUBLIC_THIRDWEB_API_KEY } from 'utils/config'
import { ethers } from 'ethers'
import { deployEditionDropContract, formatString } from 'utils/helpers'
import { CREATIVE_ADDRESS, NAME_OF_SAVED_CONTRACT_ADDRESS } from '../utils/config'
import { windowStorage } from '../utils/helpers'
import { AssetData } from './CreateAndViewAsset'
import { LazyMinting } from './LazyMinting'
import { ListOfLazyMintedNfts } from './ListOfLazyMintedNfts'
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
  const router = useRouter()
  const signer = useSigner()
  const toast = useToast()
  const [deployError, setDeployError] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [lazyMintTxStatus, setLazyMintTxStatus] = useState<number | undefined>(0)
  const [lazyMintTxHash, setLazyMintTxHash] = useState('')
  const [error, setError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showMetadataDetails, setMetadataDetails] = useState(false)
  const [deployedContractAddress, setDeployedContractAddress] = useState<string>('')
  const [txCount, setTxCount] = useState(0)
  const [lazyMintedTokens, setLazyMintedTokens] = useState<NFT[]>([])
  const { contract: nftContract } = useContract(deployedContractAddress)
  const { data: contractMetadata, isLoading } = useMetadata(nftContract)

  useEffect(() => {
    /////////////////////////////////////////////
    // Fetch contractAddress if user already deployed
    /////////////////////////////////////////////
    const savedContractAddress = windowStorage.get({ name: NAME_OF_SAVED_CONTRACT_ADDRESS })

    if (savedContractAddress) {
      // set contractAddress to state
      setDeployedContractAddress(savedContractAddress)
    }

    /////////////////////////////////////////////
    // Fetch lazyMint txHash if user already lazy minted
    /////////////////////////////////////////////

    async function getLazyMintTxHash() {
      const txCount = await signer?.getTransactionCount()
      setTxCount(txCount!)

      // EditionDrop::LAZY_MINT_TX_HASH:1
      const savedLazyTxHas = windowStorage.get({ name: `LAZY_MINT_TX_HASH:${1}` })

      // TODO:
      // Try to get the txn hash from localhost
      //////////////////////
      console.log('savedLazyTxHas: ', savedLazyTxHas)

      if (savedLazyTxHas) {
        // set contractAddress to state
        setLazyMintTxHash(savedLazyTxHas)
      }
    }
    getLazyMintTxHash()

    return () => {}
  }, [deployedContractAddress])

  useEffect(() => {
    //////////////////////////
    // listen to the events
    nftContract?.events.listenToAllEvents(async (e) => {
      //  when lazyMint is done
      if (e.eventName == 'TokensLazyMinted') {
        console.log('eventData: ', e.data)
        fetchNFTs()
      }

      // TODO:   ClaimConditions is set (delete after)
      if (e.eventName == 'ClaimConditionsUpdated') {
        // TODO: Call a function to update when this event happens
        console.log('eventData: ', e.data)
      }
    })

    fetchNFTs()
    return () => {
      nftContract?.events.removeAllListeners()
    }
  }, [nftContract])

  const fetchNFTs = async () => {
    const lazyMintedTokens = await nftContract?.erc1155.getAll()
    setLazyMintedTokens(lazyMintedTokens as any)
  }

  const getClaimConditionsById = async (tokenId: string) => {
    // fetch all existing claim conditions
    try {
      const claimConditions = await nftContract?.erc1155.claimConditions.getAll(tokenId)

      if (claimConditions?.length) {
        return claimConditions
      }
      return []
    } catch (err: any) {
      throw Error(err.message)
    }
  }

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
  const deployNftCollection = async () => {
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
        image: props.assetData.image_url || 'Not available',
        description: props.assetData.description,
        trusted_forwarders: [CREATIVE_ADDRESS],
      })

      // save CONTRACT_ADDRESS to localStorage
      windowStorage.set({ name: NAME_OF_SAVED_CONTRACT_ADDRESS, value: contractAddress! })
      console.log('Contract deployed: ', contractAddress)

      setDeployedContractAddress(contractAddress!)

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

  // lazyMint nft - uploads and creates the NFTs on chain
  const handleLazyMintNFT = async () => {
    try {
      setIsMinting(true)

      console.log('nftAmount: %s, nftCID: %s', ethers.BigNumber.from(props.assetData.nFTAmountToMint), JSON.stringify(asset?.storage?.ipfs?.url))

      const nftMetadata = [
        {
          name: `${asset?.name}`,
          description: String(asset?.storage?.ipfs?.spec?.nftMetadata?.description),
          image: asset?.storage?.ipfs?.url,
          animation_url: '',
          attributes: [
            {
              trait_type: 'Background',
              value: 'Black',
            },
          ],
          properties: {
            image_url: '',
            pricePerNFT: '2.5',
            external_url: '',
            animation_url: '',
            nFTAmountToMint: 80,
          },
        },
      ]
      console.log('nftMetadata: ', nftMetadata)

      let receipt: ethers.providers.TransactionReceipt
      const lazyMint = await nftContract?.erc1155.lazyMint(nftMetadata)

      if (lazyMint && lazyMint.length) {
        receipt = lazyMint[0].receipt
        setLazyMintTxStatus(receipt!.status)
        setLazyMintTxHash(receipt.transactionHash)

        // save to localStorage
        windowStorage.set({
          name: `LAZY_MINT_TX_HASH:${txCount}`,
          value: receipt.transactionHash,
        })

        console.log('[handleLazyMintNFT: tx.receipt] ', receipt)
      } else {
        setIsMinting(false)
      }

      toast({
        title: 'Lazy Minting',
        description: `Minting was successfully with txHash: ${lazyMintTxHash}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err: any) {
      console.error(err)
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
  // Promise<typeof nftContract | undefined>
  const handleSetClaimCondition = async (formData: any, tokenId: string): Promise<boolean | undefined> => {
    try {
      const claimConditions = await nftContract?.erc1155.claimConditions.set(tokenId, [
        {
          startTime: formData.startTime, // When the phase starts (i.e. when users can start claiming tokens)
          maxClaimableSupply: formData.maxClaimableSupply, // limit how many mints for this presale
          price: formData.price, // presale price
          currencyAddress: formData.currencyAddress, // The address of the currency you want users to pay in
          maxClaimablePerWallet: formData.maxClaimablePerWallet, // The maximum number of tokens a wallet can claim
          metadata: {
            name: formData.phaseName, // Name of the sale's phase
          },
          waitInSeconds: formData.waitInSeconds, // How long a buyer waits before another purchase is possible
        },
      ])

      console.log('SetClaimConditions tx: ', claimConditions?.receipt)

      toast({
        title: 'Set Claim Conditions',
        description: `Status: ${claimConditions?.receipt.status}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      if (Number(claimConditions?.receipt.status) > 0) {
        // return nftContract
        return Number(claimConditions?.receipt.status) > 0
      }

      return undefined
    } catch (err) {
      console.log('claimConditions txError: ', err)

      toast({
        title: 'Set Claim Conditions',
        description: `Status: 0`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleUpdateAsset = (e: any) => {
    e.preventDefault()
    // Check if contract was already deployed
    const deployContract = windowStorage.get({ name: NAME_OF_SAVED_CONTRACT_ADDRESS })
    console.log('deployContract: ', deployContract)
    if (deployContract !== undefined) {
      setDeployedContractAddress(deployContract)
    }

    updateAsset?.() // Function to upload asset to IPFS
  }

  return (
    <Box className="address-mint" minH={'600'}>
      {!connectedAddress && (
        <ConnectWallet
          btnTitle={'Sign In'}
          className="signIn-button"
          style={{
            marginBottom: '24px',
            margin: '48px 0',
            fontWeight: '600',
          }}
        />
      )}

      {notification ? (
        <Text as={'h3'} my={8} style={{ fontWeight: '600', fontSize: 24 }}>
          {notification()}
        </Text>
      ) : null}

      {connectedAddress && props.assetId && (
        <>
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
            <>
              <Stack spacing="20px" my={12} style={{ border: '1px solid #a4a4a4', padding: 24 }}>
                <Text my={4} style={{ fontWeight: '600', fontSize: 24 }}>
                  Your asset is ready to be saved to IPFS.
                </Text>
                <Button
                  my={8}
                  w={'160px'}
                  className="upload-button"
                  bgColor="#EC407A"
                  disabled={updateStatus === 'loading'}
                  _hover={{
                    transform: asset?.storage?.status?.phase === 'processing' ? '' : 'scale(1.02)',
                    cursor: asset?.storage?.status?.phase === 'processing' ? 'progress' : 'pointer',
                  }}
                  onClick={handleUpdateAsset}>
                  {updateStatus === 'loading' ? 'Saving to IPFS...' : 'Save to IPFS'}{' '}
                </Button>
              </Stack>
            </>
          ) : null}

          {asset?.storage?.ipfs?.cid && (
            <Stack spacing="20px" my={12} style={{ border: '1px solid #aeaeae', padding: 24 }}>
              <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
                Congrats, your asset was uploaded to IPFS.
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
                <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} width="300px" alt={`${asset.name}`} />
                <Box style={{ lineHeight: 2.75 }}>
                  <Text>
                    Asset Name: <span style={{ fontWeight: '700' }}>{asset?.name}</span>{' '}
                  </Text>
                  <Text>
                    Metadata CID: <span style={{ fontWeight: '700' }}>{asset?.storage?.ipfs?.nftMetadata?.url ?? 'None'}</span>
                  </Text>
                </Box>
              </Box>
            </Stack>
          )}

          {!nftContract?.getAddress() && asset?.storage?.ipfs?.cid && (
            <Box my={16} style={{ border: '1px solid #aeaeae', padding: 24 }}>
              <ErrorBoundary fallback={<p>Failed to load...</p>}>
                <Text style={{ fontWeight: '500', fontSize: 20, marginBottom: 4 }}>Now deploy the contract for your uploaded Asset</Text>
                <br />
                <Button
                  className="deploy-button"
                  my={4}
                  // as={motion.div}
                  bgColor="#EC407A"
                  isLoading={isDeploying}
                  _hover={{ transform: isDeploying ? '' : 'scale(1.02)', cursor: isDeploying ? 'progress' : 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault()
                    deployNftCollection?.() // Function to deploy edition drop contract
                  }}>
                  {isDeploying ? 'Deploying Contract...' : 'Deploy Contract'}
                </Button>

                {!isDeploying && <span style={{ color: '#c1c1c1', fontWeight: 700 }}>{deployError}</span>}
              </ErrorBoundary>
            </Box>
          )}

          {asset?.storage?.ipfs?.nftMetadata?.cid && nftContract?.getAddress() && (
            <Stack spacing="20px" style={{ border: '1px solid #a4a4a4', padding: 24 }}>
              <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
                Contract deployed succesfully!
              </Text>

              <Button
                className="show-details-button"
                onClick={() => {
                  setMetadataDetails(!showMetadataDetails)
                }}
                style={{ maxWidth: 240, margin: '12px 0', backgroundColor: '#EC407A', marginTop: 4 }}>
                {showMetadataDetails ? 'Hide ' : 'Show '}Contract MetaData
              </Button>

              <Box my={8} style={{ display: showMetadataDetails ? 'block' : 'none' }}>
                <Flex direction={'column'} style={{ lineHeight: 2.75 }}>
                  <Text>
                    <span style={{ fontWeight: '700' }}>Contract Address: </span>
                    <span>{nftContract.getAddress()}</span>
                  </Text>
                  {getContractMetaData()}
                </Flex>
              </Box>
            </Stack>
          )}

          {asset?.storage?.ipfs?.nftMetadata?.cid && nftContract?.getAddress() && (
            <LazyMinting handleLazyMintNFT={handleLazyMintNFT} isMinting={isMinting} lazyMintTxHash={lazyMintTxHash} />
          )}

          {lazyMintedTokens && lazyMintedTokens.length > 0 && (
            <ListOfLazyMintedNfts
              lazyMintedTokens={lazyMintedTokens}
              handleSetClaimCondition={handleSetClaimCondition}
              nftMetadata={asset?.storage?.ipfs?.spec?.nftMetadata as any}
              getClaimConditionsById={getClaimConditionsById}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default WagmiNft

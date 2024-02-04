import { useState } from 'react'
import { 
  Box, 
  Button, 
  Stack, 
  Text, 
  useToast, 
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAsset, useUpdateAsset } from '@livepeer/react'
import { MediaRenderer, useAddress, useContract, useMetadata } from '@thirdweb-dev/react'
import { LinkComponent } from './layout/LinkComponent'
import { Emoji }  from './Emoji'
import { useContractAddress } from 'hooks/useContractAddress'
import useDeployEditionDrop from 'hooks/useDeployDrop'
import { deployEditionDropContract, formatString } from 'utils/helpers'
import { AssetData } from './CreateAndViewAsset'
import { LazyMintNft } from './LazyMintNft'
import { ErrorBoundary } from './hoc/ErrorBoundary'
import { set } from 'react-hook-form'
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

const WagmiNft = ({ assetId, assetData }: WagmiNftProps): JSX.Element => {
  const address = useAddress();
  const router = useRouter();
  const toast = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom hook for deploying contract
  const { deployedContractAddress, isDeploying, deploy } = useDeployEditionDrop({ assetId, assetData });

  // Function to initiate the deployment manually
  const handleDeployClick = () => {
    deploy();
  };

  // Asset fetching and updating logic
  const { data: asset, error: assetError, status: assetStatus } = useAsset({ assetId, refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false), });
  const { mutate: updateAsset, status: updateStatus, error: updateError } = useUpdateAsset(assetStatus === 'success' ? {
      name: String(asset?.name),
      assetId: String(asset?.id),
      storage: {
        ipfs: true,
        metadata: {
          description: assetData.description,
          image: assetData.image_url,
          properties: {
            animation_url: assetData.animation_url,
            external_url: assetData.external_url,
            image_url: assetData.image_url,
            nFTAmountToMint: assetData.nFTAmountToMint,
            pricePerNFT: assetData.pricePerNFT,
          },
        },
      },
    } : undefined
  );

  const handleNotification = () => {
    if (assetStatus === 'loading') {
      return 'Loading asset data...';
    } else if (assetError) {
      console.log("We've hit a snag", assetError);
      setError('Error loading asset data.');
      return 'Error loading asset data.';
    } else if (updateError) {
      console.log('Error updating asset data', updateError);
      setError('Error updating asset data.');
      return 'Error updating asset data.';
    }
    return null; // No notification needed
  };

  // Contract fetching and metadata handling
  const { contract: fetchedContract } = useContract(deployedContractAddress);
  const { data: metadata } = useMetadata(fetchedContract);

  // Metadata display logic
  const getContractMetaData = () => {
    if (metadata) {
      let keys = Object.keys(metadata);
      let values = Object.values(metadata);

      return (
        <div>
          {keys.map((k, i) => (
            <div key={i}>
              <p>
                <span style={{ fontWeight: '700' }}>{formatString?.removeUnderScore(k)}: </span>{typeof values[i] === 'string' ? values[i] : JSON.stringify(values[i])}
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  // Minting NFTs
  const mintNFT = async () => {
    if (!fetchedContract) {
      console.error("Contract is not available");
      setIsMinting(false);
      setError('Contract not available.');
      return;
    }
    try {
      setIsMinting(true);
      // Assuming `lazyMint` is a method in your contract
      const txn = await fetchedContract.call('lazyMint', [assetData.nFTAmountToMint, asset?.storage?.ipfs?.cid, []]);
      // Handling transaction receipt or confirmation
      console.log('[Minted] ', txn.receipt);
      toast({
        title: 'NFT Minted',
        description: 'Successfully minted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirect or update UI after minting
      router.replace(`/profile/${address}`);
    } catch (err) {
      console.error(err);
      setIsMinting(false);
      setError('Minting failed.');
      toast({
        status: 'error',
        title: 'NFT not minted',
        description: 'Minting failed. Please try again.',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Update asset to IPFS
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
    <Box className="address-mint" minH="600px">
      { !address ? (
        <SignIn btnTitle="Sign In" />
      ) : (
        <>
          { handleNotification() && (
            <Text as="h3" my={8} style={{ fontWeight: '600', fontSize: '24px' }}>
              { handleNotification() }
            </Text>
          )}
  
          { assetStatus === 'loading' && (
            <Flex justifyContent="center" my={8}>
              <Spinner size="xl" />
            </Flex>
          )}
  
          { error && (
            <Text color="red.500" my={4}>
              Error: {error}
            </Text>
          )}
  
          { asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="1200px">
                <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} alt={asset?.name} width="100%" height="auto" />
                <Heading as="h2" size="lg" my={4}>
                  Your video is now ready to be saved to IPFS.
                </Heading>
                <Button
                  my={8}
                  w={160}
                  className="upload-button"
                  bgColor="#EC407A"
                  isLoading={updateStatus === 'loading'}
                  disabled={ updateStatus === 'loading' || asset?.storage?.status?.phase === 'processing'}
                  _hover={{
                    transform: asset?.storage?.status?.phase === 'processing' ? '' : 'scale(1.02)',
                    cursor: asset?.storage?.status?.phase === 'processing' ? 'progress' : 'pointer',
                  }}
                  onClick={handleUpdateAssetToIPFS}>
                  {updateStatus === 'loading' ? 'Saving to IPFS...' : 'Save to IPFS'}{' '}
                </Button>
              </Stack>
          ) : null }

          {asset?.storage?.ipfs?.cid && (
            <Stack spacing="20px" my={12} style={{ border: '1px solid #aeaeae', padding: 24 }}>
              <Heading as={'h2'} size={'lg'} my={2}>
                <Emoji symbol={'🔥'}></Emoji> Congrats, your asset was uploaded to IPFS!
              </Heading>

              <Button
                width={160}
                className="show-details-button"
                my={4}
                onClick={() => setShowDetails(!showDetails)}
                style={{ backgroundColor: '#EC407A' }}>
                {showDetails ? 'Hide ' : 'Show '}Details
              </Button>

              <Box my={8} style={{ display: showDetails ? 'block' : 'none' }}>
                <Heading as="h3" size={'lg'} mb={8}>
                  Asset details:
                </Heading>
                <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} width="300px" alt={`${asset.name}`} />
                <Box style={{ lineHeight: 2.75 }}>
                  <Text>
                  <span style={{ fontWeight: '700' }}>Asset Name: </span>{asset?.name}{' '}
                  </Text>
                  <Text>
                  <span style={{ fontWeight: '700' }}>Asset Description: </span>{assetData.description ?? 'None'}
                  </Text>
                  <Text>
                  <span style={{ fontWeight: '700' }}>Metadata CID: </span><LinkComponent href={`${asset?.storage?.ipfs?.nftMetadata?.gatewayUrl}`}>{asset?.storage?.ipfs?.nftMetadata?.cid ?? 'None'}</LinkComponent>
                  </Text>
                </Box>
              </Box>
            </Stack>
          )}
  
          { !deployedContractAddress ? (
            <Button
            my={8}
            w={160}
            bgColor="#EC407A"
            isLoading={isDeploying}
            disabled={isDeploying || !asset || updateStatus === 'loading'}
            onClick={() => { handleDeployClick() }}>
              Deploy Contract
            </Button>
          ) : (
              <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }}>
                <Heading as="h2" size='lg' my={2}>
                  <Emoji symbol='🎉'></Emoji> Contract Deployed Successfully! 
                </Heading>
                <Button
                  my={4}
                  width={160}
                  bgColor="#EC407A"
                  onClick={() => setShowDetails(!showDetails)}>
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </Button>
  
                {showDetails && (
                  <Box my={8}>
                    <Text><span style={{ fontWeight: '700' }}>View Deployed Contract: </span><LinkComponent href={`https://mumbai.polygonscan.com/address/${deployedContractAddress}`} >{deployedContractAddress}</LinkComponent></Text>
                    {getContractMetaData()}
                  </Box>
                )}
              </Stack>
          )}
  
          {isDeploying && (
            <Flex justifyContent="center" my={8}>
              <Spinner size="xl" label="Deploying contract..." />
              <Text ml={4}>Deploying contract...</Text>
            </Flex>
          )}
  
          {deployedContractAddress && (
            <Stack spacing="20px" my={12} style={{ border: '1px solid', padding: 24 }} maxWidth="700px">
              <Text as="h4" my={2} style={{ fontWeight: '500', fontSize: 22 }}>
                Time to mint your NFTs!
              </Text>
              <Button
                bgColor="#EC407A"
                onClick={mintNFT}
                isLoading={isMinting}
                disabled={isMinting}>
                {isMinting ? 'Minting...' : 'Mint NFT'}
              </Button>
            </Stack>
          )}
        </>
      )}
    </Box>
  );  
};

export default WagmiNft

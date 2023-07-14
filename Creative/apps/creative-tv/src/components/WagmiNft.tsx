import { useMemo } from 'react';
import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAddress, useSigner, useStorageUpload, MediaRenderer, useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { EXPLORER_API_URL, EXPLORER_KEY, CREATIVE_ADDRESS } from 'utils/config';
import { videoNftAbi } from './videoNftAbi';
import { AssetData } from './CreateAndViewAsset';
import useDeployEditionDrop from 'hooks/useDeployDrop';
import { d } from '@wagmi/cli/dist/config-c09a23a5';

interface WagmiNftProps {
  assetId: string;
  assetName: string;
  description: string;
  assetData: AssetData;
}

const WagmiNft = ({ assetData, assetName, description }: WagmiNftProps): JSX.Element => {
  const address = useAddress();
  const router = useRouter();
  const signer = useSigner();
  const [contractDeployed, setContractDeployed] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [
    router?.query,
  ]);

    // Getting asset and refreshing for the status
    const {
      data: asset,
      error: assetError,
      status: assetStatus,
    } = useAsset({
      assetId: assetId,
      refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
    });
    if (assetStatus === 'loading') {
      // Render loading state
      return <Box>Loading asset data...</Box>;
    } else if (assetError) {
      // Render error state
      return <Box>Error fetching asset data</Box>;
    }
  
    // Storing asset to IPFS with metadata by updating the asset
    const { mutate: updateAsset, status: updateStatus, error: updateError } = useUpdateAsset(
      asset
        ? {
            name: assetName,
            assetId: asset.id,
            storage: {
              ipfs: true,
              metadata: {
                description: assetData.description,
                image: assetData.image_url, // clear the default thumbnail
              },
            },
          }
        : undefined
    );
    if (updateStatus === 'loading') {
    // Render loading state
    console.log('Loading asset data to IPFS...', updateStatus) ;
    return <Box>Loading asset data to IPFS...</Box>;
  }

  if (updateError) {
    // Render error state
    return <Box>Error fetching asset data for IPFS</Box>;
  }
  
        // Function to deploy the edition drop contract
        const deployNftCollection = async () => {
          // Is there an sdk found and is there a connect wallet address?
          if (!signer || !address) return
          const sdk = ThirdwebSDK.fromSigner(signer);
      
           // Is there an sdk found?
          if (!sdk) return;
          
          // Is there a name and description?
          if (!description || !assetName) return
      
          const deployed = await sdk.deployer.deployEditionDrop({
            name: assetName,
            primary_sale_recipient: address,
            app_uri: "https://tv.creativeplatform.xyz", // Website of your contract dApp
            symbol: 'EPISD', // Symbol of the edition drop
            platform_fee_basis_points: 200,
            platform_fee_recipient: CREATIVE_ADDRESS,
            fee_recipient: address,
            seller_fee_basis_points: 300,
          })
          console.log('Contract deployed', deployed)
          setContractDeployed( deployed )
          
        }

        const { contract } = useContract(contractDeployed)
        const { mutateAsync, isLoading: lazyIsLoading, error: lazyError, isSuccess: lazySuccess } = useContractWrite(contract, "lazyMint");
  

  return (
    <Box className="address-mint">
      <Button className="card-mint-button" as={motion.div} _hover={{ transform: 'scale(1.1)' }}>
        {!address ? 'Sign In' : address}
      </Button>
      {address && assetId && (
        <>
          <p>{assetId}</p>
          <MediaRenderer src={`${assetData.properties.videoIpfs}`} />
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
            <Button
              className="upload-button"
              as={motion.div}
              bgColor="#EC407A"
              _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                updateAsset?.(); // Function to upload asset to IPFS
              }}
            >
              Upload to IPFS
            </Button>
          ) : null}

          {asset?.storage?.ipfs?.cid ? (
            <Button
              className="mint-button"
              as={motion.div}
              bgColor="#EC407A"
              _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                deployNftCollection?.();// Function to deploy edition drop contract
              }}
            >
              Deploy Contract
            </Button>
          ) : null }
          <Web3Button
            contractAddress=''
            action={(contractDeployed) => {
              contractDeployed.call('lazyMint', [address, asset?.storage?.ipfs?.cid])
            }}
          ></Web3Button>
        </>
      )}
    </Box>
    );
}


export default WagmiNft;

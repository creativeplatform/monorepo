import { useMemo } from 'react';
import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';
import { Box, Button, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAddress } from '@thirdweb-dev/react';
import useDeployEditionDrop from 'hooks/useDeployDrop';
import { EXPLORER_API_URL, EXPLORER_KEY } from 'utils/config';
import { videoNftAbi } from './videoNftAbi';
import { AssetData } from './CreateAndViewAsset';

interface WagmiNftProps {
  assetId: string;
  assetData: AssetData;
}

const WagmiNft = ({ assetId, assetData }: WagmiNftProps): JSX.Element => {
  const deployEditionDrop = useDeployEditionDrop({assetId, assetData}); // Custom hook for deploying edition drop contract
  const address = useAddress();
  const router = useRouter();
  // const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [
  //   router?.query,
  // ]);

    // Getting asset and refreshing for the status
    const {
      data: asset,
      error: assetError,
      status: assetStatus,
    } = useAsset({
      assetId: assetId,
      refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
    });
  
    // Storing asset to IPFS with metadata by updating the asset
    const { mutate: updateAsset, status: updateStatus, error } = useUpdateAsset(
      asset
        ? {
            name: asset.name,
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

    // Lazy mint the NFT
    // const lazyMintNft = async ()=> {
    //   const { mutateAsync, isLoading, error, isSuccess } = useContractWrite(editionDrop, "lazyMint");
    // };

  if (updateStatus === 'loading') {
    // Render loading state
    return <Box>Loading asset data...</Box>;
  }

  if (error) {
    // Render error state
    return <Box>Error fetching asset data</Box>;
  }

  return (
    <Box className="address-mint">
      <Button className="card-mint-button" as={motion.div} _hover={{ transform: 'scale(1.1)' }}>
        {!address ? 'Sign In' : address}
      </Button>
      {address && assetId && (
        <>
          <p>{assetId}</p>
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
                deployEditionDrop; // Function to deploy edition drop contract
              }}
            >
              Mint NFT
            </Button>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default WagmiNft;

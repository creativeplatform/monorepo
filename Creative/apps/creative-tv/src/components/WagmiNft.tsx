import { useMemo } from 'react';
import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';
import { Box, Button, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAddress } from '@thirdweb-dev/react';
import useDeployEditionDrop from 'hooks/useDeployDrop';
import { EXPLORER_API_URL, EXPLORER_KEY } from 'utils/config';
import { videoNftAbi } from './videoNftAbi';

const WagmiNft = () => {
  const deployEditionDrop = useDeployEditionDrop(); // Custom hook for deploying edition drop contract
  const address = useAddress();
  const router = useRouter();
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [
    router?.query,
  ]);
  
   // Getting asset and refreshing for the status
   const {
    data: asset,
    error,
    status: assetStatus,
  } = useAsset({
    assetId: createdAsset?.[0].id,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  });
  

  const { mutate: updateAsset } = useUpdateAsset(
    asset
      ? {
          name: asset.name,
          assetId: asset.id,
          storage: {
            ipfs: true,
          },
        }
      : null
  );

  if (assetLoading) {
    // Render loading state
    return <Box>Loading asset data...</Box>;
  }

  if (assetError) {
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
                deployEditionDrop // Function to deploy edition drop contract
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


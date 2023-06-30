import { useMemo, useEffect } from 'react';
import { useAsset, useUpdateAsset } from '@livepeer/react'
import { AddressZero } from '@ethersproject/constants';
import { readFileSync } from 'fs';
import { useRouter } from 'next/router';
import {
  ThirdwebProvider,
  useAddress,
  useSigner,
  useContract,
  useContractWrite,
  useContractRead,
  useContractEvents,
  useContractMetadata,
} from '@thirdweb-dev/react';
import sdk from 'hooks/useInitThirdweb';
// The ContractMetadata smart contract is an extension usable with any smart contract. It lets you define metadata for your smart contract.
// Additionally, ContractMetadata is necessary to enable royalties on NFT contracts on OpenSea.
// See: https://portal.thirdweb.com/solidity/extensions/contractmetadata
import '@thirdweb-dev/contracts/extension/ContractMetadata.sol';
import { Box, Button, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CREATIVE_ADDRESS, EXPLORER_KEY, EXPLORER_API_URL } from 'utils/config';

const WagmiNft = async () => {
  const toast = useToast();
  // Retrieve the user's account address
  const address = useAddress();

  // If there is an address we can use the useSigner hook to get a signer instance
  const signer = useSigner();

  // Access the Next.js router
  const router = useRouter();

  // Extract the assetId from the router's query parameters
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query]);

  // Fetch the asset data using the useAsset hook
  const { data: asset, isError: assetError, isLoading: assetLoading } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  });

  // Check if the asset data is still loading
  if (assetLoading) {
    // Render loading state
    return <Box>Loading asset data...</Box>;
  }

  // Check if there was an error fetching the asset data
  if (assetError) {
    // Render error state
    return <Box>Error fetching asset data</Box>;
  }

  // Retrieve the updateAsset function from the useUpdateAsset hook
  const { mutate: updateAsset } = useUpdateAsset(
    asset
      ? {
          assetId: asset.id,
          storage: {
            ipfs: true,
          },
        }
      : null
  );
  const deployDrop = async () => {
      try {
        const editionDropAddress = await sdk?.deployer.deployEditionDrop({
          name: 'Creative Episode Drop',
          description: 'This text will be replaced by the description of the episode.', // Description of the content
          image: readFileSync(`${asset?.storage?.ipfs?.nftMetadata?.url}`), // Image of the content
          primary_sale_recipient: `${address}`,
        });
        // this initialization returns the address of our contract
        // we use this to initialize the contract on the thirdweb sdk
        const editionDrop = await sdk?.getContract(`${editionDropAddress}`, "edition-drop");

        // With this, we can get the metadata of our contract
        const metadata = await editionDrop?.metadata.get();
        
        // Successfully deployed edition drop contract
        console.log(
          "✅ Successfully deployed editionDrop contract, address:",
          editionDropAddress,
        );
        toast({
          title: '⏳ Not Done Yet - Creating MetaData...',
          description: `Contract deployed successfully: ${editionDropAddress}`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        // Successfully created metadata
        console.log("✅ editionDrop metadata:", metadata);
        toast({
          title: '⏳ Not Done Yet - Verifying...',
          description: `Contract deployed successfully: ${editionDropAddress}`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        const verifiedEditionDrop = await sdk?.verifier.verifyThirdwebContract(`${editionDropAddress}`, EXPLORER_API_URL.GOERLI, EXPLORER_KEY);
        // Contract verified successfully
        console.log('✅ Contract verified successfully', verifiedEditionDrop);
        toast({
          title: '🎉 Done!',
          description: `Successfully Verified ${editionDropAddress}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        // Handle deployment error
        console.error('failed to deploy editionDrop contract', error);
      }
    };
    
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
              bgColor={'#EC407A'}
              _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
              onClick={() => {
                updateAsset?.();
              }}
            >
              Upload to IPFS
            </Button>
          ) : asset?.storage?.status?.phase === 'ready' ? (
            <Button
              className="mint-button"
              as={motion.div}
              bgColor={'#EC407A'}
              _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
              onClick={() => {
                deployDrop();
              }}
            >
              Mint NFT
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default WagmiNft;

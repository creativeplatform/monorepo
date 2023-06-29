import { useEffect } from 'react';
import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
// import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import {
  useAddress,
  useSigner,
  useSDK,
  useContract,
  useContractWrite,
  useContractRead,
  useContractEvents,
  useContractMetadata,
} from '@thirdweb-dev/react';

// The ContractMetadata smart contract is an extension usable with any smart contract. It lets you define metadata for your smart contract.
// Additionally, ContractMetadata is necessary to enable royalties on NFT contracts on OpenSea.
// See: https://portal.thirdweb.com/solidity/extensions/contractmetadata
import '@thirdweb-dev/contracts/extension/ContractMetadata.sol';
import { Box, Button, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CREATIVE_ADDRESS } from 'utils/config';

const WagmiNft = () => {
  const toast = useToast();
  // Retrieve the user's account address
  const address = useAddress();

  // If there is an address we can use the useSDK hook to get an SDK instance
  const sdk = useSDK();

  // If there is an address we can use the useSigner hook to get a signer instance
  if (address) {
    const signer = useSigner();
  }

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

  function _canSetContractURI(): typeof address {
    // Function implementation goes here
    return address;
  }

  const explorerAPIURL = 'https://api-goerli.etherscan.io/';
  const explorerAPIKey = 'WQIC9NYX6QTNPH4QCKCETQ7XQH76DRWI6G';

  const deployNFT = async () => {
    if (sdk) {
      try {
        const contractAddress = await sdk?.deployer.deployBuiltInContract('edition-drop', {
          name: 'Creative Episode Drop',
          primary_sale_recipient: address,
          voting_token_address: address, // Replace with the actual meToken address or the creator address
          app_uri: 'https://tv.creativeplatform.xyz',
          description: 'This text will be replaced by the description of the episode.', // Description of the content
          image: asset?.storage?.ipfs?.nftMetadata?.url,
          symbol: 'EPISD',
          platform_fee_basis_points: 500, // 5% platform fee,
          platform_fee_recipient: address, // service fee for creator to pay
          fee_recipient: CREATIVE_ADDRESS, // Fee is paid to DAO wallet
          seller_fee_basis_points: 100, // 1% fee from the seller of the membership
        });
        console.log('Contract Address:', contractAddress);
        toast({
          title: '⏳ Not Done Yet - Verifying...',
          description: `Contract deployed successfully: ${contractAddress}`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        const contract = await sdk?.getContract(contractAddress);
        const verfiedNFT = await sdk?.verifier.verifyThirdwebContract(contract.erc1155.getAddress(), explorerAPIURL, explorerAPIKey);
        console.log('Contract verified successfully', verfiedNFT);
        toast({
          title: '🎉 Done!',
          description: `Successfully Verified!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        }); // Add toast message for contract verification
        
      } catch (error) {
        // Handle deployment error
        console.error('Error deploying the contract:', error);
      }
    } else {
      console.error('SDK is not defined.'); // Handle the case when SDK is not initialized
    }
  };

  useEffect(() => {
    if (address && assetId && asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready') {
      updateAsset?.();
    }
  }, [address, assetId, asset]);

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
                deployNFT();
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

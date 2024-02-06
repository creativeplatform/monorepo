import { useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { CREATIVE_ADDRESS } from 'utils/config';
import { AssetData } from '../components/CreateAndViewAsset';

interface WagmiNftProps {
  assetId: string;
  assetData: AssetData;
}

// Custom hook for deploying edition drop contract
const useDeployEditionDrop = ({ assetId, assetData }: WagmiNftProps) => {
  const toast = useToast();
  const address = useAddress();
  const sdk = useSDK();
  const [deployedContractAddress, setDeployedContractAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const deploy = useCallback(async () => {
    if (!sdk || !address) {
      toast({
        title: 'Deployment Error',
        description: "SDK or address not found. Please ensure you're connected.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsDeploying(true);

    try {
      // Simulate deploying a contract
      const editionDropAddress = await sdk.deployer.deployBuiltInContract('edition-drop', {
        name: 'CRTV Episode Drop', // Name of the edition drop
        primary_sale_recipient: address, // Address of the primary sale recipient
        app_uri: "https://tv.creativeplatform.xyz", // Website of your contract dApp
        symbol: 'EPISD', // Symbol of the edition drop
        tokenURI: `https://ipfs.io/ipfs/${assetData.properties.videoIpfs}`, // IPFS URI of the video
        platform_fee_basis_points: 200,
        platform_fee_recipient: CREATIVE_ADDRESS,
        fee_recipient: address,
        seller_fee_basis_points: 300,
        metadata: {
          id: assetId, // ID of the video
          name: assetData.title, // Title of the video
          description: assetData.description, // Description of the video
          image: assetData.image_url, // Thumbnail of the video
          properties: {
            playbackId: assetData.properties.playbackId, // Playback ID of the video
            videoIpfs: assetData.properties.videoIpfs, // IPFS URI of the video
          },
        },
      });
      setDeployedContractAddress(editionDropAddress);
      toast({
        title: 'Deployment Successful',
        description: `Edition Drop deployed at ${editionDropAddress}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log('Failed to deploy editionDrop contract', error);
      toast({
        title: 'Deployment Error',
        description: 'Failed to deploy editionDrop contract',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsDeploying(false);
    }
  }, [sdk, address, toast]);

  return { deployedContractAddress, isDeploying, deploy };
};

export default useDeployEditionDrop;
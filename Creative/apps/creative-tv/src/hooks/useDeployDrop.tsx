import { useEffect, useState } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { useToast } from '@chakra-ui/react';
import { useSDK, useSigner, useAddress } from '@thirdweb-dev/react';
import { NFTMetadata, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CREATIVE_ADDRESS } from 'utils/config';

// Custom hook for deploying edition drop contract
const useDeployEditionDrop = () => {
  const toast = useToast();
  const address = useAddress();
  const signer = useSigner();
  const [editionDropAddress, setEditionDropAddress] = useState<string | null>(null);

  if (address && signer) {
    const sdk = ThirdwebSDK.fromSigner(signer)

    useEffect(() => {
      // Function to deploy the edition drop contract
      const deployEditionDrop = async () => {
        try {
          // Deploy the edition drop contract
          const editionDropAddress = await sdk?.deployer.deployEditionDrop({
            name: 'Creative Episode Drop', // Name of the contract
            primary_sale_recipient: address, // Wallet address to receive funds from sales
            // Optional Platform fee information
            description: 'An episode of Creative TV', // Description of your contract
            symbol: 'EPISD',
            image: 'https://storage.unlock-protocol.com/b7ed38f5-1c6f-4747-af62-250dbc6afafc',
            platform_fee_basis_points: 100,
            platform_fee_recipient: CREATIVE_ADDRESS,
            fee_recipient: address,
            seller_fee_basis_points: 100,
          });

          // Update the editionDropAddress state in the parent component
          setEditionDropAddress(editionDropAddress);
  
          // Get the contract instance
          const editionDrop = await sdk?.getContract(`${editionDropAddress}`, 'edition-drop');
  
          // Get the metadata of the contract
          const metadata = await editionDrop?.metadata.get();
  
          console.log('✅ Successfully deployed editionDrop contract, address:', editionDropAddress);
          console.log('✅ editionDrop metadata:', metadata);
  
          // Show toast notification for successful verification
          toast({
            title: '🎉 Done!',
            description: `Successfully deployed editionDrop contract at ${editionDropAddress}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          console.log('Failed to deploy editionDrop contract', error);
        }
      };
  
      // Call the deployEditionDrop function when the component mounts
      deployEditionDrop();
    }, [sdk, toast, setEditionDropAddress]);

  } else {
    console.log('address not found')
    toast({
      title: '🙁 You Must Sign In',
      description: `Please sign in to deploy the editionDrop contract`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  // Return any necessary values or functions here
};

export default useDeployEditionDrop;

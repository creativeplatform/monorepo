import { 
    useDisclosure, 
    Button, 
    Modal, 
    ModalBody, 
    ModalOverlay, 
    ModalHeader, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter,
    useToast,
    useColorModeValue, 
} from "@chakra-ui/react";
import { useAddress, Web3Button, useContract, useNFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { CREATIVE_ADDRESS, LOCK_ADDRESS_MUMBAI_TESTNET } from "utils/config";
import Unlock from "utils/fetchers/Unlock.json";


function PurchaseKey() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const address = useAddress() || ""
  const toast = useToast()
  const connector = useColorModeValue("light", "dark")

  // Connect to your NFT contract
  const { contract } = useContract( 
    LOCK_ADDRESS_MUMBAI_TESTNET.address, 
    Unlock.abi,
  );

  // Load the NFT metadata from the contract using a hook
  const { data: nft, isLoading, error } = useNFT(contract, "0");
  // Render the NFT onto the UI
  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return (
    <>
      <Button onClick={onOpen}>Earn with Us</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase A Creative Membership</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ThirdwebNftMedia 
              metadata={nft.metadata}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Web3Button
              contractAddress={LOCK_ADDRESS_MUMBAI_TESTNET.address} // Your smart contract address
              contractAbi={ Unlock.abi } // Your smart contract ABI
              action={async (contract) => {
                await contract.call('purchase', [["1000000000000000000"], [address], [CREATIVE_ADDRESS], [CREATIVE_ADDRESS], ['0x']], { value: utils.parseEther("1.0")});
              }}
              onSuccess={(result) => toast({
                title: "Congratulations, Trailblazer!",
                description: "🚀 You've just unlocked a universe of creativity." + result,
                status: "success",
                duration: 9000,
                isClosable: true,
              })}
              onError={(error) => toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })} 
              theme={connector}
            >
              Buy with Crypto
            </Web3Button>
            <CrossmintPayButton
              collectionId="3e5b47d7-a89f-4ae6-8f0e-fd8e7478d550"
              projectId="75feb281-8149-40fc-a8ce-a10793656a76"
              mintConfig={{"totalPrice":"1.0","_values":["1000000000000000000"],"_recipients":[address],"_referrers":[CREATIVE_ADDRESS],"_keyManagers":[CREATIVE_ADDRESS, address],"_data":["0x"]}}
              environment="staging"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default PurchaseKey;
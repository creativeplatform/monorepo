import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from "next"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Input,
  useToast,
  ButtonGroup,
  IconButton,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  FormHelperText,
  Spinner,
  BreadcrumbItem, 
  BreadcrumbLink, 
  Breadcrumb,
  VStack,
} from '@chakra-ui/react'
import { useAddress, useContract, useOwnedNFTs, useNFTBalance, useContractWrite, useContractRead, ConnectWallet, useSigner, ThirdwebSDK } from '@thirdweb-dev/react'
import { LOCK_ADDRESS_MUMBAI_TESTNET } from 'utils/config'
import truncateEthAddress from 'truncate-eth-address'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { MdOutbound } from 'react-icons/md'
//import MeTokenCreationForm from 'components/MeTokenCreationForm'
import MemberCard from 'components/MemberCard'
import Wert from './wert'
import Unlock from '../../../utils/fetchers/Unlock.json'
import MyAssets from 'components/MyAssets'


const ProfilePage: NextPage = () => {
  // State and hooks setup
  const router = useRouter()
  const [transferAddress, setTransferAddress] = useState('')
  const [lendingAddress, setLendingAddress] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const toast = useToast()
  const address = useAddress()
  const signer = useSigner()
  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer)


  /*******  CONTRACT READING ********/
  useEffect(() => {
    // Skip if prerequisites aren't met
    if (!address || !sdkSigner || !Unlock.abi) return;
    // Function to get subscription status from the contract
    const getSubscribedData = async () => {
        const unlockContract = await sdkSigner?.getContractFromAbi(
          LOCK_ADDRESS_MUMBAI_TESTNET.address,
          Unlock.abi,
        );
        return await unlockContract?.call(
          "getHasValidKey", // Name of your function as it is on the smart contract
          // Arguments to your function, in the same order they are on your smart contract
          [
            address
          ],
        )
      }
       // Fetch and set subscription status
      getSubscribedData().then((res) => {
        console.log(res)
        setSubscribed(res)
      })
    }, [address, sdkSigner, Unlock.abi])
   
    // Hooks to interact with the contract
  const { 
    contract: unlockContract,
    isLoading: loadingUnlockContract,
    error: unlockContractError,
   } = useContract(LOCK_ADDRESS_MUMBAI_TESTNET.address, Unlock.abi)

  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs( unlockContract, address)

  const { data: ownerBalance } = useNFTBalance(unlockContract, address)

  // Stringify the owners balance
  const ownerBalanceString = ownerBalance?.toString()

  // READ FROM CONTRACT
  const { data: expirationDuration, isLoading: expirationLoading } = useContractRead(unlockContract, "expirationDuration");

  /****** WRITE TO CONTRACT *******/
    // Functions to write to the contract: lending and sharing keys
  const { mutateAsync: lendKey } = useContractWrite(unlockContract, 'lendKey')
  
  // Function to lend a key
  const lend = async () => {
    // Error handling and toast notifications
    try {
      const data = await lendKey({ args: [address, lendingAddress, ownedNFTs?.[0].metadata.id] })
      console.info('contract call successs', data)
      toast({
        title: 'Key Lending',
        description: 'Successfully rented out your membership 🙌🏾',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('Lending call failure', err)
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const { mutateAsync: shareKey } = useContractWrite(unlockContract, 'shareKey')
  
  // Function to share a key
const share = async () => {
  if (!transferAddress || !ownedNFTs?.length || !expirationDuration) {
    toast({
      title: 'Error',
      description: 'Required information is missing or invalid.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  try {
    const data = await shareKey({ args: [transferAddress, ownedNFTs[0].metadata.id, expirationDuration] });
    const remainingTime = expirationDuration.toNumber() / 2; // Ensure that expirationDuration is a BigNumber instance

    console.info('Contract call success', data);
    toast({
      title: "Key Shared Successfully!",
      description: `You've shared your Creative key! 🏋️‍♂️ You now have ${remainingTime} days left, and your friend has ${remainingTime} days. Stay Creative together!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    const error = err as Error; // Typecasting the error for better error handling in TypeScript
    console.error('Share call failure', error);
    toast({
      title: 'Error',
      description: error.message || 'An unknown error occurred',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  }
};

  // Function to copy the user's address to clipboard
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address ?? '')
    // Optionally, you can show a success message or perform any other actions
    console.log('Address copied:', address)
    toast({
      title: 'Address Copied',
      description: 'Successfully Copied ' + truncateEthAddress(`${address}`),
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Container maxW={"7xl"} my={10}>
    <Breadcrumb mb={4}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>🏠 Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt={10} mb={6} fontSize={{ base: "2xl", md: "3xl" }}>My Creative Profile</Heading>      
        {!address ? (
        <Flex flexDirection="column" alignItems="center" gap={5} my={10}>
        <Text textAlign="center">Sign in to see your profile or create a new account</Text>
        <Box w={{ base: "100%", sm: "75%", md: "50%" }}>
          <ConnectWallet btnTitle={'Sign In'} />
        </Box>
      </Flex>
      ) : (
        <>
          <VStack spacing={4} align="flex-start" my={5}>
            <Text as={'b'} fontSize={'2xl'}>
              CRTV Account &nbsp;
            </Text>
            <ButtonGroup size="sm" variant="outline">
              <Button>{address}</Button>
              <IconButton
                aria-label="Add to clipboard"
                icon={<HiOutlineClipboardCopy />}
                onClick={handleCopyAddress}
              />
            </ButtonGroup>
          </VStack>
          
          <Box mt={5}>
            <Tabs variant="enclosed" isFitted>
              <TabList mb="1em">
                  <Tab>
                  <span role="img" aria-label="identification">🪪</span>
                    &nbsp;Membership
                  </Tab>
                  <Tab>
                  <span role="img" aria-label="coin">🪙</span>
                    &nbsp;meToken
                  </Tab>
                  <Tab>
                  <span role="img" aria-label="camcorder">📹</span>
                    &nbsp;Video Uploads
                  </Tab>
                  <Tab>
                  <span role="img" aria-label="money">💰</span>
                    &nbsp;Earnings
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {!loadingOwnedNFTs && ownedNFTs?.length ? (
                      ownedNFTs?.map((nft) => (
                        <Box key={nft?.metadata.id.toString()}>
                          <Box display="flex" justifyContent="space-between">
                            <Box flex="0 0 50%" alignItems="center">
                              <MemberCard
                                member={address}
                                nft={nft}
                                balance={ownerBalanceString!}
                              />
                              <Flex
                              direction={{ base: "column", md: "row" }} // Stack vertically on base, horizontally on md and above
                              wrap="wrap" // Allow wrapping
                              flexGrow={1}
                              px={8}
                              gap={5}
                              sx={{
                                button: {
                                  borderLeftRadius: '0px',
                                },
                                input: {
                                  borderRightRadius: '0px',
                                },
                              }}
                            >
                              <Box flex="1" maxW="md" mb={{ base: 4, md: 0 }}>
                                <FormControl>
                                  <FormLabel fontSize={'x-small'}>Share with:</FormLabel>
                                  <Input
                                    placeholder={'0x00000'}
                                    width={'100%'}
                                    mx={'auto'}
                                    value={transferAddress}
                                    onChange={(e) => setTransferAddress(e.target.value)}
                                  />
                                  <FormHelperText>Enter an address to transfer your membership to.</FormHelperText>
                                </FormControl>
                                <Button colorScheme="pink" aria-disabled={transferAddress !== '' ? false : true} w={32} onClick={() => {share()}}>
                                  Share
                                </Button>
                              </Box>
                              <Box flex="1" maxW="md">
                                <FormControl>
                                  <FormLabel fontSize={'x-small'}>Lend to:</FormLabel>
                                  <Input
                                    placeholder={'0x00000'}
                                    width={'100%'}
                                    mx={'auto'}
                                    value={lendingAddress}
                                    onChange={(e) => setLendingAddress(e.target.value)}
                                  />
                                  <FormHelperText>Enter an address to rent your membership to.</FormHelperText>
                                </FormControl>
                                <Button colorScheme="pink" onClick={() => lend()} aria-disabled={lendingAddress !== '' ? false : true} w={32}>
                                  Lend
                                </Button>
                              </Box>
                            </Flex>
                            </Box>
                            
                          </Box>
                        </Box>
                      )
                    )) : (
                        <Box display="flex" alignItems="center" gap={3}>
                            {ownedNFTs?.length === 0 ? (
                                <Text>You need to obtain a membership NFT.</Text>
                            ) : (
                                  <>
                                  <Text>Loading membership </Text>
                                  <Spinner />
                                </>
                            )}
                        </Box>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <Box mb={5}>
                      <Text fontWeight={'bold'} srOnly>
                        meToken:
                      </Text>
                      <Text fontSize={'normal'}>
                        To generate revenue on our platform, you need to create a{' '}
                        <Link href="https://metokens.com" color="#EC407A" isExternal display="inline-flex">
                          meToken <MdOutbound />{' '}
                        </Link>
                        . This token serves as your unique identity as a creator and provides a way to monetize your creative journey. With meToken,
                        viewers can tip you and buy your products within our platform's creative ecosystem. It offers a convenient and integrated
                        method for transactions and supports your growth as a creator.
                      </Text>
                    </Box>
                    {/* <MeTokenCreationForm /> */}
                  </TabPanel>
                  <TabPanel id='videoUploads'>
                    <Box>
                      <Text fontWeight={'bold'} srOnly>
                        Video Uploads:
                      </Text>
                      <MyAssets/>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box>
                      <Text fontWeight={'bold'} srOnly>
                        Earnings:
                      </Text>
                      <Text>No earnings... yet</Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </Box>
        </>
      )}
    </Container>
  )
}

export default ProfilePage;
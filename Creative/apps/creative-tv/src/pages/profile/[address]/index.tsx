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
  useColorModeValue,
} from '@chakra-ui/react'
import { useAddress, useContract, useOwnedNFTs, useNFTBalance, useContractWrite, useContractRead, ConnectWallet, useSigner, ThirdwebSDK, Web3Button } from '@thirdweb-dev/react'
import { CREATIVE_ADDRESS, LOCK_ADDRESS_MUMBAI_TESTNET } from 'utils/config'
import truncateEthAddress from 'truncate-eth-address'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { MdOutbound } from 'react-icons/md'
//import MeTokenCreationForm from 'components/MeTokenCreationForm'
import MemberCard from 'components/MemberCard'
import Wert from './wert'
import dayjs from 'dayjs'
import Unlock from '../../../utils/fetchers/Unlock.json'


const ProfilePage: NextPage = () => {
  const router = useRouter()
  const [transferAddress, setTransferAddress] = useState('')
  const [lendingAddress, setLendingAddress] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const toast = useToast()
  const address = useAddress()
  const signer = useSigner()
  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer)

  const connector = useColorModeValue('light', 'dark')

  /*******  CONTRACT READING ********/
  useEffect(() => {
    if (!address || !sdkSigner || !Unlock.abi) return
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
      getSubscribedData().then((res) => {
        console.log(res)
        setSubscribed(res)
      })
    }, [address, sdkSigner, Unlock.abi])

  const { 
    contract: unlockContract,
    isLoading: loadingUnlockContract,
    error: unlockContractError,
   } = useContract(LOCK_ADDRESS_MUMBAI_TESTNET.address, Unlock.abi)

  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs( unlockContract, address)

  const { data: ownerBalance } = useNFTBalance(unlockContract, address)

  // Stringify the owners balance
  const ownerBalanceString = ownerBalance?.toString()

  /******* READ FROM CONTRACT ******/
  const { data: expiring, isLoading: loadingIsExpiring, error: ExpirationError } = useContractRead(unlockContract, "expirationDuration");

  /****** WRITE TO CONTRACT *******/
  const { mutateAsync: lendKey } = useContractWrite(unlockContract, 'lendKey')

  const lend = async () => {
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
      console.error('contract call failure', err)
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  const { mutateAsync: renewMembershipFor, isLoading: renewMembershipForIsLoading } = useContractWrite(unlockContract, 'renewMembershipFor')

  const renew = async () => {
    try {
      const data = await renewMembershipFor({ args: [ownedNFTs?.[0].metadata.id, CREATIVE_ADDRESS] })
      console.info('contract call successs', data)
      toast({
        title: 'Membership Renewal',
        description: 'Successfully renewed your membership 🙌🏾',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('contract call failure', err)
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const { mutateAsync: cancelAndRefund, isLoading: cancelAndRefundIsLoading } = useContractWrite(unlockContract, 'cancelAndRefund')

  const cancelMembership = async () => {
    try {
      const data = await cancelAndRefund({ args: [ownedNFTs?.[0].metadata.id] })
      console.info('contract call successs', data)
      toast({
        title: 'Membership Cancelled',
        description: 'Sorry to see you go... 🥹',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('contract call failure', err)
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

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
    <Container maxW="7xl" my={10}>
      <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>🏠 Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      <Heading mt={10}>My Creative Profile</Heading>
      {!address ? (
        <Flex flexDirection="column" my={10} gap={5} maxW="md">
          <Text>Sign in to see your profile or create a new account</Text>
          <Box w="50%">
            <ConnectWallet btnTitle={'Sign In'} />
          </Box>
        </Flex>
      ) : (
        <>
          <Box mt={5} key={address}>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Text as={'b'} fontSize={'2xl'}>
                CRTV Account &nbsp;
              </Text>
              <Button>{address}</Button>
              <IconButton
                aria-label="Add to clipboard"
                icon={<HiOutlineClipboardCopy />}
                onClick={() => {
                  handleCopyAddress()
                }}
              />
            </ButtonGroup>
          </Box>
          <Box mt={5}>
            <SimpleGrid columns={1} spacing={5} my={4}>
              <Tabs width="100%">
                <TabList minW="fit-content" display="flex" justifyContent="start">
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
                  <Tab>
                    <span role="img" aria-label='ATM'>🏧</span>
                    &nbsp;ATM
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {!loadingOwnedNFTs && ownedNFTs?.length ? (
                      ownedNFTs?.map((nft) => (
                        <Box key={nft?.metadata.id.toString()}>
                          <Text fontWeight={'bold'} srOnly>
                            Membership:
                          </Text>
                          <Box display="flex" justifyContent="space-between" alignItems="start">
                            <Box flex="0 0 33%">
                              <MemberCard
                                member={address}
                                nft={nft}
                                balance={ownerBalanceString!}
                                expireDate={expiring.toString()}
                                renewMembershipForIsLoading={renewMembershipForIsLoading}
                                cancelAndRefundIsLoading={cancelAndRefundIsLoading}
                              />
                            </Box>
                            <Flex
                              flex="0 0 50%"
                              flexFlow="column wrap"
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
                              }}>
                              <Box display="flex" maxW="md" flexFlow="row nowrap" justifyContent="space-between" alignItems="center">
                                <FormControl flexGrow={1}>
                                  <FormLabel fontSize={'x-small'}>Export to:</FormLabel>
                                  <Input
                                    placeholder={'0x00000'}
                                    width={'100%'}
                                    mx={'auto'}
                                    value={transferAddress}
                                    onChange={(e) => setTransferAddress(e.target.value)}
                                  />
                                  <FormHelperText>Enter an address to transfer your membership to.</FormHelperText>
                                </FormControl>
                                <Button colorScheme="pink" aria-disabled={transferAddress !== '' ? false : true} w={32}>
                                  Transfer
                                </Button>
                                {/* <Web3Button
                                  contractAddress={LOCK_ADDRESS_MUMBAI_TESTNET.address} // Your smart contract address
                                  contractAbi={Unlock.abi}
                                  action={async (contract) => {
                                    await contract.call('shareKey', [transferAddress, [address], [CREATIVE_ADDRESS], [CREATIVE_ADDRESS], ['0x']], { value: utils.parseEther("1.0")});
                                  }}
                                  onSuccess={(result) => toast({
                                    title: "Congratulations, Trailblazer!",
                                    description: "🚀 You've just unlocked a universe of creativity.",
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                  })}
                                  onError={(error) => toast({
                                    title: "Error",
                                    description: "There was an error processing your request.",
                                    status: "error",
                                    duration: 9000,
                                    isClosable: true,
                                  })}
                                  theme={connector} 
                                >
                                Buy with Crypto
                                </Web3Button> */}
                              </Box>
                              <Box display="flex" maxW="md" flexFlow="row nowrap" justifyContent="space-between" alignItems="center">
                                <FormControl flexGrow={1}>
                                  <FormLabel fontSize={'x-small'}>Rent to:</FormLabel>
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
                  <TabPanel>
                    <Box>
                      <Text fontWeight={'bold'} srOnly>
                        Video Uploads:
                      </Text>
                      <Text>The emptiness ... upload some videos!</Text>
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
                  <TabPanel>
                    {/* create two columns */}
                    <Box>
                        <Wert />
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </SimpleGrid>
          </Box>
        </>
      )}
    </Container>
  )
}

export default ProfilePage;
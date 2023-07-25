import React, { useState } from 'react'
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Input,
    useToast,
    Image,
    ButtonGroup,
    IconButton,
    Link,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'
import {
    useAddress,
    useContract,
    useOwnedNFTs,
    useNFTBalance,
    useContractWrite,
} from '@thirdweb-dev/react'
import{ Emoji } from 'ui'
import { FREE_LOCK_ADDRESS_GOERLI_TESTNET, CREATIVE_ADDRESS } from 'utils/config'
import truncateEthAddress from 'truncate-eth-address'
import { useRouter } from 'next/router'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { MdAutorenew, MdCancel } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import MeTokenCreationForm from 'components/MeTokenCreationForm'

export default function ProfilePage() {
    const router = useRouter();
    const [ transferAddress, setTransferAddress ] = useState('');
    const [ lendingAddress, setLendingAddress ] = useState('');
    const toast = useToast();
    const address = useAddress();

    const { contract } = useContract(FREE_LOCK_ADDRESS_GOERLI_TESTNET.address);
    
    const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(contract, address);

    const { data: ownerBalance } = useNFTBalance(contract, address);

    // Stringify the owners balance
    const ownerBalanceString = ownerBalance?.toString();

    /******* READ FROM CONTRACT ******/
    //const { data: expiring, isLoading: loadingIsExpiring } = useContractRead(contract, "expirationDuration");

    /****** WRITE TO CONTRACT *******/
    const { mutateAsync: lendKey } = useContractWrite(contract, "lendKey");

    const lend = async () => {
        try {
          const data = await lendKey({ args: [address, lendingAddress, ownedNFTs?.[0].metadata.id] });
          console.info("contract call successs", data);
          toast({
            title: 'Key Lending',
            description: 'Successfully rented out your membership 🙌🏾',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } catch (err) {
          console.error("contract call failure", err);
          toast({
            title: 'Error',
            description: `${err}`,
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
        }
    }
    const { mutateAsync: renewMembershipFor, isLoading: renewMembershipForIsLoading } = useContractWrite(contract, "renewMembershipFor")

    const renew = async () => {
        try {
        const data = await renewMembershipFor({ args: [ownedNFTs?.[0].metadata.id, CREATIVE_ADDRESS] });
        console.info("contract call successs", data);
        toast({
            title: 'Membership Renewal',
            description: 'Successfully renewed your membership 🙌🏾',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } catch (err) {
        console.error("contract call failure", err);
        toast({
            title: 'Error',
            description: `${err}`,
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
        }
    }

    const { mutateAsync: cancelAndRefund, isLoading: cancelAndRefundIsLoading } = useContractWrite(contract, "cancelAndRefund")

    const cancelMembership = async () => {
        try {
        const data = await cancelAndRefund({ args: [ownedNFTs?.[0].metadata.id] });
        console.info("contract call successs", data);
        toast({
            title: 'Membership Cancelled',
            description: 'Sorry to see you go... 🥹',
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
        } catch (err) {
        console.error("contract call failure", err);
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
        navigator.clipboard.writeText(address ?? '');
        // Optionally, you can show a success message or perform any other actions
        console.log('Address copied:', address);
        toast({
          title: 'Address Copied',
          description: 'Successfully Copied ' + truncateEthAddress(`${address}`),
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      };
    

// RENDER REMAINING MEMBERSHIP TIME FOR COUNTDOWN TIMER
    // const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    //     const hours = Math.floor(remainingTime / 3600)
    //     const minutes = Math.floor((remainingTime % 3600) / 60)
    //     const seconds = remainingTime % 60
    //     if (remainingTime === 0) {
    //         return <div className="timer">Services Expired...</div>;
    //       }
    //     return `${hours}:${minutes}:${seconds}`
    //   }
    
    return (
        <Container maxW={"1200px"} mt={10}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink isCurrentPage>Profile</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Heading mt={10}>Creative Profile</Heading>
            { address && (
                <SimpleGrid key={address} columns={2} spacing={5} my={5}>
                    <Box w={'md'}>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>CRTV Account # &nbsp;</Text>
                        <ButtonGroup size='sm' isAttached variant='outline' marginRight={2}>
                            <Button>{truncateEthAddress(address)}</Button>
                            <IconButton aria-label='Add to clipboard' icon={<HiOutlineClipboardCopy />} onClick={() => { handleCopyAddress() }} />
                        </ButtonGroup>
                    </Box>
                    <Box w={'md'}>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>Transfer Items </Text>
                        <Button leftIcon={<BiTransfer />} size={'md'} colorScheme='pink' onClick={() => router.push(`/profile/${address}/transfer`)}>Xfer Items</Button>
                    </Box>
                </SimpleGrid>
            )}
            <Box mt={5}>
                <SimpleGrid row={4} spacing={5} my={4}>
                    {!loadingOwnedNFTs && ownedNFTs?.map((nft) => (
                        <Box key={nft?.metadata.id.toString()} w={'md'}>
                            <Text fontSize={'2xl'} fontWeight={'bold'}><Emoji symbol='🪪' label='identification'/> Membership:</Text>
                                <Card overflow={'auto'} p={2} mb={4}>
                                    <Image 
                                        src={`${nft.metadata.image}`}
                                        height={250}
                                        width={'auto'}
                                    />
                                    <Flex justify={"space-between"} alignItems={"center"} direction={"row"} mb={4}>
                                        <Text ml={4} fontWeight={'bold'}>{nft.metadata.name}</Text>
                                        <Text mr={4}>Qty: {ownerBalanceString}</Text>
                                    </Flex>
                                    <Flex justifyContent={"center"} direction={"row"} p={2} mb={4}>
                                        <Text fontSize='xs'>{nft.metadata.description}</Text>
                                    </Flex>
                                    {/* <Flex justifyContent={"center"} alignItems={"center"} direction={"column"} p={5}>
                                        <Text fontSize={'sm'}>Expires:</Text>
                                        {!loadingIsExpiring && (
                                            <Box>
                                                <CountdownCircleTimer
                                                    isPlaying
                                                    duration={expiring}
                                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                    colorsTime={[7, 5, 2, 0]}
                                                >
                                                    {renderTime}
                                                </CountdownCircleTimer>
                                            </Box>
                                        )}
                                    </Flex> */}
                                    <ButtonGroup justifyContent={"center"}>
                                        <Button colorScheme={'green'} leftIcon={<MdAutorenew />} onClick={() => renew()} isLoading={renewMembershipForIsLoading}>RENEW</Button>
                                        <Button colorScheme={'red'} leftIcon={<MdCancel />} onClick={() => cancelMembership()} isLoading={cancelAndRefundIsLoading}>CANCEL</Button>
                                    </ButtonGroup>
                                </Card>
                                
                                <Flex>
                                <Text fontSize={"x-small"} ml={4}>Export to:</Text>
                                <Input
                                    placeholder={"0x00000"}
                                    width={"90%"}
                                    mx={'auto'}
                                    value={transferAddress}
                                    onChange={(e) => setTransferAddress(e.target.value)}
                                    mb={4} 
                                />
                                </Flex>
                                {transferAddress != "" && (
                                    <Box mb={4} mx={'auto'}>
                                    <Button colorScheme='pink'>Transfer</Button>
                                    </Box>
                                )}
                                <Flex>
                                    <Text fontSize={"x-small"} ml={4}>Rent to:</Text>
                                        <Input
                                            placeholder={"0x00000"}
                                            width={"90%"}
                                            mx={'auto'}
                                            value={lendingAddress}
                                            onChange={(e) => setLendingAddress(e.target.value)}
                                            mb={4} 
                                        />
                                </Flex>
                                    {lendingAddress != "" && (
                                        <Box mb={4} mx={'auto'}>
                                        <Button colorScheme='pink' onClick={() => lend()}>Lend</Button>
                                        </Box>
                                    )}
                            </Box>
                        ))}
                    <Box>
                        <Text fontSize={'2xl'} fontWeight={'bold'}><Emoji symbol='🪙' label='coin'/> MeToken:</Text>
                        <Text fontSize={'small'}>To generate revenue on our platform, you need to create a <Link href='https://metokens.com' color='#EC407A'>MeToken</Link>. This token serves as your unique identity as a creator and provides a way to monetize your creative journey. With MeToken, viewers can tip you and buy your products within our platform's creative ecosystem. It offers a convenient and integrated method for transactions and supports your growth as a creator.</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'2xl'} fontWeight={'bold'}><Emoji symbol='🎥' label='video camera'/> Video Uploads:</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'2xl'} fontWeight={'bold'}><Emoji symbol='💰' label='money bag'/> Earnings:</Text>
                    </Box>
                </SimpleGrid>
            </Box>
            {address && <MeTokenCreationForm />}
        </Container>
    )
}
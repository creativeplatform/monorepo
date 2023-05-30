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
} from '@chakra-ui/react'
import {
    useAddress,
    useContract,
    useOwnedNFTs,
    useNFTBalance,
    useContractWrite,
} from '@thirdweb-dev/react'
import { FREE_LOCK_ADDRESS_GOERLI_TESTNET } from 'utils/config'
import { useRouter } from 'next/router'
import { HiOutlineClipboardCopy } from 'react-icons/hi';


export default function ProfilePage() {
    const router = useRouter();
    const address = useAddress();
    const { contract } = useContract(FREE_LOCK_ADDRESS_GOERLI_TESTNET.address);
    
    const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(contract, address);

    const { data: ownerBalance, isLoading: loadingBalance, error: balanceError } = useNFTBalance(contract, address);
    
    const { mutateAsync: lendKey, isLoading } = useContractWrite(contract, "lendKey")

    // const call = async () => {
    //     try {
    //       const data = await lendKey({ args: [_from, _recipient, _tokenId] });
    //       console.info("contract call successs", data);
    //     } catch (err) {
    //       console.error("contract call failure", err);
    //     }
    //   }
    
    const [ transferAddress, setTransferAddress ] = useState('');
    const [ lendingAddress, setLendingAddress ] = useState('');

    const toast = useToast();
    
    return (
        <Container maxW={"1200px"} mt={10}>
            <Button colorScheme={'blue'} onClick={() => router.push("/")}>Back</Button>
            <Heading mt={10}>Profile</Heading>
            <Box mt={5}>
                <ButtonGroup size='sm' isAttached variant='outline'>
                    <Text>CRTV # &nbsp;</Text>
                    <Button>{address}</Button>
                    <IconButton aria-label='Add to clipboard' icon={<HiOutlineClipboardCopy />} />
                </ButtonGroup>
            </Box>
            <Box mt={5}>
                <Text fontWeight={'bold'}>My Memberships:</Text>
                <SimpleGrid columns={4} spacing={5} my={4}>
                    {!loadingOwnedNFTs && ownedNFTs?.map((nft) => (
                        <Card overflow={"hidden"} p={2}>
                            <Image 
                                src={`${nft.metadata.image}`}
                                height={250}
                                width={200}
                            />
                            <Flex justify={"space-between"} alignItems={"center"} direction={"row"} mb={4}>
                                <Text ml={4} fontWeight={'bold'}>{nft.metadata.name}</Text>
                                <Text mr={4}>Qty: {ownerBalance?.toString()}</Text>
                            </Flex>
                            <Flex>
                            <Text fontSize={"x-small"} ml={4}>Transfer to:</Text>
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
                                <Text fontSize={"x-small"} ml={4}>Lend to:</Text>
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
                                    <Button colorScheme='pink'>Lend</Button>
                                    </Box>
                                )}
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </Container>
    )
}
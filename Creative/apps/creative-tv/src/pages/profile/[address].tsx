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
} from '@chakra-ui/react'
import {
    MediaRenderer,
    Web3Button,
    useAddress,
    useContract,
    useOwnedNFTs,
} from '@thirdweb-dev/react'
import { FREE_LOCK_ADDRESS_GOERLI_TESTNET } from 'utils/config'
import { PFP } from 'utils/context'
import { useRouter } from 'next/router'

export default function ProfilePage() {
    const router = useRouter();
    const address = useAddress();
    const { contract: membership } = useContract(FREE_LOCK_ADDRESS_GOERLI_TESTNET.address);
    
    const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(membership, address);
    
    const [ transferAddress, setTransferAddress ] = useState('');

    const toast = useToast();
    
    return (
        <Container maxW={"1200px"} mt={10}>
            <Button onClick={() => router.push("/")}>Back</Button>
            <Heading mt={10}>Profile</Heading>
            <Box mt={10}>
                <Text fontWeight={'bold'}>My Memberships:</Text>
                <SimpleGrid columns={4} spacing={10} my={4}>
                    {!loadingOwnedNFTs && ownedNFTs?.map((nft) => (
                        <Card overflow={"hidden"} p={2}>
                            <MediaRenderer 
                                src={nft.metadata.image}
                                height='100%'
                                width='100%'
                            />
                            <Flex
                                justify={"space-between"} alignItems={"center"} direction={"row"}
                            >
                                <Text ml={4} fontWeight={'bold'}>{nft.metadata.name}</Text>
                                <Text mr={4}>Qty: {nft.quantityOwned}</Text>
                            </Flex>
                            <Text fontSize={"x-small"} ml={4}>Transfer to:</Text>
                            <Input
                                placeholder={"0x00000"}
                                width={"90%"}
                                mx={'auto'}
                                value={transferAddress}
                                onChange={(e) => setTransferAddress(e.target.value)}
                                mb={4} 
                            />
                            {transferAddress != "" && (
                                <Box mb={4} mx={'auto'}>
                                    <Web3Button
                                    contractAddress={FREE_LOCK_ADDRESS_GOERLI_TESTNET.address}
                                    action={(contract) => {
                                        contract.call("transferFrom", [address, transferAddress, nft.metadata.id])
                                      }}
                                    onSubmit={() => setTransferAddress("")}
                                    onSuccess={() => 
                                        toast({
                                            title: 'Transfer Conpleted.',
                                            description: 'Your membership has been transferred.',
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }
                                    >Transfer</Web3Button>
                                </Box>
                            )}
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </Container>
    )
}
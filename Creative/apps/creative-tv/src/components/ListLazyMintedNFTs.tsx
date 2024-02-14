import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ClaimCondition, MediaRenderer, NFT, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { formatString } from 'utils/helpers'
import ListClaimConditions from './ListClaimConditions'
import { SetClaimConditions } from './SetClaimConditions'

type ListOfLazyMintedNftsProps = {
  lazyMintedTokens: NFT[]
  refetchNFTs: () => void
  nftMetadata: Record<string, any>
  nftContract: SmartContract<ethers.BaseContract> | undefined
}
export const ListLazyMintedNfts = (props: ListOfLazyMintedNftsProps) => {
  const [nft, setNFT] = useState<NFT>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addClaimPhase, setAddClaimPhase] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [claimConditions, setClaimConditions] = useState<ClaimCondition[]>([])
  const toast = useToast()
  const tabList = ['Details', 'Claim Conditions', 'Claim']

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsFetchingFetchingLazyMintedTokens(true)
      const lzMintedTokens = await props.nftContract?.erc1155.getAll()

      if (lzMintedTokens && lzMintedTokens?.length > 0) {
        setLazyMintedTokens([...lzMintedTokens])
        setIsFetchingFetchingLazyMintedTokens(false)
      }
    }
    fetchNFTs()
  }, [lazyMintedTokens])


  const handleViewMore = async (_nft: NFT) => {
    onOpen() // open modal
    setNFT(_nft)
    getClaimConditionsById(_nft.metadata.id)
  }

  const getClaimConditionsById = async (tokenId: string) => {
    
    try {
      setIsFetching(true)
      // fetch all existing claim conditions
      const cc = await props.nftContract?.erc1155.claimConditions.getAll(tokenId)
      console.log('getClaimConditionsById: ', tokenId)
      console.log('cc: ', cc)

      if (cc && cc?.length > 0) {
        setClaimConditions([...cc])
        setIsFetching(false)
      }  
    } catch (err: any) {
      setIsFetching(false)
      setClaimConditions([])
      throw Error(err.message)
    }
  }

  return (
    <Box my={16}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Token Id</Th>
              <Th>Media</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Supply</Th>
              <Th>More Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.lazyMintedTokens.map((tkn) => {
              return (
                <Tr key={tkn.metadata.id}>
                  <Td>
                    <Text>{tkn.metadata.id}</Text>
                  </Td>
                  <Td>
                    <MediaRenderer src={tkn.metadata.image} width="200px" height="" alt={String(tkn.metadata.name)} />
                  </Td>
                  <Td>
                    <Button onClick={async () => await handleViewMore(tkn)} variant={'link'}>
                      {formatString.titleCase(String(tkn.metadata.name))}
                    </Button>
                  </Td>
                  <Td>
                    <Text>{formatString.wordWrap(String(tkn.metadata.description), 38)}</Text>
                  </Td>

                  <Td isNumeric>{tkn.supply}</Td>
                  <Td>
                    <Button onClick={async () => await handleViewMore(tkn)} variant={'outline'}>
                      View More / Configure
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={24}>{nft?.metadata.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text pb={8} color={'gray.300'} fontWeight={600}>
              {nft?.metadata.description}
            </Text>
            <Tabs index={tabIndex} onChange={handleTabsChange}>
              <TabList>
                {tabList &&
                  tabList.length > 0 &&
                  tabList.map((txt, i) => (
                    <Tab key={i} fontWeight={500}>
                      {txt}
                    </Tab>
                  ))}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HStack spacing={12} my={4}>
                    <VStack spacing={4} alignItems={'flex-start'} style={{ fontWeight: 600 }}>
                      <span>Token Type: </span>
                      <span>Token ID: </span>
                      <span>Suppy: </span>
                    </VStack>
                    <VStack spacing={4} alignItems={'flex-start'} style={{ fontWeight: 400 }} color={'gray.300'}>
                      <Text>{nft?.type}</Text>
                      <Text>{nft?.metadata.id}</Text>
                      <Text>{nft?.supply}</Text>
                    </VStack>
                  </HStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={0} alignItems={'flex-start'} my={4}>
                    <Text style={{ fontSize: '24px' }}>Set Claim Conditions</Text>
                    <Text color={'gray.300'} fontStyle={'italic'}>
                      Condition how your NFTs can be claimed
                    </Text>

                    {isFetching ? (
                      <Spinner
                        my={12}
                        alignSelf={'center'}
                        size="md"
                        thickness="3px"
                        speed="0.5s"
                        emptyColor="gray.200"
                      />
                    ) : (
                      claimConditions.length > 0 && (
                        <ListClaimConditions
                          nftContract={props.nftContract}
                          nft={nft!}
                          claimConditions={claimConditions}
                          nftMetadata={props.nftMetadata}
                        />
                      )
                    )}
                  </VStack>

                  {addClaimPhase && (
                    <SetClaimConditions
                      numberOfClaimsConditonsAvailable={claimConditions.length}
                      tokenId={String(nft?.metadata.id)}
                      nftMetadata={props.nftMetadata}
                      nftContract={props.nftContract}
                      setAddClaimPhase={setAddClaimPhase}
                      getClaimConditionsById={getClaimConditionsById}
                    />
                  )}

                  {true && (
                    <Button
                      variant="outline"
                      fontSize={12}
                      colorScheme={addClaimPhase ? 'red' : ''}
                      leftIcon={!addClaimPhase ? <AddIcon fontSize={10} /> : <CloseIcon fontSize={10} />}
                      onClick={() => setAddClaimPhase(!addClaimPhase)}>
                      {!addClaimPhase ? 'Add Phase' : 'Cancel'}
                    </Button>
                  )}
                </TabPanel>
                <TabPanel>
                  {/* TODO: incorporate a claim form here */}
                  <p>Claim form starts here</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
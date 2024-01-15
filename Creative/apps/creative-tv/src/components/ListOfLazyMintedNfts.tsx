import { AddIcon } from '@chakra-ui/icons'
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
import { ClaimCondition, MediaRenderer, NFT } from '@thirdweb-dev/react'
import { useState } from 'react'
import { globalTheme } from 'utils/config'
import { formatString } from 'utils/helpers'
import { ListExistingClaimConditions } from './ListExistingClaimConditions'
import { SetClaimConditions } from './SetClaimConditions'

type ListOfLazyMintedNftsProps = {
  lazyMintedTokens: NFT[]
  nftMetadata: Record<string, any>
  handleSetClaimCondition: (data: any) => Promise<boolean | undefined>
  getClaimConditionsById: (tokenId: string) => Promise<ClaimCondition[]>
}
export const ListOfLazyMintedNfts = (props: ListOfLazyMintedNftsProps) => {
  const [nft, setNFT] = useState<NFT>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addPhase, setAddPhase] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [existingClaimConditions, setExistingClaimConditions] = useState<ClaimCondition[]>([])
  const toast = useToast()

  const tabList = ['Details', 'Claim Conditions', 'Claim']

  const handleTabsChange = (idx: number) => {
    setTabIndex(idx)
  }

  const getClaimConditionsById = async (tokenId: string) => {
    const existingClaims = await props.getClaimConditionsById(tokenId)
    console.log('existing claims: ', existingClaims)
    setExistingClaimConditions([...existingClaims])
  }

  const handleViewMore = (_nft: NFT) => {
    onOpen() // open modal
    getClaimConditionsById(_nft.metadata.id)
    setNFT(_nft)
  }

  return (
    <Box my={16}>
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
                    {existingClaimConditions && existingClaimConditions.length > 0 && (
                      <ListExistingClaimConditions nft={nft!} existingClaimConditions={existingClaimConditions} nftMetadata={props.nftMetadata} />
                    )}
                  </VStack>
                  {addPhase && <SetClaimConditions handleSetClaimCondition={props.handleSetClaimCondition} nftMetadata={props.nftMetadata} />}
                  {existingClaimConditions.length == 0 && (
                    <Button mt={8} leftIcon={<AddIcon />} onClick={() => setAddPhase(!addPhase)}>
                      Add Phase
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
            <Button style={{ backgroundColor: globalTheme.colors.primary }} mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            {props.lazyMintedTokens.map((nft) => {
              return (
                <Tr key={nft.metadata.id}>
                  <Td>
                    <Text>{nft.metadata.id}</Text>
                  </Td>
                  <Td>
                    <MediaRenderer src={nft.metadata.image} width="200px" height="" alt={String(nft.metadata.name)} />
                  </Td>
                  <Td>
                    <Button onClick={() => handleViewMore(nft)} variant={'link'}>
                      {formatString.titleCase(String(nft.metadata.name))}
                    </Button>
                  </Td>
                  <Td>
                    <Text>{formatString.wordWrap(String(nft.metadata.description), 38)}</Text>
                  </Td>

                  <Td isNumeric>{nft.supply}</Td>
                  <Td>
                    <Button onClick={() => handleViewMore(nft)} variant={'outline'}>
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
    </Box>
  )
}

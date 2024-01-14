import {
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
  Box,
} from '@chakra-ui/react'
import { MediaRenderer, NFT } from '@thirdweb-dev/react'
import { useState } from 'react'
import { globalTheme } from 'utils/config'
import { formatString } from 'utils/helpers'
import { SetClaimConditions } from './SetClaimConditions'

type ListOfLazyMintedNftsProps = {
  lazyMintedTokens: NFT[]
  nftMetadata: Record<string, any>
  handleSetClaimCondition: (data: any) => Promise<boolean | undefined>
}
export const ListOfLazyMintedNfts = (props: ListOfLazyMintedNftsProps) => {
  const [nft, setNFT] = useState<NFT>()
  const [nftIndex, setNftIndex] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tabIndex, setTabIndex] = useState(0)
  const toast = useToast()

  const tabList = ['Details', 'Claim Conditions', 'Claim']

  const handleViewMore = (obj: NFT, index: number) => {
    onOpen() // open modal

    console.log(obj)
    console.log('index: ', index)
    setNFT(obj)
    setNftIndex(index)
  }

  const handleTabsChange = (idx: number) => {
    setTabIndex(idx)
  }

  return (
    <Box my={16}>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={24}>{nft?.metadata.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text pb={8} color={'gray.300'}>
              {nft?.metadata.description}
            </Text>
            <Tabs index={tabIndex} onChange={handleTabsChange}>
              <TabList>
                {tabList &&
                  tabList.length > 0 &&
                  tabList.map((t, i) => (
                    <Tab key={i} fontWeight={500}>
                      {t}
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
                      <Text>{nftIndex}</Text>
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
                  </VStack>
                  <SetClaimConditions
                    handleSetClaimCondition={props.handleSetClaimCondition}
                    nftMetadata={props.nftMetadata}
                  />
                  <Button mt={8}>+ Add Phase</Button>
                </TabPanel>
                <TabPanel>
                  <p>Oh, hello there. 3</p>
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
            {props.lazyMintedTokens.map((nft, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Text>{i}</Text>
                  </Td>
                  <Td>
                    <MediaRenderer src={nft.metadata.image} width="200px" height="" alt={String(nft.metadata.name)} />
                  </Td>
                  <Td>
                    <Button onClick={() => handleViewMore(nft, i)} variant={'link'}>
                      {formatString.titleCase(String(nft.metadata.name))}
                    </Button>
                  </Td>
                  <Td>
                    <Text>{formatString.wordWrap(String(nft.metadata.description), 38)}</Text>
                  </Td>

                  <Td isNumeric>{nft.supply}</Td>
                  <Td>
                    <Button onClick={() => handleViewMore(nft, i)} variant={'outline'}>
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

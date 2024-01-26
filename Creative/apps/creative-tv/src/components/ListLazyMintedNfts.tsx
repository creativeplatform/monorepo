import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { ClaimCondition, MediaRenderer, NFT, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { globalTheme } from 'utils/config'
import { formatString, logger } from 'utils/helpers'
import { ShowNFTDetailsInModal } from './ShowNFTDetailsInModal'

type ListOfLazyMintedNftsProps = {
  assetData: any
  nftMetadata: Record<string, any>
  nftContract: SmartContract<ethers.BaseContract> | undefined
  lazyMintedTokens?: NFT[]
  refetchNFTs?: () => void
}
export const ListLazyMintedNfts = (props: ListOfLazyMintedNftsProps) => {
  const [nft, setNFT] = useState<NFT>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addClaimPhase, setAddClaimPhase] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetchingLazyMintedTokens, setIsFetchingFetchingLazyMintedTokens] = useState(false)
  const [claimConditions, setClaimConditions] = useState<ClaimCondition[]>([])
  const [lazyMintedTokens, setLazyMintedTokens] = useState<NFT[]>([])
  const toast = useToast()

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsFetchingFetchingLazyMintedTokens(true)
      const lzMintedTokens = await props.nftContract?.erc1155.getAll()
      logger({ title: 'ListLazyMintedNfts::fetchNFTs', description: lzMintedTokens, type: 'log' })

      if (lzMintedTokens) {
        setLazyMintedTokens([...lzMintedTokens])
        setIsFetchingFetchingLazyMintedTokens(false)
      }
    }
    fetchNFTs()
  }, [lazyMintedTokens.length])

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

      console.log('getAllById cc: ', cc)

      if (cc && cc?.length > 0) {
        setClaimConditions([...cc]) // TODO: check out this spread of array for later clean up
        setIsFetching(false)
      }
    } catch (err: any) {
      setIsFetching(false)
      setClaimConditions([])
      throw Error(err.message)
    }
  }

  return (
    <>
      {isFetchingLazyMintedTokens ? (
        <Flex justifyContent={'center'}>
          <Spinner my={12} size="md" thickness="3px" speed="0.5s" emptyColor="gray.200" color={globalTheme.colors.primary} />
        </Flex>
      ) : (
        <Box my={12} style={{ border: '1px solid #a4a4a4', padding: 24 }}>
          <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
            List of lazy minted NFT{lazyMintedTokens.length > 1 ? <span style={{ fontSize: '14px' }}>(s)</span> : ''}:{' '}
            {lazyMintedTokens.length > 0 ? lazyMintedTokens.length : 0}
          </Text>

          <TableContainer my={8}>
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
                {lazyMintedTokens && lazyMintedTokens.length > 0 ? (
                  lazyMintedTokens.map((tkn) => {
                    return (
                      <Tr
                        key={tkn.metadata.id}
                        onClick={async () => await handleViewMore(tkn)}
                        _hover={{ backgroundColor: 'gray.700', cursor: 'pointer' }}>
                        <Td>
                          {tkn.metadata.id} 
                        </Td>
                        <Td>
                          <MediaRenderer src={tkn.metadata.image} width="200px" height="" alt={String(tkn.metadata.name)} />
                        </Td>
                        <Td>{formatString.titleCase(String(tkn.metadata.name))}</Td>
                        <Td>
                       {formatString.wordWrap(String(tkn.metadata.description), 38)} 
                        </Td>

                        <Td isNumeric>{tkn.supply}</Td>
                        <Td>
                          <Button onClick={async () => await handleViewMore(tkn)} variant={'outline'}>
                            View More / Configure
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })
                ) : (
                  <Tr>No minted token at the moment</Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr></Tr>
              </Tfoot>
            </Table>
          </TableContainer>

          {/* Modal */}
          <ShowNFTDetailsInModal
            addClaimPhase={addClaimPhase}
            setAddClaimPhase={setAddClaimPhase}
            claimConditions={claimConditions}
            getClaimConditionsById={getClaimConditionsById}
            isFetching={isFetching}
            isOpen={isOpen}
            nft={nft!}
            nftContract={props.nftContract}
            nftMetadata={props.nftMetadata}
            onClose={onClose}
            assetData={props.assetData}
          />
        </Box>
      )}
    </>
  )
}

import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { Asset } from '@livepeer/react'
import { ClaimCondition, MediaRenderer, NFT, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { globalTheme } from 'utils/config'
import { formatString } from 'utils/helpers'
import { ShowNFTDetailsInModal } from './ShowNFTDetailsInModal'

type ListOfLazyMintedNftsProps = {
  assetData: Asset | undefined
  lazyMintedTokens: NFT[]
  refetchNFTs?: () => void
  nftMetadata: Record<string, any>
  nftContract: SmartContract<ethers.BaseContract> | undefined
}

export const ListLazyMintedNFTs = (props: ListOfLazyMintedNftsProps) => {
  const [nft, setNFT] = useState<NFT>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addClaimPhase, setAddClaimPhase] = useState(false)
  const [isFetchingClaimConditions, setIsFetchingClaimConditions] = useState(false)
  const [isFetchingLazyMintedTokens, setIsFetchingFetchingLazyMintedTokens] = useState(false)
  const [claimConditions, setClaimConditions] = useState<ClaimCondition[]>([])
  const [lazyMintedTokens, setLazyMintedTokens] = useState<NFT[]>([])


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
  }, [lazyMintedTokens.length])


  const handleViewMore = async (_nft: NFT) => {
    onOpen() // open modal
    setNFT(_nft)
    getClaimConditionsById(_nft.metadata.id)
  }

  const getClaimConditionsById = async (tokenId: string) => {
    console.log('getClaimConditionsById: ', tokenId)

    try {
      setIsFetchingClaimConditions(true)
      // fetch all existing claim conditions
      const cc = await props.nftContract?.erc1155.claimConditions.getAll(tokenId)

      if (cc && cc?.length > 0) {
        setIsFetchingClaimConditions(false)
        setClaimConditions([...cc])
      }
    } catch (err: any) {
      setIsFetchingClaimConditions(false)
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
        props.lazyMintedTokens?.length > 0 && (
          <Box my={12} style={{ border: '1px solid #a4a4a4', padding: 24 }}>
            <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
              List of lazy minted NFT{props.lazyMintedTokens?.length > 1 ? <span style={{ fontSize: '14px' }}>(s)</span> : ''}:{' '}
              {props.lazyMintedTokens?.length > 0 ? props.lazyMintedTokens?.length : 0}
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
                  {props.lazyMintedTokens && props.lazyMintedTokens.length > 0 ? (
                    props.lazyMintedTokens.map((tkn) => {
                      return (
                        <Tr
                          key={tkn.metadata.id}
                          onClick={async () => await handleViewMore(tkn)}
                          _hover={{ backgroundColor: 'gray.700', cursor: 'pointer' }}>
                          <Td>{tkn.metadata.id}</Td>
                          <Td>
                            <MediaRenderer src={tkn.metadata.animation_url} width="200px" height="" alt={String(tkn.metadata.name)} />
                          </Td>
                          <Td>{formatString.titleCase(String(tkn.metadata.name))}</Td>
                          <Td>{formatString.wordWrap(String(tkn.metadata.description), 38)}</Td>

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
                    <Tr style={{ display: 'flex', alignItems: 'center', padding: '24px 0' }}>No minted token at the moment</Tr>
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
              isFetchingClaimConditions={isFetchingClaimConditions}
              isOpen={isOpen}
              nft={nft!}
              nftContract={props.nftContract as any}
              nftMetadata={props.nftMetadata}
              onClose={onClose}
              assetData={props.assetData}
            />
          </Box>
        )
      )}
    </>
  )
}

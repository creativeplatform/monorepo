import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import { ClaimCondition, ClaimConditionInput, NFT, SmartContract } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { useState } from 'react'
import { parseCurrencyDecimals } from 'utils/helpers'
import { EditClaimConditions } from './EditClaimConditons'

type ListClaimConditionsProps = {
  nft: NFT
  claimConditions: ClaimCondition[]
  nftMetadata: Record<string, any>
  nftContract: SmartContract<ethers.BaseContract> | undefined
}

export const ListClaimConditions = (props: ListClaimConditionsProps) => {
  const [canEditClaim, setCanEditClaim] = useState(false)

  const deleteClaimById = async (tokenId: string) => {
    // TODO: stub to delete a claim by id
    console.log('deleteClaimById: ', tokenId)
  }

  const handleClaimConditionUpdateById = async (tokenId: string, idx: number, claimInput: ClaimConditionInput) => {
    // deletes an existing claimCondition by its id
    const res = await props.nftContract?.erc1155.claimConditions.update(tokenId, idx, claimInput)
    console.log(res)
  }

  return (
    <VStack my={8} alignItems={'flex-start'} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      {props.claimConditions.length > 0 &&
        props.claimConditions.map((c, i) => (
          <Box key={i}>
            <Flex className="header" direction={'row'}>
              <VStack alignItems={'flex-start'} spacing={0} mb={4}>
                <Text fontSize={20}>Claims for token ID: #{props.nft?.metadata.id} </Text>
                <Text color={'gray.300'}>Any wallet can claim this token</Text>
              </VStack>
              <Spacer />
              <ButtonGroup variant="outline">
                <Button colorScheme="" variant="ghost" leftIcon={<EditIcon />} onClick={() => setCanEditClaim(!canEditClaim)}>
                  Edit
                </Button>
                <Button colorScheme="red" variant="ghost" leftIcon={<DeleteIcon />} onClick={() => deleteClaimById(props.nft?.metadata.id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </Flex>

            {!canEditClaim && (
              <Box className="body" key={c.startTime.toDateString()}>
                <HStack spacing="24px" style={{ fontSize: '14px' }}>
                  <Box>
                    <Text style={{ fontWeight: 600, marginBottom: '12px' }}>Phase Start</Text>
                    <span>{c.startTime.toDateString()}</span>
                  </Box>
                  <Box>
                    <Text style={{ fontWeight: 600 }}>Num to drop</Text>
                    <span>{c.availableSupply}</span>
                  </Box>
                  <Box>
                    <Text style={{ fontWeight: 600 }}>Price</Text>
                    {parseCurrencyDecimals(c.price as any, c.currencyMetadata.decimals)} <span>{c.currencyMetadata.symbol}</span>
                  </Box>
                  <Box>
                    <Text style={{ fontWeight: 600 }}>Limit per wallet</Text>
                    <span>{c.maxClaimablePerWallet}</span>
                  </Box>
                </HStack>
              </Box>
            )}

            {canEditClaim && (
              <EditClaimConditions
                nftContract={props.nftContract}
                nft={props.nft}
                handleClaimConditionUpdateById={handleClaimConditionUpdateById}
                claimCondition={props.claimConditions[i]}
              />
            )}
          </Box>
        ))}
    </VStack>
  )
}

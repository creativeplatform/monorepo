import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import { useContract } from '@thirdweb-dev/react'
import { ClaimCondition, NFT } from '@thirdweb-dev/sdk'
import { useEffect, useState } from 'react'
import { parseCurrencyAddressToSymbol, parseCurrencyDecimals } from 'utils/helpers'
import { EditClaimConditions } from './EditClaimConditons'

type ListExistingClaimConditionsProps = {
  nft: NFT
  existingClaimConditions: ClaimCondition[]
  nftMetadata: Record<string, any>
}

export const ListExistingClaimConditions = (props: ListExistingClaimConditionsProps) => {
  const [currencyAddress, setCurrencyAddress] = useState('')
  const [decimals, setDecimals] = useState(0)
  const [canEditClaim, setCanEditClaim] = useState(false)

  const { data: tokenContract } = useContract(currencyAddress)

  useEffect(() => {
    // TODO: source the currencyAddress
    // setCurrencyAddress()
    getCurrencyDecimals()
    return () => {}
  }, [currencyAddress])

  const getCurrencyDecimals = async () => {
    // TODO: Get symbol of currencyAddress
    const decimals = await tokenContract?.call('decimals')
    setDecimals(decimals)
  }

  const deleteClaimById = async (tokenId: string) => {
    // TODO: stub to delete a claim by id
    console.log('deleteClaimById: ', tokenId)
  }

  const handleEditClaimCondition = async (tokenId: string) => {
    // TODO: stub to delete a claim by id
    console.log('deleteClaimById: ', tokenId)
  }

  return (
    <VStack my={8} alignItems={'flex-start'} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      <Flex direction={'row'}>
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
      {props.existingClaimConditions.length > 0 && canEditClaim ? (
        <Box>
          <Text>Edit form comes here</Text>
          {/* TODO: add edit of claimConditions */}
          {/* <EditClaimConditions nft={props.nft} setCanEditClaim={setCanEditClaim} handleEditClaimCondition={handleEditClaimCondition} /> */}
          <Button onClick={() => setCanEditClaim(!canEditClaim)}>Submit edit</Button>
        </Box>
      ) : (
        props.existingClaimConditions.map((c) => (
          <Box key={c.startTime.toDateString()}>
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
                {parseCurrencyDecimals(c.price.toNumber(), decimals)} <span>{parseCurrencyAddressToSymbol(c.currencyAddress)}</span>
              </Box>
              <Box>
                <Text style={{ fontWeight: 600 }}>Limit per wallet</Text>
                <span>{c.maxClaimablePerWallet}</span>
              </Box>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  )
}

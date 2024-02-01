import { AddIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ClaimCondition, NFT, SmartContract } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { parseCurrencyDecimals } from 'utils/helpers'
import { EditClaimConditions } from './EditClaimConditons'

type ListClaimConditionsProps = {
  nft: NFT
  claimConditions: ClaimCondition[]
  nftMetadata: Record<string, any>
  nftContract: SmartContract<ethers.BaseContract> | undefined | any
  addClaimPhase?: boolean
  setAddClaimPhase?: (arg: boolean) => void
  isFetchingClaimConditions: boolean
}

export const ListClaimConditions = (props: ListClaimConditionsProps) => {
  const [canEditClaim, setCanEditClaim] = useState(false)

  useEffect(() => {
    // TODO: Listen to  `updateClaimCondition` event and refetch latest `claimConditions`

    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e: any) => {
      if (e.eventName == 'ClaimConditionsUpdated') {
        /* TODO: Remember to clear form fields after successful tx */
        // setCanEditClaim(false)
        console.log('ListClaimConditions::eventData ', e.data)
      }
    })
    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  })

  const deleteClaimById = async (tokenId: string) => {
    // TODO: stub to delete a claim by id
    console.log('deleteClaimById: ', tokenId)
  }

  const isActiveClaimPhase = (date: Date) => {
    return new Date().getTime() > new Date(date).getTime()
  }

  return (
    <>
      {/* {props.isFetchingClaimConditions && (
        <Spinner my={12} alignSelf={'center'} size="md" thickness="3px" speed="0.5s" emptyColor="gray.200" color={globalTheme.colors.primary} />
      )} */}
      <Box>
        <Text style={{ fontSize: '24px' }}>Set Claim Conditions</Text>
        <Text color={'gray.300'} fontStyle={'italic'}>
          Condition how your NFTs can be claimed
        </Text>
      </Box>

      <VStack my={8} alignItems={'flex-start'} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
        {props.claimConditions && props.claimConditions.length > 0 ? (
          <>
            <VStack alignItems={'flex-start'} spacing={0} mb={4}>
              <Text fontSize={20}>Claims for token ID: #{props.nft?.metadata.id} </Text>
              <Text color={'gray.300'}>Any wallet can claim this token</Text>
            </VStack>

            {props.claimConditions.map((c, i) => (
              <Box key={i} bgColor={'gray.600'} p={4} mb={1} borderRadius={4}>
                <Stack className="header" direction={'row'} alignItems={'flex-start'}>
                  {isActiveClaimPhase(c.startTime) && (
                    <Badge variant="solid" alignContent={'center'} size={'sm'} colorScheme="green">
                      Active
                    </Badge>
                  )}

                  <Spacer />
                  <ButtonGroup variant="outline">
                    <Button
                      colorScheme=""
                      variant="ghost"
                      leftIcon={canEditClaim ? <CloseIcon boxSize={3} /> : <EditIcon boxSize={3} />}
                      onClick={() => setCanEditClaim(!canEditClaim)}>
                      {canEditClaim ? 'Cancel Edit' : 'Edit'}
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<DeleteIcon boxSize={3} />}
                      onClick={() => deleteClaimById(props.nft?.metadata.id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Stack>

                {canEditClaim ? (
                  <EditClaimConditions
                    nftContract={props.nftContract}
                    nft={props.nft}
                    ccIndex={i}
                    claimCondition={props.claimConditions[i]}
                    setCanEditClaim={setCanEditClaim}
                  />
                ) : (
                  <Box className="body" key={c.startTime.toDateString()}>
                    <HStack spacing="24px" style={{ fontSize: '14px' }}>
                      <Box>
                        <Text style={{ fontWeight: 600, marginBottom: '12px' }}>Name</Text>
                        <span>{c.metadata?.name}</span>
                      </Box>
                      <Box>
                        <Text style={{ fontWeight: 600, marginBottom: '12px' }}>Start time</Text>
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
              </Box>
            ))}
          </>
        ) : (
          <>
            {/* {props.addClaimPhase && ( */}
            <VStack spacing={8}>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius={4}>
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Claim Conditions not set
                </AlertTitle>
                <AlertDescription maxWidth="sm">You need to set at least one claim condition to enable persons to claim this nft.</AlertDescription>
              </Alert>

              <Button
                variant="outline"
                fontSize={12}
                colorScheme={props.addClaimPhase ? 'red' : ''}
                leftIcon={!props.addClaimPhase ? <AddIcon fontSize={10} /> : <CloseIcon fontSize={10} />}
                onClick={() => {
                  console.log('props.addClaimPhase: ', props.addClaimPhase)
                  props.setAddClaimPhase!(!props.addClaimPhase)
                }}>
                {!props.addClaimPhase ? 'Add Claim Phase' : 'Cancel'}
              </Button>
            </VStack>
            {/* )} */}
          </>
        )}

        {props.claimConditions.length > 0 && (
          <AddClaimPhaseButton
            styles={{ marginTop: '20px', marginBottom: '12px' }}
            children={!props.addClaimPhase ? 'Add Claim Phase' : 'Cancel'}
            addClaimPhase={props.addClaimPhase!}
            setAddClaimPhase={props.setAddClaimPhase!}
          />
        )}
      </VStack>
    </>
  )
}

type AddClaimPhaseButtonProps = {
  addClaimPhase: boolean
  setAddClaimPhase: (args: boolean) => void
  children: string
  styles?: React.CSSProperties
}

function AddClaimPhaseButton(props: AddClaimPhaseButtonProps) {
  return (
    <Button
      style={props.styles}
      variant="outline"
      fontSize={12}
      colorScheme={props.addClaimPhase ? 'red' : ''}
      leftIcon={!props.addClaimPhase ? <AddIcon fontSize={10} /> : <CloseIcon fontSize={10} />}
      onClick={() => props.setAddClaimPhase(!props.addClaimPhase)}>
      {props.children}
    </Button>
  )
}

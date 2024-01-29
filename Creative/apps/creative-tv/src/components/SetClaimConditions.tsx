import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { ClaimCondition, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { claimConditionsOptions } from 'utils/helpers'

type ClaimFormData = {
  price?: string | ethers.BigNumber | undefined
  currencyAddress: string | undefined
  phaseName: string | undefined
  maxClaimablePerWallet: string
  maxClaimableSupply: number
  startTime: number | string | undefined
  waitInSeconds: string | number | bigint | ethers.BigNumber | undefined
}

type SetClaimConditionsProps = {
  nftContract: SmartContract<ethers.BaseContract> | undefined
  nftMetadata: Record<string, any>
  contractMetadata?: string
  numberOfClaimsConditonsAvailable: number
  tokenId: string
  setAddClaimPhase: (arg: boolean) => void
  claimConditions?: ClaimCondition[] // needed to be included with the new claimCondition
  getClaimConditionsById?: (tokenId: string) => void
}

//
export function SetClaimConditions(props: SetClaimConditionsProps) {
  const [isSettingClaim, setIsSettingClaim] = useState(false)
  const [isErrorFree, setIsErrorFree] = useState(false)
  const [txStatus, setTxStatus] = useState<number | undefined>(0)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()
  const toast = useToast()

  useEffect(() => {
    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e) => {
      if (e.eventName == 'ClaimConditionsUpdated') {
        console.log('SetClaimConditions::ClaimConditionsUpdated::eventData ', e.data)
        props.setAddClaimPhase(false)
        setIsSettingClaim(false)
      }
    })

    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  }, [props.nftContract])

  const handleSetClaimCondition = async (formData: any, tokenId: string): Promise<ethers.providers.TransactionReceipt | undefined> => {
    // Parse `price` field from `BigNumber` to string
    const previousClaimConditions = props.claimConditions?.map((cc) => {
      return {
        ...cc,
        price: cc.price.toString(),
      }
    })

    try {
      setIsSettingClaim(true)
      console.log('formData.price', formData.price)

      const tx = await props.nftContract?.erc1155.claimConditions.set(
        tokenId,
        [
          // At the moment; to add new claimCondition, you must batch the
          // previous claimConditions with the new claimCondition
          ...previousClaimConditions!,
          {
            currencyAddress: formData.currencyAddress,
            maxClaimablePerWallet: formData.maxClaimablePerWallet,
            maxClaimableSupply: formData.maxClaimableSupply,
            startTime: formData.startTime,
            waitInSeconds: formData.waitInSeconds,
            price: formData.price,
            metadata: {
              name: formData.phaseName,
            },
          },
        ],
        false
      )
      console.log('SetClaimConditions tx', tx)
      return tx?.receipt
    } catch (err) {
      console.error('SetClaimConditionsError', err)
      setIsSettingClaim(false)
      throw err
    }
  }

  const handleSubmitClaimConditions: SubmitHandler<ClaimFormData> = async (data) => {
    const { errors } = formState

    const isRequiredFields =
      errors.maxClaimablePerWallet?.type === 'required' ||
      errors.price?.type === 'required' ||
      errors.currencyAddress?.type === 'required' ||
      errors.maxClaimableSupply?.type === 'required' ||
      errors.phaseName?.type === 'required' ||
      errors.startTime?.type === 'required' ||
      errors.waitInSeconds?.type === 'required'

    if (isRequiredFields) {
      return
    }

    const formatData: ClaimFormData = {
      ...data,
      maxClaimablePerWallet: data.maxClaimablePerWallet,
      maxClaimableSupply: props.nftMetadata?.properties?.nFTAmountToMint,
      waitInSeconds: data.waitInSeconds,
      startTime: new Date(data.startTime?.toString()!) as any,
      price: props.nftMetadata['properties']['pricePerNFT'],
    }
    console.error('handleSetClaimCondition::formatData', formatData)

    try {
      setIsErrorFree(true)
      setIsSettingClaim(true)

      const receipt = await handleSetClaimCondition(formatData, props.tokenId)
      if (receipt) {
        setIsSettingClaim(false)
        setTxStatus(receipt.status)

        toast({
          title: 'Set Claim Conditions',
          description: `Successful with status: ${receipt.status}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (err: any) {
      console.error('handleSetClaimCondition', err)
      setIsSettingClaim(false)

      toast({
        title: 'Set Claim Conditions',
        description: `Setting claim conditions failed!`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box my={8} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
        Set conditions for the sale/claim of your NFT(s)
      </Text>
      <form onSubmit={handleSubmit(handleSubmitClaimConditions)} id="setClaimCondtion">
        <FormControl mb={8} isDisabled={isErrorFree && isSettingClaim}>
          <Stack direction={'column'} spacing={4} mb={4}>
            <VStack alignItems={'flex-start'}>
              <FormLabel>Name of Phase</FormLabel>
              <Controller
                name="phaseName"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    color={'gray.300'}
                    defaultValue={`Phase ${props.numberOfClaimsConditonsAvailable + 1}` || ''}
                    size={'lg'}
                    {...register('phaseName')}
                    mb={formState.errors.phaseName ? 0 : 4}
                    placeholder="Enter name to for this phase (Phase One)"
                    aria-invalid={formState.errors.phaseName ? 'true' : 'false'}
                    value={field.value}
                  />
                )}
              />
              {formState.errors.phaseName?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  Select a name for the phase of sales.
                </FormHelperText>
              )}
            </VStack>
            <VStack alignItems={'flex-start'}>
              <FormLabel>Start time of Phase</FormLabel>
              <Controller
                name="startTime"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    color={'gray.300'}
                    minW={200}
                    {...register('startTime')}
                    type="datetime-local"
                    size={'lg'}
                    mb={formState.errors.startTime ? 0 : 4}
                    placeholder="Start date and time of Phase"
                    aria-invalid={formState.errors.startTime ? 'true' : 'false'}
                  />
                )}
              />
              {formState.errors.startTime?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  When the phase starts (i.e. when users can start claiming tokens).
                </FormHelperText>
              )}
            </VStack>

            <VStack alignItems={'flex-start'}>
              <FormLabel>Select Payment Currency</FormLabel>
              <Controller
                name="currencyAddress"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    color={'gray.300'}
                    placeholder=""
                    size={'lg'}
                    {...register('currencyAddress')}
                    aria-invalid={formState.errors.currencyAddress ? 'true' : 'false'}>
                    <option value="">Select currency</option>
                    {Object.keys(claimConditionsOptions.currency).map((c, i) => (
                      <option key={i} value={Object.values(claimConditionsOptions.currency)[i]}>
                        {c}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.currencyAddress?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  Select a purchasing currency
                </FormHelperText>
              )}
            </VStack>

            <VStack alignItems={'flex-start'}>
              <FormLabel>Cool down period for a buyer to repurchase</FormLabel>
              <Controller
                name="waitInSeconds"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    placeholder=""
                    color={'gray.300'}
                    size={'lg'}
                    {...register('waitInSeconds')}
                    aria-invalid={formState.errors.waitInSeconds ? 'true' : 'false'}>
                    {Object.keys(claimConditionsOptions.waitInSecondsOptions).map((time, i) => (
                      <option key={i} value={Object.values(claimConditionsOptions.waitInSecondsOptions)[i]}>
                        {time}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.waitInSeconds?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  The period of time users must wait between repeat claims.
                </FormHelperText>
              )}
            </VStack>

            <VStack alignItems={'flex-start'}>
              <FormLabel>Maximum purchase per Wallet </FormLabel>
              <Controller
                name="maxClaimablePerWallet"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    color={'gray.300'}
                    type="number"
                    {...register('maxClaimablePerWallet')}
                    min={1}
                    max={5}
                    size={'lg'}
                    mb={formState.errors.maxClaimablePerWallet ? 0 : 4}
                    placeholder="The maximum number of tokens a wallet can claim"
                    aria-invalid={formState.errors.maxClaimablePerWallet ? 'true' : 'false'}
                    value={field.value}
                  />
                )}
              />
              {formState.errors.maxClaimablePerWallet?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  The maximum number of tokens a wallet can claim.
                </FormHelperText>
              )}
            </VStack>
          </Stack>
        </FormControl>

        <Button
          type="submit"
          _hover={{
            color: 'gray.300',
            cursor: isSettingClaim ? 'progress' : 'pointer',
          }}
          style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}
          isLoading={isSettingClaim}
          loadingText={isSettingClaim ? 'Submitting...' : ''}
          mb={20}>
          Set Conditions
        </Button>
      </form>
    </Box>
  )
}

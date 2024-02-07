import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { claimConditionsOptions } from 'utils/helpers'

type ClaimFormData = {
  price?: string
  currencyAddress: string
  phaseName: string
  maxClaimablePerWallet: string
  maxClaimableSupply: string
  startTime: string
  waitInSeconds: string
}

type SetClaimConditionsProps = {
  nftContract: SmartContract<ethers.BaseContract> | undefined
  nftMetadata: Record<string, any>
  contractMetadata?: string
  numberOfClaimsConditonsAvailable: number
  tokenId: string
  setAddClaimPhase: (arg: boolean) => void
  getClaimConditionsById: (tokenId: string) => void
}

//
export function SetClaimConditions(props: SetClaimConditionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorFree, setIsErrorFree] = useState(false)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()
  const toast = useToast()

  useEffect(() => {
    // TODO: decide Form appearance on when the `Modal` gets closed
    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e) => {
      if (e.eventName == 'ClaimConditionsUpdated') {
        console.log('SetClaimConditions::ClaimConditionsUpdated::eventData ', e.data)
        props.setAddClaimPhase(false)
         props.getClaimConditionsById(props.tokenId);

        setIsSubmitting(false)
      }
    })

    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  }, [props.nftContract])

  const handleSetClaimCondition = async (formData: any, tokenId: string): Promise<ethers.providers.TransactionReceipt | undefined> => {
    try {
      const d = [{"startTimestamp": "1705525200000","maxClaimableSupply": "10","supplyClaimed": "100","quantityLimitPerWallet": "3","merkleRoot": "0","pricePerToken": "250000000000000000","currency":"0xc0823427fE72cFD105c71BEAd0476412283B07c5","metadata":{"name": "Public Phase"}}]

      // const tx = await props.nftContract?.erc1155.claimConditions.set(tokenId, [
      //   {
      //     startTime: formData.startTime, // When the phase starts (i.e. when users can start claiming tokens)
      //     maxClaimableSupply: formData.maxClaimableSupply, // limit how many mints for this presale
      //     price: formData.price, // presale price
      //     currencyAddress: formData.currencyAddress, // The address of the currency you want users to pay in
      //     maxClaimablePerWallet: formData.maxClaimablePerWallet, // The maximum number of tokens a wallet can claim
      //     metadata: {
      //       name: formData.phaseName, // Name of the sale's phase
      //     },
      //     waitInSeconds: formData.waitInSeconds, // How long a buyer waits before another purchase is possible
      //   },
      // ])

      // console.log('SetClaimConditions tx: ', tx?.receipt)
      // return tx?.receipt
    } catch (err) {
      console.log('claimConditions txError: ', err)
      return undefined
    }
  }

  const submithandleClaimConditions: SubmitHandler<ClaimFormData> = async (data) => {
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
    const dateObj = new Date(data.startTime)

    const formatData = {
      ...data,
      maxClaimablePerWallet: +data.maxClaimablePerWallet,
      maxClaimableSupply: +props.nftMetadata?.properties?.nFTAmountToMint,
      waitInSeconds: +data.waitInSeconds,
      startTime: dateObj.getTime(),
      price: +props.nftMetadata['properties']['pricePerNFT'] /** * tokenDecimal */, // TODO: get the erc20Contract and fetch its decimal
    }
    console.log('Raw data: ', data)
    console.log('formated Data: ', formatData)
    console.log()

    console.log('formated date: ', formatData.startTime)
    console.log('Raw date: ', data.startTime)

    console.log('Check startTime: ', new Date(data.startTime).getTime() == formatData.startTime)

    try {
      setIsErrorFree(true)
      setIsSubmitting(true)

      const receipt = await handleSetClaimCondition(formatData, props.tokenId)
      if (receipt) {
        setIsSubmitting(false)

        toast({
          title: 'Set Claim Conditions',
          description: `Successful with status: ${receipt.status}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (err: any) {
      console.error(err)
      setIsSubmitting(false)

      toast({
        title: 'Set Claim Conditions',
        description: `Setting claim conditions failed!`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <Box my={8} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
        Set conditions for the sale/claim of your NFT(s)
      </Text>
      <form onSubmit={handleSubmit(submithandleClaimConditions)} id="setClaimCondtion">
        <FormControl mb={8} isDisabled={isErrorFree && isSubmitting}>
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
            cursor: isSubmitting ? 'progress' : 'pointer',
          }}
          style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}
          isLoading={isSubmitting}
          loadingText={isSubmitting ? 'Submitting...' : ''}
          mb={20}>
          Set Conditions
        </Button>
      </form>
    </Box>
  )
}
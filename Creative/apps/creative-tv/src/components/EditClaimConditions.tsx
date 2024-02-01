import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, VStack, useToast } from '@chakra-ui/react'
import { ClaimCondition, NFT, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { claimConditionsOptions, date, } from 'utils/helpers'

type EditClaimFormData = {
  currencyAddress: string
  phaseName: string
  maxClaimablePerWallet: string
  maxClaimableSupply?: string
  startTime: number
  waitInSeconds: string
}

type EditClaimConditionsProps = {
  nft: NFT
  claimCondition: ClaimCondition
  nftContract: SmartContract<ethers.BaseContract> | undefined
  ccIndex: number // claimConditonsIndex
  setCanEditClaim: (arg: boolean) => void
}

//
export function EditClaimConditions(props: EditClaimConditionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorFree, setIsErrorFree] = useState(false)
  const [isExecuted, setIsExecuted] = useState(false) // to clear form data

  const toast = useToast()

  const cc = props.claimCondition

  useEffect(() => {
    // TODO: decide Form appearance on when the `Modal` gets closed
    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e) => {
      if (e.eventName == 'ClaimConditionsUpdated') {
        /* TODO: Remember to clear form fields after successful tx */

        setIsSubmitting(false)
        // setIsExecuted(true)
        props.setCanEditClaim(false)
        console.log('EditClaimConditions::eventData ', e.data)
      }
    })
    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  }, [props.nftContract])

  const handleUpdateClaimCondition = async (tokenId: string, ccIndex: number, formData: EditClaimFormData): Promise<boolean | undefined> => {
    // update an existing claimCondition by its id

    try {
      await props.nftContract?.erc1155.claimConditions.update(tokenId, ccIndex, {
        startTime: formData.startTime, // When the phase starts (i.e. when users can start claiming tokens)
        maxClaimableSupply: formData.maxClaimableSupply, // limit how many mints for this presale
        currencyAddress: formData.currencyAddress, // The address of the currency you want users to pay in
        maxClaimablePerWallet: formData.maxClaimablePerWallet, // The maximum number of tokens a wallet can claim
        metadata: {
          name: formData.phaseName, // Name of the sale's phase
        },
        waitInSeconds: formData.waitInSeconds, // How long a buyer waits before another purchase is possible
      })

      return true
    } catch (err) {
      console.log({ description: 'claimConditions txError: ', err })

      toast({
        title: 'Set Claim Conditions',
        description: `Failed to set claim conditions`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const sumbitUpdatedClaimConditions: SubmitHandler<EditClaimFormData> = async (data) => {
    const { errors } = formState

    const isRequiredFields =
      errors.maxClaimablePerWallet?.type === 'required' ||
      errors.currencyAddress?.type === 'required' ||
      errors.phaseName?.type === 'required' ||
      errors.startTime?.type === 'required' ||
      errors.waitInSeconds?.type === 'required'

    if (isRequiredFields) {
      return
    }

    const dateObj = new Date(data.startTime)

    const formData = {
      ...data,
      maxClaimablePerWallet: data.maxClaimablePerWallet,
      waitInSeconds: data.waitInSeconds,
      startTime: dateObj.getTime(),
    }

    try {
      setIsErrorFree(true)
      setIsSubmitting(true)

      // TODO: remove after debugging
      await handleUpdateClaimCondition(props.nft.metadata.id, props.ccIndex, formData)
    } catch (err: any) {
      setIsSubmitting(false)

      console.error(err)
      toast({
        title: 'Set Claim Conditions',
        description: `Setting claim conditions failed!`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const { handleSubmit, control: ctrl, formState, register } = useForm<EditClaimFormData>()

  return (
    <Box my={8}>
      <form onSubmit={handleSubmit(sumbitUpdatedClaimConditions)} id="updateClaimCondtion">
        <FormControl mb={8} isDisabled={isErrorFree && isSubmitting} defaultValue={''}>
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
                    defaultValue={cc.metadata?.name || ''}
                    size={'lg'}
                    {...register('phaseName')}
                    mb={formState.errors.phaseName ? 0 : 4}
                    placeholder="Enter name to for this phase (Phase 1)"
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
                    defaultValue={date.parseDate(cc.startTime)}
                    color={'gray.300'}
                    minW={200}
                    {...register('startTime')}
                    type="datetime-local"
                    size={'lg'}
                    mb={formState.errors.startTime ? 0 : 4}
                    placeholder="Start time of Phase"
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
                render={({ field }) => {
                  console.log(' cc.currencyAddress: ', cc.currencyAddress)
                  return (
                    <Select
                      defaultValue={cc.currencyAddress}
                      color={'gray.300'}
                      placeholder=""
                      size={'lg'}
                      {...register('currencyAddress')}
                      aria-invalid={formState.errors.currencyAddress ? 'true' : 'false'}>
                      <option value="">Select currency</option>
                      {Object.keys(claimConditionsOptions.currency).map((c, i) => {
                        console.log(c, Object.values(claimConditionsOptions.currency)[i])
                        return (
                          <option key={i} value={Object.values(claimConditionsOptions.currency)[i]}>
                            {c}
                          </option>
                        )
                      })}
                    </Select>
                  )
                }}
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
                render={({ field }) => {
                  return (
                    <Select
                      defaultValue={parseInt(cc.waitInSeconds.toString()) == 0 ? 300 : ''}
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
                  )
                }}
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
                    defaultValue={cc.maxClaimablePerWallet}
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
          loadingText={isSubmitting ? 'Saving' : ''}
          mb={20}>
          Save
        </Button>
      </form>
    </Box>
  )
}

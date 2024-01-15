import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { NFT } from '@thirdweb-dev/react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { claimConditions } from 'utils/helpers'

type ClaimFormData = {
  price?: string
  currencyAddress: string
  phaseName: string
  maxClaimablePerWallet: string
  maxClaimableSupply: string
  startTime: Date
  waitInSeconds: string
}

type SetClaimConditionsProps = {
  nft: NFT
  handleEditClaimCondition: (data: any) => Promise<boolean | undefined>
  setCanEditClaim: (data: any) => Promise<any>
}
 
//
export function EditClaimConditions(props: SetClaimConditionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()
  const toast = useToast()

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

    const formData = {
      ...data,
    //   maxClaimableSupply: props.nftMetadata?.properties?.nFTAmountToMint,
    //   startTime: new Date(data.startTime).getTime(),
    //   price: props.nftMetadata['properties']['pricePerNFT'],
    }

    try {
      setIsSubmitting(true)
      const ans = await props.handleEditClaimCondition(formData)
      if (ans) {
        setIsSubmitting(false)
      }
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

  return (
    <Box my={8} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
        Set conditions for the sale/claim of your NFT(s)
      </Text>
      <form onSubmit={handleSubmit(submithandleClaimConditions)} id="setClaimCondtion">
        <FormControl mb={8}>
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
                    defaultValue={'Phase One'} // TODO: Check the number of claim already set and use that number to default the name of a phase
                    size={'lg'}
                    {...register('phaseName')}
                    mb={formState.errors.phaseName ? 0 : 4}
                    placeholder="Enter numbers of nft for sale"
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
                    type="date"
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
                render={({ field }) => (
                  <Select
                    color={'gray.300'}
                    placeholder=""
                    size={'lg'}
                    {...register('currencyAddress')}
                    aria-invalid={formState.errors.currencyAddress ? 'true' : 'false'}>
                    <option value="">Select currency</option>
                    {Object.keys(claimConditions.currency).map((c, i) => (
                      <option key={i} value={Object.values(claimConditions.currency)[i]}>
                        {c}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.phaseName?.type === 'required' && (
                <FormHelperText mb="32px" color={'red.500'}>
                  Select a name for the phase of sales.
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
                    {Object.keys(claimConditions.waitInSecondsOptions).map((time, i) => (
                      <option key={i} value={Object.values(claimConditions.waitInSecondsOptions)[i]}>
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
                    // max={props.nftMetadata['properties']['amountOfNftToMint'] - 1}
                    size={'lg'}
                    mb={formState.errors.maxClaimablePerWallet ? 0 : 4}
                    placeholder="The maximum number of tokens a wallet can claim"
                    aria-invalid={formState.errors.maxClaimablePerWallet ? 'true' : 'false'}
                    value={field.value}
                    // defaultValue={props.nft}
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
          mb={20}>
          Set Conditions
        </Button>
      </form>
    </Box>
  )
}

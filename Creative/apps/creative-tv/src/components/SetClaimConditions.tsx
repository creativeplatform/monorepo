import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
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
  nftContractAddress?: string
  nftMetadata: Record<string, any>
  contractMetadata?: string
  handleSetClaimCondition: (data: any) => Promise<boolean | undefined>
}

//
export function SetClaimConditions(props: SetClaimConditionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()
  const toast = useToast()

  console.log('SetClaimConditions::props: ', props)

  const handleClaimConditions: SubmitHandler<ClaimFormData> = async (data) => {
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
      maxClaimableSupply: props.nftMetadata?.properties?.nFTAmountToMint,
      startTime: new Date(data.startTime).getTime(),
      price: props.nftMetadata['properties']['pricePerNFT'],
    }

    try {
      setIsSubmitting(true)
      const ans = await props.handleSetClaimCondition(formData)
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
    <Box>
      <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
        Set conditions for the sale/claim of your NFT(s)
      </Text>
      <form onSubmit={handleSubmit(handleClaimConditions)} id="setClaimCondtion">
        <FormControl mb={8} style={{ color: '#ccc' }}>
          <Stack direction={'row'} spacing={24} mb={12}>
            {/*
            <VStack>
               <FormLabel>Name of Phase</FormLabel>
              <Controller
                name="phaseName"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    placeholder=""
                    minW={200}
                    size={'lg'}
                    {...register('phaseName')}
                    aria-invalid={formState.errors.phaseName ? 'true' : 'false'}>
                    {Object.keys(claimConditions.phase).map((phase, i) => (
                      <option key={i} value={Object.values(claimConditions.phase)[i]}>
                        {phase}
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
            </VStack> */}
            <VStack>
              <FormLabel>Start time of Phase</FormLabel>
              <Controller
                name="startTime"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
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

            <VStack>
              <FormLabel>Select Payment Currency</FormLabel>
              <Controller
                name="currencyAddress"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
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
          </Stack>

          <Stack direction={'row'} spacing={24} mb={12}>
            <VStack>
              <FormLabel>Cool down period for a buyer to repurchase</FormLabel>
              <Controller
                name="waitInSeconds"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select placeholder="" size={'lg'} {...register('waitInSeconds')} aria-invalid={formState.errors.waitInSeconds ? 'true' : 'false'}>
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
            {/* <VStack>
              <FormLabel mt={4}>The number of tokens to be claimed in this phase</FormLabel>
              <Controller
                name="maxClaimableSupply"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    size={'lg'}
                    type="number"
                    {...register('maxClaimableSupply')}
                    mb={formState.errors.maxClaimableSupply ? 0 : 4}
                    placeholder="Enter numbers of nft for sale"
                    aria-invalid={formState.errors.maxClaimableSupply ? 'true' : 'false'}
                    value={field.value}
                  />
                )}
              />
              {formState.errors.maxClaimableSupply?.type == 'required' && (
                <FormHelperText mb={4} color={'red.500'}>
                  Enter numbers of nft for sale.
                </FormHelperText>
              )}
            </VStack> */}

            <VStack>
              <FormLabel>Maximum purchase per Wallet </FormLabel>
              <Controller
                name="maxClaimablePerWallet"
                control={ctrl}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...register('maxClaimablePerWallet')}
                    min={1}
                    max={props.nftMetadata['properties']['amountOfNftToMint'] - 1}
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
          mb={20}>
          Set Conditions
        </Button>
      </form>
    </Box>
  )
}

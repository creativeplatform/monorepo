import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { useAddress, useContract } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { salesClaimPhase, waitInSecondsClaimConditionsOptions } from 'utils'
import { tokenContractAddress } from 'utils/config'

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
  nftContractAddress: string
  nftMetadata: Record<string, any>
  contractMetadata: string
}

const tokenContractAcceptedForPayments = [{ usdc: tokenContractAddress.USDC.chain.polygon.mumbai }] // The tokens accepted for payment by the buyer

//
export function SetClaimConditions(props: SetClaimConditionsProps) {
  let tokenId = 1
  const connectedAddress = useAddress()
  const router = useRouter()
  const { contract: nftContract } = useContract(props.nftContractAddress)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()

  const toast = useToast()
  console.log('props 101: ', props)

  // const [state, setState] = useState({
  //   price: props.nftMetadata['properties']['pricePerNFT'], // The price of the token in the currency specified above
  //   currencyAddress: '', // The address of the currency you want users to pay in
  //   phaseName: '', // The name of the phase
  //   maxClaimablePerWallet: '', // The maximum number of tokens a wallet can claim
  //   maxClaimableSupply: '', // The total number of tokens that can be claimed in this phase
  //   startTime: '', // When the phase starts (i.e. when users can start claiming tokens)
  //   waitInSeconds: '',
  // })

  // const handleChange = (e: any) => {
  //   const name = e.target.name
  //   setState({ ...state, [name]: e.target.value })
  // }

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
      startTime: new Date(data.startTime).getTime(),
      price: props.nftMetadata['properties']['pricePerNFT'],
    }

    try {
      setIsSubmitting(true)
      console.log('form data: ', formData)
  
      const claimConditions = await nftContract?.erc1155.claimConditions.set(tokenId, [
        {
          startTime: formData.startTime, // When the phase starts (i.e. when users can start claiming tokens)
          maxClaimableSupply: formData.maxClaimableSupply, // limit how many mints for this presale
          price: formData.price, // presale price
          currencyAddress: formData.currencyAddress, // The address of the currency you want users to pay in
          maxClaimablePerWallet: formData.maxClaimablePerWallet, // The maximum number of tokens a wallet can claim
          metadata: {
            name: formData.phaseName, // Name of the sale's phase
          },
          waitInSeconds: formData.waitInSeconds, // How long a buyer waits before another purchase is possible
        },
      ])

      console.log('claimConditions tx: ', claimConditions?.receipt)
      toast({
        title: 'Set Claim Conditions',
        description: `Status: ${claimConditions?.receipt.status}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.replace({
        pathname: `profile/${encodeURIComponent(connectedAddress as any)}`,
        hash: 'uploadedVideo',
        query: {
          isClaimConditionSet: claimConditions?.receipt.status,
          nftContractAddress: props.nftContractAddress,
          contractMetadata: props.contractMetadata as any,
          nftMetadata: props.nftMetadata as any,
        },
      })
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
      <Text as={'h3'} style={{ paddingTop: '12px', paddingBottom: '24px', fontSize: 24 }}>
        Set Claim Conditions
      </Text>
      <form onSubmit={handleSubmit(handleClaimConditions)} id="setClaimCondtion">
        <FormControl mb={8} style={{ color: '#ccc' }}>
          <Stack direction={'row'} spacing={24} mb={12}>
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
                    {Object.keys(salesClaimPhase).map((phase, i) => (
                      <option key={i} value={Object.values(salesClaimPhase)[i]}>
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
            </VStack>
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
                    <option value={tokenContractAddress.USDC.chain.polygon.mumbai}>USDC</option>
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
                    {Object.keys(waitInSecondsClaimConditionsOptions).map((time, i) => (
                      <option key={i} value={Object.values(waitInSecondsClaimConditionsOptions)[i]}>
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
            <VStack>
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
            </VStack>

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
          className="setClaim-button"
          _hover={{
            color: 'gray.300',
            // transform: isError && 'scale(1.015)',
            // cursor: progress?.[0]?.phase === 'processing' ? 'progress' : 'pointer',
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

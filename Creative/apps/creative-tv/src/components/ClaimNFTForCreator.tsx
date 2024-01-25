import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { SmartContract, useActiveClaimCondition, useAddress, useClaimNFT } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type ClaimFormData = {
  qty: number
  reciepientAddress: string | undefined
}

type ClaimNFTProps = {
  nftContract: SmartContract<ethers.BaseContract> | undefined
  tokenId: string
  nftMetadata: Record<string, any>
}
export function ClaimNFTForCreator(props: ClaimNFTProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorFree, setIsErrorFree] = useState(false)
  const [txStatus, setTxStatus] = useState<number | undefined>(0)
  const toast = useToast()
  const connectedAddress = useAddress()

  const {
    data: activeClaimCondition,
    isLoading: isActiveClaimLoading,
    error: activeClaimError,
  } = useActiveClaimCondition(props.nftContract, props.tokenId)

  const { mutateAsync: claimNft, isLoading, error } = useClaimNFT(props.nftContract)

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()

  useEffect(() => {
    console.log('activeClaimCondition: ', activeClaimCondition)
  }, [isActiveClaimLoading])

  const handleClaimNFT = async (data: ClaimFormData, tokenId: string): Promise<ethers.providers.TransactionReceipt | undefined> => {
    const claimNftData = {
      tokenId: props.tokenId,
      to: data.reciepientAddress,
      quantity: data.qty,
      options: {
        currencyAddress: activeClaimCondition?.currencyAddress,
        checkERC20Allowance: true,
        pricePerToken: activeClaimCondition?.price.toNumber(),
      },
    }

    console.log(claimNftData)

    const price = activeClaimCondition?.price.toNumber()! / 10 ** activeClaimCondition?.currencyMetadata.decimals!
    console.log('price: ', price)

    try {
      const tx = await claimNft({
        tokenId: props.tokenId,
        to: data.reciepientAddress,
        quantity: data.qty,
        options: {
          checkERC20Allowance: true,
          currencyAddress: activeClaimCondition?.currencyAddress,
          pricePerToken: price,
        },
      })

      if (tx) {
        console.log(tx.toString())
      }

      return undefined
    } catch (err) {
      throw err
    }
  }

  const submithandleClaimConditions: SubmitHandler<ClaimFormData> = async (data) => {
    const { errors } = formState

    const toastOptions = {
      title: 'Claiming NFT',
      duration: 3000,
      isClosable: true,
    }

    const isRequiredFields = errors.reciepientAddress?.type === 'required' || errors.qty?.type === 'required'

    if (isRequiredFields) {
      return
    }

    try {
      setIsErrorFree(true)
      setIsSubmitting(true)

      const receipt = await handleClaimNFT(data, props.tokenId)
      if (receipt) {
        setIsSubmitting(false)
        setTxStatus(receipt.status)

        toast({
          title: toastOptions.title,
          description: `Successful with status: ${receipt.status}`,
          status: 'success',
          duration: toastOptions.duration,
          isClosable: toastOptions.isClosable,
        })
      }
    } catch (err: any) {
      console.error(err)
      setIsSubmitting(false)

      toast({
        title: toastOptions.title,
        description: `Claiming NFT failed!`,
        status: 'error',
        duration: toastOptions.duration,
        isClosable: toastOptions.isClosable,
      })
    }
  }

  return (
    <Box my={8} style={{ border: '1px solid #b2b2b2', borderRadius: '8px', padding: '24px' }}>
      {activeClaimCondition !== undefined ? (
        <>
          <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
            Claim your NFT(s)
          </Text>

          <form onSubmit={handleSubmit(submithandleClaimConditions)} id="setClaimCondtion">
            <FormControl mb={8} isDisabled={isErrorFree && isSubmitting}>
              <Stack direction={'column'} spacing={4} mb={4}>
                <VStack alignItems={'flex-start'}>
                  <FormLabel>Claim to address</FormLabel>
                  <Controller
                    name="reciepientAddress"
                    control={ctrl}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        color={'gray.300'}
                        defaultValue={connectedAddress || ''}
                        size={'lg'}
                        {...register('reciepientAddress')}
                        mb={formState.errors.reciepientAddress ? 0 : 4}
                        placeholder="Enter address the nft is claimed to"
                        aria-invalid={formState.errors.reciepientAddress ? 'true' : 'false'}
                        value={field.value}
                      />
                    )}
                  />
                  {formState.errors.reciepientAddress?.type === 'required' && (
                    <FormHelperText mb="32px" color={'red.500'}>
                      Enter address to claim to
                    </FormHelperText>
                  )}
                </VStack>
                <VStack alignItems={'flex-start'}>
                  <FormLabel>Amount</FormLabel>
                  <Controller
                    name="qty"
                    control={ctrl}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        color={'gray.300'}
                        minW={200}
                        {...register('qty')}
                        type="number"
                        size={'lg'}
                        mb={formState.errors.qty ? 0 : 4}
                        placeholder="Number of nft to claim"
                        aria-invalid={formState.errors.qty ? 'true' : 'false'}
                      />
                    )}
                  />
                  {formState.errors.qty?.type === 'required' && (
                    <FormHelperText mb="32px" color={'red.500'}>
                      How many to claim?
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
              Claim
            </Button>
          </form>
        </>
      ) : (
        <Text as={'h4'} style={{ paddingTop: '12px', paddingBottom: '42px', fontSize: 24 }}>
          No active claim condition on your NFT(s) at the moment;
        </Text>
      )}
    </Box>
  )
}

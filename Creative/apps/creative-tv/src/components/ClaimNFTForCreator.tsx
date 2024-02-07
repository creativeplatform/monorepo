import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { ClaimNFTReturnType, SmartContract, useActiveClaimCondition, useAddress, useClaimNFT } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { usePurchaseCurrency } from 'hooks/usePurchaseCurrency'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type ClaimFormData = {
  qty: number
  recipientAddress: string | undefined
}

type ClaimNFTProps = {
  nftContract: SmartContract<ethers.BaseContract> | undefined
  tokenId: string
  nftMetadata: Record<string, any>
}
export function ClaimNFTForCreator(props: ClaimNFTProps) {
  const [isClaiming, setIsClaiming] = useState(false)
  const [isErrorFree, setIsErrorFree] = useState(false)
  const toast = useToast()
  const connectedAddress = useAddress()

  const {
    data: activeClaimCondition,
    isLoading: isActiveClaimLoading,
    error: activeClaimError,
  } = useActiveClaimCondition(props.nftContract, props.tokenId)

  const { mutateAsync: claimNft, isLoading, error } = useClaimNFT(props.nftContract)

  useEffect(() => {
    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e) => {
      if (e.eventName == 'TokensClaimed') {
        setIsClaiming(false)
        console.log('TokensClaimed::eventData ', e.data)
      }
    })

    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  })

  useEffect(() => {
    console.log({ title: 'activeClaimCondition', description: activeClaimCondition })
  }, [isActiveClaimLoading])

  const {
    balance: buyerBalance,
    error: balanceError,
    isFetching,
  } = usePurchaseCurrency({
    erc20Address: activeClaimCondition?.currencyAddress!,
    walletAddress: connectedAddress!,
  })

  const { handleSubmit, control: ctrl, formState, register } = useForm<ClaimFormData>()

  const handleClaimNFT = async (data: ClaimFormData, tokenId: string): Promise<ClaimNFTReturnType | undefined> => {
    const claimNftData = {
      tokenId: props.tokenId,
      to: data.recipientAddress,
      quantity: data.qty,
      options: {
        currencyAddress: activeClaimCondition?.currencyAddress,
        checkERC20Allowance: true,
        pricePerToken: activeClaimCondition?.price.toNumber(),
      },
    }

    console.log({ title: 'claimNftData', description: claimNftData })

    try {
      // checkout maxClaimablePerWallet
      const maxClaimablePerWallet = activeClaimCondition?.maxClaimablePerWallet
      const recipientAddressBalance = await props.nftContract?.erc1155.balanceOf(data.recipientAddress!, props.tokenId)

      if (Number(maxClaimablePerWallet) === recipientAddressBalance?.toNumber()) {
        throw Error('Recipient has gotten maximium number of nft for the phase')
      }

      // checkout user balance for payment
      const priceOfNFT = activeClaimCondition?.currencyMetadata.displayValue!
      if (Number(priceOfNFT) > buyerBalance) {
        throw Error(`Your ${activeClaimCondition?.currencyMetadata.name} balance is below the price of this nft`)
      }

      const tx = await claimNft({
        tokenId: props.tokenId,
        to: data.recipientAddress,
        quantity: data.qty,
      })

      return tx
    } catch (err: any) {
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

    const isRequiredFields = errors.recipientAddress?.type === 'required' || errors.qty?.type === 'required'

    if (isRequiredFields) {
      return
    }

    try {
      setIsErrorFree(true)
      setIsClaiming(true)

      const tx = await handleClaimNFT(data, props.tokenId)
      if (tx) {
        setIsClaiming(false)
        console.log({ title: 'ClaimNFTReturnType', description: tx })

        toast({
          title: toastOptions.title,
          description: `Claim was successful!`,
          status: 'success',
          duration: toastOptions.duration,
          isClosable: toastOptions.isClosable,
        })
      }
    } catch (err: any) {
      setIsClaiming(false)
      console.log({ title: 'ClaimError', description: err.message })

      toast({
        title: toastOptions.title,
        description: err.message,
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
            <FormControl mb={8} isDisabled={isErrorFree && isClaiming}>
              <Stack direction={'column'} spacing={4} mb={4}>
                <VStack alignItems={'flex-start'}>
                  <FormLabel>Claim to address</FormLabel>
                  <Controller
                    name="recipientAddress"
                    control={ctrl}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        color={'gray.300'}
                        defaultValue={connectedAddress || ''}
                        size={'lg'}
                        {...register('recipientAddress')}
                        mb={formState.errors.recipientAddress ? 0 : 4}
                        placeholder="Enter address the nft is claimed to"
                        aria-invalid={formState.errors.recipientAddress ? 'true' : 'false'}
                        value={field.value}
                      />
                    )}
                  />
                  {formState.errors.recipientAddress?.type === 'required' && (
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
                        min={1}
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
                cursor: isClaiming ? 'progress' : 'pointer',
              }}
              style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}
              isLoading={isClaiming}
              loadingText={isClaiming ? 'Claiming...' : ''}
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

import { Box, Button, Flex, Image, Spinner, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { Player } from '@livepeer/react'
import {
  Web3Button,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimIneligibilityReasons,
  useClaimerProofs,
  useContract,
  useTotalCirculatingSupply,
} from '@thirdweb-dev/react'
import { ClaimEligibility } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useMemo, useState } from 'react'
import { CREATIVE_LOGO_WHT } from 'utils/context'
import { Video } from 'utils/fetchers/assets'
import { ERC20_TOKEN, globalTheme } from '../utils/config'
import { thirdwebSDK } from '../utils/helpers'
import { IAssetData, IReturnedAssetData } from '../utils/types'

const PosterImage = () => {
  return <Image src={CREATIVE_LOGO_WHT} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
}

interface AssetData extends IAssetData {
  storage?: {
    ipfs: {
      cid: string
      spec: {
        nftMetadata: {
          image: string
          properties: {
            image_url: string
            pricePerNFT: string
            external_url: string
            animation_url: string
            nFTAmountToMint: string
          }
          description: string
        }
      }
      updatedAt: string
      nftMetadata: {
        cid: string
        url: string
        gatewayUrl: string
      }
      url: string
      gatewayUrl: string
    }
    status: {
      phase: string
      tasks: {
        last: string
      }
    }
  }
}

type MintVideoNFTProps = {
  assetData?: AssetData & IReturnedAssetData
  activeClaimCondition: ReturnType<typeof useActiveClaimConditionForWallet>
  tokenId: string
  contractAddress: string
  videoAsset: Video
}

export const ClaimVideoNFT: React.FC<MintVideoNFTProps> = (props) => {
  const { activeClaimCondition, contractAddress, tokenId, videoAsset, assetData } = props

  const address = useAddress()
  const [quantity, setQuantity] = useState(1)
  const connectedAddress = useAddress()
  const toast = useToast()
  const sdk = thirdwebSDK('mumbai')

  // TODO: map out DAI & USDC as only token accepted for purchasing nft
  // Get USDC contract
  const { data: usdcContract } = useContract(ERC20_TOKEN?.USDC.chain.polygon.mumbai)

  // NFT CONTRACT
  const { data: nftContract } = useContract(contractAddress)

  const getNativeTokenBalance = async () => {
    // NativeToken Balance
    return await sdk.getBalance(String(connectedAddress))
  }

  const getUSDCBalance = async (userAddress: string) => {
    // USDC Balance
    try {
      const usdcBigNumber = await usdcContract?.call('balanceOf', [userAddress.toString()])
      const decimals = await usdcContract?.call('decimals', [])
      const usdcBalance = usdcBigNumber / 10 ** decimals

      return usdcBalance
    } catch (err: any) {
      console.error('Error getting USDC balance: ', err.message)
      return err.message
    }
  }

  const claimConditions = useClaimConditions(nftContract, tokenId)

  const activeCCIndex = claimConditions.data?.findIndex((cc, i) => {
    return cc.startTime.getTime() == new Date(activeClaimCondition?.data?.startTime!!).getTime()
  })

  const claimerProofs = useClaimerProofs(nftContract, address || '', tokenId, activeCCIndex)

  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    nftContract,
    {
      quantity,
      walletAddress: address || '',
    },
    tokenId
  )

  const claimedSupply = useTotalCirculatingSupply(nftContract, tokenId)

  const totalAvailableSupply = useMemo(() => {
    try {
      return ethers.BigNumber.from(activeClaimCondition?.data?.availableSupply)
    } catch {
      return ethers.BigNumber.from(0)
    }
  }, [activeClaimCondition?.data?.availableSupply])

  const numberClaimed = useMemo(() => {
    return ethers.BigNumber.from(claimedSupply.data || 0).toString()
  }, [claimedSupply])

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(ethers.BigNumber.from(claimedSupply.data || 0))
    return n.toString()
  }, [totalAvailableSupply, claimedSupply])

  const pToMint = useMemo(() => {
    const bnPrice = ethers.BigNumber.from(activeClaimCondition?.data?.currencyMetadata.value || 0)
    return ethers.utils.formatUnits(bnPrice.mul(quantity).toString(), activeClaimCondition?.data?.currencyMetadata.decimals || 18)
  }, [
    activeClaimCondition?.data?.currencyMetadata.decimals,
    activeClaimCondition?.data?.currencyMetadata.symbol,
    activeClaimCondition?.data?.currencyMetadata.value,
    quantity,
  ])

  const priceToMint = useMemo(() => {
    return `${pToMint} ${activeClaimCondition?.data?.currencyMetadata.symbol}`
  }, [pToMint, activeClaimCondition?.data?.currencyMetadata.symbol])

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable
    try {
      bnMaxClaimable = ethers.BigNumber.from(activeClaimCondition?.data?.maxClaimableSupply)
    } catch (e) {
      bnMaxClaimable = ethers.BigNumber.from(0)
    }

    let perTransactionClaimable
    try {
      perTransactionClaimable = ethers.BigNumber.from(activeClaimCondition?.data?.maxClaimablePerWallet)
    } catch (e) {
      perTransactionClaimable = ethers.BigNumber.from(1)
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable
    }

    let max
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply
    } else {
      max = bnMaxClaimable
    }

    return max.toNumber()
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition?.data?.maxClaimableSupply,
    activeClaimCondition?.data?.maxClaimablePerWallet,
  ])

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition?.isSuccess && ethers.BigNumber.from(activeClaimCondition?.data?.availableSupply || 0).lte(0)) ||
        numberClaimed === numberTotal
      )
    } catch (e) {
      return false
    }
  }, [activeClaimCondition?.data?.availableSupply, activeClaimCondition?.isSuccess, numberClaimed, numberTotal])

  const canClaim = useMemo(() => {
    return activeClaimCondition?.isSuccess && claimIneligibilityReasons.isSuccess && claimIneligibilityReasons.data?.length === 0 && !isSoldOut
  }, [activeClaimCondition?.isSuccess, claimIneligibilityReasons.data?.length, claimIneligibilityReasons.isSuccess, isSoldOut])

  const isLoading = useMemo(() => {
    return activeClaimCondition?.isLoading || claimedSupply.isLoading || !nftContract
  }, [activeClaimCondition?.isLoading, nftContract, claimedSupply.isLoading])

  const buttonLoading = useMemo(() => isLoading || claimIneligibilityReasons.isLoading, [claimIneligibilityReasons.isLoading, isLoading])

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out'
    }

    if (canClaim) {
      const pricePerToken = ethers.BigNumber.from(activeClaimCondition?.data?.currencyMetadata.value || 0)

      if (pricePerToken.eq(0)) {
        return 'Mint (Free)'
      }

      return `Mint (${priceToMint})`
    }

    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity)
    }

    if (buttonLoading) {
      return 'Checking eligibility...'
    }

    return 'Claiming not available'
  }, [isSoldOut, canClaim, claimIneligibilityReasons.data, buttonLoading, activeClaimCondition?.data?.currencyMetadata.value, priceToMint, quantity])

  const handleClaimNFT = async () => {
    // Is there a connectted wallet address?
    if (!connectedAddress) {
      toast({
        title: 'User not signed in',
        description: 'Sign in to mint yout NFT',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const usdcBalance = await getUSDCBalance(connectedAddress)
    const nativeTokenBalance = await getNativeTokenBalance()
    const nativeTokenBalanceInWei = Number(nativeTokenBalance.value)

    // 1. check if usdcTokenBalance < priceOfNft
    if (usdcBalance < pToMint) {
      toast({
        title: `Checking USDC balance`,
        description: 'Insufficient USDC balance to mint NFT',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    //  2. check if nativeTokenBalance < estimatedCostOfGasInWei
    if (nativeTokenBalanceInWei < nativeTokenBalanceInWei / 2) {
      toast({
        title: `Checking ${nativeTokenBalance.name} balance`,
        description: `${nativeTokenBalance.name} balance is too low to pay for txn fee!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
  }

  return (
    <Box style={{ marginBottom: 24 }}>
      {isLoading ? (
        <VStack spacing={0} alignItems={'flex-start'} my={4}>
          <Spinner my={12} alignSelf={'center'} size="md" thickness="4px" speed="0.5s" emptyColor="gray.200" color={globalTheme.colors.primary} />
        </VStack>
      ) : (
        <>
          <Stack direction={'column'} spacing={4} style={{ paddingTop: 12, paddingBottom: 12 }}>
            {/* Name of NFT Collection */}
            <Text as={'h1'} fontSize={24}>
              Name: {videoAsset?.name}
            </Text>
            {/* Description of NFT Collection */}
            <Text fontSize={18}>Description: {videoAsset.storage.ipfs.spec.nftMetadata.description}</Text>

            {/* Image Preview of NFTs */}
            <Player
              poster={<PosterImage />}
              playbackId={videoAsset?.playbackId}
              showLoadingSpinner
              controls={{ autohide: 500, hotkeys: false }}
              aspectRatio="16to9"
              showPipButton
              autoUrlUpload={{ fallback: true, ipfsGateway: assetData?.storage?.ipfs.gatewayUrl }}
              theme={{
                borderStyles: {
                  containerBorderStyle: 'solid',
                },
                colors: {
                  accent: '#EC407A',
                },
                space: {
                  controlsBottomMarginX: '10px',
                  controlsBottomMarginY: '5px',
                  controlsTopMarginX: '15px',
                  controlsTopMarginY: '10px',
                },
                radii: {
                  containerBorderRadius: '0px',
                },
              }}
            />
          </Stack>
          <Stack direction={'row'} spacing={8} style={{ paddingTop: 12, paddingBottom: 12 }}>
            {/* The amount of NFT that has been claimed */}
            <Text fontSize={18}>Total Minted:</Text>
            <div>
              {claimedSupply ? (
                <Text>
                  <b>{numberClaimed}</b>
                  {' / '}
                  {numberTotal || '∞'}
                </Text>
              ) : (
                // Show loading state if we're still loading the supply
                <Text>Loading...</Text>
              )}
            </div>
          </Stack>

          {claimConditions.data?.length === 0 || claimConditions?.data?.every((cc) => cc.maxClaimableSupply === '0') ? (
            <div>
              <Text as={'h2'}>This NFT isn't ready for minting!</Text>
            </div>
          ) : (
            <Box style={{ paddingTop: 12, paddingBottom: 24 }}>
              <>
                <Flex gap={4} my={4} alignItems={'center'}>
                  <Text fontSize={18}>Quantity</Text>
                  <Button onClick={() => setQuantity(quantity - 1)} isDisabled={quantity <= 0}>
                    -
                  </Button>
                  <Text>{quantity}</Text>
                  <Button onClick={() => setQuantity(quantity + 1)} isDisabled={quantity >= maxClaimable}>
                    +
                  </Button>
                </Flex>
              </>

              {isSoldOut ? (
                <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <Text as={'h2'} style={{ fontSize: 24, color: 'red' }}>
                    This NFT is Sold Out!
                  </Text>
                </div>
              ) : (
                <>
                  <Web3Button
                    style={{ marginTop: '24px', marginBottom: '48px' }}
                    contractAddress={nftContract?.getAddress() || ''}
                    action={async (cntr) => {
                      handleClaimNFT()
                      await cntr.erc1155.claim(tokenId, quantity, {
                        // checkERC20Allowance: true,
                      })
                    }}
                    isDisabled={!canClaim || buttonLoading}
                    onError={(err) => {
                      console.error(err)
                      toast({
                        title: `Error claiming NFTs`,
                        description: `Error claiming NFTs`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      })
                      return
                    }}
                    onSuccess={() => {
                      setQuantity(1)
                      toast({
                        title: 'Claim NFT',
                        description: 'Successfully claimed NFTs',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      })
                      return
                    }}>
                    {buttonLoading ? 'Loading...' : buttonText}
                  </Web3Button>
                </>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export function parseIneligibility(eligibility: ClaimEligibility[], qty = 0): string {
  if (!eligibility.length) {
    return ''
  }

  const eligible = eligibility[0]
  let res

  if (
    eligible === ClaimEligibility.Unknown ||
    eligible === ClaimEligibility.NoActiveClaimPhase ||
    eligible === ClaimEligibility.NoClaimConditionSet
  ) {
    res = "This nft isn't ready for minting."
  } else if (eligible === ClaimEligibility.NotEnoughTokens) {
    res = "You don't have enough currency to mint."
  } else if (eligible === ClaimEligibility.AddressNotAllowed) {
    res = 'You are not eligible to mint at this time.'
  } else {
    res = eligibility
  }

  return res as string
}
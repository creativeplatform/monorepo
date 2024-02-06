import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import {
  useActiveClaimCondition,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimIneligibilityReasons,
  useClaimNFT,
  useClaimerProofs,
  useContract,
  useContractMetadata,
  useSigner,
  useTotalCirculatingSupply,
} from '@thirdweb-dev/react'
import { ClaimEligibility } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useEffect, useMemo, useState } from 'react'
import { ERC20_TOKEN } from '../utils/config'
import { thirdwebSDK } from '../utils/helpers'
import { IAssetData } from '../utils/types'

// Milestone

// User can purchase the NFT Video -
// - Use USDC or DAI Token
// - Set up form fields for token address, token amount, and NFT stock (max 100).

// Research how to add a token for purchasing deployed NFT: https://portal.thirdweb.com/typescript/sdk.smartcontract.call   + https://thirdweb.com/goerli/0x5DBC7B840baa9daBcBe9D249

// User can buy NFT video  process:

// 1. View nft details
//  - has nft price in USDC.
//  - Has form field for how many to mint

// 2. Check user balance (USDC) > sum of nfts to mint
// 3. If all good;
//  - deploy contract
//  - debit user balance
//  - mint nft to user address

// const PosterImage = () => {
//   return (
//     <Image src={`${CREATIVE_LOGO_WHT}`} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
//   )
// }

// Replace this with your token id

export const tokenId = 0

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
  // assetData?: AssetData & IReturnedAssetData
}

export const ClaimVideoNFT: React.FC<MintVideoNFTProps> = (props) => {
  // const router = useRouter()
  const connectedAddress = useAddress()
  const signer = useSigner()
  const toast = useToast()
  const sdk = thirdwebSDK('mumbai')

  const [priceOfNft, setPriceOfNft] = useState(0)
  const [qtyOfNftToMint, setQtyOfNftToMint] = useState(1)
  const [isMintingNFT, setIsMintingNFT] = useState(false)
  const [mintingError, setMintingError] = useState('')
  const [deployedContractAddress, setDeployedContractAddress] = useState<string>('')
  const [isActiveClaimConditionLoading, setIsActiveClaimConditionLoading] = useState(false)
  const [accountBalanceError, setAccountBalanceError] = useState('')
  const [accountBalanceToLow, setIsAccountBalanceToLow] = useState(false)
  const [tokenMetadata, setTokenMetadata] = useState<any>()

  // TODO: map out DAI & USDC as only token accepted for purchasing nft
  // Get USDC contract
  const { data: usdcContract } = useContract(ERC20_TOKEN?.USDC.chain.polygon.mumbai)

  // NFT CONTRACT
  const { data: nftContract } = useContract('0x914B872Ce6Da4cc7523B768a3cef8b472F2d2511')
  const { data: contractMetadata } = useContractMetadata(nftContract)
  const { mutateAsync: claimNft, isLoading: isLoadingClaimNft, error: errorClaimNft } = useClaimNFT(nftContract)

  useEffect(() => {
    const tknMetadata = async () => {
      try {
        const tokenMeta = await nftContract?.erc1155.getTokenMetadata(tokenId)
        setTokenMetadata(tokenMeta)
      } catch (err: any) {
        console.error('ERROR::tokenMeta: ', err)
      }
    }
    tknMetadata()
  }, [tokenId])
  console.log('connectedAddress:', connectedAddress)
  console.log('tokenMetadata:', tokenMetadata)
  
  const claimConditions = useClaimConditions(nftContract, tokenId)
  
  const activeCC = useActiveClaimCondition(nftContract, tokenId)
  console.log('activeClaimCondition:', activeCC.data)

  const activeCC4Wallet = useActiveClaimConditionForWallet(nftContract, connectedAddress)
  console.log('activeCC4Wallet:', activeCC4Wallet.data != undefined ? activeCC4Wallet : 'undefined')

  const claimerProofs = useClaimerProofs(nftContract, connectedAddress || '', tokenId)
  console.log('claimerProofs:', claimerProofs.data)

  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    nftContract,
    {
      quantity: 1,
      walletAddress: connectedAddress || '',
    },
    tokenId
  )
  console.log('claimIneligibilityReasons:', claimIneligibilityReasons.data)

  const totalCirculatingSupply = useTotalCirculatingSupply(nftContract, tokenId)
  console.log('totalCirculatingSupply:', totalCirculatingSupply.data?.toNumber())

  const numberClaimed = useMemo(() => {
    return ethers.BigNumber.from(totalCirculatingSupply.data || 0)
  }, [totalCirculatingSupply])
  console.log('numberClaimed:', numberClaimed?.toNumber())

  const totalAvailableSupply = useMemo(() => {
    return ethers.BigNumber.from(activeCC?.data?.availableSupply || 0)
  }, [activeCC?.data?.availableSupply])
  console.log('totalAvailableSupply:', totalAvailableSupply?.toNumber())

  const totalSupply = useMemo(() => {
    const n = totalAvailableSupply.add(ethers.BigNumber.from(totalCirculatingSupply.data || 0))
    if (n.gte(1_000_000)) {
      return ''
    }
    return n
  }, [totalAvailableSupply, totalCirculatingSupply])
  console.log('totalSupply:', totalSupply.toString())

  const priceToMint = useMemo(() => {
    const bnPrice = ethers.BigNumber.from(activeCC?.data?.currencyMetadata.value || 0)

    return `${ethers.utils.formatUnits(bnPrice.mul(qtyOfNftToMint).toString(), activeCC?.data?.currencyMetadata.decimals || 18)} ${
      activeCC?.data?.currencyMetadata.symbol
    }`
  }, [activeCC?.data?.currencyMetadata.decimals, activeCC?.data?.currencyMetadata.symbol, activeCC?.data?.currencyMetadata.value, qtyOfNftToMint])

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable
    try {
      bnMaxClaimable = ethers.BigNumber.from(activeCC.data?.maxClaimableSupply || 0)
    } catch (e) {
      bnMaxClaimable = ethers.BigNumber.from(1_000_000)
    }

    let perTransactionClaimable
    try {
      perTransactionClaimable = ethers.BigNumber.from(activeCC.data?.maxClaimablePerWallet || 0)
    } catch (e) {
      perTransactionClaimable = ethers.BigNumber.from(1_000_000)
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        bnMaxClaimable = ethers.BigNumber.from(1_000_000)
      } else {
        try {
          bnMaxClaimable = ethers.BigNumber.from(snapshotClaimable)
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply
    } else {
      max = bnMaxClaimable
    }

    if (max.gte(1_000_000)) {
      return 1_000_000
    }
    return max.toNumber()
  }, [claimerProofs.data?.maxClaimable, totalAvailableSupply, activeCC.data?.maxClaimableSupply, activeCC.data?.maxClaimablePerWallet])

  const isSoldOut = useMemo(() => {
    try {
      return (activeCC4Wallet.isSuccess && ethers.BigNumber.from(activeCC4Wallet.data?.availableSupply || 0).lte(0)) || numberClaimed === totalSupply
    } catch (e) {
      return false
    }
  }, [activeCC?.data?.availableSupply, activeCC.isSuccess, numberClaimed, totalSupply])

  const canClaim = useMemo(() => {
    return activeCC.isSuccess && claimIneligibilityReasons.isSuccess && claimIneligibilityReasons.data?.length === 0 && !isSoldOut
  }, [activeCC.isSuccess, claimIneligibilityReasons.data?.length, claimIneligibilityReasons.isSuccess, isSoldOut])

  const isLoading = useMemo(() => {
    return activeCC.isLoading || totalCirculatingSupply.isLoading || !nftContract
  }, [activeCC.isLoading, nftContract, totalCirculatingSupply.isLoading])

  const btnLoading = useMemo(() => isLoading || claimIneligibilityReasons.isLoading, [claimIneligibilityReasons.isLoading, isLoading])

  const btnLabel = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out'
    }

    if (canClaim) {
      const pricePerToken = ethers.BigNumber.from(activeCC.data?.currencyMetadata.value || 0)

      if (pricePerToken.eq(0)) {
        return 'Mint (Free)'
      }

      return `Mint (${priceToMint})`
    }

    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, qtyOfNftToMint)
    }

    if (btnLoading) {
      return 'Checking eligibility...'
    }

    return 'Claiming not available'
  }, [isSoldOut, canClaim, claimIneligibilityReasons.data, btnLoading, activeCC4Wallet.data?.currencyMetadata.value, priceToMint, qtyOfNftToMint])

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

  const handleClaimNFT = async () => {
    // Is there a connect wallet address?
    if (!signer || !connectedAddress) {
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
    if (usdcBalance < priceOfNft) {
      setIsAccountBalanceToLow(true)

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
    // if (nativeTokenBalanceInWei < nativeTokenBalanceInWei / 2) {
    //   setIsAccountBalanceToLow(true)

    //   toast({
    //     title: `Checking ${nativeTokenBalance.name} balance`,
    //     description: `${nativeTokenBalance.name} balance is too low to pay for txn fee!`,
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   })
    //   return
    // }

    try {
      setIsMintingNFT(true)

      const nftClaimTxn = await nftContract?.erc1155.claim(tokenId as any, qtyOfNftToMint, {
        currencyAddress: ERC20_TOKEN?.USDC.chain.polygon.mumbai,
        checkERC20Allowance: true,
      })

      console.log('receipt: ', nftClaimTxn?.receipt)
    } catch (err: any) {
      // TODO: send err to ErrorService
      console.error('Error minting NFT:', err.message)

      setIsMintingNFT(false)
      setMintingError(`NFT minting failed with', ${err.message}`)

      toast({
        title: `Error minting NFT`,
        description: mintingError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box style={{ marginBottom: 24 }}>
      {isActiveClaimConditionLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Stack direction={'column'} spacing={4} style={{ paddingTop: 12, paddingBottom: 12 }}>
            {/* Name of NFT Collection */}
            <Text as={'h1'}>Name: {contractMetadata?.name}</Text>
            {/* Description of NFT Collection */}
            <Text>Description: {contractMetadata?.description}</Text>

            {/* Image Preview of NFTs */}
            {/* TODO: uncomment when down */}
            {/* <Player
              // showTitle
              playbackId={props.assetData.playbackId}
              showLoadingSpinner
              controls={{ autohide: 500, hotkeys: false }}
              aspectRatio="16to9"
              showPipButton
              autoUrlUpload={{ fallback: true, ipfsGateway: props.assetData.storage?.ipfs.gatewayUrl }}
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
            /> */}
          </Stack>
          <Stack direction={'row'} spacing={8} style={{ paddingTop: 12, paddingBottom: 12 }}>
            {/* The amount of NFT that has been claimed */}
            <Text>Total Minted:</Text>
            <Text>
              {totalCirculatingSupply.data?.toNumber() === numberClaimed.toNumber() && numberClaimed.toNumber()} / {totalSupply.toString()}
            </Text>
          </Stack>

          {claimConditions.data?.length === 0 || claimConditions?.data?.every((c) => c.maxClaimableSupply === '0') ? (
            <div>
              <Text as={'h2'}>This NFT isn't ready for minting!</Text>
            </div>
          ) : (
            <Box style={{ paddingTop: 12, paddingBottom: 24 }}>
              {isSoldOut ? (
                <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <Text as={'h2'} style={{ fontSize: 24, color: 'red' }}>
                    This NFT is Sold Out!
                  </Text>
                </div>
              ) : (
                <>
                  <Text style={{ paddingBottom: 16 }}>Quantity</Text>
                  <Stack direction={'row'} spacing={4} style={{ paddingBottom: 24 }}>
                    <Button
                      onClick={() => {
                        if (qtyOfNftToMint == 0) {
                          return
                        }
                        setQtyOfNftToMint(qtyOfNftToMint - 1)
                      }}
                      isDisabled={qtyOfNftToMint == 0}>
                      -
                    </Button>
                    <Text as={'h4'}>{qtyOfNftToMint}</Text>

                    <Button
                      onClick={() => {
                        if (qtyOfNftToMint >= maxClaimable) {
                          return
                        }
                        setQtyOfNftToMint(qtyOfNftToMint + 1)
                      }}
                      isDisabled={qtyOfNftToMint >= maxClaimable}>
                      +
                    </Button>
                  </Stack>

                  <Button
                    variant="ghost"
                    backgroundColor={'#EC407A'}
                    onClick={handleClaimNFT}
                    isDisabled={!canClaim || btnLoading}
                    isLoading={isMintingNFT}>
                    {btnLoading ? 'Loading...' : btnLabel}
                  </Button>
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

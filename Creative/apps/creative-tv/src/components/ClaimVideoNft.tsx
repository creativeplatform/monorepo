import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { Player } from '@livepeer/react'
import { useAddress, useContract, useContractMetadata, useSigner } from '@thirdweb-dev/react'
import { ClaimCondition, ClaimEligibility, SnapshotEntryWithProof } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useEffect, useMemo, useState } from 'react'
import { thirdwebSDK } from 'utils'
import { tokenContractAddress } from '../utils/config'
import { IAssetData, IReturnedAssetData } from '../utils/types'

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

// Replace this with your contract address
// export const HIGH_LANDER_CONTRACT_ADDRESS: string = '0x367E9Cedd79bB473B42540dB526f3b1f6840B214'

export const NFT_CONTRACT_ADDRESS: string = '0xd5f81Ab154fD12A9f99Eb819aC3dFdA91494d3d5'

// Replace this with your token id
export const tokenId = 1

interface AssetData extends IAssetData {
  storage: {
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
  assetData: AssetData & IReturnedAssetData
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
  const [isActiveClaimConditionLoading, setIsActiveClaimConditionLoading] = useState(false)
  const [accountBalanceError, setAccountBalanceError] = useState('')
  const [accountBalanceToLow, setIsAccountBalanceToLow] = useState(false)
  const [claimConditions, setClaimConditions] = useState<ClaimCondition[]>([])
  const [activeClaimCondition, setActiveClaimCondition] = useState<ClaimCondition>()
  const [claimerProofs, setClaimerProofs] = useState<SnapshotEntryWithProof | null>()
  const [claimIneligibilityReasons, setClaimIneligibilityReasons] = useState<ClaimEligibility[]>()
  const [isClaimIneligibilityReasonsLoading, setIsClaimIneligibilityReasonsLoading] = useState(false)
  const [claimedSupply, setClaimedSupply] = useState<ethers.BigNumber | undefined>()

  // TODO: map out DAI & USDC as only token accepted for purchasing nft
  // Get USDC contract
  const { data: usdcContract } = useContract(tokenContractAddress?.USDC.chain.polygon.mumbai)

  // NFT CONTRACT
  const { data: nftContract } = useContract(NFT_CONTRACT_ADDRESS)

  const { data: contractMetadata } = useContractMetadata(nftContract)
  // console.log('contractMetadata: ', contractMetadata)

  useEffect(() => {
    // set price of nft
    setPriceOfNft(Number(props.assetData.storage?.ipfs.spec.nftMetadata.properties.pricePerNFT))
    // console.log('assetData', props.assetData);

    const initClaimConditions = async () => {
      console.log('tokenId: ', tokenId)

      try {
        const allClaimCondition = await nftContract?.erc1155.claimConditions.getAll(tokenId)

        if (allClaimCondition?.length) {
          console.log('allClaimCondition: ', allClaimCondition)
          setIsActiveClaimConditionLoading(true)
          setClaimConditions([...allClaimCondition])
          setActiveClaimCondition(allClaimCondition as any) // TODO: delete this out
        } else {
          setClaimConditions([])
          setIsActiveClaimConditionLoading(false)
          console.log('allClaimCondition: ', allClaimCondition || 'No conditions')
        }

        // ActiveClaimConditions
        // const activeClaimCondition = await nftContract?.erc1155.claimConditions.getActive(tokenId)
        // if (activeClaimCondition) {
        // setIsActiveClaimConditionLoading(true)
        // setActiveClaimCondition(allClaimCondition as any) // TODO: delete this out
        //   console.log('activeClaimCondition: ', activeClaimCondition)
        // }else {
        //  setIsActiveClaimConditionLoading(true)
        // }

        // claimIneligibilityReasons
        const claimIneligibilityReasons = await nftContract?.erc1155.claimConditions.getClaimIneligibilityReasons(
          tokenId,
          qtyOfNftToMint,
          connectedAddress
        )

        if (claimIneligibilityReasons?.length) {
          setClaimIneligibilityReasons(claimIneligibilityReasons)
          setIsClaimIneligibilityReasonsLoading(true)
          console.log('claimIneligibilityReasons: ', claimIneligibilityReasons || 'no claimIneligibilityReasons')
        } else {
          setIsClaimIneligibilityReasonsLoading(false)
        }
        // ClaimerProof
        const claimerProofs = await nftContract?.erc1155.claimConditions.getClaimerProofs(tokenId, connectedAddress || '')
        // console.log('claimerProofs: ', claimerProofs || 'no claimerProofs')

        // SupplyClaimedByWallet
        // const supplyClaimedByWallet = await nftContract?.erc1155.claimConditions.getSupplyClaimedByWallet(tokenId, connectedAddress!)
        // console.log('supplyClaimedByWallet: ', supplyClaimedByWallet || 'no supplyClaimedByWallet')

        // claimedSupply
        const claimedSupply = await nftContract?.erc1155.totalCirculatingSupply(tokenId)
        setClaimedSupply(claimedSupply)
        // console.log('claimedSupply: ', claimedSupply?.toString() || 'no claimedSupply')
      } catch (err: any) {
        console.error('ERROR 101: ', err)
      }
    }

    initClaimConditions()
  }, [props.assetData.name])

  const totalAvailableSupply = useMemo(() => {
    try {
      return ethers.BigNumber.from(activeClaimCondition?.availableSupply || 0)
    } catch {
      return ethers.BigNumber.from(1_000_000)
    }
  }, [activeClaimCondition?.availableSupply])

  const numberClaimed = useMemo(() => {
    return ethers.BigNumber.from(claimedSupply || 0).toString()
  }, [claimedSupply])

  const numberTotal = useMemo(() => {
    const totalSupply = totalAvailableSupply.add(ethers.BigNumber.from(claimedSupply || 0))

    if (totalSupply.gte(1_000_000)) {
      return ''
    }

    return totalSupply.toString()
  }, [totalAvailableSupply, claimedSupply])

  const priceToMint = useMemo(() => {
    const bnPrice = ethers.BigNumber.from(activeClaimCondition?.currencyMetadata.value || 0)

    return `${ethers.utils.formatUnits(
      bnPrice.mul(qtyOfNftToMint).toString(),
      activeClaimCondition?.currencyMetadata.decimals || 18
    )} ${activeClaimCondition?.currencyMetadata.symbol}`
  }, [
    activeClaimCondition?.currencyMetadata?.decimals,
    activeClaimCondition?.currencyMetadata?.symbol,
    activeClaimCondition?.currencyMetadata?.value,
    qtyOfNftToMint,
  ])

  const maxClaimable = useMemo(() => {
    let maxClaimableBN

    try {
      maxClaimableBN = ethers.BigNumber.from(activeClaimCondition?.maxClaimableSupply || 0)
    } catch (e) {
      maxClaimableBN = ethers.BigNumber.from(1_000_000)
    }

    let perTransactionClaimable
    try {
      perTransactionClaimable = ethers.BigNumber.from(activeClaimCondition?.maxClaimablePerWallet || 0)
    } catch (e) {
      perTransactionClaimable = ethers.BigNumber.from(1_000_000)
    }

    if (perTransactionClaimable.lte(maxClaimableBN)) {
      maxClaimableBN = perTransactionClaimable
    }

    const snapshotClaimable = claimerProofs?.maxClaimable

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        maxClaimableBN = ethers.BigNumber.from(1_000_000)
      } else {
        try {
          maxClaimableBN = ethers.BigNumber.from(snapshotClaimable)
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let maxBN
    if (totalAvailableSupply.lt(maxClaimableBN)) {
      maxBN = totalAvailableSupply
    } else {
      maxBN = maxClaimableBN
    }

    if (maxBN.gte(1_000_000)) {
      return 1_000_000
    }
    return maxBN.toNumber()
  }, [claimerProofs?.maxClaimable, totalAvailableSupply, activeClaimCondition?.maxClaimableSupply, activeClaimCondition?.maxClaimablePerWallet])

  const isNftSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition?.startTime && ethers.BigNumber.from(activeClaimCondition?.availableSupply || 0).lte(0)) || numberClaimed === numberTotal
      )
    } catch (e) {
      return false
    }
  }, [activeClaimCondition?.availableSupply, activeClaimCondition?.startTime, numberClaimed, numberTotal])

  const canClaim = useMemo(() => {
    return activeClaimCondition?.startTime && claimIneligibilityReasons?.length === 0 && !isNftSoldOut
  }, [activeClaimCondition?.startTime, claimIneligibilityReasons?.length, isNftSoldOut])

  const btnLoading = useMemo(
    () => isActiveClaimConditionLoading || isClaimIneligibilityReasonsLoading,
    [isClaimIneligibilityReasonsLoading, isActiveClaimConditionLoading]
  )

  const btnLabel = useMemo(() => {
    if (isNftSoldOut) {
      return 'Sold Out'
    }

    if (canClaim) {
      const pricePerToken = ethers.BigNumber.from(activeClaimCondition?.currencyMetadata.value || 0)

      if (pricePerToken.eq(0)) {
        return 'Mint (Free)'
      }

      return `Mint (${priceToMint})`
    }

    if (claimIneligibilityReasons?.length) {
      return parseIneligibility(claimIneligibilityReasons, qtyOfNftToMint)
    }

    if (btnLoading) {
      return 'Checking eligibility...'
    }

    return 'Claiming not available'
  }, [isNftSoldOut, canClaim, activeClaimCondition?.currencyMetadata.value, priceToMint, qtyOfNftToMint])

  async function estimateGasCostOfTxn(): Promise<number> {
    // This function estimates the cost of txn in nativeTokenBalance
    // which is then check is ensure its value < nativeTokenBalance
    // so to it can pay for gas
    const transferRoleHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('TRANSFER_ROLE')).toString()

    try {
      // await nftContract?.call('setContractURI', [transferRoleHash])
      // 1. Get estimationCost of the minting tnx

      const prepareTxn = await nftContract?.erc1155.claim.prepare(tokenId, qtyOfNftToMint, {
        currencyAddress: tokenContractAddress?.USDC.chain.polygon.mumbai,
        checkERC20Allowance: true,
        pricePerToken: props.assetData.storage.ipfs.spec.nftMetadata.properties.pricePerNFT,
      })
      const estimateTxnCost = await prepareTxn?.estimateGasCost()

      console.error('estimateTxnCost: ', estimateTxnCost)

      return Number(estimateTxnCost?.wei)
    } catch (err: any) {
      console.error('Error estimating gas cost:', err.message)
      toast({
        title: `Estimating cost of txn`,
        description: 'Estimation failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return 0
    }
  }

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

  // After deployer has `lazyMinted` the nft
  const claimNFT = async () => {
    const claimConditionInput = {
      startTime: new Date(),
      currencyAddress: tokenContractAddress?.USDC.chain.polygon.mumbai,
      price: props.assetData.storage.ipfs.spec.nftMetadata.properties.pricePerNFT,
      snapshot: [{ address: String(connectedAddress), maxClaimable: 1 }],
      maxClaimablePerWallet: 5,
    }

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
    // const estimatedCostOfGasInWei = await estimateGasCostOfTxn()

    const usdcBalance = await getUSDCBalance(connectedAddress)
    const nftCreatorAddress = props.assetData.creatorId?.value
    const nativeTokenBalance = await getNativeTokenBalance()
    const nativeTokenBalanceInWei = Number(nativeTokenBalance.value)

    // claim activities
    await nftContract?.erc1155.claimConditions.set(tokenId, [claimConditionInput])

    try {
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

      if (nativeTokenBalanceInWei < nativeTokenBalanceInWei / 2) {
        setIsAccountBalanceToLow(true)

        toast({
          title: `Checking ${nativeTokenBalance.name} balance`,
          description: `${nativeTokenBalance.name} balance is too low to pay for txn fee!`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      if (nftCreatorAddress != connectedAddress) {
        const devAddress = '0x32466Aa64E0525E731b41b884DAB8fff3B9c5448'

        // set txn data
        // const usdcTransferTxn = await usdcContract?.erc20.transfer.prepare(nftCreatorAddress, priceOfNft)

        // TODO: demo purpose
        const _amt = 1
        const usdcTransfer = await usdcContract?.erc20.transfer.prepare(devAddress, _amt)

        usdcTransfer?.setCustomData({
          purpose: `Transferring ${_amt} for the minting of nft`,
        })

        const usdcTransferTxn = await usdcTransfer?.execute()
        console.log(`USDC transfer of $${_amt} to ${devAddress} was successful`)
        console.log('txnReceipt: ', usdcTransferTxn?.receipt)

        if (Number(usdcTransferTxn?.receipt.confirmations) >= 1 && Number(usdcTransferTxn?.receipt.status) == 1) {
          // TODO: How to get nft contract address from nft metadata

          //  NAME	TYPE
          // _receiver: address
          // _tokenId: uint256
          // _quantity: uint256
          // _currency: address
          // _pricePerToken: uint256
          // _allowlistProof: tuple
          // _data: bytes

          // option1: claim
          // const tx = await nftContract?.call(
          //   'claim',
          //   [
          //     connectedAddress,
          //     tokenId?.toString(),
          //     qtyOfNftToMint,
          //     tokenContractAddress?.USDC.chain.polygon.mumbai,
          //     props.assetData.storage.ipfs.spec.nftMetadata.properties.pricePerNFT,
          //     [],
          //     ethers.utils.formatBytes32String('0'),
          //   ],
          //   {}
          // )

          // option2: claim

          // erc1155.claim(tokenId, quantity)
          const tokenId = await nftContract?.erc1155.nextTokenIdToMint()

          const nftClaimTxn = await nftContract?.erc1155.claim(tokenId as any, qtyOfNftToMint, {
            currencyAddress: tokenContractAddress?.USDC.chain.polygon.mumbai,
            checkERC20Allowance: true,
            pricePerToken: props.assetData.storage.ipfs.spec.nftMetadata.properties.pricePerNFT,
          })

          console.log('receipt: ', nftClaimTxn?.receipt)

          // option3: claim
          {
            /* <Web3Button
                    contractAddress={nftContract?.getAddress() || ''}
                    action={(cntr) => cntr.erc1155.claim(tokenId, quantity)}
                    isDisabled={!canClaim || btnLoading}
                    onError={(err) => {
                      console.error(err)
                      alert('Error claiming NFTs')
                    }}
                    onSuccess={() => {
                      setQuantity(1)
                      alert('Successfully claimed NFTs')
                    }}>
                    {btnLoading ? 'Loading...' : btnLabel}
                  </Web3Button> */
          }
        }
      }

      setIsMintingNFT(true)
    } catch (err: any) {
      // TODO: send err to ErrorService
      setIsMintingNFT(false)
      setMintingError(`NFT minting failed with', ${err.message}`)
      toast({
        title: `Error minting NFT`,
        description: mintingError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error minting NFT:', err.message)
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
            <Player
              // showTitle
              playbackId={props.assetData.playbackId}
              showLoadingSpinner
              controls={{ autohide: 500, hotkeys: false }}
              aspectRatio="16to9"
              showPipButton
              autoUrlUpload={{ fallback: true, ipfsGateway: props.assetData.storage.ipfs.gatewayUrl }}
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
            <Text>Total Minted:</Text>
            <Text>
              {claimedSupply && (
                <span>
                  {numberClaimed} / {numberTotal}
                </span>
              )}
            </Text>
          </Stack>

          {claimConditions?.length === 0 || claimConditions?.every((c) => c.maxClaimableSupply === '0') ? (
            <div>
              <Text as={'h2'}>This NFT isn't ready for minting!</Text>
            </div>
          ) : (
            <Box style={{ paddingTop: 12, paddingBottom: 24 }}>
              {isNftSoldOut ? (
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

                  <Button variant="ghost" backgroundColor={'#EC407A'} onClick={claimNFT} isDisabled={!canClaim || btnLoading}>
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

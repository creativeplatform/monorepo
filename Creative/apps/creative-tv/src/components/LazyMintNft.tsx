import { Button, IconButton, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { Asset } from '@livepeer/react'
import { ClaimCondition, NFT, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { formatString, handleCopyString } from 'utils/helpers'
import { AssetData } from './CreateAndViewAsset'
import {  ListLazyMintedNFTs } from './ListLazyMintedNFTs'

type LazyMintProps = {
  // lazyMintTxHash?: string
  // isMinting: boolean
  // handleLazyMintNFT: () => Promise<void>
  assetData: AssetData
  asset: Asset | undefined
  nftContract: SmartContract<ethers.BaseContract> | undefined
}

//
export function LazyMintNft(props: LazyMintProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [lazyMintTxStatus, setLazyMintTxStatus] = useState<number | undefined>(0)
  const [lazyMintTxHash, setLazyMintTxHash] = useState('')
  const [mintingError, setMintingError] = useState(false)

  const [nft, setNFT] = useState<NFT>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addClaimPhase, setAddClaimPhase] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetchingLazyMintedTokens, setIsFetchingFetchingLazyMintedTokens] = useState(false)
  const [claimConditions, setClaimConditions] = useState<ClaimCondition[]>([])
  const [lazyMintedTokens, setLazyMintedTokens] = useState<NFT[]>([])
  const toast = useToast()
  const [tabIndex, setTabIndex] = useState(0)

  const tabList = ['Details', 'Claim Conditions', 'Claim']

  useEffect(() => {
    fetchNFTs()

    //////////////////////////
    // listen to the events
    props.nftContract?.events.listenToAllEvents(async (e) => {
      //  when lazyMint is done
      if (e.eventName == 'TokensLazyMinted') {
        console.log('TokensLazyMinted::eventData ', e.data)
        setIsMinting(false)
        fetchNFTs()
      }
    })

    return () => {
      props.nftContract?.events.removeAllListeners()
    }
  }, [lazyMintedTokens.length])

  const fetchNFTs = async () => {
    setIsFetchingFetchingLazyMintedTokens(true)
    const lzMintedTokens = await props.nftContract?.erc1155.getAll()

    console.log({ title: 'ListLazyMintedNfts::fetchNFTs', description: lzMintedTokens })

    if (lzMintedTokens && lzMintedTokens?.length > 0) {
      setLazyMintedTokens([...lzMintedTokens])
      setIsFetchingFetchingLazyMintedTokens(false)
    }
  }

  // lazyMint nft - uploads and creates the NFTs on chain
  const handleLazyMintNFT = async () => {
    try {
      setIsMinting(true)

      console.log('assetData', props.assetData)
      console.log('asset', props.asset)

      const nftMetadata = [
        {
          name: `${props.asset?.name}`,
          description: String(props.asset?.storage?.ipfs?.spec?.nftMetadata?.description),
          animation_url: props.asset?.storage?.ipfs?.url,
          image: '',
          properties: {
            image_url: '',
            external_url: '',
            creator: props.asset?.creatorId?.value,
            nFTAmountToMint: props.assetData.nFTAmountToMint,
            pricePerNFT: props.assetData.pricePerNFT,
            videoSpec: {
              bitrate: props.asset?.videoSpec?.bitrate,
              duration: props.asset?.videoSpec?.duration,
              format: props.asset?.videoSpec?.format,
            },
          },
          attributes: [
            {
              trait_type: 'Background',
              value: 'Black',
            },
          ],
        },
      ]
      console.log('nftMetadata: ', nftMetadata)

      let receipt: ethers.providers.TransactionReceipt
      const tx = await props.nftContract?.erc1155.lazyMint(nftMetadata)

      if (tx && tx.length>0) {
        receipt = tx[0].receipt
        setLazyMintTxStatus(receipt!.status)
        setLazyMintTxHash(receipt.transactionHash)

        console.log('[handleLazyMintNFT: tx.receipt] ', receipt)

        toast({
          title: 'Lazy Minting',
          description: `Minting was successfully with txHash: ${receipt.transactionHash}`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      } else {
        setIsMinting(false)
      }
    } catch (err: any) {
      console.error(err)
      setIsMinting(false)
      setMintingError(err.message)

      toast({
        status: 'error',
        title: 'NFT not minted',
        description: err.message,
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Stack spacing="20px" my={12} style={{ border: '1px solid #a4a4a4', padding: 24 }}>
        <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
          {lazyMintTxHash ? 'NFT was lazy minted successfully!' : 'Time to lazy mint your NFTs!'}
        </Text>

        {lazyMintTxHash ? (
          <p style={{ fontWeight: '500' }}>
            TxHash:{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleCopyString({
                  txt: lazyMintTxHash,
                  toast: toast({
                    title: 'TxHash Copied',
                    description: `Successfully copied ${formatString.truncate(lazyMintTxHash!, 'middle', 8)}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  }),
                })
              }>
              {formatString.truncate(lazyMintTxHash, 'middle', 8)}
            </span>
            <IconButton
              aria-label="Copy to clipboard"
              icon={<HiOutlineClipboardCopy />}
              onClick={() =>
                handleCopyString({
                  txt: lazyMintTxHash,
                  toast: toast({
                    title: 'TxHash Copied',
                    description: `Successfully copied ${formatString.truncate(lazyMintTxHash!, 'middle', 8)}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  }),
                })
              }
            />
          </p>
        ) : (
          <Button
            onClick={handleLazyMintNFT}
            isLoading={isMinting}
            _hover={{ cursor: isMinting ? 'progress' : 'pointer' }}
            style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}>
            {isMinting ? 'Lazy Minting...' : 'Lazy Mint NFT'}
          </Button>
        )}
      </Stack>

      {lazyMintedTokens.length > 0 && (
        <ListLazyMintedNFTs
          nftContract={props.nftContract}
          nftMetadata={props.asset?.storage?.ipfs?.spec?.nftMetadata as any}
          assetData={props.asset}
          lazyMintedTokens={lazyMintedTokens}
          // refetchNFTs={fetchNFTs}
        />
      )}
    </>
  )
}

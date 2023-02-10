import { useAsset, useUpdateAsset } from '@livepeer/react'
import { useRouter } from 'next/router'

import { useMemo } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

// The demo NFT contract ABI (exported as `const`)
// See: https://wagmi.sh/docs/typescript
import videoNftAbi from './videoNftAbi'

import { Box, Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const WagmiNft = () => {
  const { address } = useAccount()
  const router = useRouter()
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])
  const { data: asset } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  })

  const { mutate: updateAsset } = useUpdateAsset(
    asset
      ? {
          assetId: asset.id,
          storage: {
            ipfs: true,
          },
        }
      : null
  )

  const { config } = usePrepareContractWrite({
    // The demo NFT contract address on Polygon Mumbai
    address: '0xdfcb0abE62911aC9eaB22D2E662F53CF4C7f90d4',
    abi: videoNftAbi,
    functionName: 'feed',
    args: [
      {
        gasLimit: 1300000,
      },
    ],
    enabled: Boolean(address && asset?.storage?.ipfs?.nftMetadata?.url),
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })

  const { data: contractWriteData, isSuccess, write, error: contractWriteError } = useContractWrite(config)

  return (
    <Box className="address-mint">
      <Button className="card-mint-button" as={motion.div} _hover={{ transform: 'scale(1.1)' }}>
        {!address ? 'Connect Wallet' : address}
      </Button>
      {address && assetId && (
        <>
          <p>{assetId}</p>
          {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (
            <button
              onClick={() => {
                updateAsset?.()
              }}>
              Upload to IPFS
            </button>
          ) : contractWriteData?.hash && isSuccess ? (
            <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${contractWriteData.hash}`} rel="noreferrer">
              <button>View Mint Transaction</button>
            </a>
          ) : contractWriteError ? (
            <p>{contractWriteError.message}</p>
          ) : asset?.storage?.status?.phase === 'ready' && write ? (
            <button
              onClick={() => {
                write()
              }}>
              Mint NFT
            </button>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  )
}

export default WagmiNft

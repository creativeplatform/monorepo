import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import { useActiveClaimConditionForWallet } from '@thirdweb-dev/react'
import { ClaimVideoNFT } from 'components/ClaimVideoNFT'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Video } from 'utils/fetchers/assets'
import { useLivepeerClient } from '../../hooks/useLivepeerClient'
import { IAssetData, IReturnedAssetData } from '../../utils/types'

interface AssetData extends IAssetData, IReturnedAssetData {}

const ClaimVideoNFTPage: NextPage = () => {
  const router = useRouter()

  const videoAsset = useMemo<Video>(() => (router?.query?.videoAsset ? JSON.parse(router?.query?.videoAsset as any) : {}), [router?.query])
  const assetData = useMemo<AssetData>(() => (router?.query?.assetData ? JSON.parse(router?.query?.assetData as any) : {}), [router?.query])
  const activeClaimCondition = useMemo<ReturnType<typeof useActiveClaimConditionForWallet>>(
    () => (router?.query?.activeClaimCondition ? JSON.parse(router?.query?.activeClaimCondition as any) : {}),
    [router?.query]
  )
  const tokenId = useMemo<string>(() => (router?.query?.tokenId ? (router?.query?.tokenId as any) : ''), [router?.query])
  const contractAddress = useMemo<string>(() => (router?.query?.contractAddress ? (router?.query?.contractAddress as any) : ''), [router?.query])

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <Breadcrumb mt={10} mb={24}>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>
            <span role="img" aria-label="home">
              🏠
            </span>{' '}
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink>Mint NFT Video</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <ClaimVideoNFT
        assetData={assetData}
        activeClaimCondition={activeClaimCondition}
        tokenId={tokenId}
        contractAddress={contractAddress}
        videoAsset={videoAsset}
      />
    </LivepeerConfig>
  )
}

export default ClaimVideoNFTPage

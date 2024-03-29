import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useLivepeerClient } from '../../hooks/useLivepeerClient'
import { IAssetData, IReturnedAssetData } from '../../utils/types'
import { ClaimVideoNFT } from 'components/ClaimVideoNFT'

interface AssetData extends IAssetData, IReturnedAssetData {}

const ClaimVideoNFTPage: NextPage = () => {
  const router = useRouter()

  const assetData = useMemo<AssetData>(() => (router?.query?.assetData ? JSON.parse(router?.query?.assetData as any) : {}), [router?.query])

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

      <ClaimVideoNFT />
    </LivepeerConfig>
  )
}

export default ClaimVideoNFTPage

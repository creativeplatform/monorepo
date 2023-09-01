import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import {useLivepeerClient} from '../hooks/useLivepeerClient';
import { useRouter } from 'next/router'
import { ReactNode, useMemo } from 'react'
import { AssetData } from './CreateAndViewAsset'
import WagmiNft from './WagmiNft'

interface HeaderProps {
  children: ReactNode
}

const MintNftVideo = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()

  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : ''), [router?.query])

  const assetData = useMemo<AssetData>(() => (router?.query?.assetData ? JSON.parse(router?.query?.assetData as any) : {}), [router?.query])

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <Box>
        <Breadcrumb mt={10}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Mint NFT Video</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <WagmiNft assetId={assetId} assetData={assetData} />
      </Box>
    </LivepeerConfig>
  )
}

export default MintNftVideo

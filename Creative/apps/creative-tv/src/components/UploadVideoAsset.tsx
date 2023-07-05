import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import CreateAndViewAsset, { AssetData } from './CreateAndViewAsset'
import { LivepeerConfig } from '@livepeer/react'
import { useLivepeerClient } from '../hooks/useLivepeerClient'

interface HeaderProps {
  children: ReactNode
}

const UploadVideoAsset = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  const [exportedAsset, setExportedAsset] = useState<AssetData | null>(null);

  const handleAssetExport = (asset: AssetData) => {
    setExportedAsset(asset);
  };
  return (
    <>
      <LivepeerConfig client={useLivepeerClient}>
        <CreateAndViewAsset onAssetExport={handleAssetExport}/>
      </LivepeerConfig>
    </>
  )
}
export default UploadVideoAsset

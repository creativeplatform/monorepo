import { LivepeerConfig } from '@livepeer/react'
import { useState } from 'react'
import { useLivepeerClient } from '../hooks/useLivepeerClient'
import CreateAndViewAsset, { AssetData } from './CreateAndViewAsset'

const UploadVideoAsset = (): JSX.Element => {
  const [exportedAsset, setExportedAsset] = useState<AssetData | null>(null)

  const handleAssetExport = (asset: AssetData) => {
    setExportedAsset(asset)
  }

  return (
    <>
      <LivepeerConfig client={useLivepeerClient}>
        <CreateAndViewAsset />
      </LivepeerConfig>
    </>
  )
}
export default UploadVideoAsset

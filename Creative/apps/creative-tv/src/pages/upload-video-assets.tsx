import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import UploadVideoAsset from '../components/UploadVideoAsset'

export default function Upload() {
  const router = useRouter()
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])

  return (
    <>
      <UploadVideoAsset>{''}</UploadVideoAsset>
    </>
  )
}

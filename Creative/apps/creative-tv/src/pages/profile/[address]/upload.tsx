import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import UploadVideoAsset from '../../../components/UploadVideoAsset'

export default function Upload() {
    const router = useRouter()
    const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])
  
    return (
      <>
        <NextSeo title="Video Upload" />
        <UploadVideoAsset>{''}</UploadVideoAsset>
      </>
    )
  }
import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Container, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import UploadVideoAsset from '../../../components/UploadVideoAsset'

export default function Upload() {
    const router = useRouter()
    const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])
  
    return (
      <>
        <NextSeo title="Video Upload" />
          <Container maxW={"1200px"} mt={10}>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage className="active-crumb">
                <BreadcrumbLink>Upload Video</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <UploadVideoAsset>{''}</UploadVideoAsset>
          </Container>
      </>
    )
  }
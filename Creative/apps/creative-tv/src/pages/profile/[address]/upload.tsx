import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import UploadVideoAsset from '../../../components/UploadVideoAsset'

export default function Upload() {
  const router = useRouter()
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])

  return (
    <>
      <NextSeo title="Video Upload" />
      <Container maxW={'1200px'}>
        <Breadcrumb mt={10}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>Upload Video Assets</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <UploadVideoAsset />
      </Container>
    </>
  )
}

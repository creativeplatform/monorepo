import React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb, Box } from '@chakra-ui/react'
import AllAssets from '../../components/AllAssets'

export default function Discover() {
  const router = useRouter()
  return (
    <>
      <NextSeo title="Discover" />
      <Box p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink>All Videos</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box>
        <AllAssets />
      </Box>
    </>
  )
}

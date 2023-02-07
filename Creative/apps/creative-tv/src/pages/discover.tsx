import React from 'react'
import { useRouter } from 'next/router'
import { BreadcrumbItem, Icon, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'
import AllAssets from '../components/AllAssets'

export default function Discover() {
  const router = useRouter()
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">All Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <AllAssets>{''}</AllAssets>
    </>
  )
}

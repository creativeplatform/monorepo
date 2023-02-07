import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'
import { useLivepeerClient } from '../hooks/useLivepeerClient'

interface HeaderProps {
  children: ReactNode
}

const UpdateVideoAsset = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">Update Video Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <LivepeerConfig client={useLivepeerClient}>{/* <UpdateAsset /> */}</LivepeerConfig>
    </Box>
  )
}
export default UpdateVideoAsset

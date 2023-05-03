import React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb, Box } from '@chakra-ui/react'
import UserProfile from '../components/UserProfile'


export default function profile() {
  const router = useRouter()
  return (
    <>
      <NextSeo title="Profile" />
      <Box p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink onClick={() => router.push('/profile')}>Member Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box>
        <UserProfile />
      </Box>
    </>
  )
}
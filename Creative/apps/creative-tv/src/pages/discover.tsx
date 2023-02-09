import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { BreadcrumbItem, Icon, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'
import AllAssets from '../components/AllAssets'
import { siwe } from '../pages/api/siwe/siwe'
import { GetServerSideProps } from 'next'
import useLock from '../hooks/useLock'
import { useAccount } from 'wagmi'
import { LOCK_ADDRESS_CREATIVE_TV } from '../utils/config'

export const walletHasToken = async () => {
  const { address } = useAccount()
  const lock = useLock({ lockAddress: LOCK_ADDRESS_CREATIVE_TV, walletAddress: address })
  return lock.status === 'unlocked'
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { address } = await siwe.getSession(req, res);
  if (!address || !(walletHasToken)) {
    return {
      redirect: {
        permanent: false,
        destination: '/', // Redirect if wallet does not have the required token
      },
    };
  }

  return {
    props: {},
  };
}

export default function Discover() {
  const router = useRouter()
  return (
    <>
      <NextSeo title='Discover' /><Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink onClick={() => router.push('/discover')}>All Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb><AllAssets>{''}</AllAssets>
    </>
  ) 
}

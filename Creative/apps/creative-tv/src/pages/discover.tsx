import React from 'react'
import { useRouter } from 'next/router'
import request from 'graphql-request'
import { NextSeo } from 'next-seo'
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb, Box } from '@chakra-ui/react'
import AllAssets from '../components/AllAssets'
import { siwe } from '../pages/api/siwe/siwe'
import { GetServerSideProps } from 'next'
import { LOCK_ADDRESS_CREATIVE_TV, UNLOCK_QUERY_HOLDS_KEY, UNLOCK_API_URL } from '../utils/config'

export const walletHasToken = async (lockAddress: string,  walletAddress: string) => {
  const fan = await request(UNLOCK_API_URL, UNLOCK_QUERY_HOLDS_KEY, { lockAddress, walletAddress })
  return fan.keys.length > 0  // If the user has a key, they have the token
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { address } = await siwe.getSession(req, res);
  if (!address) {
    return {
      redirect: {
        permanent: false,
        destination: '/', // Redirect if wallet does not have the required token
      },
    };
  }
  // Fan Membership
  const hasFanToken = await walletHasToken(LOCK_ADDRESS_CREATIVE_TV.fan, address);
  if (!hasFanToken) {
    return {
      redirect: {
        permanent: false,
        destination: 'https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xe174caa294999ec622988242641a27c11e6c22d8%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%7D%2C%220xb9c69af58109927cc2dcce8043f82158f7b96ca7%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+CREATOR%22%7D%2C%220xb311afe316b004dbf569381ae174eaa897b757f6%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+BRAND%22%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22title%22%3A%22CREATIVE+Memberships%22%2C%22icon%22%3A%22https%3A%2F%2Fnftstorage.link%2Fipfs%2Fbafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%220x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260%22%2C%22messageToSign%22%3A%22%22%2C%22hideSoldOut%22%3Afalse%2C%22redirectUri%22%3A%22localhost%3A3002%2Fdiscover%22%7D', // Redirect if wallet does not have the required token
      },
    };
  }
  // Creator Membership
  const hasCreatorToken = await walletHasToken(LOCK_ADDRESS_CREATIVE_TV.creator, address);
  if (!hasCreatorToken) {
    return {
      redirect: {
        permanent: false,
        destination: 'https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xe174caa294999ec622988242641a27c11e6c22d8%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%7D%2C%220xb9c69af58109927cc2dcce8043f82158f7b96ca7%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+CREATOR%22%7D%2C%220xb311afe316b004dbf569381ae174eaa897b757f6%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+BRAND%22%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22title%22%3A%22CREATIVE+Memberships%22%2C%22icon%22%3A%22https%3A%2F%2Fnftstorage.link%2Fipfs%2Fbafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%220x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260%22%2C%22messageToSign%22%3A%22%22%2C%22hideSoldOut%22%3Afalse%2C%22redirectUri%22%3A%22localhost%3A3002%2Fdiscover%22%7D', // Redirect if wallet does not have the required token
      },
    };
  }
  // Brand Membership
  const hasBrandToken = await walletHasToken(LOCK_ADDRESS_CREATIVE_TV.brand, address);
  if (!hasBrandToken) {
    return {
      redirect: {
        permanent: false,
        destination: 'https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xe174caa294999ec622988242641a27c11e6c22d8%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%7D%2C%220xb9c69af58109927cc2dcce8043f82158f7b96ca7%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+CREATOR%22%7D%2C%220xb311afe316b004dbf569381ae174eaa897b757f6%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22CRTV+BRAND%22%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22title%22%3A%22CREATIVE+Memberships%22%2C%22icon%22%3A%22https%3A%2F%2Fnftstorage.link%2Fipfs%2Fbafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%220x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260%22%2C%22messageToSign%22%3A%22%22%2C%22hideSoldOut%22%3Afalse%2C%22redirectUri%22%3A%22localhost%3A3002%2Fdiscover%22%7D', // Redirect if wallet does not have the required token
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
      <NextSeo title='Discover' />
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink onClick={() => router.push('/discover')}>All Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box>
        <AllAssets>{''}</AllAssets>
      </Box>
    </>
  ) 
}

import React from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'


export default function AssetDetails() {
  const router = useRouter()

  console.log('video: ', JSON.parse(router.query.video as any))

  const setPermission = () => {
    //          <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} />
  }
  return <Text>Post: {router.query.id}</Text>
}
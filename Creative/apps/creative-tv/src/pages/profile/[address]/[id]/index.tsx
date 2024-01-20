import React from 'react'
import { useRouter } from 'next/router'


export default function AssetDetails() {
  const router = useRouter()

  console.log('video: ', JSON.parse(router.query.video as any))

  const setPermission = () => {
    //          <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} />
  }
  return <>Post: {router.query.id}</>
}
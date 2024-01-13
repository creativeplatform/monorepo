import { useRouter } from 'next/router'

export default function AssetDetails() {
  const router = useRouter()

  console.log('video: ', JSON.parse(router.query.video as any))

  const setPermission = () => {
    //          <MediaRenderer src={`${asset?.storage?.ipfs?.url}`} />
  }
  return <p>Post: {router.query.id}</p>
}

import axios from 'axios'

export type AssetData = {
  id: number
  user: string
  title: string
  description: string
  animation_url: string
  external_url: string
  image_url: string
  properties: {
    [idx: string]: any
    nFTAmountToMint: number | string
    pricePerNFT: number | string
    playbackId: string
    videoIpfs: string
  }
  video: Video
  views: Views
}

export type Video = {
  id?: any | null
  name: string
  status: { phase: string | null; updatedAt: bigint; progress: string | null; errorMessage: string | null }
  playbackId: string
  videoIpfs: string
  creatorId: { [index: string]: string }
  transcodingStatus: string
  createdAt: bigint
  updatedAt: bigint
  downloadUrl?: string
  viewCount: number
  storage: {
    ipfs: {
      cid: string
      gateway: string
      url: string
      nftMetadata: {
        cid: string
        gateway: string
        url: string
      }
      spec: {
        nftMetadata:{
          assetData: AssetData
        }
      }
    }
  }
}

export type Views = {
  [x: string]: any
  id?: any | null
  playbackId: string
  publicViews: any
}

// TODO: use Reat-Query's useQueryClient to invalidate the cache
export const videoApi = axios.create({
  baseURL: 'https://livepeer.studio/api/asset',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const fetchAssetId = async (id: any) => {
  const [, { assetId }] = id.queryKey
  console.log('Fetching asset')
  const response = await videoApi.get<AssetData['video']>(`/${assetId}?details=true`)
  const asset = response.data

  console.log('Asset: ', asset)
  return [asset]
}


export const updateAsset = async (id: any, data: any) => {
  const [, { assetId }] = id.queryKey
  console.log('Updating asset')
  const response = await videoApi.patch<AssetData["video"]>(`/${assetId}`, data)
  const asset = response.data

  console.log('Asset: ', asset)
  return [asset]
}

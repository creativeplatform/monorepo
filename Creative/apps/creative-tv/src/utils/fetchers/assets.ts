import axios from 'axios'

export interface Video {
  id?: any | null
  name: string
  status: { phase: string }
  playbackId: string
  storage: string
  transcodingStatus: string
  createdAt: bigint
  updatedAt: bigint
  downloadUrl?: string
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
  console.log('Fetching assets')
  const response = await videoApi.get<Video>(`/${assetId}?details=true`)
  const asset = response.data

  console.log('Asset: ', asset)
  return asset
}

export const updateAsset = async (id: any, data: any) => {
  const [, { assetId }] = id.queryKey
  console.log('Updating asset')
  const response = await videoApi.patch<Video>(`/${assetId}`, data)
  const asset = response.data

  console.log('Asset: ', asset)
  return asset
}

import axios from 'axios'

export type assetData = {
  id: number
  user: string
  title: string
  description: string
  video: Video
  views: Views
}

export type Video = {
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

export type Views = {
  id?: any | null
  startViews: number
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
  const response = await videoApi.get<assetData["video"]>(`/${assetId}?details=true`)
  const asset = response.data

  console.log('Asset: ', asset)
  return asset
}

export const updateAsset = async (id: any, data: any) => {
  const [, { assetId }] = id.queryKey
  console.log('Updating asset')
  const response = await videoApi.patch<assetData["video"]>(`/${assetId}`, data)
  const asset = response.data

  console.log('Asset: ', asset)
  return asset
}

// VIDEO VIEWS
export const videoViewsApi = axios.create({
  baseURL: 'https://livepeer.studio/api/data/views',
  headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
})

export const fetchAssetViews = async (id: any ) => {
  const [, { assetId }] = id.queryKey
  console.log('Fetching views')
  const response = await videoViewsApi.get<assetData['views']>(`/${assetId}/total`)
  const assetViews = response.data

  console.log('Views: ', assetViews)
  return assetViews
}

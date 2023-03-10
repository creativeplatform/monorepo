import axios from 'axios'
import { assetData } from './assets'


export const videoViews = axios.create({
    baseURL:   'https://livepeer.studio/api/data/views',
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const fetchAssetId = async (id: any) => {
    const [, { assetId }] = id.queryKey
    console.log('Fetching views')
    const response = await videoViews.get<assetData['video']>(`/${assetId}/total`)
    const views = response.data

    console.log('Views: ', views)
    return views
}
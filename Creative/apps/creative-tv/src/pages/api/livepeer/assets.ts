import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Video } from 'utils/fetchers/assets'
import { fetchVideoViews } from 'utils/fetchers/views'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get<Video[]>('https://livepeer.studio/api/asset', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_FULL_ACCESS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const views = (
      await Promise.all(
        response.data.map((asset) =>
          fetchVideoViews(asset.playbackId).then((res) => ({ playbackId: asset.playbackId, viewCount: res.viewCount || 0 }))
        )
      )
    ).reduce<Record<string, number>>((bag, views) => {
      bag[views.playbackId] = views.viewCount
      return bag
    }, {})

    res.status(200).json({ data: response.data.map((asset) => ({ ...asset, viewCount: views[asset.playbackId] })) })
  } catch (e) {
    res.status(500).json({ errors: ['Something went wrong'] })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Video } from 'utils/fetchers/assets'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get<Video[]>('https://livepeer.studio/api/asset', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_FULL_ACCESS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    res.status(200).json({ data: response.data })
  } catch (e) {
    console.log((e as any).response.data)
    res.status(500).json({ errors: ['Something went wrong'] })
  }
}

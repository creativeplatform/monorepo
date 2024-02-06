import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Views } from 'utils/fetchers/assets'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get<Views[]>('https://livepeer.studio/api/data/views', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_FULL_ACCESS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    res.status(200).json(response.data)
  } catch (e) {
    res.status(500).json({ errors: ['Something went wrong'] })
  }
}

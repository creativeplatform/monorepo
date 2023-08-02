import { createReactClient, studioProvider } from '@livepeer/react'
import { NEXT_PUBLIC_STUDIO_API_KEY } from 'utils/config'

export const useLivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: NEXT_PUBLIC_STUDIO_API_KEY || '' }),
})

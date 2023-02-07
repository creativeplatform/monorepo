import { createReactClient, studioProvider } from '@livepeer/react'

declare var process: {
  env: {
    NEXT_PUBLIC_STUDIO_API_KEY: string
  }
}
export const useLivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY }),
})

import { ThirdwebStorage } from '@thirdweb-dev/storage'
import { THIRDWEB_CLIENT_ID } from './config'

const storage = new ThirdwebStorage({ clientId: THIRDWEB_CLIENT_ID })

export const ipfs = {
  upload: async (data: { [index: string]: any }) => {
    const uri = await storage.upload(data)
    return uri
  },
  downloadJSON: async (uri: string) => {
    return await storage.downloadJSON(uri)
  },
}

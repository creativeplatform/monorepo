export interface IAssetData {
    id?: string
    title: string
    description: string
    animation_url: string
    external_url: string
    image_url: string
    properties: {
        playbackId: string
        videoIpfs: string
    }
}
  
export interface IReturnedAssetData {
    id?: string
    hash: string | undefined
    name: string
    size: number
    source: {
      type: string
    }
    status: {
      phase: string
      updatedAt: number
    }
    userId: string
    createdAt: number
    creatorId: {
      type: string
      value: string
    }
    videoSpec: {
      format: string
      bitrate: number
      duration: number
    }
    playbackId: string
    downloadUrl: string
    playbackUrl: string
    viewCount: number
}
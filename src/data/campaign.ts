export type CampaignMedia = {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}

// Set this only after approved campaign media is added to public/campaign.
// Keeping it null prevents broken requests and avoids fabricating campaign art.
export const heroCampaignMedia: CampaignMedia | null = null

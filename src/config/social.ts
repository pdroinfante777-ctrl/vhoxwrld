function resolvePublicUrl(value: string | undefined) {
  const candidate = value?.trim()
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export const instagramUrl = resolvePublicUrl(import.meta.env.VITE_INSTAGRAM_URL)
export const tiktokUrl = resolvePublicUrl(import.meta.env.VITE_TIKTOK_URL)
export const youtubeUrl = resolvePublicUrl(import.meta.env.VITE_YOUTUBE_URL)

export const socialProfiles = [
  { label: 'Instagram', url: instagramUrl },
  { label: 'TikTok', url: tiktokUrl },
  { label: 'YouTube', url: youtubeUrl },
].filter((profile): profile is { label: string; url: string } => Boolean(profile.url))

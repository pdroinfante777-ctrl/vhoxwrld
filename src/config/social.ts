function resolvePublicUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim()
  if (!candidate) return fallback
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : fallback
  } catch {
    return fallback
  }
}

export const instagramUrl = resolvePublicUrl(import.meta.env.VITE_INSTAGRAM_URL, 'https://instagram.com/')
export const tiktokUrl = resolvePublicUrl(import.meta.env.VITE_TIKTOK_URL, 'https://tiktok.com/')
export const youtubeUrl = resolvePublicUrl(import.meta.env.VITE_YOUTUBE_URL, 'https://youtube.com/')

function resolveWaitlistUrl(value: string | undefined) {
  const candidate = value?.trim()
  if (!candidate) return null

  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export const waitlistUrl = resolveWaitlistUrl(import.meta.env.VITE_WAITLIST_URL)
export const waitlistIsConfigured = waitlistUrl !== null
